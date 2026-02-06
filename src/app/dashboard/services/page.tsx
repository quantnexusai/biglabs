'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, GripVertical, Eye, EyeOff, Target, Cpu, Brain, BarChart3, Shield, Settings } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/lib/auth-context';
import { demoServices } from '@/lib/demo-data';
import { Service } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Target,
  Cpu,
  Brain,
  BarChart3,
  Shield,
  Settings,
};

export default function ServicesPage() {
  const { isDemo } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      setServices([...demoServices].sort((a, b) => a.sort_order - b.sort_order));
      setLoading(false);
    }
  }, [isDemo]);

  const handleEdit = (id: string) => {
    alert('Coming soon - connect Supabase to enable');
  };

  const handleAdd = () => {
    alert('Coming soon - connect Supabase to enable');
  };

  const handleTogglePublished = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: !s.published } : s))
    );
  };

  if (loading) {
    return (
      <div className="flex-1">
        <DashboardHeader title="Services" subtitle="Configure your service offerings" />
        <div className="p-6 space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-carbon-900 border border-carbon-800 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <DashboardHeader title="Services" subtitle="Configure your service offerings" />

      <div className="px-6 pb-6">
        {/* Service list */}
        <div className="space-y-3">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];

            return (
              <div key={service.id} className="card group">
                <div className="flex items-center gap-4">
                  {/* Drag handle */}
                  <div
                    className="text-carbon-600 hover:text-carbon-400 cursor-grab active:cursor-grabbing flex-shrink-0"
                    title="Drag to reorder"
                  >
                    <GripVertical className="h-5 w-5" />
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center bg-horizon/10 border border-horizon/20 flex-shrink-0">
                    {IconComponent ? (
                      <IconComponent className="h-5 w-5 text-horizon" />
                    ) : (
                      <span className="text-xs font-mono text-carbon-500">{service.icon}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-white text-sm">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-carbon-400 mt-0.5 line-clamp-1">
                      {service.description}
                    </p>
                  </div>

                  {/* Feature count */}
                  <span className="badge-warmth flex-shrink-0">
                    {service.features.length} features
                  </span>

                  {/* Published toggle */}
                  <button
                    onClick={() => handleTogglePublished(service.id)}
                    className={`btn-ghost p-2 flex-shrink-0 ${
                      service.published ? 'text-emerald-400' : 'text-carbon-600'
                    }`}
                    title={service.published ? 'Published - click to unpublish' : 'Draft - click to publish'}
                  >
                    {service.published ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>

                  {/* Edit button */}
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="btn-ghost p-2 flex-shrink-0"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Service button */}
        <button
          onClick={handleAdd}
          className="btn-primary mt-6 w-full justify-center"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </button>
      </div>
    </div>
  );
}
