'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/lib/auth-context';
import { demoArticles } from '@/lib/demo-data';
import { Article } from '@/lib/types';

export default function ArticlesPage() {
  const { isDemo } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isDemo) {
      setArticles(demoArticles);
      setLoading(false);
    }
  }, [isDemo]);

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleNew = () => {
    alert('Coming soon - connect Supabase to enable');
  };

  const handleEdit = (id: string) => {
    alert('Coming soon - connect Supabase to enable');
  };

  const handleDelete = (id: string) => {
    if (isDemo) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex-1">
        <DashboardHeader title="Articles" subtitle="Manage your published content" />
        <div className="p-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-carbon-900 border border-carbon-800 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <DashboardHeader title="Articles" subtitle="Manage your published content" />

      <div className="px-6 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button onClick={handleNew} className="btn-primary">
            <Plus className="h-4 w-4" />
            New Article
          </button>
        </div>

        {/* Table */}
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header">Title</th>
                <th className="table-header">Category</th>
                <th className="table-header">Published</th>
                <th className="table-header">Status</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-cell text-center text-carbon-500 py-12">
                    No articles found.
                  </td>
                </tr>
              ) : (
                filtered.map((article) => (
                  <tr key={article.id} className="group hover:bg-carbon-900/50 transition-colors">
                    <td className="table-cell">
                      <div>
                        <p className="font-sans font-semibold text-white text-sm">
                          {article.title}
                        </p>
                        <p className="text-xs text-carbon-500 mt-0.5 line-clamp-1">
                          {article.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="badge">{article.category}</span>
                    </td>
                    <td className="table-cell text-carbon-400">
                      {formatDate(article.published_at)}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            article.published ? 'bg-emerald-400' : 'bg-carbon-600'
                          }`}
                        />
                        <span className="text-xs font-mono text-carbon-400">
                          {article.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(article.id)}
                          className="btn-ghost p-2"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="btn-ghost p-2 hover:!text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
