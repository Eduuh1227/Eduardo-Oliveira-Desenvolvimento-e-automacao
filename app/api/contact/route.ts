import { message as saveMessage } from '../storage';
import { boundedBody, fail, honeypot, HttpError, json, origin, rate, text } from '../shared';

export async function POST(request: Request) {
  try {
    origin(request);
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_EMAIL_FROM;
    if (!apiKey || !from) {
      throw new HttpError(503, 'O formulário está indisponível no momento. Entre em contato pelo WhatsApp.');
    }

    await rate(request, 'contact', 8);
    let data;
    try {
      data = JSON.parse(new TextDecoder().decode(await boundedBody(request, 20000)));
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(400, 'Formulário inválido.');
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new HttpError(400, 'Formulário inválido.');
    }

    honeypot(data.website);
    const name = text(data.name, 'O nome', 2, 80);
    const email = text(data.email, 'O e-mail', 5, 254);
    const message = text(data.message, 'A mensagem', 10, 5000);
    if (!/^[^\s@,<>"\\]+@[^\s@,<>"\\]+\.[^\s@,<>"\\]+$/.test(email)) {
      throw new HttpError(400, 'Informe um endereço de e-mail válido.');
    }

    const id = crypto.randomUUID();
    await saveMessage(id, { id, name, email, message, createdAt: Date.now() });

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: ['eduardocavallin2005@gmail.com'],
          reply_to: email,
          subject: 'Nova mensagem pelo portfólio',
          text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error('Contact email failed', id, error instanceof Error ? error.message : 'unknown');
      throw new HttpError(502, 'Sua mensagem foi registrada, mas o aviso por e-mail falhou. Se precisar, fale comigo pelo WhatsApp.');
    }

    return json(request, { ok: true, id }, 201);
  } catch (error) {
    return fail(request, error);
  }
}
