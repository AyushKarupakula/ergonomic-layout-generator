'use client';
import { useRouter } from 'next/navigation';

export default function ChooseWorkspacePage() {
  const router = useRouter();

  const workspaceTypes = [
    { id: 'home', title: 'Home Office', description: 'Perfect for remote work' },
    { id: 'corporate', title: 'Corporate Office', description: 'Traditional office setup' },
    { id: 'hybrid', title: 'Hybrid Space', description: 'Flexible workspace solution' },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Workspace Type</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspaceTypes.map((type) => (
            <div
              key={type.id}
              className="border p-4 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(`/personalize-workspace?type=${type.id}`)}
            >
              <h2 className="text-xl font-bold">{type.title}</h2>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 