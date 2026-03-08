import fs from 'fs';
import path from 'path';
import { Job } from '../types';

export const fetchJobsServer = async (): Promise<Job[]> => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Umakantamaharana/job-scrapper-backend/main/latest_jobs.json', {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.warn("Failed to fetch jobs from backend repository. Returning empty jobs list.");
            return [];
        }
        const data = await response.json();

        const jobs: Job[] = data.map((item: any) => ({
            ...item,
            website_content: {
                title: item.website_content?.title || 'Untitled Job',
                markdown_content: item.website_content?.markdown_content || '',
                actual_link: item.website_content?.actual_link || '',
                action: item.website_content?.action || 'Apply'
            },
            date: item.date || new Date().toISOString().split('T')[0],
            location: item.location || 'Remote',
            type: item.type || 'Full-time'
        }));

        // Sort by ID descending
        jobs.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        return jobs;
    } catch (error) {
        console.error('Error loading jobs from filesystem:', error);
        return [];
    }
};

export const getJobByIdServer = async (id: string): Promise<Job | undefined> => {
    const jobs = await fetchJobsServer();
    return jobs.find((job) => job.id === id);
};
