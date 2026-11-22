import * as contact from './api/contact/route';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const path = new URL(request.url).pathname.replace(/\/$/, '');
    if (!path.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (path !== '/api/contact') return Response.json({ error: 'Rota não encontrada.' }, { status: 404 });
    if (request.method === 'POST') return contact.POST(request);
    return Response.json({ error: 'Método não permitido.' }, { status: 405, headers: { Allow: 'POST' } });
  },
 async scheduled(_event:ScheduledController,env:Env){await env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(Date.now()).run();}
} satisfies ExportedHandler<Env>;
