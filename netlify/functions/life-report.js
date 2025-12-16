import OpenAI from "openai";

export async function handler(event, context) {
  console.log("Event body:", event.body);

  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: "No data received" }) };
    }

    const { assessment } = JSON.parse(event.body);

    if (!assessment || Object.keys(assessment).length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Assessment is empty" }) };
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are a wellness coach. A user completed this assessment:
${JSON.stringify(assessment, null, 2)}

Generate a comprehensive, motivational Life Report in HTML.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    const report_html = response.choices[0].message.content;

    return { statusCode: 200, body: JSON.stringify({ report_html }) };

  } catch (error) {
    console.error("Error in life-report function:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
