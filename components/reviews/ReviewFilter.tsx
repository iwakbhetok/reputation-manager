
import React, { useState } from 'react';

interface ReviewFilterProps {
  onFilterChange: (filters: { rating: number, replied: string }) => void;
}

const ReviewFilter: React.FC<ReviewFilterProps> = ({ onFilterChange }) => {
  const [rating, setRating] = useState(0);
  const [replied, setReplied] = useState('all');

  const handleFilter = () => {
    onFilterChange({ rating, replied });
  };
  
  const handleReset = () => {
    setRating(0);
    setReplied('all');
    onFilterChange({ rating: 0, replied: 'all' });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <label htmlFor="rating" className="text-sm font-medium text-gray-700">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="0">All Stars</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="replied" className="text-sm font-medium text-gray-700">Status:</label>
        <select
          id="replied"
          value={replied}
          onChange={(e) => setReplied(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="all">All Reviews</option>
          <option value="yes">Replied</option>
          <option value="no">Not Replied</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button onClick={handleFilter} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700">
          Apply Filters
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-semibold rounded-md hover:bg-gray-50">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ReviewFilter;
