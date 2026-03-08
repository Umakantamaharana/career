import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, MapPin, Share2 } from 'lucide-react';
import { getJobByIdServer, fetchJobsServer } from '@/services/serverJobService';
import AdBanner from '../../../components/AdBanner';
import SocialLinks from '../../../components/SocialLinks';
import ShareButtons from '../../../components/ShareButtons';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const p = await params;
    const job = await getJobByIdServer(p.id);

    if (!job) {
        return { title: 'Job Not Found | Career135' };
    }

    const title = `${job.website_content?.title || 'Job Update'} | Career135`;
    const description = job.website_content?.markdown_content?.substring(0, 150).replace(/[#*]/g, '') + '...';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: job.image_url ? [{ url: job.image_url }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: job.image_url ? [job.image_url] : [],
        }
    };
}

export async function generateStaticParams() {
    const jobs = await fetchJobsServer(); // Fetch all jobs at build time
    return jobs.map((job) => ({
        id: job.id,
    }));
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
    const p = await params;
    const job = await getJobByIdServer(p.id);

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
                <p className="text-gray-500 mb-6">The job you are looking for might have been removed or expired.</p>
                <Link href="/" className="text-blue-600 hover:underline flex items-center">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Home
                </Link>
            </div>
        );
    }

    // Generate JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.website_content?.title || 'Job Listing',
        description: job.website_content?.markdown_content || '',
        datePosted: job.date || new Date().toISOString().split('T')[0],
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.location || 'India',
                addressCountry: 'IN'
            }
        },
        employmentType: job.type || 'FULL_TIME',
        hiringOrganization: {
            '@type': 'Organization',
            name: 'Career135 Govt Job Updates' // Replace with actual org if available in data
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Jobs
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Job Content */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border-[3px] border-slate-900 overflow-hidden">
                            <div className="bg-slate-900 p-8 text-white border-b-[3px] border-slate-900">
                                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-accent bg-rose-50 border-2 border-accent rounded-full object-contain">
                                    {job.type || 'Full-time'}
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-bold mb-4">{job.website_content?.title}</h1>
                                <div className="flex flex-wrap gap-4 text-slate-300 text-sm">
                                    <div className="flex items-center">
                                        <MapPin size={16} className="mr-1.5" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={16} className="mr-1.5" />
                                        Posted on {job.date || 'Recent'}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                {job.image_url && (
                                    <div className="mb-8 rounded-xl overflow-hidden shadow-[4px_4px_0px_#0f172a] border-[3px] border-slate-900">
                                        <img src={job.image_url} alt={job.website_content?.title || "Job Image"} className="w-full h-auto max-h-[500px] object-cover" />
                                    </div>
                                )}
                                <article className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-accent hover:prose-a:text-rose-700 [&>h1]:hidden">
                                    <ReactMarkdown>{job.website_content?.markdown_content || ''}</ReactMarkdown>
                                </article>

                                <div className="mt-10 pt-8 border-t-[3px] border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Share this opportunity</h3>
                                    <ShareButtons title={job.website_content?.title || ''} url={`https://career135.com/job/${job.id}`} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <AdBanner className="rounded-xl overflow-hidden shadow-sm" slot="job-bottom" />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a] sticky top-24">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                            <a
                                href={job.website_content?.actual_link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-highlight hover:bg-amber-600 border-2 border-slate-900 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors shadow-[4px_4px_0px_#0f172a] hover:shadow-[2px_2px_0px_#0f172a] hover:translate-y-[2px] mb-3 block text-center"
                            >
                                {job.website_content?.action || 'Apply Now'}
                            </a>
                            <p className="text-xs text-center text-slate-500 font-medium mt-4">
                                You will be redirected to the official website.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border-[3px] border-slate-900 shadow-[4px_4px_0px_#0f172a]">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Follow Us</h3>
                            <SocialLinks />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
