
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  const isPositive = change && change.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        {change && (
          <p className={`text-xs mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
        )}
      </div>
      <div className="bg-gray-100 rounded-full p-3">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
