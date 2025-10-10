
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { RatingDistribution } from '../../types';

interface RatingDistributionChartProps {
  data: RatingDistribution[];
}

const COLORS = ['#10B981', '#6366F1', '#F59E0B', '#EF4444', '#9CA3AF'];

const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-96">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Star Rating Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 40 }}>
          <XAxis type="number" hide />
          <YAxis 
            type="category" 
            dataKey="stars" 
            stroke="#6b7280"
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip 
             cursor={{fill: 'rgba(243, 244, 246, 0.5)'}}
             contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem' 
            }}
          />
          <Bar dataKey="count" barSize={20} radius={[0, 10, 10, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingDistributionChart;
