'use client'

import { useState } from 'react';
import { Badge } from "../../ui/badge";
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
          <Badge 
            variant="secondary" 
            className="text-[12px] flex items-center space-x-2 cursor-pointer"
            onClick={handleGenerateCV}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
                <span className="hover:cursor-not-allowed">Generating CV...</span>
              </>
            ) : (
              <>
                <FaDownload /> 
                <span>Download CV</span>
              </>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Compile my CV from LaTeX code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};