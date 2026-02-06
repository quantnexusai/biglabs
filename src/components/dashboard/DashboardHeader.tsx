'use client';

import { Bell } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import DemoBanner from '@/components/DemoBanner';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { profile, isDemo } = useAuth();

  const initials =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name[0]}${profile.last_name[0]}`
      : '??';

  return (
    <>
      {isDemo && (
        <div className="relative z-10">
          <DemoBanner />
        </div>
      )}
      <header className="bg-carbon-950 border-b border-carbon-800 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Title + subtitle */}
          <div>
            <h1 className="text-xl font-sans font-bold text-white tracking-wide">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm font-mono text-carbon-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button
              className="relative p-2 text-carbon-400 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-warmth rounded-full" />
            </button>

            {/* User avatar */}
            <div className="w-9 h-9 rounded-full bg-horizon/20 border border-horizon/30 flex items-center justify-center">
              <span className="text-xs font-sans font-bold text-horizon uppercase">
                {initials}
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
