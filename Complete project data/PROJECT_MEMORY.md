# EduAdapt — AI Agent Memory File
> Load this file at the start of every session. Do NOT ask the user to re-explain anything covered here.

---

## Project Identity
- **Name:** EduAdapt
- **Type:** Hackathon Web App (24-hour sprint)
- **Problem:** #30 — Inclusive Education Content Generator (Generative AI track)
- **Builder:** Solo developer
- **Company:** AutoStackAI
- **Current Stage:** Planning COMPLETE → BUILD PHASE

---

## What EduAdapt Does
Converts any educational text or PDF into accessible formats personalised for students with disabilities.

**Core idea:** 2D personalisation matrix → Disability Profile × Class Level/Age → dynamic Gemini prompt → transformed output.

No existing tool does this combination. That is the differentiator.

---

## Tech Stack
| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | React 18 | Component-based |
| Styling | Tailwind CSS | Utility-first |
| AI | Google Gemini 2.5 API | FREE tier. Key in .env as VITE_GEMINI_KEY |
| Audio | Web Speech API | Browser native — no API key needed |
| PDF | pdf.js (Mozilla CDN) | Text extraction from uploaded PDFs |
| Readability | Pure JS Flesch-Kincaid | No library — implement manually |
| Font | OpenDyslexic | CDN import — one line CSS |
| Braille | braille-translator (npm) | Only if time allows |
| Build | Vite | Fast dev server |
| Deploy | Vercel or Netlify | Free hosting for demo |

---

## File Structure
```
src/
├── api.js                          ← Gemini API call function
├── prompts.js                      ← 6 disability system prompts
├── utils/
│   └── readability.js              ← Flesch-Kincaid calculator (pure JS)
├── components/
│   ├── Header.jsx                  ← Logo, nav, contrast/font toggles
│   ├── PersonalizationPanel.jsx    ← Class + Age + Disability selector
│   ├── TextInput.jsx               ← Paste text + PDF upload button
│   ├── OutputPanel.jsx             ← Side-by-side original vs transformed
│   ├── AudioPlayer.jsx             ← Web Speech TTS + speed control
│   ├── QuizPanel.jsx               ← MCQ generator (2nd Gemini call)
│   └── ColorOverlay.jsx            ← Floating tint selector (5 colours)
└── App.jsx                         ← Root layout + state management
```

---

## Disability Profiles (6 Modes)
| Mode | Key Behaviour |
|------|--------------|
| Dyslexia | OpenDyslexic font, short sentences, syllable highlights |
| Visual Impairment | TTS focus, no visual references, descriptive language |
| Cognitive | Bullet points, emoji anchors, Grade 1-3 vocabulary |
| ADHD | Chunked paragraphs, bold keywords, max 3 sentences per block |
| Autism | Literal language, zero idioms, structured format |
| Hearing Impaired | Visual emphasis, all audio references replaced with text |

---

## Class / Age Logic
| Class | Age Range | Default? |
|-------|----------|---------|
| Skip | Manual age only | — |
| 1–5 | 6–10 | — |
| 6–8 | 11–13 | ✅ DEFAULT |
| 9–10 | 14–15 | — |
| 11–12 | 16–17 | — |
| UG | 18+ | — |

- Selecting class auto-fills age range midpoint
- Age is always manually editable
- Skip class = no grade-level simplification applied
- Both class AND age are passed into Gemini prompt

---

