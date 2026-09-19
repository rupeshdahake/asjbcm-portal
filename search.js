/**
 * Vercel Serverless Function: /api/search
 * Web search endpoint using z-ai-web-dev-sdk
 */

const ZAI = require('z-ai-web-dev-sdk').default;

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, num = 10, recency_days } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const zai = await ZAI.create();

    const searchArgs = {
      query: query,
      num: Math.min(num, 20)
    };

    if (recency_days) {
      searchArgs.recency_days = recency_days;
    }

    const results = await zai.functions.invoke('web_search', searchArgs);

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

    // Generate AI summary
    let summary = '';
    try {
      const searchContext = results.slice(0, 5)
        .map(r => `${r.name}: ${r.snippet}`)
        .join('\n');

      const summaryCompletion = await zai.chat.completions.create({
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

    return res.json({
      query: query,
      results: formatted,
      summary: summary,
      totalResults: formatted.length,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Search API error:', error.message);
    return res.status(500).json({
      error: 'Failed to perform web search',
      fallback: 'Search is currently unavailable.'
    });
  }
};
