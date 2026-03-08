import React from 'react';

export const metadata = {
    title: 'About Us | Career135',
    description: 'Learn more about Career135 and our mission to simplify the job search process.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">About Us</h1>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 prose prose-slate">
                    <p className="text-lg text-gray-600 mb-6">
                        Welcome to <strong>Career135</strong>, your go-to source for the latest job opportunities in the tech industry.
                    </p>
                    <p>
                        Our mission is to simplify the job search process by curating high-quality job listings daily. whether you're a seasoned developer, a product manager, or a designer, we strive to bring relevant opportunities directly to you.
                    </p>
                    <h3>Why Choose Us?</h3>
                    <ul>
                        <li><strong>Daily Updates:</strong> Fresh job postings every day.</li>
                        <li><strong>Hand-Curated:</strong> We filter out the noise to bring you legitimate opportunities.</li>
                        <li><strong>Direct Access:</strong> No middlemen, apply directly on the company's career page.</li>
                    </ul>
                    <p className="mt-6 text-sm text-gray-500">
                        Passionate about connecting talent with opportunity.
                    </p>
                </div>
            </div>
        </div>
    );
}
