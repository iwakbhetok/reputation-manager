
import React from 'react';
import type { Review } from '../../types';
import { StarIcon } from '../shared/Icons';
import ReplyForm from './ReplyForm';

interface ReviewItemProps {
  review: Review;
  isReplying: boolean;
  onReplyClick: () => void;
  onReplySubmit: (reviewId: string, text: string) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))}
  </div>
);


const ReviewItem: React.FC<ReviewItemProps> = ({ review, isReplying, onReplyClick, onReplySubmit }) => {
  return (
    <div className="p-5 border border-gray-200 rounded-lg bg-white transition-shadow hover:shadow-lg">
      <div className="flex items-start">
        <img className="h-12 w-12 rounded-full mr-4" src={review.authorImageUrl} alt={review.author} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-md font-semibold text-gray-900">{review.author}</p>
              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <p className="mt-3 text-gray-700 leading-relaxed">{review.text}</p>
          
          <div className="mt-4">
             {!review.response && (
                <button 
                  onClick={onReplyClick}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  {isReplying ? 'Cancel' : 'Reply'}
                </button>
              )}
          </div>
        </div>
      </div>
      
      {isReplying && !review.response && (
        <div className="mt-4 pl-16">
          <ReplyForm 
            reviewId={review.id}
            onSubmit={onReplySubmit}
            onCancel={onReplyClick}
          />
        </div>
      )}

      {review.response && (
        <div className="mt-4 pl-16 pt-4 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-800">Your response:</p>
          <p className="mt-1 text-sm text-gray-600">{review.response.text}</p>
          <p className="mt-1 text-xs text-gray-400">{new Date(review.response.date).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
