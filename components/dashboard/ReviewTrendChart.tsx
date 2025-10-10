
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrendData } from '../../types';

interface ReviewTrendChartProps {
  data: TrendData[];
}

const ReviewTrendChart: React.FC<ReviewTrendChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-96">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Count Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem' 
            }}
          />
          <Line type="monotone" dataKey="reviews" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReviewTrendChart;
