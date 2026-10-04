import { useEffect, useRef } from 'react';

// A small, self-contained studio render. No models, textures or external requests.
const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision highp float;
uniform vec2 resolution;
uniform float phase;
mat2 turn(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
vec2 scene(vec3 p){
  p.xz=turn(-.36+phase*.58)*p.xz;
  p.xy=turn(-.36)*p.xy;
  vec3 a=p; a.yz=turn(.62)*a.yz;
  float outer=length(vec2(length(a.xy)-1.17,a.z))-.19;
  vec3 b=p; b.yz=turn(-.64)*b.yz;
  float inner=length(vec2(length(b.xy)-.81,b.z))-.14;
  float core=length(p)-.32;
  return outer<inner && outer<core ? vec2(outer,0.) : inner<core ? vec2(inner,1.) : vec2(core,1.);
}
vec3 normal(vec3 p){vec2 e=vec2(.001,0.);return normalize(vec3(scene(p+e.xyy).x-scene(p-e.xyy).x,scene(p+e.yxy).x-scene(p-e.yxy).x,scene(p+e.yyx).x-scene(p-e.yyx).x));}
vec3 studio(vec3 r){
  float top=pow(max(0.,dot(r,normalize(vec3(-.4,1.,.5)))),12.);
  float strip=pow(max(0.,dot(r,normalize(vec3(-1.,.2,1.)))),45.);
  float rim=pow(max(0.,dot(r,normalize(vec3(1.,.6,-.4)))),26.);
  return vec3(.055)+vec3(.85,.9,1.)*top*2.1+vec3(1.)*strip*3.+vec3(1.,.86,.6)*rim*1.7;
}
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-resolution)/resolution.y;
  vec3 ro=vec3(0.,0.,4.6),rd=normalize(vec3(uv,-3.1));
  float travel=0.; vec2 hit=vec2(0.);
  for(int i=0;i<72;i++){hit=scene(ro+rd*travel);if(hit.x<.0015||travel>8.)break;travel+=hit.x*.8;}
  vec3 col=vec3(.043,.047,.055);
  if(travel<8.){
    vec3 p=ro+rd*travel,n=normal(p),r=reflect(rd,n);
    vec3 metal=mix(vec3(.78,.84,.9),vec3(.83,.61,.28),hit.y);
    float fres=pow(1.-max(0.,dot(n,-rd)),3.);
    float ao=clamp(scene(p+n*.18).x/.18,.3,1.);
    col=studio(r)*metal*ao+metal*.12*max(0.,dot(n,normalize(vec3(-1.,2.,3.))))+fres*metal*.13;
    col=col/(col+vec3(.65)); col=pow(col,vec3(.82));
  }
  gl_FragColor=vec4(col,1.);
}`;

export default function BrandSculpture({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const restartRef = useRef<(() => void) | null>(null);
  useEffect(() => { restartRef.current?.(); }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source); gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    if (!vs || !fs || !program) { shaders.forEach(s => gl.deleteShader(s)); return; }
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'resolution');
    const phase = gl.getUniformLocation(program, 'phase');
    let frame = 0, elapsed = 0, previous = 0, dirty = true;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      gl.viewport(0,0,canvas.width,canvas.height); dirty = true;
    };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    // One finite reveal, then a still object. No perpetual wobble or cursor chasing.
    const render = (now: number) => {
      const animate = activeRef.current && elapsed < 4000;
      if (animate) elapsed += Math.min(now - (previous || now), 40);
      previous = now;
      if (animate || dirty) {
        const t = elapsed > 0 ? Math.min(elapsed / 4000, 1) : activeRef.current ? 0 : 1;
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform1f(phase, 1-Math.pow(1-t,3));
        gl.drawArrays(gl.TRIANGLES,0,6); canvas.dataset.ready = 'true'; dirty = false;
      }
      if (activeRef.current && elapsed < 4000) frame = requestAnimationFrame(render);
    };
    restartRef.current = () => { cancelAnimationFrame(frame); previous = 0; dirty = true; frame = requestAnimationFrame(render); };
    frame = requestAnimationFrame(render);
    const onResize = () => { resize(); cancelAnimationFrame(frame); frame = requestAnimationFrame(render); };
    window.addEventListener('resize', onResize);
    const onLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); delete canvas.dataset.ready; };
    canvas.addEventListener('webglcontextlost', onLost);
    return () => {
      restartRef.current = null; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', onResize);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s));
    };
  }, []);
  return <canvas ref={canvasRef} className="rdv-brand-sculpture" aria-hidden="true" />;
}
