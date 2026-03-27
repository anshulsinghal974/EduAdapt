# EduAdapt — Core AI Logic (Person A Guide)

## 🧠 Role Overview
You are responsible for building the **brain of EduAdapt**.

This includes:
- Gemini API integration
- Prompt engineering (6 disability modes)
- Readability scoring
- PDF text extraction
- Audio playback
- Quiz generation
- Language toggle

---

## 📁 Files You Own

- `src/api.js` → Gemini API call logic
- `src/prompts.js` → 6 disability prompts
- `src/utils/readability.js` → Flesch-Kincaid score
- `src/components/PersonalizationPanel.jsx` → Class + Age + Disability
- `src/components/TextInput.jsx` → Text + PDF upload
- `src/components/AudioPlayer.jsx` → Text-to-Speech
- `src/components/QuizPanel.jsx` → MCQ generator

---

## 🔑 Gemini API Setup

Add to `.env`:
```
VITE_GEMINI_KEY=your_key_here
```

### API Implementation
```js
const GEMINI_URL =
'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

import { PROMPTS } from './prompts.js';

const buildSystemPrompt = (disability, classLevel, age) => {
  const base = PROMPTS[disability];
  const grade =
    classLevel === 'Skip'
      ? ''
      : ` Simplify for a ${age}-year-old student in Class ${classLevel}.`;

  return base + grade;
};

export const transformText = async (inputText, disability, classLevel, age, language) => {
  const res = await fetch(`${GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: buildSystemPrompt(disability, classLevel, age) }]
      },
      contents: [
        {
          parts: [
            { text: `Output language: ${language}

Content:
${inputText}` }
          ]
        }
      ]
    })
  });

  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
};
```

---

## 🧩 Disability Prompts

Define:
```js
export const PROMPTS = {
  dyslexia: "...",
  visual: "...",
  cognitive: "...",
  adhd: "...",
  autism: "...",
  hearing: "..."
};
```

### Behavior Summary

- Dyslexia → Short sentences, simple words
- Visual → Descriptive, no visual references
- Cognitive → Emojis + simple vocabulary
- ADHD → Chunked content
- Autism → Literal language
- Hearing → Replace audio references

---

## 📊 Readability Score (Flesch-Kincaid)

```js
export const fleschKincaid = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const words = text.split(/\s+/).filter(w => w.length);

  const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

  if (!sentences.length || !words.length) return 0;

  const score =
    206.835 -
    1.015 * (words.length / sentences.length) -
    84.6 * (syllables / words.length);

  return Math.max(0, Math.min(100, Math.round(score)));
};
```

---

## 📄 PDF Text Extraction

```js
const extractPdfText = async (file) => {
  const buffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;

  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ') + '\n';
  }

  return text;
};
```

---

## 🔊 Audio Playback

```js
const speak = (text, rate = 1) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.lang = 'en-IN';
  window.speechSynthesis.speak(utterance);
};

const stop = () => window.speechSynthesis.cancel();
```

---

## ❓ Quiz Generator

```js
const quizPrompt = `
Generate exactly 5 MCQs in JSON format:
[
  { "question": "...", "options": ["A","B","C","D"], "answer": "A" }
]
Text: ${transformedText}
`;
```

---

## 🎛️ Class / Age Logic

| Class  | Age |
|--------|-----|
| 1–5    | 6–10 |
| 6–8    | 11–13 |
| 9–10   | 14–15 |
| 11–12  | 16–17 |
| UG     | 18+ |

Default → Class 6–8 (Age 12)

---

## 🌐 Language Toggle

- English
- Hindi
- Gujarati

Passed into prompt:
```
Output language: Hindi
```

---

## ⏱️ Build Plan

| Time | Task |
|------|------|
| 0–1 hr | Setup + API key |
| 1–2 hr | prompts.js |
| 2–3 hr | api.js |
| 3–4 hr | PersonalizationPanel |
| 4–5 hr | TextInput |
| 5–6 hr | readability.js |
| 6–7 hr | AudioPlayer |
| 7–8 hr | Language toggle |
| 8–10 hr | QuizPanel |
| 10+ hr | Integration |

---

## 🤝 Collaboration

### You Send:
- transformedText
- originalText
- readabilityBefore
- readabilityAfter

### You Receive:
- inputText
- disability / class / age / language

---

## 💡 Key Responsibility

You are building:
👉 The intelligence layer of EduAdapt

Without this, the UI is useless.

---

## 🚀 Final Note

Focus on:
- Clean API calls
- Strong prompts
- Correct logic

Everything else depends on this layer.
