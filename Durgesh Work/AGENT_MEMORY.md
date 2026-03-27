# EduAdapt — Agent Handoff Memory
> **Load this file at the start of every session.** Do NOT ask the user to re-explain anything covered here.

---

## Project Identity
- **Name:** EduAdapt
- **Type:** Hackathon Web App (24-hour sprint)
- **Problem:** #30 — Inclusive Education Content Generator (Generative AI track)
- **Company:** AutoStackAI
- **Stage:** Planning COMPLETE → Build phase starting

---

## Architecture Change Log
- Originally planned as pure React + browser Gemini API calls.
- **UPDATED**: Migrated to **React + FastAPI Backend** architecture to support future ML model deployments.

---

## What Exists in the Workspace
```
c:\Users\offic\Desktop\EduAdapt\
├── Complete project data\
│   ├── PROJECT_MEMORY.md        ← Original project spec
│   └── README_Complete_project.md
├── My task Memory\
│   └── README_PersonA.md        ← Person A task spec
└── AGENT_MEMORY.md              ← THIS FILE (Current state)
```

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | **FastAPI** (Python 3.10+) |
| Frontend | **React 18** + Vite |
| Styling | Tailwind CSS |
| AI | Google Gemini 2.5 Flash via `google-generativeai` python SDK |
| Sub-modules | Web Speech TTS (Frontend), pdf.js (Frontend), Flesch-Kincaid (Backend) |

---

## Person A — Files to Build (Backend & Frontend AI logic)

### Backend (Python)
- `backend/prompts.py`: 6 disability system prompts
- `backend/readability.py`: Flesch-Kincaid score logic
- `backend/main.py`: FastAPI endpoints (`/api/transform`, `/api/quiz`) and `google.generativeai` integration
- `.env`: Holds `GEMINI_API_KEY`

### Frontend (React)
- `frontend/src/api.js`: Fetch utility to call backend API
- `frontend/src/components/PersonalizationPanel.jsx`: Class/Age/Disability/Language selector
- `frontend/src/components/TextInput.jsx`: Textarea + PDF upload (`pdf.js`)
- `frontend/src/components/AudioPlayer.jsx`: Web Speech TTS
- `frontend/src/components/QuizPanel.jsx`: 5 MCQ accordion
- `frontend/src/App.jsx`: Root state + layout wiring

---

## API Contract (Frontend ↔ Backend)
**POST /api/transform**
`Request`: `{ inputText, disability, classLevel, age, language }`
`Response`: `{ transformedText, readabilityBefore, readabilityAfter }`

**POST /api/quiz**
`Request`: `{ transformedText }`
`Response`: `{ quiz: [{ question, options:[], answer }] }`

---

## Person B — UI/Output (NOT Person A's job)
- `Header.jsx`, `OutputPanel.jsx`, `ColorOverlay.jsx`, accessibility toggles.

---

## Completed Tasks
- [x] Project planning documents read and analysed
- [x] Implementation plan updated for FastAPI architecture
- [x] Agent handoff memory updated

## Pending Tasks (Next Agent Start Here)
1. Scaffold `backend` folder and Python dependencies
2. Write `prompts.py`, `readability.py`, `main.py`
3. Scaffold `frontend` React + Vite project + Tailwind
4. Write `api.js` to connect to `localhost:8000`
5. Write Person A React components (`PersonalizationPanel`, `TextInput`, `AudioPlayer`, `QuizPanel`)
6. Execute and test

---

*Last updated: 2026-03-27 — Backend architecture planned. Build phase ready.*
