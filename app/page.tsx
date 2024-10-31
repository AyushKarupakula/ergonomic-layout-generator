'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to welcome page
    router.push('/welcome');
  }, [router]);

  return null; // or a loading spinner if desired
} 