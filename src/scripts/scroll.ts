import { soundEngine } from './audio';

interface VideoScrubState {
  video: HTMLVideoElement;
  targetTime: number;
  currentTime: number;
}

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

  // Map each scene element to its scrub state
  const scrubStates = new Map<HTMLElement, VideoScrubState>();

  // 1. Inicializar todos los vídeos para Scroll-Driven Video Scrubbing estricto (1:1 con --p)
  scenes.forEach((scene) => {
    const video = scene.querySelector<HTMLVideoElement>('[data-scene-video]');
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.load();

      scrubStates.set(scene, {
        video,
        targetTime: 0,
        currentTime: 0,
      });
    }
  });

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
      const totalScroll = Math.max(1, rect.height - vh);

      // Normalized progress between 0 and 1 while scene is pinned/sticky
      const rawProgress = -rect.top / totalScroll;
      const p = Math.min(1, Math.max(0, rawProgress));

      // Solo procesamos escenas que están en o cerca del viewport
      if (rect.bottom > -vh * 0.5 && rect.top < vh * 1.5) {
        // 1. Actualizar variable CSS --p (gobierna títulos, polígonos, agujas y datos)
        scene.style.setProperty('--p', p.toFixed(4));

        // 2. Actualizar tiempo objetivo del vídeo (0s a 10s exactos)
        const state = scrubStates.get(scene);
        if (state) {
          const duration = state.video.duration || 10;
          // Evitamos tocar el último milisegundo exacto para que no parpadee en negro
          state.targetTime = Math.min(duration - 0.05, Math.max(0, p * duration));
        }

        // 3. Cuando el centro de la escena cruza el centro de la pantalla
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

        // 4. Activar bloques narrativos y cajas de datos escalonados [data-beat="0.2-0.5"]
        const beats = scene.querySelectorAll<HTMLElement>('[data-beat]');
        const numBeats = beats.length;
        beats.forEach((beat, bIndex) => {
          const beatAttr = beat.dataset.beat || '0-1';
          const [start, end] = beatAttr.split('-').map(Number);
          
          let isActive = p >= start && p <= end;
          // Garantizar que el primer beat siempre esté visible al entrar a la escena
          if (bIndex === 0 && p < start) isActive = true;
          // Garantizar que el último beat continúe visible al final de la escena
          if (bIndex === numBeats - 1 && p > end) isActive = true;

          const wasActive = activeBeatsMap.get(beat) || false;
          if (isActive !== wasActive) {
            activeBeatsMap.set(beat, isActive);
            beat.classList.toggle('is-active', isActive);
            if (isActive) {
              soundEngine.playDigit(Math.floor(p * 10));
            }
          }
        });
      }
    });

    ticking = false;
  }

  // Bucle de renderizado suave para el scrubbing de vídeo a 60 FPS
  function renderVideoScrubLoop() {
    const vh = window.innerHeight;

    scrubStates.forEach((state, scene) => {
      const rect = scene.getBoundingClientRect();
      const isVisible = rect.bottom > -50 && rect.top < vh + 50;

      if (isVisible && state.video.readyState >= 1) {
        // Interpolación suave (lerp 0.20) para frenar con elegancia o responder de inmediato al trackpad
        const diff = state.targetTime - state.currentTime;

        if (Math.abs(diff) > 0.008) {
          state.currentTime += diff * 0.20;

          if (!state.video.seeking) {
            state.video.currentTime = Number(state.currentTime.toFixed(3));
          }
        }
      }
    });

    requestAnimationFrame(renderVideoScrubLoop);
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

  // Disparo inicial y arranque del bucle de scrubbing
  updateScenes();
  requestAnimationFrame(renderVideoScrubLoop);
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initScrollEngine());
  } else {
    initScrollEngine();
  }
}
