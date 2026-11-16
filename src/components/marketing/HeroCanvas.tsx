import React, { useEffect, useRef } from 'react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    window.addEventListener('resize', handleResize);

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Elegant architectural nodes and geometric planes
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      targetOpacity: number;
    }[] = [];

    const nodeCount = Math.min(28, Math.floor(width / 45));
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1.5,
        opacity: Math.random() * 0.4 + 0.15,
        targetOpacity: Math.random() * 0.5 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Subtle warm architectural gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, 'rgba(247, 248, 246, 0.4)');
      grad.addColorStop(0.5, 'rgba(231, 238, 232, 0.25)');
      grad.addColorStop(1, 'rgba(240, 242, 239, 0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle architectural isometric lattice lines
      ctx.strokeStyle = 'rgba(85, 124, 104, 0.04)';
      ctx.lineWidth = 1;
      const step = 64;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw elegant connection lines between nodes
      const maxDist = 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(85, 124, 104, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw architectural geometric floating shapes
      const drawHex = (cx: number, cy: number, size: number, angle: number, strokeColor: string) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = angle + (i * Math.PI) / 3;
          const x = cx + size * Math.cos(a);
          const y = cy + size * Math.sin(a);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      };

      // Two subtle floating geometric rings in the background
      drawHex(width * 0.78, height * 0.38, 90, time * 0.3, 'rgba(85, 124, 104, 0.08)');
      drawHex(width * 0.78, height * 0.38, 140, -time * 0.2, 'rgba(184, 154, 104, 0.06)');

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(85, 124, 104, ${n.opacity})`;
        ctx.fill();

        // Node halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(85, 124, 104, ${n.opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
