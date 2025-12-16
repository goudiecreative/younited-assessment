import fetch from "node-fetch"; // only for Node <18

export async function handler() {
  try {
    const apiKey = process.env.THINKIFIC_API_KEY;
    const subdomain = process.env.THINKIFIC_SUBDOMAIN;

    const res = await fetch(`https://${subdomain}.thinkific.com/api/public/v1/courses`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    if (!res.ok) {
      throw new Error(`Thinkific API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
