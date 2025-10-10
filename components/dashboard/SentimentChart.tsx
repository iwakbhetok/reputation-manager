
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { SentimentData } from '../../types';

interface SentimentChartProps {
  data: SentimentData[];
}

// FIX: Explicitly type the COLORS object to match the possible values of SentimentData['name'].
// This helps TypeScript ensure that indexing COLORS with a value from the data is always valid.
const COLORS: Record<'Positive' | 'Neutral' | 'Negative', string> = {
  Positive: '#10B981',
  Neutral: '#F59E0B',
  Negative: '#EF4444',
};

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-96">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem' 
            }}
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
