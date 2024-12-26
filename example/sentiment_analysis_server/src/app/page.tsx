'use client';

import { useState, useRef } from 'react';

export default function Home() {
  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState<any>(null);
  const [ready, setReady] = useState<boolean | null>(null);
  const [resultArray, setResultArray] = useState<any[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const classify = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (!text) return;
    setReady(false);

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const result = await fetch(`/classify?text=${encodeURIComponent(text)}`, {
        signal: abortControllerRef.current.signal,
      });
      if (!ready) setReady(true);
      const json = await result.json();
      setResult(json);
      setResultArray([...resultArray, json]);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error fetching data:', error);
        setReady(true);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
      <h2 className="text-2xl mb-4 text-center">
        Next.js template (server-side)
      </h2>
      <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4 text-black"
        placeholder="Enter text here"
        onInput={classify}
      />
      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded text-black">
          {!ready || !result ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
      <div>
        {resultArray.map((result, index) => (
          <div key={index}>{JSON.stringify(result, null, 2)}</div>
        ))}
      </div>
    </main>
  );
}
