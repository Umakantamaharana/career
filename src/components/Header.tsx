import React from 'react';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-accent text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
            <Briefcase size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Career135</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">Home</Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-accent transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;