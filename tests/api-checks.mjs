import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8787'; if(!['127.0.0.1','localhost'].includes(new URL(base).hostname))throw Error('Execute estes testes apenas no ambiente local.');
let cookie='';const checks=[];
async function request(path,options={}){const response=await fetch(base+path,{...options,headers:{Origin:base,...(cookie?{Cookie:cookie}:{}),...options.headers}});if(response.headers.get('set-cookie'))cookie=response.headers.get('set-cookie').split(';')[0];return response;}
function check(name,condition){assert.ok(condition,name);checks.push(name);console.log('PASS',name)}
let response;
for (const [path, method] of [['/api/comments','GET'], ['/api/comments','POST'], ['/api/comments/example/like','POST'], ['/api/media/example.png','GET']]) {
  response = await request(path, {method});
  check(method+' '+path+' desativado', response.status===404);
}
response=await request('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'QA',email:'not-an-email',message:'Mensagem de teste inválida'})});check('Invalid email rejected',response.status===400);
response=await request('/api/contact',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://invalid.example'},body:'{}'});check('Foreign origin rejected',response.status===403);
response=await request('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Verificação técnica local',email:'qa@example.invalid',message:'Teste automatizado local de persistência. Não representa um contato real.',website:''})});check('Contact persisted',response.status===201);
for(const slug of ['deteccao-de-plasticos','ilima-advogados','controle-de-tarefas','bot-whatsapp-web']){response=await request(`/projetos/${slug}`);check(`Project route ${slug}`,response.status===200);}
response=await request('/projetos/inexistente');check('Unknown project has 404',response.status===404);
