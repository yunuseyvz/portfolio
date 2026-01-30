'use client'

import { useState } from 'react';
import { Button } from "../../ui/button";
import { FaDownload } from 'react-icons/fa';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../ui/tooltip";

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
    <TooltipProvider>
      <Tooltip delayDuration={0.5}>
        <TooltipTrigger asChild>
          <Button 
            variant="default" 
            size="lg"
            className="gap-2 font-medium"
            onClick={handleGenerateCV}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                <span>Generating CV...</span>
              </>
            ) : (
              <>
                <FaDownload className="size-4" /> 
                <span>Download CV</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="font-display text-xs">
          <p>Compile CV</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};