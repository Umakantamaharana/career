'use client';

import React, { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        // Only access window on client
        setCurrentUrl(window.location.origin + url.replace('https://career135.com', ''));
    }, [url]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: currentUrl || url,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(currentUrl || url);
            alert('Link copied to clipboard!');
        }
    };

    const shareWhatsApp = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + (currentUrl || url))}`, '_blank');
    };

    const shareTelegram = () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl || url)}&text=${encodeURIComponent(title)}`, '_blank');
    };

    return (
        <div className="flex gap-3 flex-wrap">
            <button
                onClick={shareWhatsApp}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-green-500 text-green-600 font-bold hover:bg-green-500 hover:text-white transition-colors"
            >
                WhatsApp
            </button>
            <button
                onClick={shareTelegram}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-blue-500 text-blue-600 font-bold hover:bg-blue-500 hover:text-white transition-colors"
            >
                Telegram
            </button>
            <button
                onClick={handleShare}
                className="p-2 rounded-full border-2 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                aria-label="Share"
            >
                <Share2 size={20} />
            </button>
        </div>
    );
};

export default ShareButtons;
