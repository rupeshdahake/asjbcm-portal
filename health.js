/**
 * Vercel Serverless Function: /api/health
 */

module.exports = async (req, res) => {
  res.status(200).json({
    status: 'ok',
    aiReady: true,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    platform: 'vercel'
  });
};
