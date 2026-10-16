// Audio synthesis engine using Web Audio API (Zero external dependencies)
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private pentatonicFreqs = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  private lastDigitNoteTime = 0;

  constructor() {
    // Check if user previously enabled audio
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pi-audio-enabled');
      if (saved === 'true') {
        // Will be resumed on first user click/scroll gesture
      }
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.initCtx();
    this.isEnabled = !this.isEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pi-audio-enabled', String(this.isEnabled));
      window.dispatchEvent(new CustomEvent('pi-audio-state-changed', { detail: { enabled: this.isEnabled } }));
    }
    if (this.isEnabled) {
      this.playChime();
    }
    return this.isEnabled;
  }

  public getState(): boolean {
    return this.isEnabled;
  }

  public enable() {
    if (!this.isEnabled) {
      this.toggle();
    }
  }

  // Soft pentatonic tone for digit stream or scroll ticks
  public playDigit(digit: number) {
    if (!this.isEnabled) return;
    const now = performance.now();
    if (now - this.lastDigitNoteTime < 60) return; // rate limit to keep smooth
    this.lastDigitNoteTime = now;

    this.initCtx();
    if (!this.ctx) return;

    const freq = this.pentatonicFreqs[Math.abs(digit) % this.pentatonicFreqs.length];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const startTime = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.25);
  }

  // Chisel hit on dark tombstone
  public playChisel() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.16);
  }

  // Punch card punch click
  public playPunch() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Archimedes polygon doubling resonance
  public playPolygonDoubling(sides: number) {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const baseFreq = 180 + Math.min(sides, 100) * 4;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.42);
  }

  // Feynman Point resolution chord (at 999999)
  public playFeynmanResolution() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const chord = [440, 554.37, 659.25, 880]; // A Major pure harmonic triad
    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.001, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.06, now + idx * 0.04 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 1.3);
    });
  }

  // Gentle entry chime
  public playChime() {
    this.initCtx();
    if (!this.ctx) return;
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;

    freqs.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.05, now + i * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.55);
    });
  }
}

export const soundEngine = new SoundEngine();

if (typeof window !== 'undefined') {
  (window as unknown as { soundEngine: SoundEngine }).soundEngine = soundEngine;
}
