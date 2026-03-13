import React, { useState, useEffect } from 'react';

const UrlForm = ({ onSubmit, isLoading, enhancedMode, onToggleEnhanced }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url, enhancedMode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url-input" className="block text-sm font-medium text-slate-700 mb-1">
          Website URL
        </label>
        <input
          id="url-input"
          type="url"
          placeholder="https://example.com/"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !url.trim()}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
          ? 'bg-slate-400 cursor-not-allowed'
          : enhancedMode
            ? 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-[0.98]'
            : 'bg-slate-900 hover:bg-slate-800 active:scale-[0.98]'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Converting...
          </span>
        ) : (
          'Convert to TXT'
        )}
      </button>
    </form>
  );
};

export default UrlForm;
