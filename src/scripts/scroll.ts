import { soundEngine } from './audio';

export function initScrollEngine() {
  const scenes = document.querySelectorAll<HTMLElement>('[data-scene]');
  const hudYear = document.querySelector<HTMLElement>('#hud-year');
  const hudPi = document.querySelector<HTMLElement>('#hud-pi');
  const hudSceneNum = document.querySelector<HTMLElement>('#hud-scene-num');
  const hudProgress = document.querySelector<HTMLElement>('#hud-progress-bar');
  const hudSceneTitle = document.querySelector<HTMLElement>('#hud-scene-title');

  let ticking = false;
  let currentActiveSceneId: string | null = null;
  const activeBeatsMap = new Map<HTMLElement, boolean>();

  function updateScenes() {
    const vh = window.innerHeight;
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - vh;
    const globalProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

    if (hudProgress) {
      hudProgress.style.transform = `scaleX(${globalProgress})`;
    }

    scenes.forEach((scene, index) => {
      const rect = scene.getBoundingClientRect();
      const totalScroll = rect.height - vh;

      // Normalized progress between 0 and 1 while scene is pinned/sticky
      const rawProgress = -rect.top / Math.max(1, totalScroll);
      const p = Math.min(1, Math.max(0, rawProgress));

      // Only update if scene is close to or inside the viewport
      if (rect.bottom > -100 && rect.top < vh + 100) {
        scene.style.setProperty('--p', p.toFixed(4));

        // When scene center crosses viewport center
        if (rect.top <= vh * 0.55 && rect.bottom >= vh * 0.45) {
          const sceneId = scene.dataset.scene || '';
          if (currentActiveSceneId !== sceneId) {
            currentActiveSceneId = sceneId;
            if (hudYear && scene.dataset.year) hudYear.textContent = scene.dataset.year;
            if (hudPi && scene.dataset.piValue) hudPi.textContent = scene.dataset.piValue;
            if (hudSceneNum) hudSceneNum.textContent = String(index + 1).padStart(2, '0');
            if (hudSceneTitle && scene.dataset.sceneTitle) hudSceneTitle.textContent = scene.dataset.sceneTitle;
            document.documentElement.dataset.theme = scene.dataset.theme || 'obsidian';

            // Dispatch scene change event
            window.dispatchEvent(new CustomEvent('pi-scene-change', {
              detail: { sceneId, sceneNumber: index + 1, scene }
            }));
          }
        }

        // Activate narrative blocks [data-beat="0.2-0.5"]
        const beats = scene.querySelectorAll<HTMLElement>('[data-beat]');
        beats.forEach((beat) => {
          const beatAttr = beat.dataset.beat || '0-1';
          const [start, end] = beatAttr.split('-').map(Number);
          const isActive = p >= start && p <= end;

          const wasActive = activeBeatsMap.get(beat) || false;
          if (isActive !== wasActive) {
            activeBeatsMap.set(beat, isActive);
            beat.classList.toggle('is-active', isActive);
            if (isActive) {
              // Sound trigger for new beat
              soundEngine.playDigit(Math.floor(p * 10));
            }
          }
        });
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScenes);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScenes);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation
  updateScenes();

  // ==========================================================
  // Hybrid Scroll-Modulated Cinematic Video Engine (60 FPS GPU Safe)
  // ==========================================================
  const videos = document.querySelectorAll<HTMLVideoElement>('[data-scene-video]');

  if (videos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { rootMargin: '250px 0px' });

    videos.forEach((v) => videoObserver.observe(v));

    let lastScrollY = window.scrollY;
    let velocityTimeout: any;

    window.addEventListener('scroll', () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;

      const targetRate = Math.min(1.65, 0.85 + delta * 0.012);
      videos.forEach((v) => {
        if (!v.paused) v.playbackRate = targetRate;
      });

      clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
        videos.forEach((v) => {
          if (!v.paused) v.playbackRate = 0.85; // Elegant cinematic slow-motion rest
        });
      }, 150);
    }, { passive: true });
  }
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initScrollEngine());
  } else {
    initScrollEngine();
  }
}
