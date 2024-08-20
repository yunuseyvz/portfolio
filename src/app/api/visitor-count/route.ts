// app/api/visitor-count/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(req: NextRequest) {
  try {
    console.log('Received GET request for visitor count');

    // Get the current visitor count
    let count: number = parseInt(await kv.get('visitors') || '0', 10);
    console.log('Current visitor count:', count);

    // Increment the visitor count
    count = count + 1;
    console.log('Incremented visitor count:', count);

    // Store the updated count
    await kv.set('visitors', count.toString());
    console.log('Updated visitor count stored:', count);

    // Return the updated count
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error updating visitor count:', error);
    return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
  }
}