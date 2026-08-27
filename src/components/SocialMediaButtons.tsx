import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, ExternalLink } from 'lucide-react';
import { SocialMediaItem, getStoredSocialMedia } from '../data/socialMediaData';

interface SocialMediaButtonsProps {
  variant?: 'compact' | 'footer' | 'cards' | 'pills';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SocialMediaButtons({
  variant = 'compact',
  className = '',
  size = 'md'
}: SocialMediaButtonsProps) {
  const [socials, setSocials] = useState<SocialMediaItem[]>(getStoredSocialMedia());

  useEffect(() => {
    const handleUpdate = () => {
      setSocials(getStoredSocialMedia());
    };
    window.addEventListener('smartjourney_social_updated', handleUpdate);
    return () => window.removeEventListener('smartjourney_social_updated', handleUpdate);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-9 h-9 rounded-xl text-sm',
    lg: 'w-10 h-10 rounded-xl text-base'
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5'
  }[size];

  const renderIcon = (id: string, iconClass: string) => {
    switch (id) {
      case 'instagram':
        return <Instagram className={iconClass} strokeWidth={2} />;
      case 'tiktok':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.892-2.891 2.896 2.896 0 0 1 2.892-2.892c.313 0 .614.053.896.148V9.387a6.34 6.34 0 0 0-.896-.065A6.338 6.338 0 0 0 3 15.663a6.338 6.338 0 0 0 6.338 6.337 6.338 6.338 0 0 0 6.338-6.337V8.718a8.214 8.214 0 0 0 3.913.987V6.686z" />
          </svg>
        );
      case 'rednote':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#FF2442" />
            <path d="M6.2 14.5c.3.8 1.1 1.5 2.2 1.5 1.5 0 2.2-1.1 2.4-2.6-.6.5-1.3.8-2 .8-1.5 0-2.8-1.1-2.8-2.8 0-1.8 1.4-3.1 3.2-3.1 2.2 0 3.3 1.7 3.3 4.6 0 2.7-1.3 4.6-3.8 4.6-1.5 0-2.6-.9-3-2.1l.5-.9zm2.4-3.9c-.9 0-1.6.6-1.6 1.6 0 .9.6 1.5 1.5 1.5.7 0 1.3-.4 1.7-.9v-.7c-.2-.9-.8-1.5-1.6-1.5zM14.5 14.5c.3.8 1.1 1.5 2.2 1.5 1.5 0 2.2-1.1 2.4-2.6-.6.5-1.3.8-2 .8-1.5 0-2.8-1.1-2.8-2.8 0-1.8 1.4-3.1 3.2-3.1 2.2 0 3.3 1.7 3.3 4.6 0 2.7-1.3 4.6-3.8 4.6-1.5 0-2.6-.9-3-2.1l.5-.9zm2.4-3.9c-.9 0-1.6.6-1.6 1.6 0 .9.6 1.5 1.5 1.5.7 0 1.3-.4 1.7-.9v-.7c-.2-.9-.8-1.5-1.6-1.5z" fill="#FFFFFF" />
          </svg>
        );
      case 'linkedin':
        return <Linkedin className={iconClass} strokeWidth={2} />;
      default:
        return <ExternalLink className={iconClass} strokeWidth={2} />;
    }
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socials.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.name} (${item.handle})`}
          title={`${item.name}: ${item.handle}`}
          className={`group ${sizeClasses} flex items-center justify-center bg-white border border-neutral-200/90 text-neutral-700 ${item.hoverBg} transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer shrink-0`}
        >
          <span 
            className="transition-transform duration-200 group-hover:scale-110 flex items-center justify-center"
            style={{ color: item.id === 'rednote' ? undefined : item.color }}
          >
            {renderIcon(item.id, iconSizes)}
          </span>
        </a>
      ))}
    </div>
  );
}
