// app/api/visitor-count/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(req: NextRequest) {
    try {
      // Get the current visitor count
      let count: number = parseInt(await kv.get('visitors') || '0', 10);
  
      // Increment the visitor count
      count = count + 1;
  
      // Store the updated count
      await kv.set('visitors', count.toString());
  
      // Return the updated count
      return NextResponse.json({ count });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
    }
  }