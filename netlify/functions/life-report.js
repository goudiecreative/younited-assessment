import OpenAI from "openai";

export async function handler(event, context) {
  try {
    console.log("Event body:", event.body); // <-- see what is received

    let assessment = {};
    if (event.body) {
      try {
        const parsed = JSON.parse(event.body);
        assessment = parsed.assessment || {};
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr);
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid JSON in request body" })
        };
      }
    } else {
      console.error("No body received");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No request body found" })
      };
    }

    console.log("Parsed assessment:", assessment);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `
You are a wellness coach. A user completed this assessment:
${JSON.stringify(assessment, null, 2)}

Generate a comprehensive, motivational Life Report in HTML, including:
- Overview of Physical, Mental, Emotional, Relationships, Career, Spiritual
- Positive reinforcement
- Suggested programs
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500
    });

    const report_html = response.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ report_html })
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
