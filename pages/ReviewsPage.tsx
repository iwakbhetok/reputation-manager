
import React, { useState } from 'react';
import type { Location, Review } from '../types';
import { mockReviews } from '../constants';
import ReviewItem from '../components/reviews/ReviewItem';
import ReviewFilter from '../components/reviews/ReviewFilter';

interface ReviewsPageProps {
  location: Location;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ location }) => {
  const allReviews = mockReviews.filter(r => r.locationId === location.id);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(allReviews);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleFilterChange = (filters: { rating: number, replied: string }) => {
      let tempReviews = [...allReviews];
      if (filters.rating > 0) {
          tempReviews = tempReviews.filter(r => r.rating === filters.rating);
      }
      if (filters.replied === 'yes') {
          tempReviews = tempReviews.filter(r => !!r.response);
      } else if (filters.replied === 'no') {
          tempReviews = tempReviews.filter(r => !r.response);
      }
      setFilteredReviews(tempReviews);
  };

  const handleReplySubmit = (reviewId: string, text: string) => {
    console.log(`Replying to review ${reviewId} with: "${text}"`);
    // In a real app, you would update the review state here after a successful API call.
    setReplyingTo(null);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Review Inbox for {location.name}</h2>
        <ReviewFilter onFilterChange={handleFilterChange} />
        
        <div className="mt-6 space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map(review => (
              <ReviewItem 
                key={review.id} 
                review={review} 
                isReplying={replyingTo === review.id}
                onReplyClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                onReplySubmit={handleReplySubmit}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No reviews match the current filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
