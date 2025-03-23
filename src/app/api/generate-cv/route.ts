import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to compile LaTeX CV using latexonline.cc and a GitHub repository
 */
export async function GET(req: NextRequest) {
  try {
    const latexOnlineUrl = 'https://latexonline.cc/compile?git=https://github.com/yunuseyvz/cv&target=tex/main.tex';
    
    const response = await fetch(latexOnlineUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'LaTeX compilation failed', details: errorText },
        { status: 500 }
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="cv.pdf"',
      },
    });
  } catch (error) {
    console.error('Error compiling LaTeX:', error);
    return NextResponse.json(
      { error: 'Failed to compile CV', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
