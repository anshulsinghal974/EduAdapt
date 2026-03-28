# EduAdapt — Complete Project Memory
> **Master reference for the entire project.**
> Both Person A (Durgesh) and Person B (Anshul) should read this.

---

## 🚀 Project Identity
- **Name:** EduAdapt
- **Type:** Hackathon Web App (24-hour sprint)
- **Problem:** #30 — Inclusive Education Content Generator (Generative AI track)
- **Company:** AutoStackAI
- **Pitch:** *"One input — six intelligent outputs — instant accessibility for every learner."*

---

## 🎯 What It Does
EduAdapt takes standard educational content (text or PDF) and transforms it into an accessible format tailored to a student's:
- **Disability profile** (6 modes)
- **Class level** (1 to UG)
- **Age**
- **Language** (English, Hindi, Gujarati)

---

## 🏗️ Architecture — Single Source of Truth
```
Browser
  └── React App (Vite + Tailwind)
        ├── Gemini 2.5 Flash API  ← called directly from browser (no backend)
        ├── Web Speech API        ← audio playback (browser native)
        └── pdf.js                ← PDF text extraction (browser native)
```

> ❗ There is NO backend server. Gemini is called directly via browser fetch().

---

## 👥 Team Split

### 🧠 Person A — Durgesh (AI Logic)
| File | Responsibility |
|------|---------------|
| `src/prompts.js` | 6 disability prompt strings |
| `src/api.js` | Gemini API calls — `transformText()`, `generateQuiz()` |
| `src/utils/readability.js` | Flesch-Kincaid score — `fleschKincaid()` |
| `src/components/PersonalizationPanel.jsx` | Disability / Class / Age / Language selectors |
| `src/components/TextInput.jsx` | Text input + PDF upload + Transform trigger |
| `src/components/AudioPlayer.jsx` | TTS via Web Speech API |
| `src/components/QuizPanel.jsx` | 5-MCQ quiz from Gemini |

### 🎨 Person B — Anshul (UI / Frontend)
| File | Responsibility |
|------|---------------|
| `src/components/Header.jsx` | Logo + accessibility toggles (contrast, font size) |
| `src/components/OutputPanel.jsx` | Side-by-side original vs transformed + score bar |
| `src/components/ColorOverlay.jsx` | Floating color overlay for Irlen syndrome |
| `src/index.css` | Accessibility CSS (high contrast, large font, OpenDyslexic) |
| `src/App.jsx` | Main layout + shared state management |

---

## 📁 Project Folder Structure
```
src/
├── components/
│   ├── Header.jsx              ← Anshul
│   ├── OutputPanel.jsx         ← Anshul
│   ├── ColorOverlay.jsx        ← Anshul
│   ├── PersonalizationPanel.jsx ← Durgesh
│   ├── TextInput.jsx           ← Durgesh
│   ├── AudioPlayer.jsx         ← Durgesh
│   └── QuizPanel.jsx           ← Durgesh
├── utils/
│   └── readability.js          ← Durgesh
├── api.js                      ← Durgesh
├── prompts.js                  ← Durgesh
├── App.jsx                     ← Anshul
├── main.jsx
└── index.css                   ← Anshul
.env                            ← VITE_GEMINI_KEY (Durgesh sets up)
```

---

## 🔑 Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| AI | Google Gemini 2.5 Flash (direct browser API calls) |
| Audio | Web Speech API (browser native) |
| PDF Parsing | pdf.js (CDN) |
| Readability | Flesch-Kincaid (custom JS) |
| Font | OpenDyslexic (accessibility) |
| Hosting | Vercel / Netlify |

---

## ✅ Must-Ship Features (Core — Required for Demo)
- [ ] 6 Disability transformation modes
- [ ] Class + Age personalization panel
- [ ] Text paste input
- [ ] PDF upload + text extraction
- [ ] Gemini API transformation
- [ ] Side-by-side output panel (original vs transformed)
- [ ] Flesch-Kincaid readability score (before & after)
- [ ] Audio playback (TTS)
- [ ] High contrast mode
- [ ] Large font toggle
- [ ] Dyslexia font (OpenDyslexic)
- [ ] Color overlay (Irlen syndrome)
- [ ] Language toggle (English / Hindi / Gujarati)

---

## ⭐ High-Value Bonus Features (Build After Core)
- [ ] Quiz Generator — 5 MCQs via Gemini
- [ ] Braille Output — `braille-translator` npm package
- [ ] Download as PDF / TXT
- [ ] Teacher Mode — bulk content processing

---

## 🔮 Future / Post-Hackathon Features
- Progress tracker
- Voice input (Speech-to-Text)
- URL content extraction
- Student analytics dashboard
- Image alt-text generation
- Multilingual expansion beyond 3 languages

---

