// Buffon's Needles geometric probability simulation
// Completely deterministic: position and angle bound strictly to --p

interface Needle {
  id: number;
  // Landing coordinates
  finalX: number;
  finalY: number;
  finalAngle: number;
  // Fall timing in --p space
  startP: number;
  landP: number;
  // Geometric properties
  length: number;
  crosses: boolean;
}

export class BuffonSimulation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private sceneElement: HTMLElement | null = null;
  private needles: Needle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private lineSpacing = 70; // D
  private needleLength = 35; // L = D / 2 -> P = 1 / π
  private isRunning = false;

  private totalCountEl: HTMLElement | null = null;
  private crossCountEl: HTMLElement | null = null;
  private piEstimateEl: HTMLElement | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not supported');
    this.ctx = ctx;
    this.sceneElement = canvas.closest('[data-scene]');

    this.totalCountEl = document.querySelector('#buffon-total');
    this.crossCountEl = document.querySelector('#buffon-cross');
    this.piEstimateEl = document.querySelector('#buffon-pi-val');

    this.resize();
    this.initNeedles();
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

    this.initNeedles();
  }

  private initNeedles() {
    const count = 160;
    this.needles = [];

    // Deterministic pseudo-random seed
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const marginX = this.width * 0.1;
    const marginY = 50;

    for (let i = 0; i < count; i++) {
      const finalX = marginX + rnd() * (this.width - marginX * 2);
      const finalY = marginY + rnd() * (this.height - marginY * 2);
      const finalAngle = rnd() * Math.PI;

      // Needle endpoints
      const halfL = this.needleLength / 2;
      const y1 = finalY - halfL * Math.sin(finalAngle);
      const y2 = finalY + halfL * Math.sin(finalAngle);

      // Check if crosses any floor line y = k * lineSpacing
      const grid1 = Math.floor(y1 / this.lineSpacing);
      const grid2 = Math.floor(y2 / this.lineSpacing);
      const crosses = grid1 !== grid2;

      // Stagger landing between p=0.08 and p=0.92
      const startP = 0.08 + (i / count) * 0.75;
      const landP = startP + 0.08;

      this.needles.push({
        id: i,
        finalX,
        finalY,
        finalAngle,
        startP,
        landP,
        length: this.needleLength,
        crosses
      });
    }
  }

  private bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  private render() {
    let p = 0;
    if (this.sceneElement) {
      const val = parseFloat(getComputedStyle(this.sceneElement).getPropertyValue('--p'));
      if (!isNaN(val)) p = Math.min(1, Math.max(0, val));
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw floorboards / parallel grid lines
    const numLines = Math.floor(this.height / this.lineSpacing);
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= numLines + 1; i++) {
      const y = i * this.lineSpacing;
      this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();

      // Subtle board texture line
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      this.ctx.beginPath();
      this.ctx.moveTo(0, y + 2);
      this.ctx.lineTo(this.width, y + 2);
      this.ctx.stroke();
    }

    // 2. Animate needles
    let landedCount = 0;
    let crossCount = 0;

    for (let i = 0; i < this.needles.length; i++) {
      const n = this.needles[i];
      if (p < n.startP) continue; // Needle has not fallen yet

      const fallProgress = Math.min(1, Math.max(0, (p - n.startP) / (n.landP - n.startP)));
      // Ease out drop
      const t = 1 - Math.pow(1 - fallProgress, 3);

      const currentY = (n.finalY - 140) + 140 * t;
      const currentX = n.finalX + (1 - t) * 30;
      const currentAngle = n.finalAngle + (1 - t) * Math.PI * 1.5;

      const halfL = n.length / 2;
      const x1 = currentX - halfL * Math.cos(currentAngle);
      const y1 = currentY - halfL * Math.sin(currentAngle);
      const x2 = currentX + halfL * Math.cos(currentAngle);
      const y2 = currentY + halfL * Math.sin(currentAngle);

      const hasLanded = fallProgress >= 1;
      if (hasLanded) {
        landedCount++;
        if (n.crosses) crossCount++;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);

      if (hasLanded) {
        if (n.crosses) {
          // Crossed a line: vibrant emerald/gold
          this.ctx.strokeStyle = '#00ffcc';
          this.ctx.lineWidth = 2.5;
          this.ctx.shadowColor = 'rgba(0, 255, 204, 0.6)';
          this.ctx.shadowBlur = 6;
        } else {
          // Normal landed needle
          this.ctx.strokeStyle = '#f5c842';
          this.ctx.lineWidth = 1.8;
          this.ctx.shadowColor = 'rgba(245, 200, 66, 0.3)';
          this.ctx.shadowBlur = 2;
        }
      } else {
        // In flight: translucent
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 + t * 0.5})`;
        this.ctx.lineWidth = 1.5;
      }

      this.ctx.stroke();

      // Needle tips / metallic point
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(x1, y1, 1.5, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }

    // 3. Update HUD live counters
    if (this.totalCountEl) this.totalCountEl.textContent = String(landedCount);
    if (this.crossCountEl) this.crossCountEl.textContent = String(crossCount);

    if (this.piEstimateEl) {
      if (crossCount > 0 && landedCount > 0) {
        // π ≈ (2 * L * N) / (D * C)
        // With L = D / 2: π ≈ N / C
        const estimatedPi = (2 * this.needleLength * landedCount) / (this.lineSpacing * crossCount);
        this.piEstimateEl.textContent = estimatedPi.toFixed(5);
      } else {
        this.piEstimateEl.textContent = '---';
      }
    }
  }

  private startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
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
