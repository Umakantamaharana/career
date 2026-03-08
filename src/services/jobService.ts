import { Job } from '../types';

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    // Next.js static generation doesn't support relative API fetches natively without full URL 
    // so we will just fetch the public static JSON file directly on the client, or via explicit host on server

    // Determine base URL for server-side fetching
    const baseURL = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

    // On client, relative path is fine. On server, absolute path is required.
    const url = typeof window === 'undefined' ? `${baseURL}/latest_jobs.json` : '/latest_jobs.json';

    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache hits for 1 hour

    if (!response.ok) {
      throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
    }
    const data = await response.json();

    // Map raw JSON to Job interface if needed, or purely pass through if structure matches
    const jobs: Job[] = data.map((item: any) => ({
      ...item,
      // Ensure nested objects exist and populate defaults if fields are missing (e.g. if item.website_content is {})
      website_content: {
        title: item.website_content?.title || 'Untitled Job',
        markdown_content: item.website_content?.markdown_content || '',
        actual_link: item.website_content?.actual_link || '',
        action: item.website_content?.action || 'Apply'
      },
      // Fallback/Computed fields
      date: new Date().toISOString().split('T')[0], // We might want to add a 'created_at' to backend JSON later
      location: 'Remote', // Placeholder, or extract from content?
      type: 'Full-time'
    }));

    // Sort by ID descending as a proxy for date since we use auto-increment IDs
    jobs.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    return jobs;
  } catch (error) {
    console.error('Error loading jobs:', error);
    return [];
  }
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
  const jobs = await fetchJobs();
  return jobs.find((job) => job.id === id);
};