/**
 * ASJBCM Portal Backend Server
 * 
 * Provides:
 * 1. Static file serving for the HTML portal
 * 2. AI Chatbot API (/api/chat) — student queries, counselling, guidance
 * 3. Web Search API (/api/search) — govt vacancies, exam updates, current affairs
 * 4. Auto-update service — fetches latest exam notifications periodically
 * 
 * Powered by z-ai-web-dev-sdk (GLM-4 AI model + web search)
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import ZAI from 'z-ai-web-dev-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ============================================================
// Initialize ZAI SDK
// ============================================================
let zaiInstance = null;

async function initZAI() {
  try {
    zaiInstance = await ZAI.create();
    console.log('✅ ZAI SDK initialized — AI chatbot + web search ready');
  } catch (error) {
    console.error('❌ ZAI SDK initialization failed:', error.message);
    console.error('   Chatbot and web search will not be available.');
    console.error('   Make sure ZAI_API_KEY environment variable is set.');
  }
}

// ============================================================
// SYSTEM PROMPT for the AI Chatbot
// ============================================================
const CHATBOT_SYSTEM_PROMPT = `You are "ASJBCM Exam Guide", an AI assistant for the ASJBCM Competitive Exam Preparation Portal (Adarsha Science J.B.Arts & Birla Commerce Mahavidyalaya, Dhamangaon Rly).

Your role is to help students with:
1. EXAM GUIDANCE: Advise on which competitive exams to target based on student's interests, qualifications, and career goals (UPSC, MPSC, SSC, Banking, Railway, Defence, Teaching, etc.)
2. STUDY TIPS: Suggest preparation strategies, time management, subject-wise tips, book recommendations
3. SYLLABUS QUERIES: Explain exam patterns, syllabus topics, marking schemes for various exams
4. CAREER COUNSELLING: Help students choose between career paths (IAS vs IPS, Banking vs SSC, etc.)
5. DOUBT SOLVING: Answer academic questions on History, Geography, Polity, Economy, Science, Math, Reasoning, English
6. MOTIVATION: Encourage students, share success strategies, help with exam anxiety

IMPORTANT RULES:
- Always be supportive, encouraging, and professional
- Give practical, actionable advice
- When you don't know something, say so honestly
- Suggest the student check the Mock Test Center for practice tests
- Keep responses concise (max 3-4 paragraphs) unless student asks for detail
- If student asks about latest govt vacancies or current affairs, tell them to use the "Search Web" feature in the chat
- Respond in the same language the student uses (English, Hindi, or Marathi)`;

// ============================================================
// 1. AI CHATBOT ENDPOINT — /api/chat
// ============================================================
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!zaiInstance) {
      return res.status(503).json({ 
        error: 'AI service not available. Please try again later.',
        fallback: 'The AI chatbot is currently unavailable. Please contact your teacher for guidance.'
      });
    }

    // Build conversation messages
    const messages = [
      { role: 'assistant', content: CHATBOT_SYSTEM_PROMPT },
      ...history.slice(-8).map(h => ({
        role: h.role || 'user',
        content: h.content || ''
      })),
      { role: 'user', content: message }
    ];

    const completion = await zaiInstance.chat.completions.create({
      messages: messages,
      thinking: { type: 'disabled' }
    });

    const response = completion.choices?.[0]?.message?.content;

    if (!response || response.trim().length === 0) {
      return res.json({
        response: 'I apologize, but I could not generate a response. Please try rephrasing your question.',
        source: 'ai'
      });
    }

    res.json({
      response: response,
      source: 'ai',
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Chat API error:', error.message);
    res.status(500).json({
      error: 'Failed to process chat request',
      fallback: 'I am having trouble responding right now. Please try again in a moment.'
    });
  }
});

// ============================================================
// 2. WEB SEARCH ENDPOINT — /api/search
// ============================================================
app.post('/api/search', async (req, res) => {
  try {
    const { query, num = 10, recency_days } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    if (!zaiInstance) {
      return res.status(503).json({ 
        error: 'Search service not available. Please try again later.'
      });
    }

    const searchArgs = {
      query: query,
      num: Math.min(num, 20)
    };

    if (recency_days) {
      searchArgs.recency_days = recency_days;
    }

    const results = await zaiInstance.functions.invoke('web_search', searchArgs);

    if (!Array.isArray(results)) {
      return res.json({ results: [], summary: 'No results found.' });
    }

    // Format results
    const formatted = results.map((item, index) => ({
      position: index + 1,
      title: item.name || 'Untitled',
      url: item.url || '',
      description: item.snippet || '',
      domain: item.host_name || '',
      date: item.date || ''
    }));

    // Generate AI summary of search results
    let summary = '';
    try {
      const searchContext = results.slice(0, 5)
        .map(r => `${r.name}: ${r.snippet}`)
        .join('\n');

      const summaryCompletion = await zaiInstance.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'You are a helpful assistant. Summarize the search results in 2-3 sentences. Focus on the most important and recent information.' },
          { role: 'user', content: `Search query: "${query}"\n\nResults:\n${searchContext}` }
        ],
        thinking: { type: 'disabled' }
      });
      summary = summaryCompletion.choices?.[0]?.message?.content || '';
    } catch (e) {
      summary = 'Summary unavailable.';
    }

    res.json({
      query: query,
      results: formatted,
      summary: summary,
      totalResults: formatted.length,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Search API error:', error.message);
    res.status(500).json({
      error: 'Failed to perform web search',
      fallback: 'Search is currently unavailable. Please try again later.'
    });
  }
});

// ============================================================
// 3. QUICK EXAM UPDATES ENDPOINT — /api/exam-updates
// ============================================================
app.get('/api/exam-updates', async (req, res) => {
  try {
    if (!zaiInstance) {
      return res.status(503).json({ error: 'Service not available' });
    }

    // Search for latest govt job vacancies and exam notifications
    const queries = [
      'latest government job vacancies 2026 India',
      'upcoming competitive exams 2026 India notification',
      'MPSC recruitment 2026 notification',
      'SSC exam calendar 2026',
      'IBPS banking exam 2026 notification'
    ];

    const allResults = [];

    for (const q of queries.slice(0, 3)) { // Limit to 3 queries for speed
      try {
        const results = await zaiInstance.functions.invoke('web_search', {
          query: q,
          num: 5,
          recency_days: 30
        });
        if (Array.isArray(results)) {
          results.forEach(r => allResults.push({
            title: r.name,
            url: r.url,
            description: r.snippet,
            source: r.host_name,
            date: r.date
          }));
        }
      } catch (e) {
        console.error(`Search failed for "${q}":`, e.message);
      }
    }

    // Deduplicate by URL
    const seen = new Set();
    const unique = allResults.filter(r => {
      if (seen.has(r.url)) return false;
      seen.add(r.url);
      return true;
    });

    // Generate summary
    let summary = '';
    try {
      const context = unique.slice(0, 8)
        .map(r => `${r.title}: ${r.description}`)
        .join('\n');

      const summaryCompletion = await zaiInstance.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'Summarize the latest government job vacancies and exam notifications in India. Highlight important dates, exam names, and application deadlines. Keep it concise.' },
          { role: 'user', content: context }
        ],
        thinking: { type: 'disabled' }
      });
      summary = summaryCompletion.choices?.[0]?.message?.content || '';
    } catch (e) {}

    res.json({
      updates: unique.slice(0, 15),
      summary: summary,
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Exam updates error:', error.message);
    res.status(500).json({ error: 'Failed to fetch exam updates' });
  }
});

// ============================================================
// 4. HEALTH CHECK — /api/health
// ============================================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    aiReady: !!zaiInstance,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ============================================================
// 5. SERVE STATIC PORTAL HTML
// ============================================================
app.use(express.static(path.join(__dirname, '..', 'public'), {
  index: 'index.html',
  maxAge: '1h'
}));

// Catch-all: serve index.html for any non-API route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ============================================================
// START SERVER
// ============================================================
async function start() {
  await initZAI();
  
  app.listen(PORT, () => {
    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('  ASJBCM Portal Backend Server');
    console.log('═══════════════════════════════════════════════════');
    console.log(`  🌐 Portal:     http://localhost:${PORT}`);
    console.log(`  🤖 Chatbot:    http://localhost:${PORT}/api/chat`);
    console.log(`  🔍 Web Search: http://localhost:${PORT}/api/search`);
    console.log(`  📢 Updates:    http://localhost:${PORT}/api/exam-updates`);
    console.log(`  ❤️  Health:     http://localhost:${PORT}/api/health`);
    console.log('═══════════════════════════════════════════════════');
    console.log('');
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
