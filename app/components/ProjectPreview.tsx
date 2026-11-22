import { Check, ListChecks, ScanLine, Send } from 'lucide-react';

// Positions in pixels from the detector's 304 × 115 input.
const detections = [
  { x: 50.29, y: 63.55, width: 78.66, height: 32.22, confidence: '31,0%' },
  { x: 153.49, y: 65.17, width: 19.04, height: 9.09, confidence: '46,1%' },
];

export default function ProjectPreview({kind,large=false}:{kind:string;large?:boolean}) {
 const size = large ? ' large' : '';
 if (kind === 'plastic') {
   return <div className={`project-preview detection-cover${size}`} role="img" aria-label="Duas detecções de plástico na areia. À esquerda, confiança de 31%. Ao centro, 46,1%.">
     <svg className="detection-scene" viewBox="4 4 296 108" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
       <image href="/projects/plastic-input.webp" width="304" height="115"/>
       {detections.map(({x,y,width,height}, i) => <g key={x} className="detection-box">
         <rect x={x} y={y} width={width} height={height} rx="1"/>
         <rect className="marker" x={x} y={y-11} width="17" height="11" rx="1"/>
         <text x={x+8.5} y={y-3}>0{i+1}</text>
       </g>)}
     </svg>
     <div className="detection-key" aria-hidden="true"><span><ScanLine/>Confiança</span>
       {detections.map(({confidence}, i) => <span key={confidence}><b>0{i+1}</b>{confidence}</span>)}
     </div>
   </div>;
 }
 if (kind === 'tasks') {
   return <div className={`project-preview task-cover${size}`}>
     <div className="task-cover-heading"><span><ListChecks/>Minhas tarefas</span><small>Demonstração</small></div>
     <img src="/projects/task-example.webp" alt="Tarefa de exemplo em andamento, com descrição e ações de editar e excluir."/>
   </div>;
 }
 return <div className={`project-preview ${kind} ${large?'large':''}`} role="img" aria-label="Representação visual das funcionalidades do projeto">
 <div className="preview-chrome"><i/><i/><i/><span>{kind==='law'?'ilima.adv':'atendimento online'}</span></div>
 {kind==='law'?<div className="law-art"><span className="law-mark">ilima<span>ADVOGADOS</span></span><div className="law-rule"/><p>Compromisso.<br/>Confiança.<br/><em>Justiça.</em></p><span className="law-link">Conheça nossa atuação ↗</span></div>:
 <div className="bot-art"><div className="bot-title"><span>W</span><div><b>Assistente virtual</b><small>Atendimento automatizado</small></div></div><div className="bubble">Olá! Como posso ajudar?<br/><br/>1 · Buscar por CEP<br/>2 · Ler uma piada<br/>3 · Conversar com a IA</div><div className="bubble answer">Quero consultar um CEP <Check size={10}/></div><div className="bot-input">Digite sua mensagem <Send size={12}/></div></div>}
 </div>;
}
