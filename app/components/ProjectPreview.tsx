import { Check, MoreHorizontal, Send } from 'lucide-react';
export default function ProjectPreview({kind,large=false}:{kind:string;large?:boolean}) {
 return <div className={`project-preview ${kind} ${large?'large':''}`} role="img" aria-label="Representação visual das funcionalidades do projeto">
 <div className="preview-chrome"><i/><i/><i/><span>{kind==='law'?'ilima.adv':kind==='tasks'?'minhas tarefas':'atendimento online'}</span></div>
 {kind==='law'?<div className="law-art"><span className="law-mark">ilima<span>ADVOGADOS</span></span><div className="law-rule"/><p>Compromisso.<br/>Confiança.<br/><em>Justiça.</em></p><span className="law-link">Conheça nossa atuação ↗</span></div>:
 kind==='tasks'?<div className="tasks-art"><div><b>Minhas tarefas</b><MoreHorizontal size={16}/></div><span className="task-add">+ Nova tarefa</span>{['Planejar projeto','Desenvolver interface','Publicar na Vercel'].map((s,i)=><div className={`art-task ${i===0?'checked':''}`} key={s}><span>{i===0&&<Check size={11}/>}</span>{s}<small>{i===0?'Concluída':'Em andamento'}</small></div>)}</div>:
 <div className="bot-art"><div className="bot-title"><span>W</span><div><b>Assistente virtual</b><small>Atendimento automatizado</small></div></div><div className="bubble">Olá! Como posso ajudar?<br/><br/>1 · Buscar por CEP<br/>2 · Ler uma piada<br/>3 · Conversar com a IA</div><div className="bubble answer">Quero consultar um CEP <Check size={10}/></div><div className="bot-input">Digite sua mensagem <Send size={12}/></div></div>}
 </div>;
}
