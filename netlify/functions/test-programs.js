export async function handler(event, context) {
  try {
    const THINKIFIC_API_KEY = process.env.THINKIFIC_API_KEY;
    const SUBDOMAIN = process.env.THINKIFIC_SUBDOMAIN;

    const response = await fetch(`https://${SUBDOMAIN}.thinkific.com/api/public/v1/courses`, {
      headers: {
        "X-Auth-API-Key": THINKIFIC_API_KEY,
        "X-Auth-Subdomain": SUBDOMAIN
      }
    });

    if (!response.ok) {
      throw new Error(`Thinkific API error: ${response.status}`);
    }

    const programsData = await response.json();

    console.log("Programs fetched:", programsData);

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
