import React from 'react';

export const metadata = {
    title: 'Terms of Service | Career135',
    description: 'Terms of Service for Career135.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 prose prose-slate max-w-none">
                    <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        Welcome to Career135. By accessing this website, we assume you accept these terms and conditions.
                        Do not continue to use Career135 if you do not agree to take all of the terms and conditions stated on this page.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">1. Information Disclaimer</h2>
                    <p>
                        The information provided on Career135 is for general informational purposes only. While we strive to keep
                        the information up to date and correct, we make no representations or warranties of any kind, express or implied,
                        about the completeness, accuracy, reliability, suitability or availability with respect to the website or the
                        information contained on the website for any purpose.
                    </p>
                    <p>
                        <strong>Always verify job details, eligibility criteria, and deadlines on the official notification or official website before applying.</strong>
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">2. External Links</h2>
                    <p>
                        Through this website you are able to link to other websites which are not under the control of Career135.
                        We have no control over the nature, content, and availability of those sites. The inclusion of any links does
                        not necessarily imply a recommendation or endorse the views expressed within them.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">3. No Affiliation</h2>
                    <p>
                        Career135 is an independent job portal and is not affiliated, associated, authorized, endorsed by, or in any way
                        officially connected with any government agency, public sector undertaking, or private corporation whose job
                        postings are listed on this website.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">4. Modifications to Terms</h2>
                    <p>
                        We reserve the right to revise these terms of service for its website at any time without notice. By using this
                        website you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                </div>
            </div>
        </div>
    );
};
