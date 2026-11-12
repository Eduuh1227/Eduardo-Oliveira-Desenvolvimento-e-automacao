'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

// Fixed-step position based rope, an angular spring, and a separately rendered rigid card.
// No looping animation: all movement comes from initial or user-applied impulses.
export default function Badge({ready,reduce=false}:{ready:boolean;reduce?:boolean}) {
 const mount=useRef<HTMLDivElement>(null),touch=useRef<HTMLButtonElement>(null), control=useRef<{kick:(n:number)=>void;reset:()=>void}|null>(null);
 const [failed,setFailed]=useState(false),[active,setActive]=useState(false);
 useEffect(()=>{
  if(!mount.current||!ready) return;
  const host=mount.current, motion=matchMedia('(prefers-reduced-motion: reduce)');
  let reduced=motion.matches||reduce,disposed=false,raf=0,visible=true;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{setFailed(true);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor(0,0);host.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-4,4,3.8,-3.8,.1,30);
  camera.position.set(0,0,10);camera.lookAt(0,0,0);
  scene.add(new THREE.AmbientLight(0xffffff,2.1));
  const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-4,6,9);scene.add(key);
  const rim=new THREE.DirectionalLight(0xffffff,1.5);rim.position.set(5,-1,3);scene.add(rim);
  const group=new THREE.Group();scene.add(group);
  const frame=new THREE.Mesh(new RoundedBoxGeometry(2.22,3.1,.115,4,.1),new THREE.MeshPhysicalMaterial({color:0xececeb,roughness:.32,metalness:.2,clearcoat:.65}));group.add(frame);
  const back=new THREE.Mesh(new THREE.PlaneGeometry(1.94,2.81),new THREE.MeshStandardMaterial({color:0x151515,roughness:.65}));back.position.z=-.06;back.rotation.y=Math.PI;group.add(back);
  const photoCanvas=document.createElement('canvas');photoCanvas.width=512;photoCanvas.height=744;
  const ctx=photoCanvas.getContext('2d')!;ctx.fillStyle='#292929';ctx.fillRect(0,0,512,744);
  const texture=new THREE.CanvasTexture(photoCanvas);texture.colorSpace=THREE.SRGBColorSpace;
  const face=new THREE.Mesh(new THREE.PlaneGeometry(1.94,2.80),new THREE.MeshBasicMaterial({map:texture,transparent:true}));face.position.z=.061;group.add(face);
  const photo=new Image();photo.onload=()=>{if(disposed)return;ctx.clearRect(0,0,512,744);ctx.save();ctx.beginPath();ctx.roundRect(0,0,512,744,20);ctx.clip();const sw=photo.width*.78,sh=photo.height*.87;ctx.drawImage(photo,photo.width*.20,photo.height*.03,sw,sh,0,0,512,744);ctx.restore();texture.needsUpdate=true;};photo.src='/images/eduardo-oliveira.jpeg';
  const slot=new THREE.Mesh(new THREE.CapsuleGeometry(.035,.28,4,8),new THREE.MeshStandardMaterial({color:0x161616,roughness:.6}));slot.rotation.z=Math.PI/2;slot.position.set(0,1.46,.065);group.add(slot);
  const clip=new THREE.Mesh(new RoundedBoxGeometry(.14,.35,.15,2,.025),new THREE.MeshStandardMaterial({color:0x292929,metalness:.8,roughness:.3}));clip.position.set(0,1.65,0);group.add(clip);
  const strapCanvas=document.createElement('canvas');strapCanvas.width=128;strapCanvas.height=1024;const sc=strapCanvas.getContext('2d')!;sc.fillStyle='#080808';sc.fillRect(0,0,128,1024);sc.strokeStyle='#333';sc.lineWidth=3;sc.strokeRect(3,0,122,1024);sc.save();sc.translate(64,512);sc.rotate(Math.PI/2);sc.fillStyle='#ddd';sc.textAlign='center';sc.font='bold 44px Arial';sc.fillText('EDUARDO · DEVELOPER',0,15);sc.restore();
  const strapTexture=new THREE.CanvasTexture(strapCanvas);strapTexture.colorSpace=THREE.SRGBColorSpace;
  const segments=48,stripGeo=new THREE.BufferGeometry(),vertices=new Float32Array((segments+1)*6),uvs=new Float32Array((segments+1)*4),indices=[];
  for(let i=0;i<=segments;i++){uvs.set([0,i/segments,1,i/segments],i*4);if(i<segments){const v=i*2;indices.push(v,v+1,v+2,v+1,v+3,v+2);}}
  stripGeo.setAttribute('position',new THREE.BufferAttribute(vertices,3));stripGeo.setAttribute('uv',new THREE.BufferAttribute(uvs,2));stripGeo.setIndex(indices);
  const strap=new THREE.Mesh(stripGeo,new THREE.MeshStandardMaterial({map:strapTexture,side:THREE.DoubleSide,roughness:.85}));strap.frustumCulled=false;scene.add(strap);
  const anchor=new THREE.Vector3(0,4.5,0),count=8,length=3.7,step=length/count;
  const points=Array.from({length:count+1},(_,i)=>new THREE.Vector3(reduced?0:Math.sin(i/count*Math.PI)*.23,anchor.y-step*i,0));
  const previous=points.map(p=>p.clone());let angle=reduced?0:-.16,angularVelocity=0,tilt=0,dragging=false,pointerId=-1;
  const target=new THREE.Vector3(),offset=new THREE.Vector3(),pointer=new THREE.Vector2(),ray=new THREE.Raycaster(),plane=new THREE.Plane(new THREE.Vector3(0,0,1),0),cursor=new THREE.Vector3();
  const setPointer=(event:PointerEvent)=>{const rect=host.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);ray.ray.intersectPlane(plane,cursor);};
  function draw(){
   const attachment=points[count];group.position.set(attachment.x+Math.sin(angle)*1.65,attachment.y-Math.cos(angle)*1.65,attachment.z);group.rotation.set(tilt*.16,tilt,angle);
   const curve=new THREE.CatmullRomCurve3(points);
   for(let i=0;i<=segments;i++){const t=i/segments,p=curve.getPoint(t),tangent=curve.getTangent(t),side=new THREE.Vector3(-tangent.y,tangent.x,0).normalize().multiplyScalar(.068);vertices.set([p.x-side.x,p.y-side.y,p.z-side.z,p.x+side.x,p.y+side.y,p.z+side.z],i*6);}
   stripGeo.attributes.position.needsUpdate=true;stripGeo.computeVertexNormals();renderer.render(scene,camera);
   if(touch.current){const center=group.position.clone().project(camera),scale=host.clientHeight/7.6;touch.current.style.cssText=`left:${(center.x+1)*host.clientWidth/2-1.11*scale}px;top:${(1-center.y)*host.clientHeight/2-1.55*scale}px;width:${2.22*scale}px;height:${3.1*scale}px;transform:rotate(${-angle}rad);`;}
   host.dataset.motion=dragging?'dragging':Math.abs(angle)+Math.abs(angularVelocity)>.005?'swinging':'rest';host.dataset.angle=angle.toFixed(4);host.dataset.x=group.position.x.toFixed(3);
  }
  function reset(){for(let i=0;i<=count;i++){points[i].set(0,anchor.y-i*step,0);previous[i].copy(points[i]);}angle=0;angularVelocity=0;tilt=0;draw();}
  control.current={kick:(n)=>{points[count].x+=n*.14;angularVelocity+=n*1.4;},reset};
  const down=(event:PointerEvent)=>{if(event.button!==0)return;setPointer(event);const hit=ray.intersectObject(frame);if(!hit.length)return;event.preventDefault();offset.copy(cursor).sub(group.position);target.copy(group.position);dragging=true;pointerId=event.pointerId;renderer.domElement.setPointerCapture(pointerId);renderer.domElement.style.touchAction='none';host.style.cursor='grabbing';setActive(true);};
  const move=(event:PointerEvent)=>{setPointer(event);if(dragging){event.preventDefault();const old=target.x;target.copy(cursor).sub(offset);target.x=THREE.MathUtils.clamp(target.x,-camera.right+1.35,camera.right-1.35);target.y=THREE.MathUtils.clamp(target.y,-2.5,2);angularVelocity+=(target.x-old)*.3;}else{const hit=ray.intersectObject(frame).length>0;host.style.cursor=hit?'grab':'auto';renderer.domElement.style.touchAction=hit?'none':'pan-y';}};
  const up=()=>{if(!dragging)return;dragging=false;for(let i=1;i<=count;i++){const velocity=points[i].clone().sub(previous[i]).clampLength(0,.018);previous[i].copy(points[i]).sub(velocity);}angularVelocity=THREE.MathUtils.clamp(angularVelocity,-2,2);host.style.cursor='grab';setActive(false);if(renderer.domElement.hasPointerCapture(pointerId))renderer.domElement.releasePointerCapture(pointerId);if(reduced)reset();};
  // Touch starts over a dedicated card hit-area, leaving the rest of the scene scrollable.
  const canvas=renderer.domElement,touchElement=touch.current;canvas.style.touchAction='pan-y';canvas.addEventListener('pointerdown',down);touchElement?.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('lostpointercapture',up);
  let last=0,accumulator=0;
  function simulate(dt:number){
   for(let i=1;i<=count;i++){const p=points[i],old=p.clone();p.addScaledVector(p.clone().sub(previous[i]).clampLength(0,.035),.986);p.y-=11*dt*dt;previous[i].copy(old);}
   const lean=Math.atan2(points[count].x-anchor.x,anchor.y-points[count].y);angularVelocity+=(-Math.sin(angle)*12+lean*5-angularVelocity*1.65)*dt;angle+=angularVelocity*dt;
   if(dragging){const desired=THREE.MathUtils.clamp(target.x*.20,-.65,.65);angularVelocity+=(desired-angle)*14*dt;const attachment=target.clone().add(new THREE.Vector3(-Math.sin(angle)*1.65,Math.cos(angle)*1.65,0));const delta=attachment.clone().sub(anchor);if(delta.length()>length)attachment.copy(anchor).add(delta.setLength(length));points[count].lerp(attachment,.40);}
   for(let pass=0;pass<12;pass++){points[0].copy(anchor);for(let i=0;i<count;i++){const a=points[i],b=points[i+1],delta=b.clone().sub(a),dist=delta.length()||.001;delta.multiplyScalar((dist-step)/dist);if(i===0)b.sub(delta);else{const weight=i===count-1?.88:.5;a.addScaledVector(delta,weight);b.addScaledVector(delta,-(1-weight));}}}
   points[count].x=THREE.MathUtils.clamp(points[count].x,-camera.right+1.5,camera.right-1.5);const vx=points[count].x-previous[count].x;tilt=THREE.MathUtils.lerp(tilt,THREE.MathUtils.clamp(vx*6+(dragging?target.x*.12:0),-.5,.5),.07);
  }
  function tick(time:number){raf=requestAnimationFrame(tick);if(!visible||document.hidden){last=time;return;}const delta=Math.min((time-last)/1000||0,1/30);last=time;accumulator+=delta;if(!reduced||dragging){while(accumulator>=1/120){simulate(1/120);accumulator-=1/120;}}else accumulator=0;draw();}
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;const half=3.8;camera.left=-half*w/h;camera.right=half*w/h;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();renderer.setSize(w,h);draw();};
  const resizer=new ResizeObserver(resize);resizer.observe(host);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(host);
  const change=()=>{reduced=motion.matches||reduce;if(reduced)reset();};motion.addEventListener('change',change);resize();raf=requestAnimationFrame(tick);
  return()=>{disposed=true;cancelAnimationFrame(raf);control.current=null;resizer.disconnect();observer.disconnect();motion.removeEventListener('change',change);canvas.removeEventListener('pointerdown',down);touchElement?.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('lostpointercapture',up);scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});texture.dispose();strapTexture.dispose();renderer.dispose();canvas.remove();};
 },[ready,reduce]);
 return <div className={`badge-scene ${active?'is-dragging':''}`}>
  <div className="badge-canvas" ref={mount} aria-hidden="true"/>
  <button ref={touch} className="badge-touch-target" tabIndex={-1} aria-hidden="true"/>
  {failed&&<div className="badge-fallback"><span/><img src="/images/eduardo-oliveira.jpeg" alt="Eduardo Oliveira"/><p>A visualização 3D não está disponível neste navegador.</p></div>}
  <button className="badge-keyboard" aria-label="Interagir com o crachá. Use as setas para balançar e Escape para estabilizar." onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();control.current?.kick(e.key==='ArrowLeft'?-1:1);}if(e.key==='Escape')control.current?.reset();}} onClick={()=>control.current?.kick(1)}>Arraste o crachá <span>↔</span></button>
 </div>;
}


