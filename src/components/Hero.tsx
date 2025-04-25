'use client';

import { useState } from 'react';
import { useSummarize } from '@/hooks/useSummarize';

export default function Hero() {
  const [url, setUrl] = useState('');
  const { summarize, isLoading, error, data } = useSummarize();

  const formatUrl = (inputUrl: string): string => {
    // Check if the URL already has a protocol
    if (/^https?:\/\//i.test(inputUrl)) {
      return inputUrl;
    }
    
    // Add https:// prefix if missing
    return `https://${inputUrl}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUrl = formatUrl(url.trim());
    await summarize(formattedUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            TL;DR-as-a-Service
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Transform any article into a concise summary in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex gap-4">
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com/article"
              className="flex-1 min-w-0 px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {data && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">{data.headline}</h2>
            <ul className="mt-4 space-y-2">
              {data.bullets.map((bullet: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 text-blue-500">•</span>
                  <span className="ml-2">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
