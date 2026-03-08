'use client';

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { fetchJobs } from '../services/jobService';
import { Job } from '../types';
import JobCard from '../components/JobCard';
import AdBanner from '../components/AdBanner';
import SocialLinks from '../components/SocialLinks';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    (job.website_content?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.type || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-12 sm:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            <span className="text-blue-400">Career135</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Latest Govt Jobs, Exam Dates, Results & Career Updates in India
          </p>

          <div className="relative w-full max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border-transparent rounded-full leading-5 bg-white text-slate-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              placeholder="Search by job title, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content - Job List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Latest Openings</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredJobs.length} Jobs Found</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Mid-content Ad */}
            <AdBanner className="my-8 rounded-xl overflow-hidden" slot="home-feed" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Connect With Us</h3>
              <p className="text-sm text-gray-500 mb-6">
                Join our community on social media to get instant updates on new job postings.
              </p>
              <SocialLinks />

              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Sponsored</h3>
                <AdBanner format="vertical" slot="sidebar-home" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
