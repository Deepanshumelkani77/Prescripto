import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { FiAlertCircle, FiCheckCircle, FiArrowRight, FiRefreshCw, FiActivity } from 'react-icons/fi';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
            <p className="text-sm font-semibold text-blue-300">🤖 AI Medical Assistant</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Symptom Checker
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get instant AI-powered health insights and find the right specialist for your needs
          </p>
        </div>

        {/* Main Content */}
        {!result ? (
          // Form View
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">Tell us about your symptoms</h2>
              <p className="text-gray-300">Our AI will analyze your information and recommend the right specialist.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              {/* Age */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">Age *</label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  max="150"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-400/30 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
                  placeholder="Enter your age"
                  required
                />
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">Gender *</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-400/30 bg-white/10 px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
                >
                  <option className="bg-gray-800">Female</option>
                  <option className="bg-gray-800">Male</option>
                  <option className="bg-gray-800">Other</option>
                </select>
              </div>

              {/* Symptoms */}
              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-medium text-gray-200">Describe your symptoms *</label>
                <textarea
                  name="symptoms"
                  value={form.symptoms}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-xl border border-gray-400/30 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition resize-none"
                  placeholder="e.g., headache, fever, cough, chest pain..."
                  required
                />
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">How long have you had it? *</label>
                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-400/30 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
                  placeholder="e.g., 2 days, 1 week"
                  required
                />
              </div>

              {/* Fever */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">Do you have fever? *</label>
                <select
                  name="fever"
                  value={form.fever}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-400/30 bg-white/10 px-4 py-3 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
                >
                  <option className="bg-gray-800">No</option>
                  <option className="bg-gray-800">Yes</option>
                  <option className="bg-gray-800">Not sure</option>
                </select>
              </div>

              {/* Pain Level */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-200">Pain level: {form.painLevel}/10 *</label>
                <input
                  type="range"
                  name="painLevel"
                  min="1"
                  max="10"
                  value={form.painLevel}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-400/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>No pain</span>
                  <span>Maximum pain</span>
                </div>
              </div>

              {/* Medical History */}
              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-medium text-gray-200">Medical history (optional)</label>
                <textarea
                  name="medicalHistory"
                  value={form.medicalHistory}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-xl border border-gray-400/30 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition resize-none"
                  placeholder="Any chronic conditions, allergies, or medications..."
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Analyzing your symptoms...
                    </>
                  ) : (
                    <>
                      <FiActivity className="w-5 h-5" />
                      Talk to AI Health Assistant
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Disclaimer: This is informational only, not medical diagnosis. Always consult a licensed professional.
                </p>
              </div>
            </form>
          </div>
        ) : (
          // Results View
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Your Health Analysis</h2>
              <p className="text-gray-300">Based on AI evaluation of your symptoms</p>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/10 rounded-2xl p-6 mb-8 border border-blue-400/30">
              <div className="flex gap-3 mb-3">
                <FiAlertCircle className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-white">Analysis Summary</h3>
              </div>
              <p className="text-gray-100 leading-relaxed ml-9">{result.summary}</p>
            </div>

            {/* Results Grid */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              {/* Recommended Specialist */}
              <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 rounded-2xl p-6 border border-green-400/30 hover:border-green-400/60 transition transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/30 rounded-lg">
                    <FiCheckCircle className="w-5 h-5 text-green-300" />
                  </div>
                  <h3 className="text-xs uppercase font-bold text-green-300 tracking-wider">Specialist</h3>
                </div>
                <p className="text-2xl font-bold text-white">{result.recommendedSpeciality}</p>
              </div>

              {/* Next Step */}
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 rounded-2xl p-6 border border-blue-400/30 hover:border-blue-400/60 transition transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/30 rounded-lg">
                    <FiArrowRight className="w-5 h-5 text-blue-300" />
                  </div>
                  <h3 className="text-xs uppercase font-bold text-blue-300 tracking-wider">Next Step</h3>
                </div>
                <p className="text-gray-100 text-sm">{result.nextStep}</p>
              </div>

              {/* Immediate Measures */}
              <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 rounded-2xl p-6 border border-orange-400/30 hover:border-orange-400/60 transition transform hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/30 rounded-lg">
                    <FiActivity className="w-5 h-5 text-orange-300" />
                  </div>
                  <h3 className="text-xs uppercase font-bold text-orange-300 tracking-wider">Immediate Care</h3>
                </div>
                <p className="text-gray-100 text-sm">{result.instantSolution || 'Rest, hydrate, and monitor symptoms.'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={goToSpeciality}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <FiArrowRight className="w-5 h-5" />
                View {result.recommendedSpeciality} Doctors
              </button>
              <button
                onClick={() => setResult(null)}
                className="flex-1 rounded-xl border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <FiRefreshCw className="w-5 h-5" />
                Start New Check
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIHealthAssistant;
