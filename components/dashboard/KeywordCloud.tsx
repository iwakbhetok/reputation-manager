
import React from 'react';
import type { Keyword } from '../../types';

interface KeywordCloudProps {
  keywords: Keyword[];
}

const KeywordCloud: React.FC<KeywordCloudProps> = ({ keywords }) => {
  const sortedKeywords = [...keywords].sort((a, b) => b.value - a.value);
  const max = sortedKeywords[0]?.value || 1;

  const getFontSize = (value: number) => {
    const size = 0.75 + (value / max) * 1.25; // from 0.75rem to 2rem
    return `${size.toFixed(2)}rem`;
  };

  const colors = ['text-indigo-600', 'text-blue-500', 'text-green-600', 'text-purple-600', 'text-gray-700'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-96">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Keyword Highlights</h3>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 h-full content-center">
        {sortedKeywords.map((keyword, index) => (
          <span
            key={keyword.text}
            className={`font-semibold ${colors[index % colors.length]}`}
            style={{ fontSize: getFontSize(keyword.value) }}
          >
            {keyword.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordCloud;
