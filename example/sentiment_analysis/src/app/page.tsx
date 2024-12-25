'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function Home() {
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);
  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./worker.js', import.meta.url), {
        type: 'module'
      });
    }

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'initiate':
          setReady(false);
          break;
        case 'ready':
          setReady(true);
          break;
        case 'complete':
          setResult(e.data.output[0])
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);

    return () => worker.current.removeEventListener('message', onMessageReceived);
  });

  const classify = useCallback((text) => {
    if (worker.current && ready) {
      worker.current.postMessage({ text });
    }
  }, [ready]);

  return ( <main className="flex min-h-screen flex-col items-center justify-center p-12">
    <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
    <h2 className="text-2xl mb-4 text-center">Next.js template</h2>
  
    <input
      className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4 text-black"
      type="text"
      placeholder="Enter text here"
      onInput={e => {
        if (e.target.value) {
          classify(e.target.value);
        }
      }}
    />
    <button onClick={() => classify('Hello, world!')}>Test</button>
  
    {ready !== null && (
      <pre className="bg-gray-100 p-2 rounded text-black">
        { (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2) }
      </pre>
    )}
  </main> )
}