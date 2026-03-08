import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Strip common markdown characters for the preview
  const content = job.website_content?.markdown_content || '';
  const previewText = content
    ? content.replace(/[#*`_\[\]]/g, '').trim().slice(0, 120)
    : '';

  return (
    <div className="bg-white rounded-xl shadow-[4px_4px_0px_#0f172a] border-[3px] border-slate-900 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0f172a] transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 text-xs font-bold text-accent bg-rose-50 border-2 border-accent rounded-full">
            {job.type || 'Job'}
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200 flex items-center">
            <Calendar size={12} className="mr-1" />
            {job.date}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">
          {job.website_content.title}
        </h3>

        <div className="flex items-center text-slate-600 font-medium text-sm mb-4">
          <MapPin size={16} className="mr-1.5 text-slate-400" />
          <span>{job.location || 'Remote'}</span>
        </div>

        <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
          {previewText}...
        </p>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t-2 border-slate-100 flex justify-between items-center gap-4">
          <Link
            href={`/job/${job.id}`}
            className="flex-1 text-center bg-white text-slate-900 border-2 border-slate-900 font-bold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors shadow-[2px_2px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#0f172a]"
          >
            View Details
          </Link>
          <a
            href={job.website_content.actual_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-highlight hover:bg-amber-600 border-2 border-slate-900 text-slate-900 font-bold py-2 px-4 rounded-lg transition-colors shadow-[2px_2px_0px_#0f172a] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#0f172a]"
          >
            {job.website_content.action || 'Apply'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;