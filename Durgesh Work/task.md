# EduAdapt — Person A Build Tasks

## Phase 0: Planning & Memory
- [x] Analyse project docs
- [x] Write implementation plan ([implementation_plan.md](file:///C:/Users/offic/.gemini/antigravity/brain/bedb8042-21f0-4c7c-a677-969156525e24/implementation_plan.md))
- [x] Write agent handoff memory ([AGENT_MEMORY.md](file:///c:/Users/offic/Desktop/EduAdapt/AGENT_MEMORY.md) in project root)
- [x] Update architecture to React Frontend + FastAPI Backend

## Phase 1: Project Scaffold
- [ ] Scaffold FastAPI backend inside `c:\Users\offic\Desktop\EduAdapt\backend`
- [ ] Set up Python environment and `requirements.txt` (FastAPI, Uvicorn, google-generativeai, python-dotenv)
- [ ] Scaffold Vite + React 18 app inside `c:\Users\offic\Desktop\EduAdapt\frontend`
- [ ] Install Tailwind CSS + configure `tailwind.config.js` in frontend
- [ ] Create `.env` files for both frontend and backend

## Phase 2: Core AI Backend (FastAPI)
- [ ] Create `backend/prompts.py` — 6 disability prompts (dyslexia, visual, cognitive, adhd, autism, hearing)
- [ ] Create `backend/readability.py` — Flesch-Kincaid calculator + syllable counter
- [ ] Create `backend/main.py` — FastAPI app with CORS, POST `/api/transform`, POST `/api/quiz`

## Phase 3: Core AI Frontend (React)
- [ ] Create `frontend/src/api.js` — Fetch wrapper calling `localhost:8000/api/...`
- [ ] Create `frontend/src/components/PersonalizationPanel.jsx`
- [ ] Create `frontend/src/components/TextInput.jsx` (with pdf.js for extraction)
- [ ] Create `frontend/src/components/AudioPlayer.jsx` (Web Speech API TTS)
- [ ] Create `frontend/src/components/QuizPanel.jsx` (calls backend `/api/quiz`)

## Phase 4: Integration
- [ ] Wire all Person A components into `frontend/src/App.jsx` with shared state
- [ ] Test frontend to backend communication

## Phase 5: Verification
- [ ] Backend runs without errors (`uvicorn main:app`)
- [ ] Frontend dev server runs (`npm run dev`)
- [ ] Gemini API call via FastAPI returns valid text
- [ ] PDF upload extracts text correctly
- [ ] Audio plays and stops
- [ ] Quiz generates 5 MCQs
- [ ] Readability score appears before + after
- [ ] Language toggle works

## Phase 6: Handoff
- [ ] Update [AGENT_MEMORY.md](file:///c:/Users/offic/Desktop/EduAdapt/AGENT_MEMORY.md) with completed items
- [ ] Confirm handoff state is accurate for Person B agent
