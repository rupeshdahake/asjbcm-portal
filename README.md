# ASJBCM Competitive Exam Portal

Your complete exam preparation portal — main portal, exam prep book and a 10,517-question MCQ bank in one static website, ready to deploy on **Vercel** via **GitHub**.

## 📁 What's inside

| File | Purpose |
|------|---------|
| `index.html` | **Main portal** (login, dashboard, daily quiz, analytics, mock tests, admin panel…). The **Dashboard** shows the **Exam Prep Book** directly (no separate Book tab needed); the original subject pages live under the **📖 Other Subjects** tab; **🧠 MCQ Bank** sits right next to Dashboard in the top navigation. |
| `book.html` | Complete Exam Prep Book — 19 subjects, 163 chapters, bilingual notes + practice MCQs. Works fully offline. |
| `mcq.html` | MCQ Bank practice engine — browse subjects/chapters, instant answer feedback, explanations, PYQ tags, random 20-question Quick Quiz, progress saved per device. |
| `10000.json` | The question bank data (10,517 MCQs across 19 subjects) — loaded by `mcq.html`. |

> No build step, no server code, no database. Pure static files — perfect for Vercel's free tier.

---

## 🚀 Step 1 — Push to GitHub

### Option A: Using the web interface (easiest, no tools needed)

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click the **+** icon (top-right) → **New repository**.
3. Name it e.g. `exam-portal`, keep it **Public** (or Private — Vercel supports both), do **not** tick "Add a README".
4. Click **Create repository**.
5. On the new repo page click **"uploading an existing file"**.
6. Drag & drop **all four files** (`index.html`, `book.html`, `mcq.html`, `10000.json`) from this folder.
   - ⚠️ Upload all 4 together — the portal links to the other files by name.
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
   └── nav "📖 Other Subjects" → the portal's own subject pages
            └── breadcrumbs: Other Subjects › Subject › Chapter
```

- Both book and MCQ bank also work as **standalone pages** (shareable direct links: `/book.html`, `/mcq.html`).
- User accounts, results and admin data in the portal are stored in the browser's **localStorage** on each device.
- MCQ Bank progress (answered/correct per chapter) is also saved per device.

## 🛠️ Local preview (before deploying)

Opening `index.html` directly from disk works in most browsers, but the MCQ Bank needs a web server for its JSON data. For a proper local preview:

```bash
# in this folder
python -m http.server 8000
# then open http://localhost:8000
```
