'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function PersonalizeWorkspacePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceType = searchParams.get('type');
  const [dimensions, setDimensions] = useState({ width: '', length: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle workspace customization logic here
    console.log('Workspace details:', { workspaceType, dimensions });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Personalize Your Workspace</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Room Width (feet):</label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Room Length (feet):</label>
            <input
              type="number"
              value={dimensions.length}
              onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Generate Layout
          </button>
        </form>
      </div>
    </main>
  );
} 