'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/lib/auth-context';
import { demoCaseStudies } from '@/lib/demo-data';
import { CaseStudy } from '@/lib/types';

export default function CaseStudiesPage() {
  const { isDemo } = useAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isDemo) {
      setCaseStudies(demoCaseStudies);
      setLoading(false);
    }
  }, [isDemo]);

  const filtered = caseStudies.filter(
    (cs) =>
      cs.title.toLowerCase().includes(search.toLowerCase()) ||
      cs.client_name.toLowerCase().includes(search.toLowerCase()) ||
      cs.industry.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = () => {
    alert('Coming soon - connect Supabase to enable');
  };

  const handleEdit = (id: string) => {
    alert('Coming soon - connect Supabase to enable');
  };

  if (loading) {
    return (
      <div className="flex-1">
        <DashboardHeader title="Case Studies" subtitle="Showcase your impact" />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-carbon-900 border border-carbon-800 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <DashboardHeader title="Case Studies" subtitle="Showcase your impact" />

      <div className="px-6 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button onClick={handleNew} className="btn-primary">
            <Plus className="h-4 w-4" />
            New Case Study
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-carbon-500 font-mono text-sm">No case studies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((cs) => (
              <div key={cs.id} className="card group">
                {/* Industry badge */}
                <div className="mb-4">
                  <span className="badge">{cs.industry}</span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-semibold text-white text-lg mb-1 line-clamp-2">
                  {cs.title}
                </h3>

                {/* Client name */}
                <p className="text-sm font-mono text-carbon-400 mb-4">
                  {cs.client_name}
                </p>

                {/* Mini metrics row */}
                {cs.metrics && cs.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-carbon-800">
                    {cs.metrics.slice(0, 3).map((metric, i) => (
                      <div key={i}>
                        <p className="text-lg font-sans font-bold text-warmth">
                          {metric.value}
                        </p>
                        <p className="text-xs font-mono text-carbon-500">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        cs.published ? 'bg-emerald-400' : 'bg-carbon-600'
                      }`}
                    />
                    <span className="text-xs font-mono text-carbon-400">
                      {cs.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEdit(cs.id)}
                    className="btn-ghost p-2"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
