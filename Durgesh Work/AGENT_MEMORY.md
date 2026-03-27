# EduAdapt — Durgesh (Person A) Agent Memory
> **Load this file at the start of every session.**
> Do NOT ask the user to re-explain anything covered here.

---

## 👤 Who Am I Building For?
- **Project:** EduAdapt — Hackathon Web App
- **My Role:** Person A — AI Logic Developer
- **My Partner:** Anshul (Person B) — UI/Frontend Developer
- **Hackathon Problem:** #30 — Inclusive Education Content Generator (Generative AI track)
- **Company:** AutoStackAI

---

## ❗ Architecture — Read This First
- **NO backend. NO FastAPI. NO Node server.**
- This is a **pure React + Vite frontend app**.
- Gemini API is called **directly from the browser** using `fetch()`.
- API key lives in `.env` as `VITE_GEMINI_KEY=...`
- Hosted on Vercel / Netlify after build.

```
Browser
  └── React App (Vite)
        ├── Person A (Durgesh): AI logic, API calls, prompts, readability, audio, quiz
        └── Person B (Anshul): Layout, design, accessibility CSS, output display
```

---

## 📁 Files I (Durgesh) Own

| File | Purpose |
|------|---------|
| `src/prompts.js` | 6 disability prompt strings exported as `PROMPTS` object |
| `src/api.js` | Gemini API fetch + `transformText()` + `generateQuiz()` |
| `src/utils/readability.js` | `fleschKincaid(text)` + `countSyllables(word)` |
| `src/components/PersonalizationPanel.jsx` | Disability / Class / Age / Language selectors |
| `src/components/TextInput.jsx` | Textarea + PDF upload (pdf.js) + Transform button |
| `src/components/AudioPlayer.jsx` | Web Speech API TTS — play, stop, speed control |
| `src/components/QuizPanel.jsx` | Gemini-generated 5 MCQs, option selection, scoring |

---

## 📁 Files Anshul (Person B) Owns
> I do NOT touch these files.

| File | Purpose |
|------|---------|
| `src/components/Header.jsx` | Logo + High Contrast + Large Font toggles |
| `src/components/OutputPanel.jsx` | Side-by-side original vs transformed text + score bar |
| `src/components/ColorOverlay.jsx` | Floating color overlay (Irlen syndrome) |
| `src/index.css` | Accessibility CSS (high contrast, large font, OpenDyslexic) |
| `src/App.jsx` | Main layout + shared state management |

---

## 🔑 Gemini API Key Setup
```
.env file (project root):
VITE_GEMINI_KEY=your_key_here
```
```js
// Access in code:
import.meta.env.VITE_GEMINI_KEY
```

---

## 🌐 Gemini API Endpoint
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

---

## 🧩 6 Disability Modes (prompts.js)
| Mode | Behavior |
|------|---------|
| `dyslexia` | Short sentences, simple words, no complex structure |
| `visual` | Descriptive only, no image/chart/diagram references |
| `cognitive` | Emojis, bullet points, very simple vocabulary |
| `adhd` | Short chunked paragraphs, bold key points |
| `autism` | Literal language, no idioms or sarcasm |
| `hearing` | Replace all audio/sound references with text |

---

## 🎛️ Class / Age Mapping
| Class | Age Range | Default |
|-------|-----------|---------|
| 1–5 | 6–10 | |
| 6–8 | 11–13 | ✅ (Age 12) |
| 9–10 | 14–15 | |
| 11–12 | 16–17 | |
| UG | 18+ | |
| Skip | — | |

---

## 🤝 Data I Send to Anshul (OutputPanel)
```js
{
  transformedText: "...",   // result from Gemini
  originalText: "...",      // user's input text
  readabilityBefore: 42,    // Flesch-Kincaid on input
  readabilityAfter: 71      // Flesch-Kincaid on output
}
```

## 📥 Data I Receive from Anshul (App.jsx state)
```js
{
  inputText: "...",
  disability: "dyslexia",
  classLevel: "6-8",
  age: 12,
  language: "English"    // English | Hindi | Gujarati
}
```

---

## ✅ Completed Tasks
- [x] Read and understood README_PersonA.md
- [x] Read and understood anshul_task.md (Anshul's role)
- [x] Read and understood README_Complete_project.md
- [x] Confirmed architecture: pure React, no backend
- [x] Wrote accurate task.md checklist

## 🔲 Pending Tasks (Start Here Next Session)
1. Scaffold Vite + React project (coordinate with Anshul — only one person does this)
2. Add `VITE_GEMINI_KEY` to `.env`
3. Write `src/prompts.js` — all 6 disability modes
4. Write `src/api.js` — `transformText()` + `generateQuiz()`
5. Write `src/utils/readability.js` — Flesch-Kincaid
6. Write `src/components/PersonalizationPanel.jsx`
7. Write `src/components/TextInput.jsx` + pdf.js integration
8. Write `src/components/AudioPlayer.jsx`
9. Write `src/components/QuizPanel.jsx`
10. Integrate + test with Anshul's UI components

---

## ⚠️ Common Mistakes to Avoid
- ❌ Do NOT build a FastAPI or Node.js backend — there is none
- ❌ Do NOT touch Header.jsx, OutputPanel.jsx, ColorOverlay.jsx, index.css — that's Anshul
- ❌ Do NOT hardcode the API key — always use `import.meta.env.VITE_GEMINI_KEY`
- ✅ DO coordinate with Anshul on shared `App.jsx` state shape

---

*Last updated: 2026-03-28 — Fresh rewrite. Architecture confirmed: pure React, no backend.*
