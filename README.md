# Portfólio de Eduardo Oliveira — Cloudflare

Migração do portfólio Next.js para páginas estáticas e API em Cloudflare Workers + D1. Preserva o crachá Three.js, fotos coloridas, projetos, certificados, currículo, tecnologias e navegação.

## Arquitetura e custos

As páginas são exportadas pelo Next.js para out/. Só /api/* executa o Worker; o conteúdo estático não passa pelo código da API. Comentários, curtidas, mensagens e anexos usam D1. As imagens de comentários são armazenadas em blocos de 512 KiB, abaixo do limite de tamanho de linha do D1. Não há dependência de Vercel Blob, R2 ou assinatura paga.

O plano gratuito possui limites: Workers 100 mil requisições/dia e 10 ms de CPU por chamada; D1 tem 500 MB por banco no Free. Fotos, currículo e certificados ficam nos arquivos estáticos, sem consumir o banco. Para maior volume de anexos, avaliar armazenamento de objetos e seus custos antes de ativar. Os testes locais não comprovam o tempo de CPU em produção.

Mensagens ficam privadas na tabela messages; não há envio automático de e-mail. Os dados de teste ficam apenas na base local. Nenhum registro da hospedagem anterior foi importado automaticamente.

## Desenvolvimento e testes

Requer Node.js 24.

1. npm ci
2. npm run build
3. npm run db:local
4. npx wrangler dev --ip 127.0.0.1 --port 8787
5. node tests/api-checks.mjs
6. node tests/cloudflare-checks.mjs

Os testes criam registros identificados no banco local. O segundo teste confere persistência de imagem em vários blocos e disponibilidade dos arquivos estáticos. npm run dev abre apenas a interface Next.js; para testar a API, use Wrangler.

## Publicação

1. npx wrangler login
2. npx wrangler d1 create eduardo-portfolio
3. Substituir database_id: local-only em wrangler.json pelo ID retornado. Se houver mais de uma conta, definir account_id explicitamente.
4. npm run db:remote
5. npm run deploy

O login deve ser autorizado pelo proprietário; não salvar tokens no repositório. Não ativar plano pago como parte deste fluxo. Usar o endereço workers.dev retornado pelo Wrangler. O endereço vercel.app não pode ser transferido para outra hospedagem.

Uma tarefa diária remove os registros expirados de limite de requisições. As migrações são versionadas e não devem ser reaplicadas manualmente fora do mecanismo de migrations do Wrangler.

## Conteúdo

app/data.ts contém projetos, tecnologias, certificados e link do currículo. Os arquivos públicos estão em public/. Código da API em worker/api/; esquema em migrations/. A configuração atual do Vercel permanece intacta durante a preparação em branch migrate/cloudflare.
