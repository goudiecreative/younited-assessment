export async function handler(event, context) {
  try {
    // Read API key and subdomain from environment variables
    const THINKIFIC_API_KEY = process.env.THINKIFIC_API_KEY;
    const THINKIFIC_SUBDOMAIN = process.env.THINKIFIC_SUBDOMAIN;

    if (!THINKIFIC_API_KEY || !THINKIFIC_SUBDOMAIN) {
      throw new Error("API key or subdomain not set in environment variables");
    }

    const response = await fetch(`https://${THINKIFIC_SUBDOMAIN}.thinkific.com/api/public/v1/courses`, {
      headers: {
        "X-Auth-API-Key": THINKIFIC_API_KEY,
        "X-Auth-Subdomain": THINKIFIC_SUBDOMAIN
      }
    });

    if (!response.ok) {
      throw new Error(`Thinkific API error: ${response.status} ${response.statusText}`);
    }

    const programsData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(programsData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
