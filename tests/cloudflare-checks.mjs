import assert from 'node:assert/strict';
const base='http://127.0.0.1:8787';
const original=new Uint8Array(1400000);
original.set([137,80,78,71,13,10,26,10]);
const form=new FormData();form.set('name','Teste local de blocos');form.set('text','Validação local de persistência de um anexo em vários blocos.');form.set('attachment',new File([original],'blocos.png',{type:'image/png'}));
const response=await fetch(base+'/api/comments',{method:'POST',headers:{Origin:base},body:form});
const data=await response.json();assert.equal(response.status,201,JSON.stringify(data));
const image=await fetch(base+data.comment.attachmentUrl);
assert.deepEqual(new Uint8Array(await image.arrayBuffer()),original);
console.log('PASS multi-chunk attachment roundtrip');
for(const path of ['/documents/Eduardo_Oliveira_Curriculo.pdf','/technologies/mysql.svg','/certificates/UC-bd2a9323-a36f-4d70-8cc5-d4651ae436c1.jpg','/fonts/fonts.css']){assert.equal((await fetch(base+path)).status,200);console.log('PASS asset '+path)}
