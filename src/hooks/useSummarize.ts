'use client';

import { useState } from 'react';
import { config } from '@/config';

interface Summary {
  headline: string;
  bullets: string[];
}

export function useSummarize() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Summary | null>(null);

  const summarize = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${config.apiBaseUrl}/api/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(response.status === 422 
          ? 'Could not extract content from this URL'
          : 'Failed to generate summary');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    summarize,
    isLoading,
    error,
    data,
  };
}
