import {env} from 'cloudflare:workers';
export function bucket(){
 const db=env.DB;
 return {
  async put(key:string,bytes:Uint8Array,metadata:{httpMetadata:{contentType:string}}){
   const statements=[db.prepare('INSERT INTO attachments (key,content_type) VALUES (?,?)').bind(key,metadata.httpMetadata.contentType)];
   for(let start=0,part=0;start<bytes.length;start+=512*1024,part++){
    statements.push(db.prepare('INSERT INTO attachment_chunks (key,part,data) VALUES (?,?,?)').bind(key,part,bytes.slice(start,start+512*1024).buffer));
   }
   await db.batch(statements);
  },
  async delete(key:string){await db.prepare('DELETE FROM attachments WHERE key=?').bind(key).run();},
  async get(key:string){
   const metadata=await db.prepare('SELECT content_type FROM attachments WHERE key=?').bind(key).first<{content_type:string}>();
   if(!metadata)return null;
   const {results}=await db.prepare('SELECT data FROM attachment_chunks WHERE key=? ORDER BY part').bind(key).all<{data:number[]}>();
   const parts=results.map(row=>new Uint8Array(row.data));
   return {body:new Blob(parts),httpMetadata:{contentType:metadata.content_type}};
  }
 };
}
