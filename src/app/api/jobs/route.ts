import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Umakantamaharana/job-scrapper-backend/main/latest_jobs.json', {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from GitHub');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error reading jobs:', error);
        return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
    }
}
