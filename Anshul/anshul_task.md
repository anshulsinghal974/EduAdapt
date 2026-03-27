# EduAdapt — Frontend (UI) Developer README

**Hackathon Project — Inclusive Education Content Generator**
**Role: Person B — UI + Frontend Developer**

---

# 1. Project Overview

EduAdapt is a Generative AI-powered web application that converts standard educational content into accessible formats for students with different learning disabilities. The system transforms text based on disability profile, class level, age, and language, and presents the output in a clean, accessible interface.

This README is specifically for the **Frontend/UI Developer**, who is responsible for everything the user and judges see — layout, design, accessibility features, and overall visual experience.

---

# 2. Your Role (Frontend Developer)

You are responsible for:

* Layout and page structure
* Side-by-side output panel
* Accessibility toggles (contrast, font size, dyslexia font)
* Color overlay for Irlen syndrome
* Readability score UI
* Styling for Audio Player and Quiz Panel
* Overall UI polish and responsiveness

**Important:**
Person A builds AI logic and API.
You build UI and connect it to their data.

---

# 3. Tech Stack (Frontend)

| Tool              | Purpose                               |
| ----------------- | ------------------------------------- |
| React 18          | Frontend framework                    |
| Tailwind CSS      | Styling                               |
| Vite / CRA        | Build tool                            |
| Web Speech API    | Audio playback                        |
| OpenDyslexic Font | Dyslexia-friendly font                |
| pdf.js            | PDF text extraction (Person A mainly) |

---

# 4. Project Folder Structure

```
src/
│
├── components/
│   ├── Header.jsx
│   ├── OutputPanel.jsx
│   ├── ColorOverlay.jsx
│   ├── AudioPlayer.jsx
│   ├── QuizPanel.jsx
│   ├── PersonalizationPanel.jsx
│   └── TextInput.jsx
│
├── utils/
│   └── readability.js
│
├── api/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 5. UI Layout Structure

Page layout from top to bottom:

```
Header
↓
Personalization Panel (Class + Age + Disability)
↓
Text Input Area (Paste text / Upload PDF)
↓
Transform Button
↓
Output Panel (Side-by-side view)
↓
Readability Score Bar
↓
Audio Player
↓
Quiz Panel
↓
Color Overlay Button (Floating)
```

---

# 6. Components You Must Build

## 6.1 Header.jsx

Contains:

* Logo / App Name
* High Contrast Toggle
* Large Font Toggle

## 6.2 OutputPanel.jsx (Most Important)

Displays:

* Original Text (Left)
* Transformed Text (Right)
* Readability Score Before & After
* Score improvement bar

## 6.3 ColorOverlay.jsx

Floating button with 5 color overlays:

* Yellow
* Blue
* Green
* Pink
* None

Used for Irlen Syndrome support.

## 6.4 index.css

Accessibility CSS:

* High contrast mode
* Large font mode
* Dyslexia font (OpenDyslexic)

## 6.5 App.jsx

Main layout and state management.

---

# 7. States You Must Manage (App.jsx)

| State           | Type    | Purpose                   |
| --------------- | ------- | ------------------------- |
| highContrast    | Boolean | Enable high contrast mode |
| largeFont       | Boolean | Increase font size        |
| dyslexiaFont    | Boolean | Enable OpenDyslexic font  |
| activeOverlay   | String  | Screen color overlay      |
| originalText    | String  | From API                  |
| transformedText | String  | From API                  |
| scoreBefore     | Number  | Readability score         |
| scoreAfter      | Number  | Readability score         |
| disability      | String  | Selected mode             |

---

# 8. Accessibility Features (Very Important)

You must implement:

| Feature           | How               |
| ----------------- | ----------------- |
| High Contrast     | CSS filter        |
| Large Font        | CSS font-size     |
| Dyslexia Font     | OpenDyslexic font |
| Color Overlay     | Fixed overlay div |
| Readability Score | Progress bar      |
| Side-by-Side View | Flex layout       |

These features are important because the project is about **inclusive education**.

---

# 9. Design System (Use These Colors)

| Element         | Color   |
| --------------- | ------- |
| Primary         | #4F46E5 |
| Secondary       | #7C3AED |
| Accent          | #06B6D4 |
| Background      | #F8F7FF |
| Card Background | #EEF2FF |
| Border          | #C7D2FE |
| Success         | #10B981 |
| Warning         | #F59E0B |
| Text            | #1E1B4B |

UI Style:

* Rounded cards (8–12px)
* Soft shadows
* Clean spacing
* Professional look

---

# 10. Data Flow (Frontend Perspective)

```
User enters text / uploads PDF
        ↓
User selects:
    - Disability
    - Class
    - Age
    - Language
        ↓
Click "Transform"
        ↓
API call to Gemini (Person A)
        ↓
Receive:
    originalText
    transformedText
    scoreBefore
    scoreAfter
        ↓
Display in OutputPanel
        ↓
Audio Player reads transformed text
        ↓
Quiz displayed
```

---

# 11. Build Timeline (Follow This)

| Time       | Task                   |
| ---------- | ---------------------- |
| Hour 0–1   | Setup React + Tailwind |
| Hour 1–2   | Header                 |
| Hour 2–3   | Output Panel           |
| Hour 3–4   | Color Overlay          |
| Hour 4–5   | Accessibility CSS      |
| Hour 5–6   | Readability Score Bar  |
| Hour 6–8   | Style Input + Panel    |
| Hour 8–10  | Style Audio + Quiz     |
| Hour 10–12 | UI Polish              |
| Hour 12+   | Integration + Testing  |

---

# 12. How to Run the Project

```
npm install
npm run dev
```

---

# 13. Key Feature for Demo

During demo, show this flow:

1. Paste educational text
2. Select Disability Mode
3. Select Class & Age
4. Click Transform
5. Show:

   * Side-by-side output
   * Readability improvement
   * Audio playback
   * Color overlay
   * Font toggle

This will impress judges.

---

# 14. Final Project Goal

The goal of EduAdapt is to make educational content accessible for all students by transforming content based on learning disabilities and grade level using Generative AI, and presenting it in an accessible and user-friendly interface.

---

# 15. One-Line Pitch

**"EduAdapt converts any educational content into disability-friendly, grade-appropriate learning material using AI, making education accessible for every student."**

---

# End of README