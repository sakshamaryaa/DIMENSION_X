// Serverless AI proxy endpoint (Vercel / Node-compatible).
// Secret keys are read exclusively from server-side environment variables.
// Never expose GEMINI_API_KEY or OPENAI_API_KEY in client bundles.

export default async function handler(req: { method?: string; body?: Record<string, unknown> }, res: {
  status: (code: number) => { json: (data: unknown) => void };
}) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (req.method === 'GET') {
    const configured = Boolean(geminiKey || openaiKey);
    return res.status(200).json({
      configured,
      provider: geminiKey ? 'gemini' : openaiKey ? 'openai' : null,
      message: configured
        ? 'Live AI scientific interpretation service connected.'
        : 'No live AI provider key configured on server. Deterministic engines remain operational.',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!geminiKey && !openaiKey) {
    return res.status(503).json({
      configured: false,
      error: 'AI_SERVICE_UNCONFIGURED',
      message:
        'Live LLM service is not configured on the server. Set GEMINI_API_KEY or OPENAI_API_KEY to enable live natural-language AI interpretation.',
    });
  }

  const prompt = String(req.body?.prompt ?? '').slice(0, 4000);
  const context = req.body?.deterministicContext
    ? `\n\nDeterministic Engine Output:\n${JSON.stringify(req.body.deterministicContext)}`
    : '';
  const systemPrompt =
    'You are DIMENSION X AI Scientific Copilot. Explain concepts rigorously, reference NCERT Class XI Mathematics & Physics principles, state assumptions and SI units clearly, and NEVER invent numerical results — defer all numbers to the deterministic calculation output provided.';

  try {
    if (geminiKey) {
      const apiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ parts: [{ text: prompt + context }] }],
          }),
        }
      );
      const data = await apiRes.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Unable to parse Gemini response.';
      return res.status(apiRes.ok ? 200 : apiRes.status).json({
        configured: true,
        provider: 'gemini',
        response: text,
      });
    }

    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt + context },
        ],
      }),
    });
    const data = await apiRes.json();
    const text =
      data?.choices?.[0]?.message?.content ?? 'Unable to parse OpenAI response.';
    return res.status(apiRes.ok ? 200 : apiRes.status).json({
      configured: true,
      provider: 'openai',
      response: text,
    });
  } catch (err) {
    return res.status(500).json({
      configured: false,
      error: 'AI_PROXY_ERROR',
      message: err instanceof Error ? err.message : 'Unexpected server error',
    });
  }
}
