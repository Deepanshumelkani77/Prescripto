const express = require("express");
const router = express.Router();
const axios = require("axios");

// ======================================================
// AI API Keys
// ======================================================
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// ======================================================
// Speciality mappings for fallback logic
// ======================================================
const specialityMappings = [
  {
    label: "Cardiologist",
    keywords: [
      "chest pain",
      "shortness of breath",
      "palpitation",
      "heart",
      "cardiac",
      "hypertension",
      "angina",
    ],
  },
  {
    label: "Dermatologist",
    keywords: [
      "skin rash",
      "itching",
      "acne",
      "eczema",
      "rash",
      "dermatitis",
      "psoriasis",
    ],
  },
  {
    label: "Pediatrician",
    keywords: [
      "child",
      "baby",
      "infant",
      "fever in child",
      "pediatric",
      "growth",
      "vaccination",
    ],
  },
  {
    label: "Neurologist",
    keywords: [
      "headache",
      "migraine",
      "seizure",
      "numbness",
      "weakness",
      "dizziness",
      "stroke",
    ],
  },
  {
    label: "Orthopedic",
    keywords: [
      "joint pain",
      "back pain",
      "knee pain",
      "bone",
      "fracture",
      "arthritis",
      "muscle sprain",
    ],
  },
  {
    label: "Gynecologist",
    keywords: [
      "menstrual",
      "period",
      "pregnancy",
      "ovary",
      "uterus",
      "gynecology",
      "breast pain",
    ],
  },
  {
    label: "Dentist",
    keywords: [
      "toothache",
      "gum",
      "oral",
      "dental",
      "mouth pain",
      "tooth infection",
      "cavity",
    ],
  },
  {
    label: "ENT Specialist",
    keywords: [
      "earache",
      "sinus",
      "tonsils",
      "throat pain",
      "hearing loss",
      "nosebleed",
      "sore throat",
    ],
  },
  {
    label: "Ophthalmologist",
    keywords: [
      "eye pain",
      "vision",
      "blurry vision",
      "eye redness",
      "watering eyes",
      "dry eyes",
    ],
  },
  {
    label: "Psychiatrist",
    keywords: [
      "anxiety",
      "depression",
      "stress",
      "sleep problem",
      "mood",
      "mental health",
    ],
  },
  {
    label: "Urologist",
    keywords: [
      "urine",
      "kidney",
      "bladder",
      "urinary",
      "prostate",
      "renal",
      "urination",
    ],
  },
];

// ======================================================
// Helper functions
// ======================================================
const normalize = (text = "") => text.toLowerCase();

const detectSpeciality = (symptoms = "") => {
  const normalized = normalize(symptoms);
  let bestMatch = { label: "General Physician", score: 0 };

  specialityMappings.forEach((item) => {
    let score = 0;

    item.keywords.forEach((keyword) => {
      if (normalized.includes(keyword)) {
        score++;
      }
    });

    if (score > bestMatch.score) {
      bestMatch = {
        label: item.label,
        score,
      };
    }
  });

  return bestMatch.label;
};

const extractJson = (text = "") => {
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    return null;
  }

  const jsonString = text.slice(jsonStart, jsonEnd + 1);

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON Parse Error:", error.message);
    return null;
  }
};

// Map common symptom keywords to immediate safe measures
const getInstantSolution = (symptoms = "") => {
  const s = normalize(symptoms);
  if (!s) return "Rest, stay hydrated, and monitor symptoms. Seek medical care if symptoms worsen.";

  if (s.includes('back pain') || s.includes('backache') || s.includes('lower back') ) {
    return 'Try gentle movement and stretching; avoid heavy lifting; apply heat or cold as needed; take an OTC pain reliever like paracetamol if necessary.';
  }
  if (s.includes('swelling') || s.includes('swollen')) {
    return 'Elevate the affected area, apply a cold compress, rest and avoid pressure; seek care if swelling is severe or painful.';
  }
  if (s.includes('fever') || s.includes('temperature') || s.includes('high temperature')) {
    return 'Rest, stay well hydrated, and take paracetamol (acetaminophen) or ibuprofen as appropriate for fever; seek medical attention if very high or persistent.';
  }
  if (s.includes('cough') || s.includes('sore throat') || s.includes('cold') ) {
    return 'Stay hydrated, use throat lozenges or warm saline gargles, and use steam inhalation for relief; see a doctor if cough persists or worsens.';
  }
  if (s.includes('headache') || s.includes('migraine')) {
    return 'Rest in a quiet, dark room, stay hydrated, and consider an OTC pain reliever like paracetamol if appropriate; seek care if severe or sudden.';
  }
  if (s.includes('rash') || s.includes('itch') || s.includes('skin')) {
    return 'Avoid scratching, keep the area clean, apply cool compresses and a mild topical emollient; seek dermatology advice if spreading or severe.';
  }

  return 'Rest, stay hydrated, and monitor symptoms; use simple home measures (cold/heat, elevation, OTC analgesics) and consult a doctor if symptoms worsen.';
};

