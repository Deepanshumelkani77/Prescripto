import React, { useState, useEffect } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiClock, FiCheck, FiArchive, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        setFeedbacks(response.data.data || []);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Update feedback status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/feedback/${id}/status`, { status });
      setFeedbacks(feedbacks.map(fb => 
        fb._id === id ? { ...fb, status } : fb
      ));
      if (selectedFeedback?._id === id) {
        setSelectedFeedback({ ...selectedFeedback, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Filter feedbacks based on status
  const filteredFeedbacks = statusFilter === 'all' 
    ? feedbacks 
    : feedbacks.filter(fb => fb.status === statusFilter);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'replied':
        return 'bg-purple-100 text-purple-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-gray-600">View and manage customer feedback</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Feedback</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <FiRefreshCw className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No feedback found.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredFeedbacks.map((feedback) => (
              <li key={feedback._id} className="hover:bg-gray-50">
                <div 
                  className="px-4 py-4 sm:px-6 cursor-pointer"
                  onClick={() => {
                    setSelectedFeedback(feedback);
                    setIsModalOpen(true);
                    if (feedback.status === 'new') {
                      updateStatus(feedback._id, 'read');
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FiUser className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {feedback.name}
                          <span className="ml-2 text-xs font-normal text-gray-500">
                            {feedback.email}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{feedback.subject}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(feedback.status)}`}>
                        {feedback.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(feedback.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {feedback.message}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Feedback Detail Modal */}
      {isModalOpen && selectedFeedback && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedFeedback.subject}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      From: {selectedFeedback.name} &lt;{selectedFeedback.email}&gt;
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {formatDate(selectedFeedback.createdAt)}
                    </p>
                  </div>
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedFeedback.status)}`}>
                    {selectedFeedback.status}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <div className="flex space-x-2">
                  {selectedFeedback.status !== 'replied' && (
                    <button
                      type="button"
                      onClick={() => updateStatus(selectedFeedback._id, 'replied')}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:col-start-2 sm:text-sm"
                    >
                      Mark as Replied
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedFeedback._id, 'archived')}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    {selectedFeedback.status === 'archived' ? 'Unarchive' : 'Archive'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-span-2 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
