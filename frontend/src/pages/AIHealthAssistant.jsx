import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';

const initialForm = {
  age: '',
  gender: 'Female',
  symptoms: '',
  duration: '',
  painLevel: 5,
  fever: 'No',
  medicalHistory: '',
};

const AIHealthAssistant = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.age || !form.symptoms || !form.duration || form.painLevel == null || !form.fever) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/ai/symptom-check`, {
        age: form.age,
        gender: form.gender,
        symptoms: form.symptoms,
        duration: form.duration,
        painLevel: Number(form.painLevel),
        fever: form.fever,
        medicalHistory: form.medicalHistory,
      });

      setResult(response.data);
    } catch (error) {
      console.error('AI assistant error:', error);
      toast.error(error.response?.data?.message || 'Failed to get AI recommendation.');
    } finally {
      setLoading(false);
    }
  };

  const goToSpeciality = () => {
    if (result?.recommendedSpeciality) {
      navigate(`/doctor/${encodeURIComponent(result.recommendedSpeciality.toLowerCase())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">AI Medical Assistant</p>
              <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">Symptom Checker</h1>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Answer a few health questions and receive a smart recommendation with suggested doctor speciality.
              </p>
            </div>
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white shadow-lg">
              <p className="text-sm uppercase tracking-[0.25em] font-semibold">Quick guidance</p>
              <p className="mt-3 text-lg font-semibold">Identify the right specialist fast</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                min="1"
                value={form.age}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your age"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Symptoms</label>
              <textarea
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Describe your symptoms, such as headache, fever, cough..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">How long have you had it?</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. 2 days, 1 week"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pain level</label>
              <input
                type="range"
                name="painLevel"
                min="1"
                max="10"
                value={form.painLevel}
                onChange={handleChange}
                className="w-full"
              />
              <div className="text-sm text-gray-600">Current pain level: <span className="font-semibold">{form.painLevel}</span></div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Do you have fever?</label>
              <select
                name="fever"
                value={form.fever}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>No</option>
                <option>Yes</option>
                <option>Not sure</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">Medical history (optional)</label>
              <textarea
                name="medicalHistory"
                value={form.medicalHistory}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Any chronic health conditions, allergies, or medicines you take"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/20 hover:opacity-95 transition"
              >
                {loading ? 'Analyzing...' : 'Talk to AI Health Assistant'}
              </button>
              <p className="text-sm text-gray-500">
                Disclaimer: This assistant provides informational guidance only. It is not a diagnosis. Always consult a licensed medical professional for final assessment.
              </p>
            </div>
          </form>

          {result && (
            <div className="mt-10 rounded-3xl border border-gray-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">AI Recommendation</h2>
              <p className="mt-4 text-gray-700">{result.summary}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 border border-gray-200">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">Recommended Specialist</h3>
                  <p className="mt-3 text-lg font-semibold text-gray-900">{result.recommendedSpeciality}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-gray-200">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">Suggested Next Step</h3>
                  <p className="mt-3 text-gray-700">{result.nextStep}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-1">
                <div className="rounded-2xl bg-white p-5 border border-gray-200">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">Immediate Measures</h3>
                  <p className="mt-3 text-gray-700">{result.instantSolution || 'Follow basic home care: rest, hydrate, and monitor symptoms.'}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={goToSpeciality}
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
                >
                  View {result.recommendedSpeciality} Doctors
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="rounded-2xl border border-gray-300 px-5 py-3 text-gray-700 hover:bg-gray-100 transition"
                >
                  Start a New Check
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIHealthAssistant;
