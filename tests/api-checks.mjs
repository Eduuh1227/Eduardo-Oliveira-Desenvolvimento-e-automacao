import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const base='http://127.0.0.1:5173';
let cookie='';const checks=[];
async function request(path,options={}){const response=await fetch(base+path,{...options,headers:{Origin:base,...(cookie?{Cookie:cookie}:{}),...options.headers}});if(response.headers.get('set-cookie'))cookie=response.headers.get('set-cookie').split(';')[0];return response;}
function check(name,condition){assert.ok(condition,name);checks.push(name);console.log('PASS',name)}
let response=await request('/api/comments');check('GET comments',response.status===200);await response.json();
response=await request('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'QA',email:'not-an-email',message:'Mensagem de teste inválida'})});check('Invalid email rejected',response.status===400);
response=await request('/api/contact',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://invalid.example'},body:'{}'});check('Foreign origin rejected',response.status===403);
response=await request('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Verificação técnica local',email:'qa@example.invalid',message:'Teste automatizado local de persistência. Não representa um contato real.',website:''})});check('Contact persisted',response.status===201);
const form=new FormData();form.set('name','Verificação técnica local');form.set('text','Comentário de teste local com anexo.');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jR8kAAAAASUVORK5CYII=','base64');writeFileSync(new URL('./anexo-teste.png',import.meta.url),png);form.set('attachment',new File([png],'anexo-teste.png',{type:'image/png'}));response=await request('/api/comments',{method:'POST',body:form});const created=await response.json();check('Comment and attachment created',response.status===201&&created.comment.attachmentUrl);const comment=created.comment;
response=await request(comment.attachmentUrl);check('Attachment returned with correct MIME',response.status===200&&response.headers.get('content-type')==='image/png');check('Attachment bytes preserved',Buffer.from(await response.arrayBuffer()).equals(png));
response=await request(`/api/comments/${comment.id}/like`,{method:'POST'});let liked=await response.json();check('Like persisted',liked.likes===1&&liked.liked);
response=await request('/api/comments');let list=await response.json();check('New request sees saved comment and like',list.comments.some(c=>c.id===comment.id&&c.likes===1&&c.liked));
response=await request(`/api/comments/${comment.id}/like`,{method:'POST'});liked=await response.json();check('Unlike persisted',liked.likes===0&&!liked.liked);
const bad=new FormData();bad.set('name','QA');bad.set('text','Teste de arquivo inválido');bad.set('attachment',new File(['not an image'],'fake.png',{type:'image/png'}));response=await request('/api/comments',{method:'POST',body:bad});check('Fake image rejected',response.status===400);
const over=new FormData();over.set('name','QA');over.set('text','Teste de tamanho máximo');over.set('attachment',new File([new Uint8Array(4*1024*1024+1)],'large.png',{type:'image/png'}));response=await request('/api/comments',{method:'POST',body:over});check('Oversize attachment rejected',response.status===413);
response=await request('/api/media/invalid.svg');check('Invalid media path rejected',response.status===404);
for(const slug of ['ilima-advogados','controle-de-tarefas','bot-whatsapp-web']){response=await request(`/projetos/${slug}`);check(`Project route ${slug}`,response.status===200);}
response=await request('/projetos/inexistente');check('Unknown project has 404',response.status===404);
writeFileSync(new URL('./api-results.json',import.meta.url),JSON.stringify({date:new Date().toISOString(),checks,commentId:comment.id,attachment:comment.attachmentUrl},null,2));