const buildPrompt = (payload) => {
  return `
You are an AI medical assistant for a doctor appointment website.

Patient Details:
- Age: ${payload.age}
- Gender: ${payload.gender}
- Symptoms: ${payload.symptoms}
- Duration: ${payload.duration}
- Pain Level: ${payload.painLevel}/10
- Fever: ${payload.fever}
- Medical History: ${payload.medicalHistory || "None"}

Your task:
1. Analyze the symptoms.
2. Recommend the most suitable medical speciality.
3. Give a short explanation.
4. Suggest the next step.

IMPORTANT:
- Respond ONLY with valid JSON.
- Do NOT use markdown.
- Do NOT wrap JSON in \`\`\`.

Required JSON format:

{
  "summary": "Brief explanation of the likely issue.",
  "recommendedSpeciality": "One speciality from the allowed list.",
  "nextStep": "What the patient should do next.",
  "instantSolution": "A one-line immediate, safe measure or home remedy (non-prescription)"
}

Allowed specialities:
Cardiologist,
Dermatologist,
Pediatrician,
Neurologist,
Orthopedic,
Gynecologist,
Dentist,
ENT Specialist,
Ophthalmologist,
Psychiatrist,
Urologist,
General Physician.
`;
};

// ======================================================
// Test Route
// ======================================================
router.get("/test-key", (req, res) => {
  res.json({
    keyExists: !!OPENROUTER_API_KEY,
    keyLength: OPENROUTER_API_KEY ? OPENROUTER_API_KEY.length : 0,
  });
});

// ======================================================
// Main Symptom Checker Route
// ======================================================
router.post("/symptom-check", async (req, res) => {
  try {
    const {
      age,
      gender,
      symptoms,
      duration,
      painLevel,
      fever,
      medicalHistory,
    } = req.body;

    // Validation
    if (
      !age ||
      !gender ||
      !symptoms ||
      !duration ||
      painLevel == null ||
      fever == null
    ) {
      return res.status(400).json({
        message:
          "age, gender, symptoms, duration, painLevel and fever are required.",
      });
    }

    // Fallback speciality
    const fallbackSpeciality = detectSpeciality(symptoms);

    // Determine whether any AI key is available
    const hasOpenAI = !!OPENAI_API_KEY;
    const hasOpenRouter = !!OPENROUTER_API_KEY;

    if (!hasOpenAI && !hasOpenRouter) {
      return res.json({
        summary: `AI service is unavailable. Based on your symptoms, you should consult a ${fallbackSpeciality}.`,
        recommendedSpeciality: fallbackSpeciality,
        nextStep: `Please book an appointment with a ${fallbackSpeciality}.`,
        instantSolution: getInstantSolution(symptoms),
        source: "fallback",
      });
    }

    // Build prompt
    const prompt = buildPrompt({
      age,
      gender,
      symptoms,
      duration,
      painLevel,
      fever,
      medicalHistory,
    });

    let assistantText = "";

    if (OPENAI_API_KEY) {
      const aiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful medical assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          max_tokens: 400,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );
      assistantText = aiResponse.data?.choices?.[0]?.message?.content || "";
      console.log("OpenAI response:", assistantText);
    } else if (OPENROUTER_API_KEY) {
      const aiResponse = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          max_tokens: 400,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );
      assistantText = aiResponse.data?.choices?.[0]?.message?.content || "";
      console.log("OpenRouter response:", assistantText);
    } else {
      // no AI key available
      return res.json({
        summary: `AI service is unavailable. Based on your symptoms, you should consult a ${fallbackSpeciality}.`,
        recommendedSpeciality: fallbackSpeciality,
        nextStep: `Please book an appointment with a ${fallbackSpeciality}.`,
        source: "fallback",
      });
    }

    const extracted = extractJson(assistantText);

    // If parsing fails or missing keys, use fallback values but include instantSolution
    if (!extracted || !extracted.summary || !extracted.recommendedSpeciality) {
      return res.json({
        summary: `Based on your symptoms, you should consult a ${fallbackSpeciality}.`,
        recommendedSpeciality: fallbackSpeciality,
        nextStep: `Please book an appointment with a ${fallbackSpeciality}.`,
        instantSolution: getInstantSolution(symptoms),
        source: "fallback",
      });
    }

    const source = OPENAI_API_KEY ? "openai" : "openrouter";

    // Success response
      return res.json({
        summary: extracted.summary,
        recommendedSpeciality:
          extracted.recommendedSpeciality || fallbackSpeciality,
        nextStep:
          extracted.nextStep ||
          `Please consult a ${
            extracted.recommendedSpeciality || fallbackSpeciality
          }.`,
        instantSolution: extracted.instantSolution || getInstantSolution(symptoms),
        source,
      });
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );

    const fallbackSpeciality = detectSpeciality(
      req.body?.symptoms || ""
    );

    // Return fallback response instead of 500
    return res.json({
      summary: `AI service is temporarily unavailable. Based on your symptoms, you should consult a ${fallbackSpeciality}.`,
      recommendedSpeciality: fallbackSpeciality,
      nextStep: `Please book an appointment with a ${fallbackSpeciality}.`,
      instantSolution: getInstantSolution(req.body?.symptoms || ""),
      source: "fallback",
    });
  }
});

module.exports = router;