# ASJBCM Competitive Exam Portal — v3.0

Your complete exam preparation portal — main portal, exam prep book and an **11,898-question** MCQ bank (incl. **59 diagram/chart/table questions** and **57 essay/passage questions**) with **admin-only mock-test paper setting**, in one static website ready to deploy on **Vercel** via **GitHub**.

> **v3.0 role-based experience**
> - **Student login** → clean 4-tab bar: Dashboard (the Book) · 🎯 Daily · 📖 Other Subjects · 🏆 Results — plus a "⋯ More" dropdown for the extra tools. **No Mock Test tab.**
> - **Admin login** → 5-tab bar incl. 🧪 **Mock Test** and 🛠️ **Admin Panel**. **Only the admin sets question papers.**
> - Students see assigned papers through a floating **"📝 N tests assigned by Admin"** button on the Dashboard (appears only when the admin has set papers) and can unlock papers with an `ASJP1-` code.

## 🔐 Administrator account

| Login | Password |
|-------|----------|
| `administrator@asjbcm.edu` | `Vision@2026` |

**Admin workflow — set a paper for students:**
1. Sign in as the administrator → **🧪 Mock Test** tab (admin-only) or **Admin Panel → 📝 Mock Papers**.
2. **➕ Set New Paper**: title, duration, negative marking, language (English / हिंदी-मराठी / All), subject scope + question count, plus optional 📊 diagram/chart and 📝 essay/passage questions.
3. **Create** → the paper instantly appears for students: Dashboard shows the **"📝 tests assigned by Admin — Start now"** button; inside, only admin-set papers are listed.
4. To assign the paper on **other devices**, press **📋 Copy Paper Code** (`ASJP1-…`) and send it to students — they unlock it via **"Have a paper code?"**.
5. Five official papers (Full Mock, Rapid 25, Diagram·Chart·Data Special, Essay & Comprehension, हिंदी माध्यम) are built in — visible to the **admin** in the Mock Test tab; students practice the papers you assign them.

## 📁 What's inside

| File | Purpose |
|------|---------|
| `index.html` | **Main portal v3.0** (role-based nav, login, dashboard, daily quiz, results, admin panel…). The **Dashboard** shows the **Exam Prep Book**; subject pages live under **📖 Other Subjects**; secondary tools (Analytics, Vocab, Flashcards, PYQs, Videos, Affairs, Timer, Checklist, Scholarships, Career, Jobs, Exam Center, Scheduled) are grouped in **⋯ More**. |
| `book.html` | Complete Exam Prep Book — 19 subjects, 174 chapters, bilingual notes + practice MCQs + photo/diagram galleries. Hero links straight to the 📊 visual-chapter and ✍️ essay-chapter practice sets. Works fully offline. |
| `mcq.html` | Standalone MCQ practice engine (direct link; no portal tab) — 174 chapters, instant feedback, explanations, 📊 figure & 📝 passage questions. Deep-link any chapter: `mcq.html?chapter=<chapter-id>`. |
| `mock.html` | **Mock Test engine (strict mode) — papers set by admin only**. Admins see official + admin-set papers; **students see only the papers the admin set** (+ code-unlocked). Every attempt shuffles questions AND options (unique paper code), enforced full-screen, tab-switch / blur / fullscreen-exit / copy-paste / devtools detection with 3-violation auto-submit, CBT palette, countdown timer, subject-wise scorecard, violation log, full answer review. Renders 📊 diagram/chart/table and 📝 essay/passage questions. Deep-link a paper: `mock.html?paper=<paper-id>`. |
| `admin.html` | **Admin-only Mock Paper Setter** — compose papers from the question bank (duration, negative marking, language, subject scope, fig/essay counts), manage the paper list, export/import `ASJP1-` codes. Verifies the signed-in admin from the portal session; students opening it see "Admin access only". |
| `10000.json` | The merged question bank — **11,898 MCQs, 19 subjects, 174 chapters**: original 10,517 + 1,265 practice + **59 figure-based** (bar/double-bar/pie/line charts, data tables, circuits, maps, seating diagrams, flowcharts, topology…) + **57 essay/passage-based** MCQs across 11 exam-style passages; every question language-tagged en/hi. |

**Where are the diagram / chart / table MCQs?** In the bank under these chapters (browse via the Book hero links or `mcq.html?chapter=…`):
- Quantitative Aptitude → *Data Interpretation — Visual* (19: bar, double-bar, pie, line charts + data tables)
- Reasoning → *Visual Reasoning Diagrams* (22: seating, family tree, Venn, direction, series…)
- Science → *Science Diagram Questions* (10: circuits, water cycle, food chain, thermometer…)
- Computer → *Computer Tables & Topology* (8: shortcut tables, storage ladder, star/bus topology…)

