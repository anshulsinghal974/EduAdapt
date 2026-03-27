# EduAdapt — Inclusive Education Content Generator

## 🚀 Overview
EduAdapt is a generative AI-powered web platform that converts standard educational content into accessible formats tailored to students with disabilities.

### Problem
Students face challenges like:
- Dyslexia → difficulty reading long sentences
- Visual impairment → cannot read text-heavy PDFs
- ADHD → struggle with focus
- Autism → difficulty understanding figurative language
- Cognitive disabilities → hard to understand complex text
- Hearing impairment → miss audio-based content

### Solution
EduAdapt transforms content based on:
- Disability profile
- Class level
- Age

---

## 🎯 Core Features (Must Ship)

- 6 Disability Profiles:
  - Dyslexia
  - Visual Impairment
  - ADHD
  - Cognitive
  - Autism
  - Hearing Impairment

- Personalization Panel:
  - Class selection (1–UG)
  - Age input

- Input Options:
  - Text input
  - PDF/DOC upload (pdf.js)

- AI Transformation:
  - Powered by Gemini 2.5 API
  - Dynamic prompt generation

- Output:
  - Side-by-side comparison (Original vs Transformed)

- Readability Score:
  - Flesch-Kincaid before & after

- Accessibility Features:
  - Audio playback (Web Speech API)
  - Dyslexia font toggle
  - High contrast mode
  - Large font toggle
  - Color overlay (Irlen syndrome)

- Cognitive Enhancements:
  - Emoji anchors

- Language Support:
  - Hindi / Gujarati toggle

---

## ⭐ High-Value Features

- Quiz Generator (MCQs using AI)
- Braille Output
- Download as PDF/TXT
- Teacher Mode (bulk content processing)

---

## 🔮 Upcoming Features

- Progress tracker
- Voice input (Speech-to-text)
- URL content extraction
- Student analytics
- Image alt-text generation
- Multilingual expansion

---

## 🧠 Tech Stack

| Layer        | Technology                     |
|-------------|------------------------------|
| Frontend    | React 18                      |
| Styling     | Tailwind CSS                  |
| AI/NLP      | Google Gemini 2.5 API         |
| Audio       | Web Speech API                |
| PDF Parsing | pdf.js                        |
| Readability | Flesch-Kincaid (JS)           |
| Font        | OpenDyslexic                  |
| Braille     | braille-translator (npm)      |
| Hosting     | Vercel / Netlify              |

---

## 🔄 API Architecture

### Prompt Builder
```js
const buildPrompt = (disability, classLevel, age) => {
  const base = PROMPTS[disability];
  return `${base} Simplify for a ${age}-year-old in Class ${classLevel}.
  Use vocabulary appropriate for this age group.`;
};
```

### Gemini API Call
```js
const transformText = async (inputText, disability, classLevel, age, language) => {
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: buildPrompt(disability, classLevel, age) }]
        },
        contents: [
          { parts: [{ text: `Output in ${language}. Input: ${inputText}` }] }
        ]
      })
    }
  );
  return res.json();
};
```

---

## 🎨 UI / UX Design

### Design Philosophy
- Clean, accessible, product-like UI
- Not too simple, not too complex

### Colors
- Primary: #4F46E5
- Secondary: #7C3AED
- Accent: #06B6D4
- Background: #F8F7FF
- Card: #EEF2FF

### Layout Components
- Header
- Personalization Panel
- Text Input Area
- Transform Button
- Output Panel
- Readability Score
- Audio Player
- Quiz Panel
- Color Overlay

---

## ⏱️ 24-Hour Build Plan

| Time       | Task |
|-----------|------|
| 0–1 hr    | Setup React + API |
| 1–2 hr    | Personalization UI |
| 2–3 hr    | Input + API working |
| 3–4 hr    | Prompts setup |
| 4–5 hr    | Output panel |
| 5–6 hr    | Readability score |
| 6–7 hr    | Audio feature |
| 7–8 hr    | Accessibility toggles |
| 8–9 hr    | UI enhancements |
| 9–10 hr   | Language toggle |
| 10–12 hr  | UI polish |
| 12–14 hr  | Quiz feature |
| 14–16 hr  | Braille + Download |
| 16–18 hr  | Bug fixing |
| 18–20 hr  | Demo prep |
| 20–22 hr  | Backup demo |
| 22–24 hr  | Deploy |

---

## 🧩 Disability Profiles

1. Dyslexia → Short sentences, OpenDyslexic font
2. Visual → TTS-based output
3. Cognitive → Emojis, simple words
4. ADHD → Chunked content
5. Autism → Literal language
6. Hearing → Visual-first content

---

## 🏆 Competitor Advantage

| Tool        | Limitation | EduAdapt Advantage |
|------------|-----------|-------------------|
| Speechify  | Only TTS  | Full transformation |
| Rewordify  | No disability support | Personalized modes |
| ChatGPT    | No UI     | Structured UX |
| ReachDeck  | Not education-focused | Education-first |

---

## 💡 Unique Pitch

"One input — six intelligent outputs — instant accessibility for every learner."

---

## 📌 Current Status

- Planning complete
- Development not started

### Next Step:
- Setup React app
- Connect Gemini API
- Build Personalization Panel

---

## 🧠 Key Idea (Core Innovation)

Disability Profile × Class Level/Age → Dynamic AI Output
