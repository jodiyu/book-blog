'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <p
      className="underline cursor-pointer mb-6 text-blue-600 hover:text-blue-800 transition"
      onClick={() => router.back()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') router.back();
      }}
    >
      ← Back
    </p>
  );
}
