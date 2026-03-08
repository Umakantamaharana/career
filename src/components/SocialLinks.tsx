import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, AtSign } from 'lucide-react';

const SocialLinks: React.FC = () => {
  const socials = [
    { name: 'WhatsApp', url: 'https://whatsapp.com', icon: <MessageCircle size={20} /> },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: <Linkedin size={20} /> },
    { name: 'Facebook', url: 'https://facebook.com', icon: <Facebook size={20} /> },
    { name: 'Instagram', url: 'https://instagram.com', icon: <Instagram size={20} /> },
    { name: 'YouTube', url: 'https://youtube.com', icon: <Youtube size={20} /> },
    { name: 'Threads', url: 'https://threads.net', icon: <AtSign size={20} /> },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-accent transition-colors duration-200 shadow-md"
          title={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;