## Gemini API Call Pattern
```js
// api.js
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const buildSystemPrompt = (disability, classLevel, age) => {
  const base = PROMPTS[disability]; // from prompts.js
  return `${base} Simplify for a ${age}-year-old student in Class ${classLevel}. Use vocabulary appropriate for this age group.`;
};

const transformText = async (inputText, disability, classLevel, age, language) => {
  const res = await fetch(`${GEMINI_URL}?key=${import.meta.env.VITE_GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: buildSystemPrompt(disability, classLevel, age) }] },
      contents: [{ parts: [{ text: `Output language: ${language}. Content to transform:\n\n${inputText}` }] }]
    })
  });
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
};
```

---

## Features — MUST SHIP (Core)
- [x] Locked
- [ ] Built

1. 6 Disability profile selector (buttons)
2. Class selector (Skip / 1-5 / 6-8 / 9-10 / 11-12 / UG)
3. Age input (auto-fills from class, manually editable)
4. Text paste input area
5. PDF upload → text extraction via pdf.js
6. Gemini 2.5 API transform call
7. Side-by-side output (Original LEFT | Transformed RIGHT)
8. Flesch-Kincaid readability score before + after
9. Audio playback (Web Speech API) + speed control
10. OpenDyslexic font toggle
11. High contrast mode toggle
12. Large font toggle
13. Color overlay — 5 tints (Irlen syndrome) — floating button
14. Emoji anchors in Cognitive mode (handled in prompt)
15. Hindi / Gujarati language toggle

---

## Features — IF TIME ALLOWS (High Value)
16. Quiz generator — 5 MCQs via 2nd Gemini call
17. Braille output tab — braille-translator npm
18. Download as PDF / TXT
19. Teacher mode — bulk PDF transform (rebrand of PDF upload)

---

## Features — POST HACKATHON (Skip for now)
- Progress tracker (localStorage)
- Voice input
- URL input
- Student analytics
- Image alt-text generation
- Multilingual expansion beyond Hindi/Gujarati

---

## Design System
| Token | Value |
|-------|-------|
| Primary | #4F46E5 (Indigo) |
| Secondary | #7C3AED (Violet) |
| Accent | #06B6D4 (Cyan) |
| Background | #F8F7FF (Lavender White) |
| Card BG | #EEF2FF (Soft Indigo) |
| Border | #C7D2FE |
| Text Dark | #1E1B4B |
| Success | #10B981 |
| Warning | #F59E0B |

- Style: Polished product feel — NOT too simple, NOT too modern
- Cards: soft box-shadow, 8–12px border radius
- Font: Inter (UI) / OpenDyslexic (dyslexia mode)
- Spacing: 8px base grid, 16–24px card padding

---

## UI Layout (Top → Bottom)
```
[Header — Logo | Nav | Contrast toggle | Font toggle]
[PersonalizationPanel — Class | Age | Disability mode]
[TextInput — Paste box | PDF upload | Language toggle]
[Transform Button — CTA]
[OutputPanel — Original (left) | Transformed (right)]
[ReadabilityScore — Before score → After score bar]
[AudioPlayer — Play | Speed | Voice]
[QuizPanel — Accordion MCQs]
[ColorOverlay — Floating bottom-right]
```

---

## 24-Hour Build Priority Order
```
Hour 0-1:   Scaffold + .env + Gemini key
Hour 1-2:   PersonalizationPanel UI
Hour 2-3:   TextInput + PDF upload + Gemini API connected
Hour 3-4:   prompts.js — 6 disability prompts tuned
Hour 4-5:   OutputPanel — side-by-side layout
Hour 5-6:   Flesch-Kincaid score
Hour 6-7:   Audio playback
Hour 7-8:   Font/Contrast/Size toggles
Hour 8-9:   Color overlay + Emoji anchors
Hour 9-10:  Hindi/Gujarati toggle
Hour 10-12: UI polish
Hour 12-14: Quiz generator
Hour 14-16: Braille + Download
Hour 16-18: Bug fixes + buffer
Hour 18-20: Demo prep — 3 sample texts
Hour 20-22: Record backup demo video
Hour 22-24: Deploy Vercel + submit
```

---

## Current Build Checklist
- [x] Problem selected: #30
- [x] Features locked and prioritised
- [x] Tech stack confirmed
- [x] UI/UX design system defined
- [x] API call pattern designed
- [x] Memory file created
- [x] Project PDF document created
- [ ] React app scaffolded
- [ ] Gemini API connected
- [ ] PersonalizationPanel built
- [ ] TextInput built
- [ ] OutputPanel built
- [ ] All 6 disability prompts tuned
- [ ] Audio player working
- [ ] Accessibility toggles working
- [ ] Quiz generator working
- [ ] Deployed

---

## Competitor Landscape
| Tool | Gap | Our Edge |
|------|-----|---------|
| Read&Write | Paid, no AI profiles | Free + AI + 6 profiles |
| Speechify | TTS only | Full transformation |
| Rewordify | Simplification only | 6 modes + audio + grade |
| ReachDeck | Not education-focused | Education-first |
| ChatGPT | No UI, no profiles | Purpose-built UX |

---

## Winning Pitch (3 sentences for judges)
"Every existing tool does one thing. EduAdapt is the first free platform that combines AI-powered disability-specific content transformation with grade-level personalisation in a single beautiful web app. Paste any textbook paragraph, select a disability profile and class, and get six intelligent outputs instantly."

---
*Last updated: Hackathon Day 1 — Planning phase complete*
