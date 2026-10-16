// Optimal circular assignment for Scene 1 (El Ciclo)
// Zero-cross trajectories mapping chaotic digits to polar circle coordinates

interface DigitParticle {
  char: string;
  x0: number;
  y0: number;
  targetAngle: number;
  x1: number;
  y1: number;
  size: number;
  alpha: number;
}

export class CircleMorphVisualizer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: DigitParticle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private sceneElement: HTMLElement | null = null;
  private isRunning = false;
  private digitsSource = '31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not supported');
    this.ctx = ctx;
    this.sceneElement = canvas.closest('[data-scene]');

    this.resize();
    this.initParticles();
    this.bindEvents();
    this.startLoop();
  }

  private resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = this.canvas.clientWidth || window.innerWidth;
    this.height = this.canvas.clientHeight || window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.initParticles();
  }

  private initParticles() {
    const total = Math.min(Math.floor(this.width * 0.7), 400); // 400 crisp particles for 60fps
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.32;

    const rawList: { char: string; x0: number; y0: number; angleInit: number }[] = [];

    // Deterministic pseudo-random generation
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < total; i++) {
      const char = this.digitsSource[i % this.digitsSource.length];
      // Chaos distribution across space
      const angle = pseudoRandom() * Math.PI * 2;
      const dist = (pseudoRandom() * 0.8 + 0.15) * Math.max(this.width, this.height);
      const x0 = cx + Math.cos(angle) * dist;
      const y0 = cy + Math.sin(angle) * dist;
      const angleInit = Math.atan2(y0 - cy, x0 - cx);

      rawList.push({ char, x0, y0, angleInit });
    }

    // Sort by initial angle to guarantee trajectory paths NEVER cross!
    rawList.sort((a, b) => a.angleInit - b.angleInit);

    this.particles = rawList.map((item, idx) => {
      const targetAngle = (idx / total) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + Math.cos(targetAngle) * radius;
      const y1 = cy + Math.sin(targetAngle) * radius;
      return {
        char: item.char,
        x0: item.x0,
        y0: item.y0,
        targetAngle,
        x1,
        y1,
        size: 11 + (idx % 4),
        alpha: 0.25 + (idx % 5) * 0.15
      };
    });
  }

  private bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  private smoothStep(t: number): number {
    return t * t * (3 - 2 * t);
  }

  private render() {
    let p = 0;
    if (this.sceneElement) {
      const val = parseFloat(getComputedStyle(this.sceneElement).getPropertyValue('--p'));
      if (!isNaN(val)) p = Math.min(1, Math.max(0, val));
    }

    const cx = this.width / 2;
    const cy = this.height / 2;
    const easedP = this.smoothStep(p);

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Faint guide ring when circle forms
    if (p > 0.4) {
      const ringAlpha = (p - 0.4) / 0.6;
      const radius = Math.min(this.width, this.height) * 0.32;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(212, 175, 55, ${ringAlpha * 0.25})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Soft glow
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(255, 215, 0, ${ringAlpha * 0.1})`;
      this.ctx.lineWidth = 6;
      this.ctx.stroke();
    }

    this.ctx.font = '500 13px "JetBrains Mono", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    for (let i = 0; i < this.particles.length; i++) {
      const pt = this.particles[i];
      const curX = pt.x0 + (pt.x1 - pt.x0) * easedP;
      const curY = pt.y0 + (pt.y1 - pt.y0) * easedP;

      const alpha = pt.alpha * (1 - easedP * 0.4) + easedP * 0.9;
      const isGold = i % 3 === 0;

      this.ctx.fillStyle = isGold
        ? `rgba(245, 200, 66, ${alpha})`
        : `rgba(220, 230, 242, ${alpha * 0.85})`;

      this.ctx.fillText(pt.char, curX, curY);
    }
  }

  private startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
      // Check if scene is visible before drawing to save CPU
      if (this.sceneElement) {
        const rect = this.sceneElement.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          this.render();
        }
      }
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
