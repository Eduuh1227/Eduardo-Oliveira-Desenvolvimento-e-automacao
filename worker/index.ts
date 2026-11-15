import * as comments from './api/comments/route';
import * as contact from './api/contact/route';
import * as like from './api/comments/[id]/like/route';
import * as media from './api/media/[key]/route';
export default {
 async fetch(request:Request,env:Env):Promise<Response>{
  const {pathname}=new URL(request.url);
  const path=pathname.replace(/\/$/,'');
  if(!path.startsWith('/api/'))return env.ASSETS.fetch(request);
  if(path==='/api/comments'){
   if(request.method==='GET')return comments.GET(request);
   if(request.method==='POST')return comments.POST(request);
  }else if(path==='/api/contact'&&request.method==='POST')return contact.POST(request);
  else if(/^\/api\/comments\/[^/]+\/like$/.test(path)&&request.method==='POST')return like.POST(request,{params:Promise.resolve({id:path.split('/')[3]})});
  else if(/^\/api\/media\/[^/]+$/.test(path)&&request.method==='GET')return media.GET(request,{params:Promise.resolve({key:path.split('/')[3]})});
  else return Response.json({error:'Rota não encontrada.'},{status:404});
  return Response.json({error:'Método não permitido.'},{status:405,headers:{Allow:path==='/api/comments'?'GET, POST':'POST'}});
 },
 async scheduled(_event:ScheduledController,env:Env){await env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(Date.now()).run();}
} satisfies ExportedHandler<Env>;
