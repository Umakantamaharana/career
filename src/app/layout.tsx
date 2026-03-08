import { Metadata } from 'next';
import Header from '@/components/Header';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Career135 | Latest Govt Jobs, Exam Dates, Results & Career Updates',
  description: 'Career135 - Your one-stop destination for Latest Govt Jobs, Exam Dates, Results & Career Updates in India. Daily updates for job seekers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col font-sans">
        <Header />

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            <p className="mb-2">&copy; {new Date().getFullYear()} Career135. All rights reserved.</p>
            <div className="flex justify-center gap-4">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
