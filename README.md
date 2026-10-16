# $\pi$ — Homenaje Cinematográfico al Infinito
> **Arqueología Matemática Táctil** · Una experiencia de *scrollytelling* histórico y rendimiento web extremo.
> Inspirado en la arquitectura minimalista de [`margarethamilton.dev`](https://margarethamilton.dev) de midudev.

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Zero UI Frameworks](https://img.shields.io/badge/UI_Frameworks-0_(Pure_Astro_+_TS)-002FA7?style=flat-square)](#arquitectura-de-rendimiento)
[![CSS Vanilla](https://img.shields.io/badge/CSS-Vanilla_+_Custom_Properties-D94E28?style=flat-square)](#paletas-crom%C3%A1ticas-qu%C3%ADmicas)
[![Performance](https://img.shields.io/badge/FPS-60_Composited_Layers-39FF88?style=flat-square)](#modo-inspecci%C3%B3n-de-rayos-x-blueprint)

---

## 🏛️ Manifiesto Visual: "Arqueología Matemática Táctil"

La mayoría de sitios interactivos modernos caen en el cliché: fondos negros genéricos `#000000`, degradados morados de neón, fuentes *Inter/Roboto* y tarjetas con `backdrop-filter: blur()`.

Este proyecto rechaza la estética de plantilla SaaS. La interfaz no se siente como una página web: **se experimenta como un instrumento astronómico de bronce conectado a un osciloscopio de laboratorio**. Cada época del scroll transmuta la materia física de la pantalla (arcilla babilónica, roca tallada a cincel, tinta de imprenta del siglo XVIII, fósforo P1 de tubos de rayos catódicos y alabastro cuántico).

---

## ⚡ Arquitectura de Rendimiento

Siguiendo los principios de ingeniería de `margarethamilton.dev`:

1. **Cero Frameworks de UI:** Nada de React, Vue o Svelte. Cero sobrecarga de hidratación en el cliente (*0kb client runtime overhead*). Todo el maquetado estático es servido por Astro.
2. **Motor Cinemático Regido por `--p`:** Toda la coreografía interactiva de la página está gobernada por una única variable CSS:
   $$\text{--p} \in [0.0, 1.0]$$
   calculada en cada frame mediante `requestAnimationFrame` con oyente de scroll pasivo (`{ passive: true }`).
3. **Cero Repaints en GPU:** Las animaciones se ejecutan exclusivamente en capas compuestas (*Composited Layers*) aprovechando `transform: translate3d()`, `opacity`, `clip-path` y `will-change`.
4. **Diseño Sonoro Sintetizado con Web Audio API:** Cero archivos `.mp3` pesados descargados por la red. Cada sonido (el cincel de Arquímedes, la campana de péndulo de Huygens, el zumbido de tubo de vacío del ENIAC y el dron cuántico) se sintetiza en tiempo real en el navegador mediante osciladores, envolventes exponenciales y filtros biquad.

---

## 📜 Sistema Tipográfico Histórico

| Rol en la UI | Tipografía | Justificación Histórica y Visual |
| --- | --- | --- |
| **Títulos y el Símbolo $\pi$** | **IM Fell English** *(Cursiva)* | Recrea los tipos de metal tallados a mano en Londres en el siglo XVII-XVIII, época en que William Jones utilizó por primera vez el símbolo $\pi$ (1706). Acompañado de un filtro SVG orgánico (`#ink-displacement`) con `feTurbulence` + `feDisplacementMap` a escala `0.8px` para emular tinta absorbida por papel de algodón o roca tallada. |
| **Cuerpo Narrativo** | **Newsreader** / **Instrument Serif** | Altura de la $x$ equilibrada, cortes afilados y aire editorial de revista científica de colección (*Nature* clásica / *Stripe Press*). |
| **Dígitos, HUD y Código** | **B612 Mono** | Diseñada para instrumentos de vuelo y cabinas de aviónica de Airbus. Forzada con `font-variant-numeric: tabular-nums slashed-zero; letter-spacing: -0.02em;` para que los millones de decimales corran a 60 FPS sin trepidación de píxeles. |

---

## 🧪 Paletas Cromáticas Químicas (`data-theme`)

Los colores derivan de los **pigmentos minerales y químicos reales** que los matemáticos usaban en sus respectivos siglos:

### I. Era Arcaica (Egipto y Siracusa · Escenas 1 a 3)
* **`--bg-surface`:** `#120E0A` (*Basalto quemado*).
* **`--fg-ink`:** `#E6D7B9` (*Médula de papiro seco*).
* **`--accent`:** `#D94E28` (*Cinabrio / Bermellón romano* — el pigmento del Papiro de Rhind).
* **`--muted`:** `#8C6D46` (*Polvo de ocre y cuerda de cáñamo*).

### II. Era de Hierro e Imprenta (Leiden, Londres y París · Escenas 4 a 7)
* **`--bg-surface`:** `#161816` (*Pizarra de iglesia flamenca húmeda*).
* **`--fg-ink`:** `#EDE8DC` (*Papel trapo de lino del siglo XVIII*).
* **`--accent`:** `#C59B27` (*Pan de oro oxidado*).
* **`--error-ink`:** `#9E1B1B` (*Sangre de carmín* — exclusivo para el error en el decimal 528 de William Shanks).

### III. Era Termoiónica (Ramanujan y ENIAC · Escenas 8 y 9)
* **`--bg-surface`:** `#0A110D` (*Chasis militar de acero verde oscuro*).
* **Tarjeta / Contenedor:** `#DFD3B9` (*Cartulina perforada manila IBM de 80 columnas*).
* **`--accent`:** `#39FF88` (*Fósforo P1 de tubo CRT*) + `#FF6B1A` (*Filamento de bulbo incandescente*).

### IV. Era Cuántica / Infinito (Escena 10)
* **Inversión Brutalista:** Transición a **Blanco Alabastro** (`#F4F1EA`) con tinta **Negro Carbono** (`#090A0F`) y detalles en **Azul Ultramar Internacional Klein** (`#002FA7`), evocando la salida de una cueva milenaria al resplandor del infinito.

---

## 🧭 Instrumentación UX & Microfísica Táctil

### 1. El Astrolabio Lateral (Scrollbar Circular)
* Se oculta la barra de scroll estándar del navegador.
* Un **anillo graduado de bronce astronómico** en la esquina inferior derecha mide el avance del documento en radianes:
  $$0.00\pi\text{ rad} \longrightarrow 2.00\pi\text{ rad}$$
  Al llegar al pie de página, la aguja cierra un giro completo de $360^\circ$ ($2\pi$).

### 2. El Río de Decimales (Lomo del Libro)
* En el margen izquierdo (`24px`), una columna vertical infinita de dígitos en `B612 Mono` (`9px`) refleja la historia:
  - **Egipto:** Solo 3 dígitos legibles (`3.16`), el resto oculto en bruma (`???`).
  - **Leiden (Van Ceulen):** 35 dígitos enfocados brillando en pan de oro.
  - **ENIAC:** Cascada de fósforo verde a alta velocidad.
  - **Infinito:** Resplandor en azul ultramar.

### 3. Coordenadas Polares Vivas (Escena 2 · Arquímedes)
* El puntero en el polígono proyecta en tiempo real una retícula de mira telescópica con coordenadas polares continuas:
  $$(r: 1.00,\; \theta: 114.5^\circ)$$
  trazando líneas punteadas dinámicas desde el cursor hacia el centro geométrico del círculo.

### 4. Linterna Direccional de Bajorrelieve (Escena 4 · Van Ceulen)
* El ratón actúa como una **vela de cera en la oscuridad**. Mediante `--mouse-x` y `--mouse-y`, los 35 dígitos tallados en la lápida proyectan sombras vectoriales en bajorrelieve en dirección opuesta al puntero:
  ```css
  text-shadow: calc((var(--mouse-x) - 0.5) * -12px) calc((var(--mouse-y) - 0.5) * -12px) 8px rgba(0,0,0,0.85);
  ```

### 5. Placas Catalográficas de Museo
* Cada imagen y artefacto histórico está enmarcado con una ficha de catálogo técnico en tipografía monoespaciada:
  `[ FIG. 04 // LEIDEN, 1610 — ESCALA 1:1 — PRECISIÓN: 10⁻³⁵ ]`

### 6. Cuadrícula Blueprint y Grano de Película Analógica
* Cuadrícula arquitectónica de `80px × 80px` en `1px` con cruces de registro (`+`) de `7px × 7px`.
* Capa estática de grano fotográfico generada con SVG procedimental en GPU (cero repaints durante el scroll).

---

## 🔍 Modo "Inspección de Rayos X" (Blueprint Mode)

Un *easter egg* técnico diseñado para auditar la arquitectura interna del proyecto:

* **Activación:** Mantén pulsada la tecla **`Alt`** o haz clic en el botón `[π]` del HUD superior.
* **Efecto en el DOM:**
  - Activa la clase `body.is-blueprint`.
  - Las imágenes y texturas se atenúan a `opacity: 0.15`.
  - Se revelan contornos técnicos en verde neón y cian con los valores exactos de `--p: 0.XXXX` sobre cada elemento.
  - Despliega una insignia técnica en pantalla: `0 REPAINTS // COMPOSITED GPU LAYER`.

---

## 🎬 Guion de las 10 Escenas Históricas

| # | Escena | Cronología | Artefacto / Historia | Precisión |
|---|---|---|---|---|
| **01** | *El Papiro y la Cuerda* | 1650 a.C. · Tebas | Papiro de Rhind, Ahmes. Medición con cuerda de cáñamo. | $\pi \approx 3.1604$ |
| **02** | *La Mente Contra la Espada* | 212 a.C. · Siracusa | Arquímedes. Polígonos de 96 lados inscritos y circunscritos. | $3\frac{10}{71} < \pi < 3\frac{1}{7}$ |
| **03** | *La Aguja de Madera en la Selva* | Siglo V · China | Zu Chongzhi. Rueda de carruaje y fracción milagrosa $\frac{355}{113}$. | 7 decimales |
| **04** | *La Lápida de Leiden* | 1610 · Países Bajos | Ludolph van Ceulen. Polígono de $2^{62}$ lados tallado en su tumba. | 35 decimales |
| **05** | *El Bautismo del Símbolo* | 1706 / 1737 · Londres | William Jones y Leonhard Euler consagran la letra griega $\pi$. | Símbolo universal |
| **06** | *El Salón de Baile de las Agujas* | 1777 · París | Conde de Buffon. Cálculo estocástico arrojando agujas al suelo. | Método Montecarlo |
| **07** | *La Bóveda que se Derrumbó* | 1873 · Muelle de Londres | William Shanks. 15 años de cálculo manual; el error en el decimal 528. | 527 decimales |
| **08** | *El Susurro de la Diosa Namagiri* | 1914 · Madrás / Cambridge | Srinivasa Ramanujan. Series modulares hiperbólicas de convergencia brutal. | Infinito analítico |
| **09** | *El Monstruo de Tubos de Vacío* | 1949 · Aberdeen Proving Ground | Computadora ENIAC. 18,000 tubos de vacío en 70 horas continuas. | 2,037 decimales |
| **10** | *La Biblioteca de Babel Digital* | Presente y Futuro | Computación cuántica y algoritmos spigot (BBP). El infinito desplegado. | $>100 \times 10^{12}$ |

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en modo background (según AGENTS.md)
astro dev --background

# Verificar estado y logs del servidor
astro dev status
astro dev logs

# Compilación de producción (Zero warnings / Zero errors)
npm run build

# Previsualizar el bundle generado en ./dist
npm run preview
```

---

## ⚖️ Licencia y Créditos

Proyecto desarrollado como tributo técnico y educativo a la historia del número $\pi$ y a la filosofía de desarrollo web minimalista y ultra-eficiente promovida por **midudev**.
