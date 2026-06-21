# ConflictSim — Design System Reference

*Extracted from style-guide.alexa-c-jacobson.workers.dev \+ Leadership Diary codebase* *Use this as your single reference when prompting Claude Code.*

---

## 01 — CSS Custom Properties (copy into `src/index.css`)

/\* ── Google Fonts ── \*/

@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400\&family=Plus+Jakarta+Sans:wght@400;500;600\&family=JetBrains+Mono:wght@400\&display=swap');

:root {

  /\* Color \*/

  \--color-base: \#FAF8F2;      /\* Linen — page background \*/

  \--color-ink: \#1A1A1A;       /\* Ink — body text, headings \*/

  \--color-muted: \#888888;     /\* Ash — secondary text, captions \*/

  \--color-primary: \#D45FA8;   /\* Deep Pink — CTAs, section numbers, active nav \*/

  \--color-orange: \#FF6E48;    /\* Marigold — energy accent, use sparingly \*/

  \--color-cobalt: \#3B5BDB;    /\* Cobalt — research tags, links, data \*/

  \--color-green: \#067A42;     /\* Forest — surprise accent, dividers, icons \*/

  \--color-petal: \#FFB8E7;     /\* Petal — tag fills, card backgrounds, hover \*/

  /\* Typography \*/

  \--font-display: 'Libre Baskerville', Georgia, serif;

  \--font-body: 'Plus Jakarta Sans', system-ui, sans-serif;

  \--font-mono: 'JetBrains Mono', monospace;

  /\* Spacing scale \*/

  \--space-2: 8px;

  \--space-4: 16px;

  \--space-6: 24px;

  \--space-8: 32px;

  \--space-12: 48px;

  \--space-16: 64px;

  \--space-24: 96px;

  /\* Border radius \*/

  \--radius-card: 4px;         /\* Cards — architectural/precise \*/

  \--radius-pill: 9999px;      /\* Buttons, inputs, tags — organic \*/

}

\* {

  box-sizing: border-box;

  margin: 0;

  padding: 0;

}

body {

  background-color: var(--color-base);

  color: var(--color-ink);

  font-family: var(--font-body);

  font-size: 16px;

  line-height: 1.6;

  \-webkit-font-smoothing: antialiased;

}

---

## 02 — Typography System

/\* Display / Headlines — Libre Baskerville \*/

.text-display {

  font-family: var(--font-display);

  font-weight: 400;

  font-size: clamp(2rem, 5vw, 3.5rem);

  line-height: 1.1;

  color: var(--color-ink);

}

.text-display-italic {

  font-family: var(--font-display);

  font-style: italic;

  font-weight: 400;

}

/\* Body / UI — Plus Jakarta Sans \*/

.text-body {

  font-family: var(--font-body);

  font-weight: 400;

  font-size: 1rem;

  line-height: 1.6;

}

.text-label {

  font-family: var(--font-body);

  font-weight: 500;

  font-size: 0.875rem;

  letter-spacing: 0.01em;

}

/\* Section numbers / Component labels — JetBrains Mono \*/

.text-mono {

  font-family: var(--font-mono);

  font-weight: 400;

  font-size: 0.75rem;

  letter-spacing: 0.05em;

  text-transform: uppercase;

}

---

## 03 — Component Patterns

### Button System

Three variants. Pill shape. Full color inversion on hover — no shadows ever.

.btn {

  font-family: var(--font-body);

  font-weight: 500;

  border-radius: var(--radius-pill);

  padding: 12px 28px;

  cursor: pointer;

  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  border: 2px solid transparent;

  display: inline-flex;

  align-items: center;

  gap: var(--space-2);

  text-decoration: none;

}

/\* Primary — filled Deep Pink \*/

.btn-primary {

  background: var(--color-primary);

  color: white;

  border-color: var(--color-primary);

}

.btn-primary:hover {

  background: var(--color-ink);

  border-color: var(--color-ink);

}

/\* Secondary — outline \*/

.btn-secondary {

  background: transparent;

  color: var(--color-ink);

  border-color: var(--color-ink);

}

.btn-secondary:hover {

  background: var(--color-ink);

  color: var(--color-base);

}

/\* Ghost — text only \*/

.btn-ghost {

  background: transparent;

  color: var(--color-primary);

  border-color: transparent;

  padding-left: 0;

  padding-right: 0;

}

.btn-ghost:hover {

  color: var(--color-ink);

}

### Card

4px border-radius — architectural precision. No shadows. Hover tilt only in appropriate contexts (not during active scenario play).

