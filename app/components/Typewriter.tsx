'use client';
import {useEffect,useState} from 'react';
const roles=['Interfaces que conectam.','APIs que simplificam.','Automações que resolvem.'];
export default function Typewriter({ready,reduced}:{ready:boolean;reduced:boolean}){
 const [typed,setTyped]=useState('');
 useEffect(()=>{if(!ready)return;if(reduced){setTyped(roles[0]);return;}let timer:ReturnType<typeof setTimeout>,index=0,length=0,deleting=false,stop=false;function type(){if(stop)return;const value=roles[index];length+=deleting?-1:1;setTyped(value.slice(0,length));let delay=deleting?38:70;if(length===value.length){deleting=true;delay=1800;}if(length===0){deleting=false;index=(index+1)%roles.length;delay=300;}timer=setTimeout(type,delay);}type();return()=>{stop=true;clearTimeout(timer)};},[ready,reduced]);
 return <p className="type-line hero-enter" aria-label={roles.join(' ')}><span aria-hidden="true">{typed}<span className="cursor">_</span></span></p>;
}
