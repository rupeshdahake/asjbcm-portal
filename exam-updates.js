/**
 * Vercel Serverless Function: /api/exam-updates
 * Fetches latest government job vacancies and exam notifications
 */

const ZAI = require('z-ai-web-dev-sdk').default;

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const zai = await ZAI.create();

    const queries = [
      'latest government job vacancies 2026 India',
      'upcoming competitive exams 2026 India notification',
      'SSC IBPS MPSC exam 2026 notification'
    ];

    const allResults = [];

    for (const q of queries) {
      try {
        const results = await zai.functions.invoke('web_search', {
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

      const summaryCompletion = await zai.chat.completions.create({
        messages: [
          { role: 'assistant', content: 'Summarize the latest government job vacancies and exam notifications in India. Highlight important dates and exam names.' },
          { role: 'user', content: context }
        ],
        thinking: { type: 'disabled' }
      });
      summary = summaryCompletion.choices?.[0]?.message?.content || '';
    } catch (e) {}

    return res.status(200).json({
      updates: unique.slice(0, 15),
      summary: summary,
      fetchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Exam updates error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch exam updates' });
  }
};
