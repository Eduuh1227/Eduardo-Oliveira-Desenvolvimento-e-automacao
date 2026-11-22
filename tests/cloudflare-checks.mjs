import assert from 'node:assert/strict';
const base='http://127.0.0.1:8787';
for(const path of ['/documents/Eduardo_Oliveira_Curriculo.pdf','/technologies/mysql.svg','/certificates/UC-bd2a9323-a36f-4d70-8cc5-d4651ae436c1.jpg','/fonts/fonts.css']){assert.equal((await fetch(base+path)).status,200);console.log('PASS asset '+path)}
