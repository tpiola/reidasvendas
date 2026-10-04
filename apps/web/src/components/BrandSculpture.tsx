import { useEffect, useRef } from 'react';

type Vector = [number, number, number];
type Face = { points: Vector[]; normal: Vector; edgeNormals: Vector[]; center: Vector; gold: boolean };
const faces: Face[] = [];
const turn = ([x,y,z]: Vector, ax: number, ay: number): Vector => {
  const yy = y*Math.cos(ax)-z*Math.sin(ax), zz = y*Math.sin(ax)+z*Math.cos(ax);
  return [x*Math.cos(ay)+zz*Math.sin(ay), yy, -x*Math.sin(ay)+zz*Math.cos(ay)];
};
const unit = (v: Vector): Vector => { const l = Math.hypot(...v); return v.map(n=>n/l) as Vector; };
const dot = (a: Vector,b: Vector) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
// True toroidal meshes, projected in perspective and lit by three studio softboxes.
function torus(radius: number, tube: number, tilt: number, gold: boolean) {
  const point = (u: number, v: number): Vector => turn([(radius+tube*Math.cos(v))*Math.cos(u),(radius+tube*Math.cos(v))*Math.sin(u),tube*Math.sin(v)],tilt,0);
  for(let i=0;i<112;i++) for(let j=0;j<24;j++) {
    const u=i*Math.PI*2/112, v=j*Math.PI*2/24, du=Math.PI*2/112,dv=Math.PI*2/24;
    faces.push({points:[point(u,v),point(u+du,v),point(u+du,v+dv),point(u,v+dv)],center:point(u+du/2,v+dv/2),edgeNormals:[v,v+dv].map(t=>turn([Math.cos(t)*Math.cos(u+du/2),Math.cos(t)*Math.sin(u+du/2),Math.sin(t)],tilt,0)),normal:turn([Math.cos(v+dv/2)*Math.cos(u+du/2),Math.cos(v+dv/2)*Math.sin(u+du/2),Math.sin(v+dv/2)],tilt,0),gold});
  }
}
torus(1.08,.18,.56,false); torus(.72,.125,-.76,true);
const lights = [unit([-1,1,2]), unit([1,.4,1]), unit([0,-1,-.5])];

export default function BrandSculpture({ active }: { active: boolean }) {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const activeRef=useRef(active); activeRef.current=active;
  const restartRef=useRef<(() => void)|null>(null);
  useEffect(()=>{restartRef.current?.();},[active]);
  useEffect(()=>{
    const canvas=canvasRef.current, context=canvas?.getContext('2d',{alpha:false});
    if(!canvas || !context) return;
    let frame=0, elapsed=0, previous=0, lastPaint=0, dirty=true;
    const paint=(phase: number)=>{
      const w=canvas.width,h=canvas.height,scale=Math.min(w,h)*.32;
      context.fillStyle='#0b0c0e';context.fillRect(0,0,w,h);
      const angle=-.28+phase*.52;
      const transform=(p: Vector)=>turn(p,-.12,angle);
      const project=([x,y,z]: Vector):[number,number]=>[w/2+x*scale*4/(4-z),h/2-y*scale*4/(4-z)];
      const mesh=faces.map(face=>({face,center:transform(face.center),normal:transform(face.normal)})).sort((a,b)=>a.center[2]-b.center[2]);
      // Draw the core in depth order with the surrounding metal surfaces.
      let coreDrawn=false;
      const core=()=>{
        const r=scale*.25,g=context.createRadialGradient(w/2-r*.4,h/2-r*.55,0,w/2,h/2,r);
        g.addColorStop(0,'#fff1c9');g.addColorStop(.3,'#bba16a');g.addColorStop(.72,'#6b5330');g.addColorStop(1,'#2c261b');
        context.fillStyle=g;context.beginPath();context.arc(w/2,h/2,r,0,Math.PI*2);context.fill();
      };
      for(const {face,center,normal} of mesh){
        if(!coreDrawn && center[2]>0){core();coreDrawn=true;}
        if(dot(normal,unit([-center[0],-center[1],4-center[2]]))<-.12)continue;
        const shade=(n:Vector)=>{
          const diffuse=Math.max(0,dot(n,lights[0]));
          const reflection:Vector=[2*n[2]*n[0],2*n[2]*n[1],2*n[2]*n[2]-1];
          const key=Math.pow(Math.max(0,dot(reflection,lights[0])),14);
          const rim=Math.pow(Math.max(0,dot(reflection,lights[1])),35);
          const fill=Math.pow(Math.max(0,dot(reflection,lights[2])),8);
          const intensity=.14+diffuse*.27+key*.72+rim*.65+fill*.3;
          const metal=face.gold?[214,180,111]:[211,221,235];
          return `rgb(${metal.map(c=>Math.round(Math.min(255,c*intensity+key*35))).join(',')})`;
        };
        const midpoint=(a:Vector,b:Vector):Vector=>[(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2];
        const a=project(transform(midpoint(face.points[0],face.points[1])));
        const b=project(transform(midpoint(face.points[2],face.points[3])));
        const gradient=context.createLinearGradient(a[0],a[1],b[0],b[1]);
        gradient.addColorStop(0,shade(transform(face.edgeNormals[0])));
        gradient.addColorStop(1,shade(transform(face.edgeNormals[1])));
        context.fillStyle=gradient;context.strokeStyle=gradient;context.lineWidth=.5;
        context.beginPath();face.points.forEach((point,i)=>{const p=project(transform(point));if(i===0)context.moveTo(...p);else context.lineTo(...p);});
        context.closePath();context.fill();context.stroke();
      }
      if(!coreDrawn)core();canvas.dataset.ready='true';
    };
    const render=(now:number)=>{
      const animate=activeRef.current && elapsed<4000;
      if(animate)elapsed+=Math.min(now-(previous||now),40);
      previous=now;
      if(dirty || (animate && now-lastPaint>=32) || elapsed>=4000){
        const t=elapsed>0?Math.min(elapsed/4000,1):activeRef.current?0:1;
        paint(1-Math.pow(1-t,3));dirty=false;lastPaint=now;
      }
      if(activeRef.current && elapsed<4000)frame=requestAnimationFrame(render);
    };
    const restart=()=>{cancelAnimationFrame(frame);previous=0;dirty=true;frame=requestAnimationFrame(render);};
    const resize=()=>{const rect=canvas.getBoundingClientRect();const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.max(1,Math.round(rect.width*ratio));canvas.height=Math.max(1,Math.round(rect.height*ratio));restart();};
    const observer=new ResizeObserver(resize);observer.observe(canvas);restartRef.current=restart;resize();
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();restartRef.current=null;};
  },[]);
  return <canvas ref={canvasRef} className="rdv-brand-sculpture" aria-hidden="true" />;
}
