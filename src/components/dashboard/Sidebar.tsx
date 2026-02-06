'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Briefcase,
  Users,
  Layers,
  Calendar,
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Articles', icon: FileText, href: '/dashboard/articles' },
  { label: 'Case Studies', icon: Briefcase, href: '/dashboard/case-studies' },
  { label: 'Careers', icon: Users, href: '/dashboard/careers' },
  { label: 'Services', icon: Layers, href: '/dashboard/services' },
  { label: 'Consultations', icon: Calendar, href: '/dashboard/consultations' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { profile } = useAuth();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`flex flex-col bg-carbon-950 border-r border-carbon-800 min-h-screen transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-[260px]'
      }`}
    >
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-carbon-800">
        {!collapsed && (
          <span className="font-sans font-bold text-lg tracking-widest text-white">
            BIGLABS
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 text-carbon-400 hover:text-white transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-none transition-all duration-200 group ${
                active
                  ? 'border-l-2 border-warmth text-warmth bg-carbon-900'
                  : 'border-l-2 border-transparent text-carbon-400 hover:text-white hover:bg-carbon-900/50'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`h-[18px] w-[18px] flex-shrink-0 ${active ? 'text-warmth' : ''}`} />
              {!collapsed && (
                <span className="text-sm font-mono tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile section */}
      <div className="border-t border-carbon-800 px-3 py-4">
        <Link
          href="/profile"
          className="flex items-center gap-3 text-carbon-400 hover:text-white transition-colors"
          title={collapsed ? profile?.first_name || 'Profile' : undefined}
        >
          <div className="w-8 h-8 rounded-full bg-horizon/20 border border-horizon/30 flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-horizon" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-sans font-semibold text-white truncate">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-xs font-mono text-carbon-500 truncate">
                {profile?.role || 'Member'}
              </p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
