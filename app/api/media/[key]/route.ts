import {bucket} from '../../storage';
import { fail,HttpError } from '../../shared';
export async function GET(request:Request,{params}:{params:Promise<{key:string}>}){try{const {key}=await params;if(!/^[a-f0-9-]{36}\.(png|jpg|webp)$/.test(key))throw new HttpError(404,'Imagem não encontrada.');const object=await bucket().get(key);if(!object)throw new HttpError(404,'Imagem não encontrada.');return new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'application/octet-stream','Cache-Control':'public, max-age=86400','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox",'Content-Disposition':'inline'}});}catch(e){return fail(request,e)}}

