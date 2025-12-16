// netlify/functions/fetch-programs.js

export async function handler(event, context) {
  try {
    const THINKIFIC_SUBDOMAIN = process.env.THINKIFIC_SUBDOMAIN;

    if (!THINKIFIC_SUBDOMAIN) {
      throw new Error("THINKIFIC_SUBDOMAIN not set in Netlify environment variables");
    }

    const response = await fetch(`https://${THINKIFIC_SUBDOMAIN}.thinkific.com/api/public/v1/courses`);

    if (!response.ok) {
      throw new Error(`Thinkific API error: ${response.status} ${response.statusText}`);
    }

    const courses = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(courses)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
