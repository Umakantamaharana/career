import React from 'react';

export interface Job {
  id: string;
  website_content: {
    title: string;
    markdown_content: string;
    actual_link: string;
    action: string;
  };
  social_posts?: {
    x?: string;
    ln?: string;
    fb?: string;
    ig?: string;
    wp?: string;
    th?: string;
    tg?: string;
  };
  status: string;
  href: string;
  image_url?: string;
  // Computed/Fallback fields for UI compatibility if needed, or we update UI to use website_content
  date?: string;
  location?: string;
  type?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}