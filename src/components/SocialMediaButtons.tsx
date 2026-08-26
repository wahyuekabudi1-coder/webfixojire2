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
    sm: 'w-7 h-7 rounded-lg text-xs',
    md: 'w-8 h-8 rounded-lg text-sm',
    lg: 'w-9 h-9 rounded-xl text-base'
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5'
  }[size];

  const renderIcon = (id: string, iconClass: string) => {
    switch (id) {
      case 'instagram':
        return <Instagram className={iconClass} />;
      case 'tiktok':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.892-2.891 2.896 2.896 0 0 1 2.892-2.892c.313 0 .614.053.896.148V9.387a6.34 6.34 0 0 0-.896-.065A6.338 6.338 0 0 0 3 15.663a6.338 6.338 0 0 0 6.338 6.337 6.338 6.338 0 0 0 6.338-6.337V8.718a8.214 8.214 0 0 0 3.913.987V6.686z" />
          </svg>
        );
      case 'rednote':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="3" width="20" height="18" rx="5" fill="#FF2442" />
            <text x="12" y="16" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="900" fill="#FFFFFF" textAnchor="middle">RED</text>
          </svg>
        );
      case 'linkedin':
        return <Linkedin className={iconClass} />;
      default:
        return <ExternalLink className={iconClass} />;
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.name} (${item.handle})`}
          title={`${item.name} - ${item.handle}`}
          className={`group ${sizeClasses} flex items-center justify-center bg-white border border-neutral-200 text-neutral-600 ${item.hoverBg} transition-all duration-200 shadow-xs hover:shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer shrink-0`}
        >
          <span 
            className="transition-transform group-hover:scale-110 flex items-center justify-center"
            style={{ color: item.id === 'rednote' ? undefined : item.color }}
          >
            {renderIcon(item.id, iconSizes)}
          </span>
        </a>
      ))}
    </div>
  );
}
