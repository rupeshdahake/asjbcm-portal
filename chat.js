/**
 * Vercel Serverless Function: /api/chat
 * AI Chatbot endpoint using z-ai-web-dev-sdk
 */

const ZAI = require('z-ai-web-dev-sdk').default;

const SYSTEM_PROMPT = `You are "ASJBCM Exam Guide", an AI assistant for the ASJBCM Competitive Exam Preparation Portal (Adarsha Science J.B.Arts & Birla Commerce Mahavidyalaya, Dhamangaon Rly).

Your role is to help students with:
1. EXAM GUIDANCE: Advise on which competitive exams to target (UPSC, MPSC, SSC, Banking, Railway, Defence, Teaching, etc.)
2. STUDY TIPS: Preparation strategies, time management, subject-wise tips, book recommendations
3. SYLLABUS QUERIES: Exam patterns, syllabus topics, marking schemes
4. CAREER COUNSELLING: Help choose between career paths
5. DOUBT SOLVING: Answer academic questions on History, Geography, Polity, Economy, Science, Math, Reasoning, English
6. MOTIVATION: Encourage students, share success strategies

IMPORTANT RULES:
- Always be supportive, encouraging, and professional
- Give practical, actionable advice
- Keep responses concise (max 3-4 paragraphs)
- Respond in the same language the student uses (English, Hindi, or Marathi)`;

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize ZAI SDK
    const zai = await ZAI.create();

    // Build conversation messages
    const messages = [
      { role: 'assistant', content: SYSTEM_PROMPT },
      ...history.slice(-8).map(h => ({
        role: h.role || 'user',
        content: h.content || ''
      })),
      { role: 'user', content: message }
    ];

    const completion = await zai.chat.completions.create({
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

    return res.json({
      response: response,
      source: 'ai',
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Chat API error:', error.message);
    return res.status(500).json({
      error: 'Failed to process chat request',
      fallback: 'I am having trouble responding right now. Please try again in a moment.'
    });
  }
};
