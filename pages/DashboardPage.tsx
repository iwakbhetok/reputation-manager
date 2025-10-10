
import React from 'react';
import type { Location } from '../types';
import { mockReviews, mockTrendData, mockRatingDistribution, mockSentimentData, mockKeywords } from '../constants';

import StatCard from '../components/dashboard/StatCard';
import ReviewTrendChart from '../components/dashboard/ReviewTrendChart';
import RatingDistributionChart from '../components/dashboard/RatingDistributionChart';
import SentimentChart from '../components/dashboard/SentimentChart';
import KeywordCloud from '../components/dashboard/KeywordCloud';
import LatestReviews from '../components/dashboard/LatestReviews';
import { ArrowTrendingUpIcon, ChartBarIcon, ClockIcon, StarIcon } from '../components/shared/Icons';

interface DashboardPageProps {
  location: Location;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ location }) => {
  const locationReviews = mockReviews.filter(r => r.locationId === location.id);
  const averageRating = locationReviews.length > 0
    ? (locationReviews.reduce((acc, r) => acc + r.rating, 0) / locationReviews.length).toFixed(1)
    : 'N/A';
  
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Overall Rating" 
          value={averageRating.toString()} 
          icon={<StarIcon className="h-8 w-8 text-yellow-400" />} 
          change="+0.2 this month" 
        />
        <StatCard 
          title="Total Reviews" 
          value={locationReviews.length.toString()} 
          icon={<ChartBarIcon className="h-8 w-8 text-blue-500" />} 
          change="+15 this month" 
        />
        <StatCard 
          title="Avg. Response Time" 
          value="3.2 hours" 
          icon={<ClockIcon className="h-8 w-8 text-green-500" />} 
          change="-0.5 hours" 
        />
        <StatCard 
          title="Positive Sentiment" 
          value="89%" 
          icon={<ArrowTrendingUpIcon className="h-8 w-8 text-red-500" />} 
          change="+3%" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ReviewTrendChart data={mockTrendData} />
        </div>
        <div>
          <RatingDistributionChart data={mockRatingDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div>
            <SentimentChart data={mockSentimentData} />
        </div>
        <div>
            <KeywordCloud keywords={mockKeywords} />
        </div>
        <div className="lg:col-span-1">
          <LatestReviews reviews={locationReviews.slice(0,3)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
