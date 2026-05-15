const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ======================================================
// Initialize Gemini safely
// ======================================================
let genAI = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

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
    return null;
  }
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

Your job:
1. Analyze the symptoms.
2. Suggest the most relevant medical speciality.
3. Provide a short explanation.
4. Recommend the next step.

Respond ONLY in valid JSON.

{
  "summary": "Brief explanation of the likely issue.",
  "recommendedSpeciality": "One speciality from the list below.",
  "nextStep": "What the patient should do next."
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
// Test route to verify API key
// ======================================================
router.get("/test-key", (req, res) => {
  res.json({
    keyExists: !!process.env.GEMINI_API_KEY,
    keyLength: process.env.GEMINI_API_KEY
      ? process.env.GEMINI_API_KEY.length
      : 0,
  });
});

// ======================================================
// Main AI symptom checker route
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

    // ==============================================
    // Validation
    // ==============================================
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

    // ==============================================
    // Fallback speciality
    // ==============================================
    const fallbackSpeciality = detectSpeciality(symptoms);

    // ==============================================
    // If Gemini API key is missing
    // ==============================================
    if (!genAI) {
      return res.json({
        summary: `AI service is unavailable. Based on your symptoms, you should consult a ${fallbackSpeciality}.`,
        recommendedSpeciality: fallbackSpeciality,
        nextStep: `Please book an appointment with a ${fallbackSpeciality}.`,
        source: "fallback",
      });
    }

    // ==============================================
    // Build prompt
    // ==============================================
    const prompt = buildPrompt({
      age,
      gender,
      symptoms,
      duration,
      painLevel,
      fever,
      medicalHistory,
    });

    // ==============================================
    // Gemini Model
    // ==============================================
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // ==============================================
    // Generate response
    // ==============================================
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const assistantText = response.text();

    console.log("Gemini Response:", assistantText);

    // ==============================================
    // Extract JSON
    // ==============================================
    const extracted = extractJson(assistantText);

    // ==============================================
    // Validate AI response
    // ==============================================
    if (
      !extracted ||
      !extracted.summary ||
      !extracted.recommendedSpeciality
    ) {
      return res.status(502).json({
        message: "AI returned unexpected response format.",
        raw: assistantText,
      });
    }

    // ==============================================
    // Success response
    // ==============================================
    return res.json({
      summary: extracted.summary,
      recommendedSpeciality:
        extracted.recommendedSpeciality || fallbackSpeciality,
      nextStep:
        extracted.nextStep ||
        `Please consult a ${
          extracted.recommendedSpeciality || fallbackSpeciality
        }.`,
      source: "gemini",
    });
  } catch (error) {
    console.error("AI route error:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;