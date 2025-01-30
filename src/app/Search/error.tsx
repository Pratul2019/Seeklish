'use client'; 
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-header">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <p className="mt-2 text-gray-500">{error.message || "An unexpected error occurred."}</p>
      <button
        className="mt-4 px-4 py-2 bg-header rounded hover:bg-red-600"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