## 🧩 6 Disability Profiles
| Mode | Transformation Behavior |
|------|------------------------|
| Dyslexia | Short sentences, simple words, OpenDyslexic font activated |
| Visual | TTS-focused, descriptive language, no chart/image references |
| Cognitive | Emojis, bullet points, very simple vocabulary |
| ADHD | Chunked paragraphs, bold key points, short bursts |
| Autism | Literal language only, no idioms or sarcasm |
| Hearing | Visual-first, no audio references |

---

## 🎛️ Class / Age Mapping
| Class | Age Range | Default |
|-------|-----------|---------|
| 1–5 | 6–10 | |
| 6–8 | 11–13 | ✅ |
| 9–10 | 14–15 | |
| 11–12 | 16–17 | |
| UG | 18+ | |
| Skip | — | |

Default → Class 6–8, Age 12

---

## 🌐 Gemini API Details
```
Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
Key in .env: VITE_GEMINI_KEY=your_key_here
Access in code: import.meta.env.VITE_GEMINI_KEY
```

**Transform request body:**
```json
{
  "system_instruction": { "parts": [{ "text": "<disability + age prompt>" }] },
  "contents": [{ "parts": [{ "text": "Output language: Hindi\n\nContent:\n<user text>" }] }]
}
```

**Quiz prompt format:**
```
Generate exactly 5 MCQs in JSON:
[{ "question": "...", "options": ["A","B","C","D"], "answer": "A" }]
Text: <transformedText>
```

---

## 🎨 Design System (Anshul follows this)
| Element | Color |
|---------|-------|
| Primary | `#4F46E5` |
| Secondary | `#7C3AED` |
| Accent | `#06B6D4` |
| Background | `#F8F7FF` |
| Card Background | `#EEF2FF` |
| Border | `#C7D2FE` |
| Success | `#10B981` |
| Warning | `#F59E0B` |
| Text | `#1E1B4B` |

UI Style: Rounded cards (8–12px), soft shadows, clean spacing, professional look.

---

## 🔄 Data Flow (Both Persons Must Know)
```
User pastes text / uploads PDF
        ↓
PersonalizationPanel: selects disability, class, age, language
        ↓
TextInput: clicks "Transform"
        ↓ (Durgesh's code)
transformText() called → Gemini API → transformedText returned
fleschKincaid() on input → readabilityBefore
fleschKincaid() on output → readabilityAfter
        ↓ (passed to Anshul's components)
OutputPanel: shows original (left) vs transformed (right) + score bar
AudioPlayer: reads transformedText aloud
QuizPanel: generateQuiz() → shows 5 MCQs
```

---

## 🤝 Handoff Contract Between Durgesh & Anshul

### Durgesh → Anshul (Data Produced)
```js
{
  transformedText: "...",
  originalText: "...",
  readabilityBefore: 42,   // number 0–100
  readabilityAfter: 71     // number 0–100
}
```

### Anshul → Durgesh (Data Consumed)
```js
{
  inputText: "...",
  disability: "dyslexia",
  classLevel: "6-8",
  age: 12,
  language: "English"      // "English" | "Hindi" | "Gujarati"
}
```

---

## 📊 Shared App State (App.jsx — Anshul manages this)
| State | Type | Owner |
|-------|------|-------|
| `inputText` | String | Durgesh feeds, Anshul stores |
| `disability` | String | Durgesh reads, Anshul stores |
| `classLevel` | String | Durgesh reads, Anshul stores |
| `age` | Number | Durgesh reads, Anshul stores |
| `language` | String | Durgesh reads, Anshul stores |
| `transformedText` | String | Durgesh produces, Anshul displays |
| `originalText` | String | Both use |
| `readabilityBefore` | Number | Durgesh produces, Anshul displays |
| `readabilityAfter` | Number | Durgesh produces, Anshul displays |
| `quizData` | Array | Durgesh produces, Anshul displays |
| `isLoading` | Boolean | Durgesh sets, Anshul shows spinner |
| `highContrast` | Boolean | Anshul owns |
| `largeFont` | Boolean | Anshul owns |
| `dyslexiaFont` | Boolean | Anshul owns |
| `activeOverlay` | String | Anshul owns |

---

## 📌 Current Project Status
- [x] Planning complete
- [x] Role split defined (Durgesh = AI logic, Anshul = UI)
- [x] Architecture confirmed (pure React, no backend)
- [ ] Development not yet started

### Next Steps for Both
1. **Durgesh:** Set up `.env` with Gemini key, start with `prompts.js` → `api.js`
2. **Anshul:** Scaffold Vite + React + Tailwind, build `Header.jsx` + `App.jsx` layout

---

*Last updated: 2026-03-28 — Fresh write. All info sourced from README_PersonA.md, anshul_task.md, and README_Complete_project.md.*
