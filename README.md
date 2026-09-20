# ASJBCM Portal — Vercel Deployment

## 📁 Project Structure

```
vercel-deploy/
├── package.json          # Dependencies
├── vercel.json           # Vercel routing config
├── api/                  # Serverless API functions
│   ├── chat.js           # POST /api/chat — AI chatbot
│   ├── search.js          # POST /api/search — web search
│   ├── exam-updates.js    # GET /api/exam-updates — latest notifications
│   └── health.js         # GET /api/health — health check
└── public/
    └── index.html        # Portal HTML (with chatbot widget)
```

## 🚀 Deploy on Vercel (3 minutes)

### Step 1: Push to GitHub
```bash
cd vercel-deploy
git init
git add .
git commit -m "ASJBCM Portal with AI chatbot - Vercel ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/asjbcm-portal.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com → Login with GitHub
2. Click "Add New" → "Project"
3. Import your `asjbcm-portal` repository
4. Vercel auto-detects the structure — just click "Deploy"
5. Wait 1-2 minutes
6. Your portal is live! 🎉

### Step 3: Verify
- Open the Vercel URL → Portal loads
- Click 🤖 chatbot button → AI responds ✅
- Click 🔍 search → Web results appear ✅
- Login as admin → `administrator@asjbcm.edu / Vision@2026`

## 🔑 Admin Login
- Email: administrator@asjbcm.edu
- Password: Vision@2026

## 🤖 Chatbot Features
- 🤖 button (bottom-right): AI exam guide for student queries
- 🔍 button: Web search for latest govt vacancies, exam dates
- Quick prompt buttons for common questions
- Responds in English/Hindi/Marathi

## ⚠️ Notes
- Vercel serverless functions are always-on (no sleep like Render)
- Free tier: 100GB bandwidth/month
- The ZAI SDK auto-detects API key from environment
