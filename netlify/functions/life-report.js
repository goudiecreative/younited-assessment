import OpenAI from "openai";

export async function handler(event, context) {
  try {
    const { assessment } = JSON.parse(event.body);

    // Static Younited programs list
    const programs = [
      "ADHD Brain–Gut Connection",
      "ADHD Reframing",
      "Adrenal Fatigue Program",
      "Allergy & Intolerance Program",
      "Anger Management",
      "Anti-Aging From Within",
      "Babies, Toddlers & Kids Nutrition",
      "Becoming a Creative Thinker Program",
      "Behaviour Decoding",
      "Being Present – Pure Awareness Program",
      "Beliefs",
      "Bone & Joint Health Program",
      "Building Trust From Within",
      "Cardiovascular Health Program",
      "Chronic Fatigue Program",
      "Depression & Anxiety Program",
      "Design Your Life",
      "Detox Program",
      "Diabetes Type 2 Program",
      "Eat Like a Yogi – Food as Medicine",
      "Effective Boundaries Program",
      "Effective Communication for Conflict Resolution",
      "Emotional Agility in Leadership",
      "Emotional Iridology",
      "Emotional Iridology – Relationships",
      "Emotional Mastery Program",
      "Endometriosis Program",
      "Energy Nutrition Reset",
      "Everything and Nothing Method",
      "Expanding Intelligence",
      "Forgiveness",
      "From Conflict to Connection",
      "Gut Health Program",
      "Healing Beyond the Physical",
      "Hypnosis & Meditation Programs",
      "IBS Program",
      "Intimate Relationships",
      "Meditation Program – Flow State",
      "Meditation Program – Heavily Meditated",
      "Mental Health Program",
      "Natural Immune Booster",
      "Needs vs Desires Program",
      "Nutrition for Life",
      "PCOS Program",
      "PMS / PMT Program",
      "Pregnancy Nutrition",
      "Prostate Health Program",
      "Purpose Mapping",
      "Self-Worth Program",
      "Self-Hypnosis Program",
      "Sensitive by Nature Program",
      "Skin Health & Detoxification",
      "Sleep Better Program",
      "Stress Management to Resolution",
      "Sugar Cravings – Do Your Eyes Have a Sweet Tooth",
      "The Art of Holding Space",
      "Thyroid Support Program",
      "Universal Structure for Health",
      "Weight Loss Program"
    ];

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are a wellness coach. A user completed this assessment:
${JSON.stringify(assessment, null, 2)}

Here is the list of available programs:
${programs.join("\n")}

Based on the user's assessment, suggest 3-5 Younited programs that would help them most.
Provide a motivational Life Report in HTML format including:
- Summary of their current state
- Recommended programs with reasoning
- Actionable steps and encouragement
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const report_html = response.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ report_html }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