.card {

  background: white;

  border-radius: var(--radius-card);

  border: 1.5px solid rgba(26, 26, 26, 0.1);

  padding: var(--space-8);

  transition: transform 0.2s ease;

}

.card:hover {

  transform: rotate(-0.5deg) translateY(-2px);

}

/\* Scenario card variant — larger, darker border on hover \*/

.card-scenario {

  cursor: pointer;

  border: 1.5px solid rgba(26, 26, 26, 0.1);

}

.card-scenario:hover {

  border-color: var(--color-primary);

  transform: rotate(-0.5deg) translateY(-3px);

}

### Tag / Badge

.tag {

  font-family: var(--font-mono);

  font-size: 0.7rem;

  letter-spacing: 0.08em;

  text-transform: uppercase;

  padding: 4px 12px;

  border-radius: var(--radius-pill);

  display: inline-block;

}

.tag-pink   { background: var(--color-petal); color: var(--color-primary); }

.tag-cobalt { background: \#E8ECFD; color: var(--color-cobalt); }

.tag-green  { background: \#E6F4EC; color: var(--color-green); }

.tag-orange { background: \#FFE8E1; color: var(--color-orange); }

.tag-outline {

  background: transparent;

  border: 1.5px solid var(--color-muted);

  color: var(--color-muted);

}

### Progress Dots

Active dot elongates to pill in Deep Pink. Inactive in Petal. No linework.

.progress-dots {

  display: flex;

  align-items: center;

  gap: 6px;

}

.dot {

  height: 8px;

  width: 8px;

  border-radius: var(--radius-pill);

  background: var(--color-petal);

  transition: width 0.3s ease, background 0.3s ease;

}

.dot.active {

  width: 24px;

  background: var(--color-primary);

}

### Input Field

Pill-shaped. 2px Deep Pink border on focus. Matches button shape language.

.input {

  font-family: var(--font-body);

  font-size: 1rem;

  width: 100%;

  padding: 12px 20px;

  border-radius: var(--radius-pill);

  border: 1.5px solid rgba(26, 26, 26, 0.2);

  background: white;

  color: var(--color-ink);

  outline: none;

  transition: border-color 0.2s ease;

}

.input:focus {

  border-color: var(--color-primary);

  border-width: 2px;

}

### Navigation Pattern

Text only. No borders, no pill wrappers. Previous in muted, Next in Deep Pink.

.nav-prev {

  font-family: var(--font-body);

  font-weight: 500;

  color: var(--color-muted);

  cursor: pointer;

  background: none;

  border: none;

}

.nav-next {

  font-family: var(--font-body);

  font-weight: 500;

  color: var(--color-primary);

  cursor: pointer;

  background: none;

  border: none;

}

---

## 04 — Design Rules (enforce in every Claude Code prompt)

DESIGN RULES — never violate these:

\- NO shadows anywhere (box-shadow, drop-shadow, text-shadow — none)

\- NO decorative linework or dividers unless structural

\- NO two competing accent colors in the same element

\- Cards: 4px border-radius always

\- Buttons/inputs/tags: full pill (border-radius: 9999px) always

\- Hover \= behavior (tilt, invert, elongate) — never overlay or blur

\- Color hierarchy: Pink leads → Orange energizes → Cobalt grounds → Forest surprises

\- Typography: Libre Baskerville for display/headlines, Plus Jakarta Sans for body/UI, JetBrains Mono for labels/numbers

\- Section numbers always in JetBrains Mono

\- Background is always Linen (\#FAF8F2), never pure white at page level

---

## 05 — Cloudflare Workers Setup Pattern

*Matches the leadership-diary deployment exactly.*

### `wrangler.toml`

name \= "conflict-sim"

main \= "src/worker.js"

compatibility\_date \= "2024-01-01"

\[site\]

bucket \= "./dist"

### `src/worker.js`

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

import manifestJSON from '\_\_STATIC\_CONTENT\_MANIFEST';

const assetManifest \= JSON.parse(manifestJSON);

export default {

  async fetch(request, env, ctx) {

    try {

      return await getAssetFromKV(

        { request, waitUntil: ctx.waitUntil.bind(ctx) },

        { ASSET\_NAMESPACE: env.\_\_STATIC\_CONTENT, ASSET\_MANIFEST: assetManifest }

      );

    } catch (e) {

      return new Response('Not found', { status: 404 });

    }

  },

};

### `package.json` scripts

{

  "scripts": {

    "dev": "vite",

    "build": "vite build",

    "deploy": "vite build && wrangler deploy"

  }

}

---

## 06 — React Component Patterns from Leadership Diary

### State machine pattern for scenario flow

// src/hooks/useScenario.js

import { useState } from 'react';

export function useScenario(scenario) {

  const \[currentNodeId, setCurrentNodeId\] \= useState('start');

  const \[history, setHistory\] \= useState(\[\]);

  const \[showCoaching, setShowCoaching\] \= useState(false);

  const currentNode \= scenario.nodes\[currentNodeId\];

  function choose(choice) {

    setHistory(prev \=\> \[...prev, { nodeId: currentNodeId, choiceId: choice.id }\]);

    setShowCoaching(true);

    // After coaching is dismissed, advance

  }

  function advance(nextNodeId) {

    setShowCoaching(false);

    setCurrentNodeId(nextNodeId);

  }

  function reset() {

    setCurrentNodeId('start');

    setHistory(\[\]);

    setShowCoaching(false);

  }

  return { currentNode, history, showCoaching, choose, advance, reset };

}

### KV pattern (if you add persistence later — matches diary fix)

// Optimistic update — do NOT re-fetch immediately after write

async function saveReflection(key, text) {

  setReflections(prev \=\> ({ ...prev, \[key\]: text })); // optimistic

  try {

    await fetch('/api/reflections', {

      method: 'POST',

      body: JSON.stringify({ key, text })

    });

    // Do NOT re-fetch here — KV eventual consistency will return stale data

  } catch (err) {

    setReflections(prev \=\> ({ ...prev, \[key\]: prev\[key\] })); // revert on error

  }

}

---

## 07 — File Structure for ConflictSim

ConflictSim/

├── src/

│   ├── worker.js              \# Cloudflare Worker entrypoint

│   ├── main.jsx               \# React entry

│   ├── App.jsx                \# Route: Home (scenario select) → Scenario → Outcome

│   ├── index.css              \# All CSS vars, resets, utility classes (from this doc)

│   ├── data/

│   │   └── scenarios.js       \# All scenario content — nodes, choices, coaching

│   ├── components/

│   │   ├── ScenarioCard.jsx   \# Home screen cards

│   │   ├── ScenarioPlayer.jsx \# Active scenario — situation \+ choices

│   │   ├── CoachingPanel.jsx  \# Consequence \+ framework coaching

│   │   ├── ProgressDots.jsx   \# Decision depth indicator

│   │   └── Tag.jsx            \# Framework tags (Fighter, SBI, etc.)

│   └── hooks/

│       └── useScenario.js     \# State machine logic

├── public/

│   └── bloom-pink.svg         \# Copy from style guide

├── wrangler.toml

├── vite.config.js

└── package.json

---

## 08 — GitHub Setup Sequence

Run these in Terminal inside your `ConflictSim` folder:

\# 1\. Initialize the project

cd \~/dev/ConflictSim

npm create vite@latest . \-- \--template react

npm install

\# 2\. Install Cloudflare deps (same as diary)

npm install \-D wrangler @cloudflare/kv-asset-handler

\# 3\. Initialize git

git init

git add .

git commit \-m "init: project scaffold"

\# 4\. Create repo on GitHub (do this in browser at github.com/new)

\# Repo name: conflict-sim

\# Visibility: Public or Private — your call

\# 5\. Connect and push

git remote add origin https://github.com/alexacjacobson/conflict-sim.git

git branch \-M main

git push \-u origin main

---

## 09 — First Claude Code Prompt (after GitHub setup)

Paste this into Claude Code in VS Code to scaffold the full project:

Set up a React 18 \+ Vite project in this directory for an app called ConflictSim — a leadership scenario simulator.

Project structure:

\- src/worker.js — Cloudflare Worker static asset server

\- src/main.jsx — React entry point

\- src/App.jsx — Top-level routing between Home and Scenario views

\- src/index.css — Full design system (I'll paste the CSS after)

\- src/data/scenarios.js — Placeholder file with one empty scenario object

\- src/components/ScenarioCard.jsx — Card for home screen

\- src/components/ScenarioPlayer.jsx — Active scenario view

\- src/components/CoachingPanel.jsx — Coaching/consequence panel

\- src/components/ProgressDots.jsx — Progress indicator

\- src/components/Tag.jsx — Framework tag component

\- src/hooks/useScenario.js — State machine hook

\- wrangler.toml — Cloudflare Workers config with name "conflict-sim"

Rules:

\- Do not install any UI libraries or component frameworks

\- Do not add any styling yet — CSS comes from index.css only

\- Do not add React Router — manage view state with useState in App.jsx

\- Add a README.md with project name and stack only

\- Do not change anything not listed above

