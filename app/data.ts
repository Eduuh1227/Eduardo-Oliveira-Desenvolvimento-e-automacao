export const contacts = { github: 'https://github.com/Eduuh1227', linkedin: 'https://www.linkedin.com/in/eduardoaugustooliveira', whatsapp: 'https://wa.me/5511990073671' };
export const projects = [
 { slug:'ilima-advogados', title:'Ilima Advogados', category:'FRONT-END · LANDING PAGE', kind:'law', description:'Uma presença digital profissional para um escritório de advocacia, com foco em confiança e contato.', body:'Página profissional para escritório de advocacia, com comunicação objetiva, seções institucionais, chamadas para contato e visual voltado à confiança do cliente. Uma landing page responsiva que apresenta os serviços e facilita o próximo passo de quem procura atendimento.', technologies:['HTML5','CSS3','JavaScript','Vercel'], features:['Seções institucionais e apresentação dos serviços','Chamadas diretas para contato','Layout responsivo para celular e computador'], live:'https://ilima-advogados-s9pl.vercel.app/', repo:'https://github.com/Eduuh1227/ilima-advogados/tree/lima-advogados' },
 { slug:'controle-de-tarefas', title:'Controle de Tarefas Simples', category:'FULL-STACK · CRUD E AUTENTICAÇÃO', kind:'tasks', description:'Tarefas organizadas por usuário, com autenticação, API e gerenciamento completo.', body:'Sistema de gerenciamento de tarefas com criação de conta, login e tarefas vinculadas ao usuário autenticado. Permite cadastrar, listar, editar e excluir tarefas, incluindo título, descrição e status. A API utiliza Node.js puro, com persistência em arquivo db.json.', technologies:['Node.js','JavaScript','API REST','JSON'], features:['Cadastro e login de usuários','Criação, listagem, edição e exclusão de tarefas','Tarefas vinculadas ao usuário autenticado','Persistência em arquivo db.json'], live:null, repo:'https://github.com/Eduuh1227/controle-de-tarefas-simples/tree/main' },
 { slug:'bot-whatsapp-web', title:'Bot WhatsApp Web', category:'BACK-END · BOT E AUTOMAÇÃO', kind:'bot', description:'Atendimento automatizado com menu, busca de CEP, integrações e conversa com IA.', body:'Bot de atendimento desenvolvido com Node.js e WhatsApp Web. Reúne menu automatizado, integração por API, consulta de CEP, respostas dinâmicas e conversa com inteligência artificial para tornar o atendimento mais útil e ágil.', technologies:['Node.js','WhatsApp Web','APIs','IA'], features:['Menu de atendimento automatizado','Consulta de CEP por API','Respostas dinâmicas','Conversa com inteligência artificial'], live:null, repo:'https://github.com/Eduuh1227/bot-whatsappweb/tree/bot-webwhatsapp' },
];
export type Project = typeof projects[number];
export const resumeUrl:string|null=null;
export type Certificate={title:string;issuer:string;image:string;documentUrl?:string};
export const certificates:Certificate[]=[
  {
    "title": "React Native Criando aplicativos do zero ao avançado",
    "issuer": "Udemy · Matheus Fraga",
    "image": "/certificates/UC-bd2a9323-a36f-4d70-8cc5-d4651ae436c1.jpg",
    "documentUrl": "https://ude.my/UC-bd2a9323-a36f-4d70-8cc5-d4651ae436c1"
  },
  {
    "title": "Curso IA Generativa Do Zero ao Avançado (2026)",
    "issuer": "Udemy · Andre Iacono",
    "image": "/certificates/UC-86f5a834-9c4a-4ba6-a0da-b5580d034a58.jpg",
    "documentUrl": "https://ude.my/UC-86f5a834-9c4a-4ba6-a0da-b5580d034a58"
  },
  {
    "title": "Java primeiros passos: Lógica de Programação e Algoritmos",
    "issuer": "Udemy · Nelio Alves",
    "image": "/certificates/UC-5c2fd490-f497-464a-850b-d94c962f6972.jpg",
    "documentUrl": "https://ude.my/UC-5c2fd490-f497-464a-850b-d94c962f6972"
  },
  {
    "title": "Aprenda a escolher, montar e testar um computador!",
    "issuer": "Udemy · Felipe Miranda",
    "image": "/certificates/UC-4ac304be-7ca6-403a-bd14-5a871edd18a0.jpg",
    "documentUrl": "https://ude.my/UC-4ac304be-7ca6-403a-bd14-5a871edd18a0"
  },
  {
    "title": "Git e GitHub: Aprenda em 3 Dias com Projetos Reais",
    "issuer": "Udemy · Andre Iacono",
    "image": "/certificates/UC-82903d43-a8a4-4f38-8a35-e5b8863d56a5.jpg",
    "documentUrl": "https://ude.my/UC-82903d43-a8a4-4f38-8a35-e5b8863d56a5"
  },
  {
    "title": "Curso Técnico em TI completo: manutenção, formatação...",
    "issuer": "Udemy · Leandro Bueno",
    "image": "/certificates/UC-ff12020f-b4e1-4be6-a61c-39deaf1b7f68.jpg",
    "documentUrl": "https://ude.my/UC-ff12020f-b4e1-4be6-a61c-39deaf1b7f68"
  }
];
export const technologies = [
 {name:'HTML5',symbol:'5',color:'#e96228',style:'shield'}, {name:'CSS3',symbol:'3',color:'#329bd6',style:'shield'}, {name:'JavaScript',symbol:'JS',color:'#f0db4f',style:'square'}, {name:'TypeScript',symbol:'TS',color:'#3178c6',style:'square'}, {name:'MySQL',symbol:'SQL',color:'#4479a1',style:'hex'}, {name:'Node.js',symbol:'JS',color:'#6fa65b',style:'hex'}, {name:'APIs REST',symbol:'{ }',color:'#bababa',style:'code'}, {name:'Git',symbol:'git',color:'#ed5d40',style:'code'}, {name:'GitHub',symbol:'github',color:'#e8e8e8',style:'icon'}, {name:'Vercel',symbol:'▲',color:'#f0f0f0',style:'code'}, {name:'Automação',symbol:'workflow',color:'#b4c4ce',style:'icon'}, {name:'Integrações',symbol:'plug',color:'#b6b6c7',style:'icon'},
];
