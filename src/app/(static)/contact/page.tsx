import React from 'react';
import { Mail, MapPin } from 'lucide-react';

export const metadata = {
    title: 'Contact Us | Career135',
    description: 'Have questions or feedback? Reach out to us directly via email.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-6">
                            Have questions or feedback? We'd love to hear from you. Reach out to us directly via email.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center text-gray-700">
                                <Mail className="mr-3 text-blue-600" size={20} />
                                <span>support@career135.com</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="mr-3 text-blue-600" size={20} />
                                <span>India</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Support Hours</h2>
                        <p className="text-gray-600">
                            Our support team is available Monday through Friday, 9:00 AM to 5:00 PM IST.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            We typically respond to inquiries within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
