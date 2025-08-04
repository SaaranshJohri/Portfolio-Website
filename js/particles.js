// ensure script runs after DOM is ready
function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) {
    console.warn('bgCanvas not found');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('2D context unavailable');
    return;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particles = [];
  const PARTICLE_COUNT = 150;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    });
  }

  function animate() {
    // clear with slight alpha for smoother feel if desired; here full clear
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = '#00ffc8';
      ctx.shadowColor = '#00ffc8';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      p.x += p.dx;
      p.y += p.dy;

      // Bounce off edges
      if (p.x - p.r < 0 || p.x + p.r > canvas.width) p.dx *= -1;
      if (p.y - p.r < 0 || p.y + p.r > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticles);
} else {
  initParticles();
}
