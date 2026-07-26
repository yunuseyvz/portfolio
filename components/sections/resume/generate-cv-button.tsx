'use client'

import { useState } from 'react';
import { ArrowDown } from 'lucide-react';

export const GenerateCVButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCV = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-cv');

      if (response.ok) {
        const blob = await response.blob();

        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = 'yunus-cv.pdf';
        a.target = '_blank';

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to generate CV');
        alert('Failed to generate CV. Please try again later.');
      }
    } catch (error) {
      console.error('Error generating CV:', error);
      alert('An error occurred while generating CV.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerateCV}
      disabled={isLoading}
      className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-accent disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <span className="size-3 animate-spin rounded-full border border-current border-t-transparent" />
          <span>Compiling…</span>
        </>
      ) : (
        <>
          <ArrowDown className="size-3" />
          <span>Download CV (PDF)</span>
        </>
      )}
    </button>
  );
};
