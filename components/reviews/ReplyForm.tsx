
import React, { useState } from 'react';

interface ReplyFormProps {
  reviewId: string;
  onSubmit: (reviewId: string, text: string) => void;
  onCancel: () => void;
}

const cannedResponses = [
    "Thank you for the wonderful feedback!",
    "We're sorry to hear about your experience. Please contact us so we can make it right.",
    "We appreciate you taking the time to leave a review."
];

const ReplyForm: React.FC<ReplyFormProps> = ({ reviewId, onSubmit, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(reviewId, text);
      setText('');
    }
  };
  
  const handleCannedResponse = (response: string) => {
    setText(prev => prev ? `${prev}\n${response}` : response);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your response..."
        className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        required
      />
      <div className="flex flex-wrap gap-2 mt-2">
        <p className="text-xs font-semibold text-gray-600 w-full">Use a template:</p>
        {cannedResponses.map((resp, i) => (
             <button
                key={i}
                type="button"
                onClick={() => handleCannedResponse(resp)}
                className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-300"
            >
                {resp.substring(0, 30)}...
            </button>
        ))}
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Send Reply
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
