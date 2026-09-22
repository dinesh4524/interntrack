# INTERNTRACK — Student Internship & Placement Portal

> A Dribbble/Awwwards-grade, production-quality Student Internship & Placement Portal featuring an integrated **SQLite Relational Database Engine**, dynamic 3D career constellation canvas, live academic eligibility assessment, and recruitment journey pipeline.

---

## 🌟 Key Highlights & Features

### 🗄️ Integrated SQLite Relational Database Engine
- **In-Browser SQL Terminal & Schema Inspector**: Accessible via navbar button (`🗄️ SQLite DB`) or keyboard shortcut `Ctrl + Shift + S`.
- **Relational Tables**:
  - `student_profile` — Academic profile, CGPA, graduation year, specialization, and institution.
  - `opportunities` — Roles, companies, stipends, deadlines, required skills, and eligibility criteria.
  - `applications` — Recruitment tracking pipeline with stages (`Applied`, `Screening`, `Shortlisted`, `Interview`, `Selected`).
  - `skills` — Technical skill catalog with domain categorization and mastery metrics.
  - `certifications` — Verified credentials (e.g., NPTEL IIT Kharagpur/Madras with digital authentication).
  - `projects` — Featured engineering software repositories and impact telemetry.
- **Interactive SQL Features**: Run queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `SHOW TABLES`), execute presets, and export database as JSON.

### 🌌 3D Interactive Canvas & Hero Composition
- Deep Obsidian (`#050811`) palette with Electric Cyan (`#00f2fe`) and Indigo/Violet accents.
- Responsive canvas particle constellation reacting dynamically to mouse proximity and cursor repulsion.
- Layered 3D glass cards with real-time candidate metrics (87% Match, Shortlisted badge, ₹25K/mo stipend, 3-day deadline countdown).

### 🔍 Live Opportunity Discovery & Editorial Asymmetrical Grid
- Instant keyword search with `Ctrl + K` focus shortcut.
- Multi-faceted live filtering: Categories (Cybersecurity, Cloud, AI/ML, Web, Linux/Core), Work Modes (Hybrid, Remote, On-site), and Sorting (Match %, Highest Stipend, Urgent Deadlines).
- Editorial layout: 1 Lead Featured Card + 2 Stacked Secondary Cards + 1 Wide Panoramic Card + Curated Cards.
- Detailed modal with job responsibilities, candidate requirements, perks, bookmarking, and 1-click application submission.

### ⚡ Live Interactive Eligibility Engine
- Interactive candidate parameter simulation: Target Role, Branch, CGPA slider, Graduation batch (2026–2029), and Skill toggle chips.
- Dynamic animated circular SVG gauge (0–100%) and instant criteria checklist breakdown.
- Direct "Apply Now with Verified Score" workflow.

### 🔮 Interactive Skill Universe
- Orbital constellation graph centered around the glowing "CAREER READY" core.
- Click any of the 10 domain nodes (Cybersecurity, Python, Linux, Networking, ML, Web, SQL, Cloud, Java, Git) to inspect mastery indexes and 4-step industry learning roadmaps.

### 📈 Multi-Stage Application Journey Tracker
- Recruitment pipeline stepper: `Applied` ➔ `Screening` ➔ `Shortlisted` ➔ `Interview` ➔ `Selected`.
- "Advance Stage →" button advances candidates with live SQLite updates and animated feedback.
- Custom application recorder to track off-campus opportunities.

### ⏰ Deadline Radar (Real-Time Countdowns)
- Second-by-second countdown telemetry for imminent closing windows.
- Automated urgency classification ("URGENT • 2 DAYS LEFT", "CLOSING SOON").

### 🎓 Student Profile & Analytics Dashboard
- Dedicated profile for **Dinesh Kumar** (B.E. Computer Science & Engineering - Cyber Security, CGPA 8.48, Class of 2028).
- Interactive profile editor with direct SQLite persistence.
- Verified NPTEL Certifications (Java Programming, Cybersecurity & Privacy, Data Science for Engineers).
- Engineering projects showcase (*Phishing Email Detector*, *VigilStride*, *Smart Attendance System*).

---

## 🛠️ Project Structure

```
interntrack/
├── index.html               # Semantic HTML5 single-page application (100% self-contained)
├── README.md                # Project documentation & architecture overview
├── css/
│   ├── tokens.css           # Color tokens, glassmorphism, glow filters & typography variables
│   ├── layout.css           # Navbar, hero, stats band, asymmetric grid & responsive queries
│   ├── components.css       # Cards, radial gauges, timeline steppers, modals & toasts
│   └── animations.css       # Floating keyframes, 3D tilt transforms & scroll animations
└── js/
    ├── bundle.js            # Master production bundle (SQLite Database Engine + UI Controllers)
    ├── database.js          # Relational SQLite database engine with SQL parser and query runner
    ├── data.js              # Seed datasets for opportunities, student profile, skills, and apps
    ├── state.js             # Reactive store with localStorage sync
    ├── canvas3d.js          # Interactive 3D particle constellation & canvas graphics
    ├── eligibilityEngine.js # Live candidate eligibility calculator & circular gauge
    ├── skillUniverse.js     # Orbital skill constellation & learning roadmap explorer
    ├── applicationTracker.js# Recruitment pipeline manager & stage advancer
    ├── deadlineRadar.js     # Live countdown clocks & urgency telemetry
    ├── profileDashboard.js  # Student profile, NPTEL certificates & project showcase
    ├── ui.js                # Modal dialogue, toast engine, and search filters
    └── app.js               # ES module bootstrapper
```

---

## 🚀 Quick Start

Simply open `index.html` directly in any modern browser:
```bash
# Double-click or open directly via file path:
file:///C:/projects/interntrack/index.html
```

Or run via Python lightweight local server:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

---

## ⌨️ Keyboard Shortcuts
- `Ctrl + K`: Activate Live Opportunity Search
- `Ctrl + Shift + S`: Open SQLite Database Terminal & SQL Inspector
- `Esc`: Close any open modal dialogue

---

## 📄 License
MIT License • Built with pride for campus placement and internship excellence.
