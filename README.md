# ASJBCM Competitive Exam Portal — v4.0

Your complete exam preparation portal — main portal, exam prep book and a **21,635-question** MCQ bank (incl. **155+ inline-SVG chart/diagram questions**, **100 table-based questions** and **passage + descriptive essay questions with model answers**), built around **two student login modes — Study Mode & Exam Mode — with teacher/admin-only paper setting**, in one static website ready to deploy on **Vercel** via **GitHub**.

> **v4.0 — two-mode student experience (no separate Mock Test tab anywhere)**
> - **Student → Study Mode login** → the Book (with in-chapter MCQ practice), 🎯 Daily, 📖 Other Subjects, 🏆 Results and the full 20K+ practice bank. Self-paced learning only.
> - **Student → Exam Mode login** → **Exam Mode — Practice Papers**: papers **set by the Teacher/Admin** appear at the top and run in a strict locked exam environment (fullscreen, tab-switch & copy-paste detection, timer, negative marking). Self-practice model papers are listed below them.
> - **Admin login** → 🛠️ Admin Panel: **📝 Set Practice Paper** (papers go straight to Exam-Mode students), **📚 Content (Add/Edit)** for manual book-content addition, **❓ MCQs (Add/Edit)** for manual question addition, students, results, logs, backup & deploy. **No Mock Test tab — papers are set from the Admin Panel only.**
> - Every exam attempt is bridged into the portal results store, so **teachers see student scores in Admin → Results**.

## 🔐 Administrator account

| Login | Password |
|-------|----------|
| `administrator@asjbcm.edu` | `Vision@2026` |

**Teacher workflow — set a practice paper for students:**
1. Sign in as the administrator → **🛠️ Admin Panel → 📝 Set Practice Paper**.
2. **➕ Set New Paper**: title, duration, negative marking, language (English / हिंदी-मराठी / All), subject scope + question count, plus optional 📊 diagram/chart and 📝 essay/passage questions.
3. **Create** → the paper is instantly assigned: every student who logs in via **Exam Mode** sees it at the top of **🎯 Exam Mode — Practice Papers** (and a floating "📝 N practice papers set by your Teacher" button appears on the Study-Mode dashboard).
4. To assign on **other devices**, press **📋 Copy Paper Code** (`ASJP1-…`) and send it to students — they unlock it via **"Have a paper code?"** inside the runner.
5. Students' attempts appear in **Admin Panel → 🏆 Results** automatically.

**Admin content & question additions (manual):**
- **❓ MCQs (Add/Edit)** — add single MCQs or paste bulk questions, tag subject/chapter, edit or retire existing ones (stored as an overlay on top of the built-in bank, exportable via Backup).
- **📚 Content (Add/Edit)** — add whole chapters / notes to the book (bilingual), edit existing ones.

## 📁 What's inside

| File | Purpose |
|------|---------|
| `index.html` | **Main portal v4.0** — login (Study / Exam / Admin), role-based nav, dashboard, daily quiz, results, admin panel. The **Dashboard** shows the **Exam Prep Book**; the 20K+ practice bank is one tap away; exam-mode students get the paper runner. |
| `book.html` | Complete Exam Prep Book — 19 subjects, bilingual notes + practice MCQs + photo/diagram galleries. Hero links straight to the 📊 visual-chapter and ✍️ essay-chapter practice sets. Works fully offline. |
| `mcq.html` | Standalone MCQ practice engine — instant feedback, explanations, 📊 figure, 📋 table and 📝 passage questions, plus **✍️ Descriptive practice** (essay questions with show/hide model answers). Deep-link any chapter: `mcq.html?chapter=<chapter-id>`. |
| `mock.html` | **Practice-paper runner (strict mode)** — consumes only teacher-set papers (from the Admin Panel) + self-practice model papers. Unique shuffled paper per attempt, enforced fullscreen, 3-violation auto-submit, countdown timer, negative marking, subject-wise scorecard, answer review. Results are pushed into the portal results store for the teacher. Deep-link: `mock.html?paper=<paper-id>&student=<name>&auto=1`. |
| `admin.html` | **Admin Practice Paper Setter** — compose papers from the question bank (duration, negative marking, language, subject scope, fig/essay counts), manage the paper list, export/import `ASJP1-` codes. Verifies the signed-in admin from the portal session; students opening it see "Admin access only". |
| `10000.json` | The unified question bank — **21,635 MCQs, 19 subjects, ~200 chapters**: the original bilingual bank + ~9.7K new practice questions (arithmetic, reasoning, vocabulary/grammar, GK/polity/history/geo/science/computer/banking facts, Marathi-medium Maharashtra GK) + **chart/table/diagram questions (inline SVG & HTML tables)** + **passage-MCQ sets** + **12 descriptive essay questions with model answers**. Every question language-tagged; **all Marathi/Hindi-medium questions consolidated under the Marathi subjects** (clean language-wise bank). |

**Where are the diagram / chart / table MCQs?** Browse via the Book hero links or `mcq.html?chapter=…`:
- Quantitative Aptitude → *Data Interpretation — Visual* (bar, double-bar, pie, line charts) and *Data Interpretation* (tables)
- Reasoning → *Series*, *Coding–Decoding*, *Analogy*, *Direction Sense* (incl. figure-based items)
- Science → *Science Diagram Questions* (labelled heart / flower / plant-cell schematics)

**Where are the essay-based questions?** Two kinds:
1. **Passage-MCQs** (exam-style passage + comprehension questions) under *Essay-Passage MCQs* and six subject sets — auto-graded.
2. **Descriptive essays with model answers** (✍️) under each subject's *Descriptive / Essay Practice* chapter in `mcq.html` — write your answer, then reveal the model answer.

> No build step, no server code, no database. Pure static files — perfect for Vercel's free tier.

---

## 🚀 Step 1 — Push to GitHub

### Option A: Using the web interface (easiest, no tools needed)

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click **New repository** → name it `asjbcm-portal` → **Create**.
3. Click **uploading an existing file**, then drag the **contents** of this folder (all files — keep `images/` as a folder) into the page.
4. Click **Commit changes** and wait for the upload to finish.

### Option B: Using Git commands

```bash
cd exam-portal
git init
git add .
git commit -m "ASJBCM Exam Portal v4.0 — 21.6K bank, Study/Exam modes, admin paper setter"
git branch -M main
git remote add origin https://github.com/<your-username>/asjbcm-portal.git
git push -u origin main
```

> `.gitignore` is included — it keeps OS junk out of the repo.

## ▲ Step 2 — Deploy on Vercel (free)

1. Go to [vercel.com](https://vercel.com) → **Sign up with GitHub**.
2. **Add New… → Project** → Import `asjbcm-portal`.
3. Framework preset: **Other** (pure static). Leave build settings empty.
4. **Deploy** → in ~30 seconds your portal is live at `https://asjbcm-portal.vercel.app`.

## 💾 Offline use

Download `exam-portal.zip` (or `exam-portal-core.zip` + `exam-portal-images.zip`), unzip anywhere and open `index.html` through a local server (`python -m http.server`) — everything works without internet.
