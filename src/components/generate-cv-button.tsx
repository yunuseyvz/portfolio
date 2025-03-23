'use client'

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { FaDownload } from 'react-icons/fa';

export const GenerateCVButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCV = async () => {
    setIsLoading(true);
    try {

      const response = await fetch('/api/generate-cv');
      
      if (response.ok) {

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
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
    <Badge 
      variant="secondary" 
      className="text-[12px] flex items-center space-x-2 cursor-pointer"
      onClick={handleGenerateCV}
    >
      {isLoading ? (
        <>
          <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
          <span>Generating CV...</span>
        </>
      ) : (
        <>
          <FaDownload /> 
          <span>Generate CV</span>
        </>
      )}
    </Badge>
  );
};
