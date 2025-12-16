import OpenAI from "openai";

export async function handler(event, context) {
  try {
    const { assessment } = JSON.parse(event.body);

    // Fetch Thinkific programs
    const THINKIFIC_API_KEY = process.env.THINKIFIC_API_KEY;
    const SUBDOMAIN = process.env.THINKIFIC_SUBDOMAIN;

    const programsRes = await fetch(`https://${SUBDOMAIN}.thinkific.com/api/public/v1/courses`, {
      headers: {
        "X-Auth-API-Key": THINKIFIC_API_KEY,
        "X-Auth-Subdomain": SUBDOMAIN
      }
    });

    if (!programsRes.ok) throw new Error(`Thinkific API error: ${programsRes.status}`);
    const programsData = await programsRes.json();

    // Create OpenAI prompt
    const prompt = `
You are a wellness coach. A user completed this assessment:
${JSON.stringify(assessment, null, 2)}

Available programs:
${JSON.stringify(programsData, null, 2)}

Generate a motivational Life Report in HTML with:
- Overview of Physical, Mental, Emotional, Relationships, Career, Spiritual
- Positive reinforcement
- Suggested programs from the list above
`;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    const report_html = response.choices[0].message.content;

    return { statusCode: 200, body: JSON.stringify({ report_html }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