**Where are the essay-based questions?** 57 passage-based MCQs (each shows a full exam-style passage + comprehension/analysis questions) under *Essay-Passage MCQs* and six subject sets (Polity, History, Geography, Science, Banking, Current Affairs). They also appear in mock papers the admin composes with 📝 essay/passage questions.

> No build step, no server code, no database. Pure static files — perfect for Vercel's free tier.

---

## 🚀 Step 1 — Push to GitHub

### Option A: Using the web interface (easiest, no tools needed)

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click the **+** icon (top-right) → **New repository**.
3. Name it e.g. `exam-portal`, keep it **Public** (or Private — Vercel supports both), do **not** tick "Add a README".
4. Click **Create repository**.
5. On the new repo page click **"uploading an existing file"**.
6. Drag & drop **all six files** (`index.html`, `book.html`, `mcq.html`, `mock.html`, `admin.html`, `10000.json`) **plus the `images/` folder** from this folder.
   - ⚠️ Upload all 6 files + `images/` together — the pages link to each other by name and to `images/*`.
7. Click **Commit changes**.

### Option B: Using Git from your computer

```bash
# inside this project folder
git init
git add .
git commit -m "ASJBCM Exam Portal v3.0"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/exam-portal.git
git push -u origin main
```

---

## ▲ Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and **Sign up with GitHub** (uses the same account).
2. Click **Add New… → Project**.
3. Find your `exam-portal` repository in the list and click **Import**.
   (First time? Click **Adjust GitHub App Permissions** and grant Vercel access to the repo.)
4. Configure — everything can stay default:
   - **Framework Preset:** *Other* (auto-detected as static)
   - **Build Command:** *(leave empty)*
   - **Output Directory:** *(leave empty)*
   - **Root Directory:** *(leave empty)*
5. Click **Deploy** and wait ~30 seconds.
6. Done 🎉 Your portal is live at `https://exam-portal-<your-name>.vercel.app`

### Custom domain (optional)
In the Vercel dashboard → your project → **Settings → Domains** → add your domain and follow the DNS instructions.

### Updating the site later
Just replace/edit the files and push (or upload) again — Vercel redeploys automatically on every commit.

```bash
git add .
git commit -m "Update content"
git push
```

---

## 🌐 How the pieces connect

```
index.html  (main portal, role-based nav)
   ├── STUDENT: Dashboard (book.html) · 🎯 Daily · 📖 Other Subjects · 🏆 Results · ⋯ More
   │        └── floating "📝 tests assigned by Admin" button when the admin has set papers
   ├── ADMIN:   Dashboard · 🧪 Mock Test · 🛠️ Admin Panel · 📖 Other Subjects · 🎯 Daily · 🏆 Results · ⋯ More
   ├── 🧪 Mock Test (admin-only tab) → mock.html
   │        ├── admin: official + admin-set papers · 🛠️ Paper Setter link · ASJP1- codes
   │        ├── student (via assigned button): ONLY admin-set papers + code unlock
   │        ├── draws questions from 10000.json (shuffled questions + options per attempt)
   │        ├── renders 📊 chart/table/diagram and 📝 essay/passage questions
   │        └── full-screen enforcement · violation log · auto-submit · review
   ├── Admin Panel → tabs incl. 📝 Mock Papers → admin.html (session-guarded)
   └── Book hero links → mcq.html?chapter=data-interpretation-visual / visual-reasoning-diagrams / essay-passage-mcqs
```

- Book, MCQ engine, admin setter and mock engine also work as **standalone pages** (`/book.html`, `/mcq.html`, `/admin.html`, `/mock.html`).
- **Only admins can set papers** — enforced in `admin.html` (session check) and in `mock.html` (students get no paper configuration and do not see the Mock Test tab at all).
- Papers set in the Admin Panel are stored per device in localStorage; use **paper codes** (`ASJP1-…`) to assign them on other devices.
- Mock-test attempt history (paper code, score, violations) is stored per device in localStorage.
- User accounts, results and admin data in the portal are stored in the browser's **localStorage** on each device.

## 🛠️ Local preview (before deploying)

Opening `index.html` directly from disk works in most browsers, but the question bank needs a web server for its JSON data. For a proper local preview:

```bash
# in this folder
python -m http.server 8000
# then open http://localhost:8000
```
