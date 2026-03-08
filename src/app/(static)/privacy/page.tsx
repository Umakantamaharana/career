import React from 'react';

export const metadata = {
    title: 'Privacy Policy | Career135',
    description: 'Privacy Policy and Terms of Service for Career135.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 prose prose-slate max-w-none">
                    <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        At Career135, accessible from career135.com, one of our main priorities is the privacy of our visitors.
                        This Privacy Policy document contains types of information that is collected and recorded by Career135
                        and how we use it.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
                    <p>
                        We do not collect any personal data such as names, addresses, or phone numbers unless explicitly provided
                        by you through a contact form or newsletter subscription.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">Log Files</h2>
                    <p>
                        Career135 follows a standard procedure of using log files. These files log visitors when they visit websites.
                        The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service
                        Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">Cookies and Web Beacons</h2>
                    <p>
                        Like any other website, Career135 uses "cookies". These cookies are used to store information including
                        visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is
                        used to optimize the users' experience by customizing our web page content based on visitors' browser type.
                    </p>

                    <h2 className="text-xl font-semibold mt-8 mb-4">Third-Party Privacy Policies</h2>
                    <p>
                        Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the
                        respective Privacy Policies of these third-party ad servers for more detailed information.
                    </p>

                    <p className="mt-8 text-sm text-gray-500">
                        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                    </p>
                </div>
            </div>
        </div>
    );
};
