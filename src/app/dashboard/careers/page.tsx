'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, MapPin, Building2, Clock } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/lib/auth-context';
import { demoCareers } from '@/lib/demo-data';
import { Career } from '@/lib/types';

export default function CareersPage() {
  const { isDemo } = useAuth();
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDept, setFilterDept] = useState('all');

  useEffect(() => {
    if (isDemo) {
      setCareers(demoCareers);
      setLoading(false);
    }
  }, [isDemo]);

  const departments = ['all', ...Array.from(new Set(careers.map((c) => c.department)))];

  const filtered =
    filterDept === 'all'
      ? careers
      : careers.filter((c) => c.department === filterDept);

  const handleNew = () => {
    alert('Coming soon - connect Supabase to enable');
  };

  const handleEdit = (id: string) => {
    alert('Coming soon - connect Supabase to enable');
  };

  const handleDelete = (id: string) => {
    if (isDemo) {
      setCareers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleTogglePublished = (id: string) => {
    setCareers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, published: !c.published } : c))
    );
  };

  const formatType = (type: string) => {
    return type
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex-1">
        <DashboardHeader title="Careers" subtitle="Manage open positions" />
        <div className="p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-carbon-900 border border-carbon-800 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <DashboardHeader title="Careers" subtitle="Manage open positions" />

      <div className="px-6 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative">
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="select pr-10 min-w-[200px]"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleNew} className="btn-primary">
            <Plus className="h-4 w-4" />
            Post Position
          </button>
        </div>

        {/* Career list */}
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-carbon-500 font-mono text-sm">No positions found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((career) => (
              <div key={career.id} className="card group">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-lg font-semibold text-white mb-3">
                      {career.title}
                    </h3>

                    {/* Badges row */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="badge">
                        <Building2 className="h-3 w-3 mr-1" />
                        {career.department}
                      </span>
                      <span className="badge">
                        <MapPin className="h-3 w-3 mr-1" />
                        {career.location}
                      </span>
                      <span className="badge">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatType(career.type)}
                      </span>
                    </div>

                    {/* Salary */}
                    {career.salary_range && (
                      <p className="text-warmth font-mono text-sm mb-2">
                        {career.salary_range}
                      </p>
                    )}

                    {/* Requirements count */}
                    <p className="text-xs font-mono text-carbon-500">
                      {career.requirements.length} requirement{career.requirements.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                    <button
                      onClick={() => handleEdit(career.id)}
                      className="btn-ghost p-2"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(career.id)}
                      className="btn-ghost p-2 hover:!text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleTogglePublished(career.id)}
                      className={`btn-ghost p-2 ${
                        career.published ? 'text-emerald-400' : 'text-carbon-600'
                      }`}
                      title={career.published ? 'Unpublish' : 'Publish'}
                    >
                      {career.published ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
