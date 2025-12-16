// netlify/functions/fetch-programs.js

export async function handler(event, context) {
  try {
    // Get your Thinkific private API key from Netlify environment variables
    const THINKIFIC_API_KEY = process.env.THINKIFIC_API_KEY;

    if (!THINKIFIC_API_KEY) {
      throw new Error("THINKIFIC_API_KEY is not set in Netlify environment variables");
    }

    // Fetch courses from Thinkific Private API
    const response = await fetch("https://api.thinkific.com/api/public/v1/courses", {
      headers: {
        "Authorization": `Bearer ${THINKIFIC_API_KEY}`,
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
