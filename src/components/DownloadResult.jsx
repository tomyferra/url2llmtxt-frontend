import React from 'react';

const DownloadResult = ({ downloadUrl, filename, onReset, onView }) => {
  const handleDownload = async () => {
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-center mb-4">
        <div className="bg-emerald-100 rounded-full p-3">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-emerald-900 mb-2">Conversion Successful!</h3>
      <p className="text-emerald-700 mb-6 font-medium">Your text file is ready for download.</p>

      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={handleDownload}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download .txt
        </button>

        <button
          onClick={onView}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Content
        </button>

        <button
          onClick={onReset}
          className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Convert Another
        </button>
      </div>
    </div>
  );
};

export default DownloadResult;
