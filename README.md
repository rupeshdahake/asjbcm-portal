# ASJBCM Competitive Exam Portal

Your complete exam preparation portal — main portal, exam prep book and a **11,782-question** MCQ bank with a strict-mode **Unique Mock Test** engine, in one static website ready to deploy on **Vercel** via **GitHub**.

## 📁 What's inside

| File | Purpose |
|------|---------|
| `index.html` | **Main portal** (login, dashboard, daily quiz, analytics, mock tests, admin panel…). The **Dashboard** shows the **Exam Prep Book** directly (no separate Book tab needed); the original subject pages live under the **📖 Other Subjects** tab; **🧠 MCQ Bank** sits right next to Dashboard in the top navigation. |
| `book.html` | Complete Exam Prep Book — 19 subjects, 163 chapters, bilingual notes + practice MCQs. Works fully offline. |
| `mcq.html` | MCQ Bank practice engine — browse subjects/chapters, instant answer feedback, explanations, PYQ tags, random 20-question Quick Quiz, progress saved per device. |
| `mock.html` | **Unique Mock Test engine (strict mode)** — generates a brand-new paper for every attempt (unique paper code, shuffled questions AND options), enforced full-screen, tab-switch / blur / fullscreen-exit / copy-paste / devtools detection with a 3-violation auto-submit, CBT-style question palette, negative marking toggle (0.25), countdown timer with auto-submit, subject-wise scorecard, violation log and full answer review. |
| `10000.json` | The merged question bank (11,782 MCQs across 19 subjects — original 10,517 + 1,265 additional practice MCQs) — loaded by `mcq.html` **and** `mock.html`. |

> No build step, no server code, no database. Pure static files — perfect for Vercel's free tier.

---

## 🚀 Step 1 — Push to GitHub

### Option A: Using the web interface (easiest, no tools needed)

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click the **+** icon (top-right) → **New repository**.
3. Name it e.g. `exam-portal`, keep it **Public** (or Private — Vercel supports both), do **not** tick "Add a README".
4. Click **Create repository**.
5. On the new repo page click **"uploading an existing file"**.
6. Drag & drop **all five files** (`index.html`, `book.html`, `mcq.html`, `mock.html`, `10000.json`) from this folder.
   - ⚠️ Upload all 5 together — the portal links to the other files by name.
7. Click **Commit changes**.

### Option B: Using Git from your computer

```bash
# inside this project folder
git init
git add .
git commit -m "ASJBCM Exam Portal with Book + MCQ Bank"
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
index.html  (main portal)
   ├── nav "Dashboard"        → book.html shown inside the portal (landing view)
   ├── nav "🧠 MCQ Bank"      → mcq.html    (iframe view inside the portal)
   │        ├── loads 10000.json (question data)
   │        └── "🏠 Portal" / "📚 Book" buttons in its header
   ├── nav "🧪 Mock Test"     → mock.html   (strict unique-paper mock exam, fullscreen iframe)
   │        ├── draws questions from 10000.json (unique set + shuffled options per attempt)
   │        └── full-screen enforcement · violation log · auto-submit · review
   └── nav "📖 Other Subjects" → the portal's own subject pages
            └── breadcrumbs: Other Subjects › Subject › Chapter
```

- Both book, MCQ bank and the mock engine also work as **standalone pages** (shareable direct links: `/book.html`, `/mcq.html`, `/mock.html`).
- Mock-test attempt history (paper code, score, violations) is stored per device in localStorage.
- User accounts, results and admin data in the portal are stored in the browser's **localStorage** on each device.
- MCQ Bank progress (answered/correct per chapter) is also saved per device.

## 🛠️ Local preview (before deploying)

Opening `index.html` directly from disk works in most browsers, but the MCQ Bank needs a web server for its JSON data. For a proper local preview:

```bash
# in this folder
python -m http.server 8000
# then open http://localhost:8000
```
