# ASJBCM Competitive Exam Portal

Your complete exam preparation portal — main portal, exam prep book and an **11,898-question** MCQ bank with **admin-set Mock Test papers** (strict mode), in one static website ready to deploy on **Vercel** via **GitHub**.

## 🔐 Administrator account

| Login | Password |
|-------|----------|
| `administrator@asjbcm.edu` | `Vision@2026` |

Only the administrator sees the **Admin Panel** (👥 students, 📝 **Mock Papers**, 📅 scheduled exams…). **Only the admin can set mock-test question papers** — students see the assigned papers in the 🧪 Mock Test tab and cannot generate papers themselves.

**Admin workflow — set a paper:**
1. Sign in as the administrator → **Admin Panel → 📝 Mock Papers**.
2. **➕ Set New Paper**: title, duration, negative marking, language (English / हिंदी-मराठी / All), subject scope + question count, plus optional 📊 diagram/chart and 📝 essay/passage questions.
3. **Create** → the paper instantly appears in students' Mock Test tab (same device/installation).
4. To assign the paper on **other devices**, press **📋 Copy Paper Code** (`ASJP1-…`) and send it to students — they unlock it in **Mock Test → "Have a paper code?"**.
5. Five official papers (Full Mock, Rapid 25, Diagram·Chart·Data Special, Essay & Comprehension, हिंदी माध्यम) are built in and available to every student out of the box.

## 📁 What's inside

| File | Purpose |
|------|---------|
| `index.html` | **Main portal** (login, dashboard, daily quiz, results, admin panel…). The **Dashboard** shows the **Exam Prep Book** directly; the original subject pages live under the **📖 Other Subjects** tab. (The old MCQ Bank tab was removed — its content already lives inside the Book.) |
| `book.html` | Complete Exam Prep Book — 19 subjects, 170 chapters, bilingual notes + practice MCQs + photo/diagram galleries. Works fully offline. |
| `mcq.html` | Standalone MCQ practice engine (kept for direct-link use; no longer in the portal nav) — browse subjects/chapters, instant feedback, explanations, figure & passage questions. |
| `mock.html` | **Mock Test engine (strict mode) — papers set by admin only** — students pick an assigned paper (official + admin-set + code-unlocked), every attempt shuffles questions AND options (unique paper code), enforced full-screen, tab-switch / blur / fullscreen-exit / copy-paste / devtools detection with a 3-violation auto-submit, CBT-style question palette, countdown timer with auto-submit, subject-wise scorecard, violation log and full answer review. Renders 📊 diagram/chart/table and 📝 essay/passage questions. |
| `admin.html` | **Admin-only Mock Paper Setter** — compose papers from the question bank (duration, negative marking, language, subject scope, fig/essay counts), manage the paper list, export/import `ASJP1-` paper codes. Verifies the signed-in admin from the portal session; students opening it see "Admin access only". |
| `10000.json` | The merged question bank (11,898 MCQs across 19 subjects — original 10,517 + 1,265 practice + 59 figure-based (charts/tables/diagrams) + 57 essay/passage-based MCQs; every question language-tagged en/hi) — loaded by `mock.html`, `admin.html`, `mcq.html`. |

> No build step, no server code, no database. Pure static files — perfect for Vercel's free tier.

---

## 🚀 Step 1 — Push to GitHub

### Option A: Using the web interface (easiest, no tools needed)

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click the **+** icon (top-right) → **New repository**.
3. Name it e.g. `exam-portal`, keep it **Public** (or Private — Vercel supports both), do **not** tick "Add a README".
4. Click **Create repository**.
5. On the new repo page click **"uploading an existing file"**.
6. Drag & drop **all six files** (`index.html`, `book.html`, `mcq.html`, `mock.html`, `admin.html`, `10000.json`) from this folder.
   - ⚠️ Upload all 6 together — the portal links to the other files by name.
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
   │        └── the book already contains MCQ practice (that's why the MCQ Bank tab was removed)
   ├── nav "🧪 Mock Test"     → mock.html   (papers SET BY ADMIN only, strict mode, fullscreen iframe)
   │        ├── loads admin-set papers + official papers; ASJP1- code unlock
   │        ├── draws questions from 10000.json (shuffled questions + options per attempt)
   │        ├── renders 📊 chart/table/diagram and 📝 essay/passage questions
   │        └── full-screen enforcement · violation log · auto-submit · review
   ├── nav "🗓️ Scheduled"     → admin-scheduled timed exams (existing feature)
   ├── nav "Admin Panel"      → admin role only → tabs incl. 📝 Mock Papers → admin.html
   └── nav "📖 Other Subjects" → the portal's own subject pages
            └── breadcrumbs: Other Subjects › Subject › Chapter
```

- Book, MCQ bank (direct link), admin panel and the mock engine also work as **standalone pages** (`/book.html`, `/mcq.html`, `/admin.html`, `/mock.html`).
- **Only admins can set papers** — enforced in `admin.html` (session check) and in `mock.html` (no self-serve generator for students).
- Papers set in the Admin Panel are stored per device in localStorage; use **paper codes** (`ASJP1-…`) to assign them on other devices.
- Mock-test attempt history (paper code, score, violations) is stored per device in localStorage.
- User accounts, results and admin data in the portal are stored in the browser's **localStorage** on each device.

## 🛠️ Local preview (before deploying)

Opening `index.html` directly from disk works in most browsers, but the MCQ Bank needs a web server for its JSON data. For a proper local preview:

```bash
# in this folder
python -m http.server 8000
# then open http://localhost:8000
```
