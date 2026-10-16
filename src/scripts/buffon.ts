// Buffon's Needles geometric probability simulation & interactive Monte Carlo laboratory
// Supports deterministic scroll progression (--p) AND live user interactive needle tosses

interface Needle {
  id: number;
  finalX: number;
  finalY: number;
  finalAngle: number;
  startP: number;
  landP: number;
  length: number;
  crosses: boolean;
  // Interactive manual toss properties
  isManual?: boolean;
  dropTime?: number;
}

export class BuffonSimulation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private sceneElement: HTMLElement | null = null;
  private needles: Needle[] = [];
  private manualNeedles: Needle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private lineSpacing = 68; // D (Floorboard seam gap)
  private needleLength = 34; // L = D / 2 -> Theoretical P = 1 / π
  private isRunning = false;

  private totalCountEl: HTMLElement | null = null;
  private crossCountEl: HTMLElement | null = null;
  private piEstimateEl: HTMLElement | null = null;
  private errorRateEl: HTMLElement | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not supported');
    this.ctx = ctx;
    this.sceneElement = canvas.closest('[data-scene]');

    this.totalCountEl = document.querySelector('#buffon-total');
    this.crossCountEl = document.querySelector('#buffon-cross');
    this.piEstimateEl = document.querySelector('#buffon-pi-val');
    this.errorRateEl = document.querySelector('#buffon-error-rate');

    this.resize();
    this.initScrollNeedles();
    this.bindEvents();
    this.bindButtons();
    this.startLoop();
  }

  private resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = this.canvas.clientWidth || 700;
    this.height = this.canvas.clientHeight || 320;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.initScrollNeedles();
  }

  private initScrollNeedles() {
    const count = 140;
    this.needles = [];

    // Deterministic pseudo-random seed for scroll
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const marginX = this.width * 0.08;
    const marginY = 40;

    for (let i = 0; i < count; i++) {
      const finalX = marginX + rnd() * (this.width - marginX * 2);
      const finalY = marginY + rnd() * (this.height - marginY * 2);
      const finalAngle = rnd() * Math.PI;

      const halfL = this.needleLength / 2;
      const y1 = finalY - halfL * Math.sin(finalAngle);
      const y2 = finalY + halfL * Math.sin(finalAngle);

      const grid1 = Math.floor(y1 / this.lineSpacing);
      const grid2 = Math.floor(y2 / this.lineSpacing);
      const crosses = grid1 !== grid2;

      const startP = 0.06 + (i / count) * 0.78;
      const landP = startP + 0.07;

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

  public tossNeedles(count: number) {
    const marginX = this.width * 0.08;
    const marginY = 40;
    const now = performance.now();

    for (let i = 0; i < count; i++) {
      const finalX = marginX + Math.random() * (this.width - marginX * 2);
      const finalY = marginY + Math.random() * (this.height - marginY * 2);
      const finalAngle = Math.random() * Math.PI;

      const halfL = this.needleLength / 2;
      const y1 = finalY - halfL * Math.sin(finalAngle);
      const y2 = finalY + halfL * Math.sin(finalAngle);

      const grid1 = Math.floor(y1 / this.lineSpacing);
      const grid2 = Math.floor(y2 / this.lineSpacing);
      const crosses = grid1 !== grid2;

      this.manualNeedles.push({
        id: Date.now() + i,
        finalX,
        finalY,
        finalAngle,
        startP: 0,
        landP: 1,
        length: this.needleLength,
        crosses,
        isManual: true,
        dropTime: now + i * 8 // Staggered drop
      });
    }
  }

  public clearBoard() {
    this.manualNeedles = [];
  }

  private bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  private bindButtons() {
    const toss50Btn = document.querySelector('#buffon-toss-50');
    const toss200Btn = document.querySelector('#buffon-toss-200');
    const clearBtn = document.querySelector('#buffon-clear');

    toss50Btn?.addEventListener('click', () => this.tossNeedles(50));
    toss200Btn?.addEventListener('click', () => this.tossNeedles(200));
    clearBtn?.addEventListener('click', () => this.clearBoard());
  }

  private render() {
    let p = 0;
    if (this.sceneElement) {
      const val = parseFloat(getComputedStyle(this.sceneElement).getPropertyValue('--p'));
      if (!isNaN(val)) p = Math.min(1, Math.max(0, val));
    }

    const now = performance.now();
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw French Oak Parquet Board Texture
    const numLines = Math.floor(this.height / this.lineSpacing);
    for (let i = 0; i <= numLines + 1; i++) {
      const y = i * this.lineSpacing;
      
      // Board seam dark groove
      this.ctx.strokeStyle = 'rgba(10, 8, 6, 0.8)';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();

      // Golden bevel highlight line
      this.ctx.strokeStyle = 'rgba(197, 155, 39, 0.35)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y + 1.5);
      this.ctx.lineTo(this.width, y + 1.5);
      this.ctx.stroke();

      // Subtle parquet plank wood grain lines
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y + this.lineSpacing * 0.5);
      this.ctx.lineTo(this.width, y + this.lineSpacing * 0.5);
      this.ctx.stroke();
    }

    // 2. Render Needles (Scroll Needles + Interactive Manual Needles)
    let totalLanded = 0;
    let crossLanded = 0;

    // Helper to draw a single needle
    const drawNeedle = (
      x: number, 
      y: number, 
      angle: number, 
      crosses: boolean, 
      hasLanded: boolean, 
      opacity: number
    ) => {
      const halfL = this.needleLength / 2;
      const x1 = x - halfL * Math.cos(angle);
      const y1 = y - halfL * Math.sin(angle);
      const x2 = x + halfL * Math.cos(angle);
      const y2 = y + halfL * Math.sin(angle);

      this.ctx.save();
      
      // Cast shadow onto wood if landed
      if (hasLanded) {
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetX = 1.5;
        this.ctx.shadowOffsetY = 2.5;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);

      if (hasLanded) {
        if (crosses) {
          // Crossed joint seam: Glowing Emerald / Cinnabar
          this.ctx.strokeStyle = '#39ff88';
          this.ctx.lineWidth = 2.4;
          this.ctx.shadowColor = 'rgba(57, 255, 136, 0.7)';
          this.ctx.shadowBlur = 8;
        } else {
          // Landed inside plank: Polished Antique Brass
          this.ctx.strokeStyle = '#f5c842';
          this.ctx.lineWidth = 1.8;
        }
      } else {
        // Falling in flight
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        this.ctx.lineWidth = 1.6;
      }

      this.ctx.stroke();

      // Brass needle eye and metallic point tip
      this.ctx.fillStyle = hasLanded ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
      this.ctx.beginPath();
      this.ctx.arc(x1, y1, 1.4, 0, Math.PI * 2);
      this.ctx.fill();

      // If crossed, draw intersection crosshair dots
      if (hasLanded && crosses) {
        const floorY = Math.round(y / this.lineSpacing) * this.lineSpacing;
        if (Math.abs(y - floorY) < halfL) {
          this.ctx.fillStyle = '#39ff88';
          this.ctx.beginPath();
          this.ctx.arc(x, floorY, 2.5, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }

      this.ctx.restore();
    };

    // A. Render Scroll-driven needles
    for (let i = 0; i < this.needles.length; i++) {
      const n = this.needles[i];
      if (p < n.startP) continue;

      const fallProgress = Math.min(1, Math.max(0, (p - n.startP) / (n.landP - n.startP)));
      const t = 1 - Math.pow(1 - fallProgress, 3);

      const currentY = (n.finalY - 120) + 120 * t;
      const currentX = n.finalX + (1 - t) * 25;
      const currentAngle = n.finalAngle + (1 - t) * Math.PI * 1.5;

      const hasLanded = fallProgress >= 1;
      if (hasLanded) {
        totalLanded++;
        if (n.crosses) crossLanded++;
      }

      drawNeedle(currentX, currentY, currentAngle, n.crosses, hasLanded, 0.4 + t * 0.6);
    }

    // B. Render User-Tossed needles
    for (let i = 0; i < this.manualNeedles.length; i++) {
      const m = this.manualNeedles[i];
      const elapsed = now - (m.dropTime || 0);
      if (elapsed < 0) continue;

      const fallDuration = 400; // ms
      const progress = Math.min(1, elapsed / fallDuration);
      const t = 1 - Math.pow(1 - progress, 3);

      const currentY = (m.finalY - 140) + 140 * t;
      const currentX = m.finalX + (1 - t) * 20;
      const currentAngle = m.finalAngle + (1 - t) * Math.PI * 2;

      const hasLanded = progress >= 1;
      if (hasLanded) {
        totalLanded++;
        if (m.crosses) crossLanded++;
      }

      drawNeedle(currentX, currentY, currentAngle, m.crosses, hasLanded, 0.5 + t * 0.5);
    }

    // 3. Update Technical Math Counters in Real-Time
    if (this.totalCountEl) this.totalCountEl.textContent = String(totalLanded);
    if (this.crossCountEl) this.crossCountEl.textContent = String(crossLanded);

    if (this.piEstimateEl) {
      if (crossLanded > 0 && totalLanded > 0) {
        // π ≈ (2 * L * N) / (D * C) = N / C (since L = D/2)
        const estimatedPi = (2 * this.needleLength * totalLanded) / (this.lineSpacing * crossLanded);
        this.piEstimateEl.textContent = estimatedPi.toFixed(5);

        if (this.errorRateEl) {
          const err = Math.abs((estimatedPi - Math.PI) / Math.PI) * 100;
          this.errorRateEl.textContent = `Error: ${err.toFixed(2)}%`;
        }
      } else {
        this.piEstimateEl.textContent = '---';
        if (this.errorRateEl) this.errorRateEl.textContent = 'Lanza agujas para converger';
      }
    }
  }

  private startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
      if (this.sceneElement) {
        const rect = this.sceneElement.getBoundingClientRect();
        if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
          this.render();
        }
      }
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
