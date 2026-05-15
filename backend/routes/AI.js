const express = require('express');
const router = express.Router();

const specialityMappings = [
  { label: 'Cardiologist', keywords: ['chest pain', 'shortness of breath', 'palpitation', 'heart', 'cardiac', 'hypertension', 'angina'] },
  { label: 'Dermatologist', keywords: ['skin rash', 'itching', 'acne', 'eczema', 'rash', 'dermatitis', 'psoriasis'] },
  { label: 'Pediatrician', keywords: ['child', 'baby', 'infant', 'fever in child', 'pediatric', 'growth', 'vaccination'] },
  { label: 'Neurologist', keywords: ['headache', 'migraine', 'seizure', 'numbness', 'weakness', 'dizziness', 'stroke'] },
  { label: 'Orthopedic', keywords: ['joint pain', 'back pain', 'knee pain', 'bone', 'fracture', 'arthritis', 'muscle sprain'] },
  { label: 'Gynecologist', keywords: ['menstrual', 'period', 'pregnancy', 'ovary', 'uterus', 'gynecology', 'breast pain'] },
  { label: 'Dentist', keywords: ['toothache', 'gum', 'oral', 'dental', 'mouth pain', 'tooth infection', 'cavity'] },
  { label: 'ENT Specialist', keywords: ['earache', 'sinus', 'tonsils', 'throat pain', 'hearing loss', 'nosebleed', 'sore throat'] },
  { label: 'Ophthalmologist', keywords: ['eye pain', 'vision', 'blurry vision', 'eye redness', 'watering eyes', 'dry eyes'] },
  { label: 'Psychiatrist', keywords: ['anxiety', 'depression', 'stress', 'sleep problem', 'mood', 'mental health'] },
  { label: 'Urologist', keywords: ['urine', 'kidney', 'bladder', 'urinary', 'prostate', 'renal', 'urination'] },
];

const normalize = (text = '') => text.toLowerCase();

const detectSpeciality = (symptoms = '') => {
  const normalized = normalize(symptoms);
  let bestMatch = { label: 'General Physician', score: 0 };

  specialityMappings.forEach((item) => {
    let score = 0;
    item.keywords.forEach((keyword) => {
      if (normalized.includes(keyword)) score += 1;
    });
    if (score > bestMatch.score) {
      bestMatch = { label: item.label, score };
    }
  });

  return bestMatch.label;
};

const extractJson = (text) => {
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
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
  return `You are a medical assistant. A user has provided the following details:
- Age: ${payload.age}
- Gender: ${payload.gender}
- Symptoms: ${payload.symptoms}
- Duration: ${payload.duration}
- Pain level: ${payload.painLevel}
- Fever: ${payload.fever}
- Medical history: ${payload.medicalHistory || 'None'}

Respond with a short informative recommendation in JSON format containing the following keys:
1) summary - a brief explanation of the most likely condition or concern.
2) recommendedSpeciality - one of these specialities: Cardiologist, Dermatologist, Pediatrician, Neurologist, Orthopedic, Gynecologist, Dentist, ENT Specialist, Ophthalmologist, Psychiatrist, Urologist, General Physician.
3) nextStep - a clear recommendation for the patient.

Do not add any extra keys. Keep the JSON valid.`;
};

router.post('/symptom-check', async (req, res) => {
  try {
    const { age, gender, symptoms, duration, painLevel, fever, medicalHistory } = req.body;

    if (!age || !gender || !symptoms || !duration || painLevel == null || fever == null) {
      return res.status(400).json({ message: 'age, gender, symptoms, duration, painLevel, and fever are required' });
    }

    const fallbackSpeciality = detectSpeciality(symptoms);
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!openaiKey) {
      return res.json({
        summary: `A medical assistant could not be reached. Based on your symptoms, this appears most likely to require a ${fallbackSpeciality}.`,
        recommendedSpeciality: fallbackSpeciality,
        nextStep: `Consult a ${fallbackSpeciality} and share these symptoms with them. This is an informational suggestion only.`,
        source: 'fallback'
      });
    }

    const prompt = buildPrompt({ age, gender, symptoms, duration, painLevel, fever, medicalHistory });
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful medical assistant for a patient appointment platform.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 250,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('OpenAI error:', errorBody);
      return res.status(502).json({ message: 'Failed to call AI service', details: errorBody });
    }

    const data = await response.json();
    const assistantText = data?.choices?.[0]?.message?.content || '';
    const extracted = extractJson(assistantText);

    if (!extracted || !extracted.summary || !extracted.recommendedSpeciality) {
      return res.status(502).json({
        message: 'AI returned unexpected response format',
        raw: assistantText,
      });
    }

    res.json({
      summary: extracted.summary,
      recommendedSpeciality: extracted.recommendedSpeciality,
      nextStep: extracted.nextStep || `Please consult a ${extracted.recommendedSpeciality}.`,
      source: 'openai',
    });
  } catch (error) {
    console.error('AI route error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
