# EduAdapt — Person A (Durgesh) Task List
> **Your Role:** AI Logic Developer — you own the brain of EduAdapt
> **Tech:** React + Vite, direct Gemini API calls from browser (NO backend)
> **NOT your job:** Header, OutputPanel, ColorOverlay, index.css, App.jsx layout → that's Anshul

---

## ✅ Phase 0: Planning (DONE)
- [x] Read README_PersonA.md
- [x] Understood role split with Anshul (Person B)

---

## 🔧 Phase 1: Project Setup

- [ ] Scaffold Vite + React app (if not already done by Anshul)
  ```
  npm create vite@latest . -- --template react
  npm install
  ```
- [ ] Add `pdf.js` CDN in `index.html`:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  ```
- [ ] Create `.env` in project root:
  ```
  VITE_GEMINI_KEY=your_key_here
  ```
- [ ] Verify `npm run dev` starts without errors

---

## 🧩 Phase 2: `src/prompts.js` — Disability Prompts

- [ ] Create file: `src/prompts.js`
- [ ] Export `PROMPTS` object with exactly these 6 keys:
  - `dyslexia` → Short sentences, simple words, no complex structure
  - `visual` → Descriptive language only, no references to images/charts/diagrams
  - `cognitive` → Use emojis, bullet points, very simple vocabulary
  - `adhd` → Chunked paragraphs, bold key points, short bursts of info
  - `autism` → Literal and unambiguous language, no idioms or sarcasm
  - `hearing` → Replace all audio/sound references with text equivalents

---

## 🌐 Phase 3: `src/api.js` — Gemini API Integration

- [ ] Create file: `src/api.js`
- [ ] Set Gemini URL:
  ```js
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
  ```
- [ ] Implement `buildSystemPrompt(disability, classLevel, age)`:
  - Gets base prompt from `PROMPTS[disability]`
  - If `classLevel !== 'Skip'`, appends: `Simplify for a ${age}-year-old student in Class ${classLevel}.`
- [ ] Implement and export `transformText(inputText, disability, classLevel, age, language)`:
  - Calls Gemini with `system_instruction` + user message
  - User message format: `Output language: ${language}\n\nContent:\n${inputText}`
  - Returns: `data.candidates[0].content.parts[0].text`
- [ ] Implement and export `generateQuiz(transformedText)`:
  - Sends prompt to Gemini to produce exactly 5 MCQs in JSON:
    ```json
    [{ "question": "...", "options": ["A","B","C","D"], "answer": "A" }]
    ```
  - Parses and returns JSON array

---

## 📊 Phase 4: `src/utils/readability.js` — Flesch-Kincaid Score

- [ ] Create file: `src/utils/readability.js`
- [ ] Implement `countSyllables(word)` helper
- [ ] Implement and export `fleschKincaid(text)`:
  - Split text into sentences (`/[.!?]+/`) and words (`/\s+/`)
  - Count total syllables using `countSyllables`
  - Apply formula: `206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)`
  - Clamp result to range `[0, 100]`, return as rounded integer
  - Return `0` if no sentences or words found

---

## 🎛️ Phase 5: `src/components/PersonalizationPanel.jsx`

- [ ] Create file: `src/components/PersonalizationPanel.jsx`
- [ ] Dropdown: **Disability Mode** (6 options: dyslexia, visual, cognitive, adhd, autism, hearing)
- [ ] Dropdown: **Class Level** with these options:
  | Class | Age |
  |-------|-----|
  | 1–5   | 6–10 |
  | 6–8   | 11–13 |
  | 9–10  | 14–15 |
  | 11–12 | 16–17 |
  | UG    | 18+ |
  | Skip  | — |
  - Default: Class 6–8 (Age 12)
- [ ] Age auto-fills based on class selection (but allow manual override)
- [ ] Dropdown: **Language** (English, Hindi, Gujarati)
- [ ] All values passed up to parent via props/callbacks

---

## 📄 Phase 6: `src/components/TextInput.jsx`

- [ ] Create file: `src/components/TextInput.jsx`
- [ ] Textarea for pasting raw educational text
- [ ] File upload button (accept `.pdf` only)
- [ ] On PDF upload → extract text using `pdf.js`:
  ```js
  const buffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ') + '\n';
  }
  ```
- [ ] "Transform" button:
  - Calls `transformText()` from `api.js`
  - Calls `fleschKincaid()` on input → `readabilityBefore`
  - Calls `fleschKincaid()` on output → `readabilityAfter`
  - Passes `transformedText`, `readabilityBefore`, `readabilityAfter` up to parent (for Anshul's OutputPanel)
- [ ] Show loading state while API call is running

---

## 🔊 Phase 7: `src/components/AudioPlayer.jsx`

- [ ] Create file: `src/components/AudioPlayer.jsx`
- [ ] Receives `transformedText` as prop
- [ ] Implement `speak(text, rate)` using `window.speechSynthesis`:
  ```js
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.lang = 'en-IN';
  window.speechSynthesis.speak(utterance);
  ```
- [ ] Buttons: **Play**, **Stop**
- [ ] Speed selector: 0.5x, 1x, 1.5x, 2x
- [ ] Cancel any ongoing speech before starting new one

---

## ❓ Phase 8: `src/components/QuizPanel.jsx`

- [ ] Create file: `src/components/QuizPanel.jsx`
- [ ] Receives `transformedText` as prop
- [ ] "Generate Quiz" button → calls `generateQuiz(transformedText)` from `api.js`
- [ ] Renders 5 MCQs as cards or accordion items
- [ ] Each question shows 4 options (A, B, C, D)
- [ ] On option click → highlight correct (green) or wrong (red)
- [ ] Show final score after all questions answered

---

## ✔️ Phase 9: Verification Checklist

- [ ] Gemini API key loads from `.env` correctly (`import.meta.env.VITE_GEMINI_KEY`)
- [ ] `transformText()` returns valid transformed text for all 6 disability modes
- [ ] `fleschKincaid()` returns a number between 0–100
- [ ] PDF upload extracts readable text
- [ ] Audio plays and stops correctly
- [ ] Quiz generates exactly 5 MCQs in correct JSON shape
- [ ] Language toggle (Hindi/Gujarati) actually changes output language
- [ ] All values correctly passed to Anshul's `OutputPanel` and `App.jsx`

---

## 🤝 Phase 10: Handoff to Anshul

These are the values **you produce** that Anshul's UI components consume:

| Value | Type | Where Anshul uses it |
|-------|------|----------------------|
| `transformedText` | String | `OutputPanel.jsx` (right side) |
| `originalText` | String | `OutputPanel.jsx` (left side) |
| `readabilityBefore` | Number (0–100) | `OutputPanel.jsx` score bar |
| `readabilityAfter` | Number (0–100) | `OutputPanel.jsx` score bar |

These are the values **Anshul passes to you** (via `App.jsx` state):

| Value | Type | Used in |
|-------|------|---------|
| `inputText` | String | `transformText()` |
| `disability` | String | `buildSystemPrompt()` |
| `classLevel` | String | `buildSystemPrompt()` |
| `age` | Number | `buildSystemPrompt()` |
| `language` | String | user message in `transformText()` |

---

## ⏱️ Build Timeline

| Time     | Task                              |
|----------|-----------------------------------|
| 0–1 hr   | Setup + `.env` + API key working  |
| 1–2 hr   | `prompts.js` — all 6 modes        |
| 2–3 hr   | `api.js` — transformText working  |
| 3–4 hr   | `readability.js` — FK score       |
| 4–5 hr   | `PersonalizationPanel.jsx`        |
| 5–6 hr   | `TextInput.jsx` + PDF upload      |
| 6–7 hr   | `AudioPlayer.jsx`                 |
| 7–8 hr   | Language toggle end-to-end test   |
| 8–10 hr  | `QuizPanel.jsx`                   |
| 10+ hr   | Integration with Anshul's UI      |

---

*Last updated: 2026-03-28 — Corrected: No backend. Pure React + direct Gemini browser calls.*
