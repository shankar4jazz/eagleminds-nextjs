import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/db';

export async function GET() {
  try {
    const dbStatus = await testDatabaseConnection();
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: dbStatus ? 'connected' : 'disconnected',
      databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing',
      nextauthUrl: process.env.NEXTAUTH_URL ? 'configured' : 'missing',
      nextauthSecret: process.env.NEXTAUTH_SECRET ? 'configured' : 'missing',
    };

    return NextResponse.json(health);
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}