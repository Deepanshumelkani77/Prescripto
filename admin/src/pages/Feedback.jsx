import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { showToast } from '../components/Toast';
import axios from 'axios';

const Feedback = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch feedback data
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/feedback`);
      setFeedbacks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      showToast('Failed to load feedbacks', 'error');
      setFeedbacks([]); // Set empty array to prevent errors
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Filter feedbacks based on search
  const filteredFeedbacks = feedbacks.filter(feedback => {
    return (
      feedback.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full md:pl-[280px] pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Feedback</h1>
            <p className="text-gray-600 mt-1">Manage and respond to user feedback</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => {
                setIsRefreshing(true);
                fetchFeedbacks();
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              disabled={isRefreshing}
            >
              <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Feedback List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedbacks.length === 0 ? (
              <div className="text-center py-12">
                <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {statusFilter !== 'all' 
                    ? `No ${statusFilter} feedback available.` 
                    : 'No feedback has been submitted yet.'}
                </p>
              </div>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <div key={feedback._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900">{feedback.name || 'Anonymous'}</h3>
                        <p className="mt-1 text-sm text-gray-500">{feedback.email}</p>
                        <p className="mt-3 text-gray-700">{feedback.message}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p className="text-xs text-gray-500">{formatDate(feedback.createdAt)}</p>
                      </div>
                    </div>
                    
                    {feedback.response && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-4 border-[#5f6fff]">
                        <p className="text-sm font-medium text-gray-900">Admin Response:</p>
                        <p className="mt-1 text-sm text-gray-600">{feedback.response}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
