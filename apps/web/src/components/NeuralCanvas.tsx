import { useEffect, useRef } from 'react';

type NeuralCanvasProps = {
  active: boolean;
  className?: string;
};

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
};

type Pulse = {
  from: NodePoint;
  to: NodePoint;
  progress: number;
  velocity: number;
};

type PointerPosition = {
  x: number;
  y: number;
  present: boolean;
};

type NavigatorWithPerformanceHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

const GOLD = '214, 168, 79';
const MAX_DEVICE_PIXEL_RATIO = 2;
const MOBILE_BREAKPOINT = 768;

function createNode(width: number, height: number): NodePoint {
  const angle = Math.random() * Math.PI * 2;
  const speed = 3 + Math.random() * 8;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 0.8 + Math.random() * 1.4,
    opacity: 0.34 + Math.random() * 0.5,
  };
}

function nodeBudget(width: number): number {
  const navigatorHints = navigator as NavigatorWithPerformanceHints;
  const constrained =
    navigatorHints.connection?.saveData === true ||
    (navigatorHints.deviceMemory !== undefined && navigatorHints.deviceMemory < 4);

  if (constrained) return width < MOBILE_BREAKPOINT ? 20 : 48;
  return width < MOBILE_BREAKPOINT ? 35 : 100;
}

export default function NeuralCanvas({ active, className }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    let width = 1;
    let height = 1;
    let frameId = 0;
    let lastFrame = performance.now();
    let nodes: NodePoint[] = [];
    let pulses: Pulse[] = [];
    const pointer: PointerPosition = { x: 0, y: 0, present: false };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      nodes = Array.from({ length: nodeBudget(width) }, () => createNode(width, height));
      pulses = [];
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.present = true;
    };

    const clearPointer = () => {
      pointer.present = false;
    };

    const moveNode = (node: NodePoint, deltaSeconds: number) => {
      node.x += node.vx * deltaSeconds;
      node.y += node.vy * deltaSeconds;

      if (node.x < -8) node.x = width + 8;
      if (node.x > width + 8) node.x = -8;
      if (node.y < -8) node.y = height + 8;
      if (node.y > height + 8) node.y = -8;

      if (!pointer.present) return;

      const offsetX = node.x - pointer.x;
      const offsetY = node.y - pointer.y;
      const distanceSquared = offsetX * offsetX + offsetY * offsetY;
      const influenceRadius = width < MOBILE_BREAKPOINT ? 170 : 250;

      if (distanceSquared <= 1 || distanceSquared >= influenceRadius * influenceRadius) return;

      const distance = Math.sqrt(distanceSquared);
      const force = (1 - distance / influenceRadius) * 42 * deltaSeconds;
      node.x += (offsetX / distance) * force;
      node.y += (offsetY / distance) * force;
    };

    const renderFrame = (timestamp: number) => {
      const deltaMilliseconds = Math.min(32, Math.max(0, timestamp - lastFrame));
      const deltaSeconds = deltaMilliseconds / 1_000;
      lastFrame = timestamp;

      context.clearRect(0, 0, width, height);

      for (const node of nodes) moveNode(node, deltaSeconds);

      const connectionRadius = width < MOBILE_BREAKPOINT ? 150 : 200;
      const radiusSquared = connectionRadius * connectionRadius;
      let sampledConnection: { from: NodePoint; to: NodePoint } | undefined;
      let connectionCount = 0;

      for (let firstIndex = 0; firstIndex < nodes.length; firstIndex += 1) {
        const first = nodes[firstIndex];
        if (!first) continue;

        for (let secondIndex = firstIndex + 1; secondIndex < nodes.length; secondIndex += 1) {
          const second = nodes[secondIndex];
          if (!second) continue;

          const offsetX = first.x - second.x;
          const offsetY = first.y - second.y;
          const distanceSquared = offsetX * offsetX + offsetY * offsetY;
          if (distanceSquared > radiusSquared) continue;

          const distance = Math.sqrt(distanceSquared);
          const opacity = (1 - distance / connectionRadius) * 0.2;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.lineWidth = 0.55;
          context.strokeStyle = `rgba(${GOLD}, ${opacity})`;
          context.stroke();

          connectionCount += 1;
          if (Math.random() < 1 / connectionCount) sampledConnection = { from: first, to: second };
        }
      }

      if (sampledConnection && pulses.length < 6 && Math.random() < deltaMilliseconds * 0.00045) {
        pulses.push({
          ...sampledConnection,
          progress: 0,
          velocity: 0.16 + Math.random() * 0.12,
        });
      }

      pulses = pulses.filter((pulse) => {
        pulse.progress += pulse.velocity * deltaSeconds;
        if (pulse.progress > 1) return false;

        const x = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
        const y = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;
        context.beginPath();
        context.arc(x, y, 1.8, 0, Math.PI * 2);
        context.fillStyle = `rgba(${GOLD}, ${0.9 - pulse.progress * 0.3})`;
        context.fill();
        return true;
      });

      for (const node of nodes) {
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${GOLD}, ${node.opacity})`;
        context.fill();
      }

      frameId = window.requestAnimationFrame(renderFrame);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    canvas.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    canvas.addEventListener('pointerleave', clearPointer, { passive: true });
    canvas.addEventListener('pointercancel', clearPointer, { passive: true });
    frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', clearPointer);
      canvas.removeEventListener('pointercancel', clearPointer);
    };
  }, [active]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" data-animation-engine="neural-canvas" />;
}
