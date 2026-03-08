'use client';

import { useEffect, useState } from 'react';
import { Job } from '../../types';

export default function AdminDashboard() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch('/api/admin/jobs');
            if (!res.ok) throw new Error('Failed to fetch jobs');
            const data = await res.json();
            setJobs(data);
        } catch (err) {
            setError('Error loading jobs. Ensure your GOOGLE_API_KEY and GITHUB_PAT are set correctly in Vercel.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        setActionLoading(`status-${id}`);
        try {
            const res = await fetch('/api/admin/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update_status', id, status: newStatus }),
            });
            if (!res.ok) throw new Error('Update failed');
            await fetchJobs(); // Refresh jobs after update
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setActionLoading(null);
        }
    };

    const handleUpdateLink = async (id: string, newLink: string) => {
        setActionLoading(`link-${id}`);
        try {
            const res = await fetch('/api/admin/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update_link', id, link: newLink }),
            });
            if (!res.ok) throw new Error('Update failed');
            alert("Link updated and pushed to backend successfully!");
            fetchJobs();
        } catch (err) {
            alert('Failed to update link');
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <div className="p-8 text-center bg-gray-50 min-h-screen">Loading dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button onClick={fetchJobs} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Refresh Data
                    </button>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-200">{error}</div>}

                <div className="space-y-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className={`px-6 py-4 border-b flex justify-between items-center ${job.status === 'PUBLISHED' ? 'bg-green-50/50 border-green-100' :
                                    job.status === 'GENERATED' ? 'bg-yellow-50/50 border-yellow-100' : 'bg-gray-50/50'
                                }`}>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{job.website_content?.title || "Untitled"}</h2>
                                    <a href={job.href} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                                        Original Source: {job.href}
                                    </a>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${job.status === 'PUBLISHED' ? 'bg-green-100 text-green-800 border-green-200' :
                                            job.status === 'GENERATED' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                'bg-gray-100 text-gray-800 border-gray-200'
                                        }`}>
                                        {job.status}
                                    </span>
                                    {job.status !== 'PUBLISHED' && job.status === 'GENERATED' && (
                                        <button
                                            onClick={() => handleUpdateStatus(job.id, 'PUBLISHED')}
                                            disabled={actionLoading === `status-${job.id}`}
                                            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                                        >
                                            {actionLoading === `status-${job.id}` ? 'Publishing...' : 'Mark as Published'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {job.status === 'GENERATED' || job.status === 'PUBLISHED' ? (
                                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column: Website Content Editor */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Website Content</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Actual Application Link</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="url"
                                                        className="flex-1 rounded-md border-gray-300 border px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                                        defaultValue={job.website_content?.actual_link}
                                                        id={`link-input-${job.id}`}
                                                    />
                                                    <button
                                                        onClick={() => handleUpdateLink(job.id, (document.getElementById(`link-input-${job.id}`) as HTMLInputElement).value)}
                                                        disabled={actionLoading === `link-${job.id}`}
                                                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black text-sm"
                                                    >
                                                        Save Link
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Markdown Body preview</label>
                                                <div className="text-sm bg-gray-50 p-4 rounded border h-48 overflow-y-auto font-mono whitespace-pre-wrap">
                                                    {job.website_content?.markdown_content || "No markdown content."}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Social Posts */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Social Media Posts</h3>
                                        <div className="space-y-4">
                                            {Object.entries(job.social_posts || {}).map(([platform, text]) => (
                                                <div key={platform} className="bg-gray-50 p-3 rounded border">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-sm uppercase text-blue-600">{platform}</span>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(text as string)}
                                                            className="text-xs bg-white border px-2 py-1 rounded shadow-sm hover:bg-gray-100"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{text as string}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 text-center text-gray-500 bg-gray-50">
                                    Content is still being generated or is unpublished.
                                </div>
                            )}
                        </div>
                    ))}
                    {jobs.length === 0 && (
                        <div className="text-center py-20 text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl">
                            No jobs found in the backend repository!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
