import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '../../../auth';

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();

  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Store files in the portfolio folder
    const pathname = `portfolio/${filename}`;
    
    // Upload file directly to Vercel Blob
    if (!request.body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    const blob = await put(pathname, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error in upload handler:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

// Required: Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
  });
}