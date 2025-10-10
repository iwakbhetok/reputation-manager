
import React from 'react';
import { Link } from 'react-router-dom';
import type { Review } from '../../types';
import { StarIcon } from '../shared/Icons';

interface LatestReviewsProps {
  reviews: Review[];
}

const LatestReviews: React.FC<LatestReviewsProps> = ({ reviews }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-96 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Latest Reviews</h3>
        <Link to="/reviews" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
          View All
        </Link>
      </div>
      <div className="space-y-4 overflow-y-auto">
        {reviews.map((review) => (
          <div key={review.id} className="flex items-start">
            <img src={review.authorImageUrl} alt={review.author} className="h-10 w-10 rounded-full mr-3" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">{review.author}</p>
                <div className="flex items-center">
                  <span className="text-sm font-bold mr-1">{review.rating}</span>
                  <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>
              <p className="text-sm text-gray-600 truncate">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
