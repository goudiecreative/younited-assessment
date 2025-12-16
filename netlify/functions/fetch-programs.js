// netlify/functions/fetch-programs.js

export async function handler(event, context) {
  try {
    const THINKIFIC_API_KEY = process.env.THINKIFIC_API_KEY;
    const THINKIFIC_SUBDOMAIN = process.env.THINKIFIC_SUBDOMAIN;

    if (!THINKIFIC_API_KEY || !THINKIFIC_SUBDOMAIN) {
      throw new Error("THINKIFIC_API_KEY or THINKIFIC_SUBDOMAIN not set in Netlify environment variables");
    }

    const response = await fetch(`https://${THINKIFIC_SUBDOMAIN}.thinkific.com/api/public/v1/courses`, {
      headers: {
        "X-Auth-API-Key": THINKIFIC_API_KEY,
        "X-Auth-Subdomain": THINKIFIC_SUBDOMAIN,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Thinkific API error: ${response.status} ${response.statusText}`);
    }

    const courses = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(courses)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
