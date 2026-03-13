import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import DownloadResult from './components/DownloadResult';
import { convertUrl } from './services/api';
import MarkdownPreview from './components/MarkdownPreview';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [filename, setFilename] = useState('result.txt');
  const [content, setContent] = useState('');
  const [enhancedMode, setEnhancedMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleConvert = async (url) => {
    setIsLoading(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const result = await convertUrl(url, enhancedMode);
      setDownloadUrl(result.download_url);
      setFilename(result.filename);
      setContent(result.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDownloadUrl(null);
    setFilename('result.txt');
    setContent('');
    setError(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-blue-100 mb-4">
            <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            URL2LLM.txt Converter
          </h1>
          <p className="mt-2 text-slate-600 font-medium">
            Turn any webpage into a clean text file for your LLM.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          {!downloadUrl ? (
            <UrlForm
              onSubmit={handleConvert}
              isLoading={isLoading}
              enhancedMode={enhancedMode}
              onToggleEnhanced={() => setEnhancedMode(!enhancedMode)}
            />
          ) : (
            <DownloadResult
              downloadUrl={downloadUrl}
              filename={filename}
              onReset={handleReset}
              onView={() => setShowPreview(true)}
            />
          )}

          {showPreview && (
            <MarkdownPreview
              content={content}
              onClose={() => setShowPreview(false)}
            />
          )}

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 animate-in fade-in duration-200">
              <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}
        </div>

        <p className="mt-10 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
          No login required • Free forever
        </p>
      </div>
    </div>
  );
}

export default App;
