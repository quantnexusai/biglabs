'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Check, X, AlertCircle } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useAuth } from '@/lib/auth-context';
import { demoConsultations } from '@/lib/demo-data';
import { Consultation } from '@/lib/types';

export default function ConsultationsPage() {
  const { isDemo } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      setConsultations(demoConsultations);
      setLoading(false);
    }
  }, [isDemo]);

  const counts = {
    pending: consultations.filter((c) => c.status === 'pending').length,
    confirmed: consultations.filter((c) => c.status === 'confirmed').length,
    completed: consultations.filter((c) => c.status === 'completed').length,
  };

  const updateStatus = (id: string, status: Consultation['status']) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusClass = (status: Consultation['status']) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'confirmed':
        return 'status-confirmed';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
    }
  };

  const getStatusDot = (status: Consultation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-400';
      case 'confirmed':
        return 'bg-horizon-light';
      case 'completed':
        return 'bg-emerald-400';
      case 'cancelled':
        return 'bg-red-400';
    }
  };

  if (loading) {
    return (
      <div className="flex-1">
        <DashboardHeader title="Consultations" subtitle="Manage booking requests" />
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-carbon-900 border border-carbon-800 animate-pulse" />
            ))}
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-carbon-900 border border-carbon-800 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <DashboardHeader title="Consultations" subtitle="Manage booking requests" />

      <div className="px-6 pb-6">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-yellow-400/10 border border-yellow-400/20">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-sans font-bold text-white">{counts.pending}</p>
              <p className="text-xs font-mono text-carbon-400 uppercase tracking-wider">
                Pending
              </p>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-horizon/10 border border-horizon/20">
              <CheckCircle2 className="h-5 w-5 text-horizon-light" />
            </div>
            <div>
              <p className="text-2xl font-sans font-bold text-white">{counts.confirmed}</p>
              <p className="text-xs font-mono text-carbon-400 uppercase tracking-wider">
                Confirmed
              </p>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-emerald-400/10 border border-emerald-400/20">
              <Check className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-sans font-bold text-white">{counts.completed}</p>
              <p className="text-xs font-mono text-carbon-400 uppercase tracking-wider">
                Completed
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card p-0 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Company</th>
                <th className="table-header">Email</th>
                <th className="table-header">Date / Time</th>
                <th className="table-header">Status</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="table-cell text-center text-carbon-500 py-12">
                    No consultation requests.
                  </td>
                </tr>
              ) : (
                consultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    className="group hover:bg-carbon-900/50 transition-colors"
                  >
                    <td className="table-cell">
                      <span className="font-sans font-semibold text-white text-sm">
                        {consultation.name}
                      </span>
                    </td>
                    <td className="table-cell text-carbon-300">
                      {consultation.company || '--'}
                    </td>
                    <td className="table-cell">
                      <a
                        href={`mailto:${consultation.email}`}
                        className="text-horizon hover:text-horizon-light transition-colors"
                      >
                        {consultation.email}
                      </a>
                    </td>
                    <td className="table-cell text-carbon-400">
                      <div>
                        <p>{formatDate(consultation.preferred_date)}</p>
                        {consultation.preferred_time && (
                          <p className="text-xs text-carbon-500">
                            {consultation.preferred_time}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={getStatusClass(consultation.status)}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(consultation.status)}`} />
                        {consultation.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center justify-end gap-1">
                        {consultation.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(consultation.id, 'confirmed')}
                              className="btn-ghost p-2 text-horizon hover:!text-horizon-light"
                              title="Confirm"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(consultation.id, 'cancelled')}
                              className="btn-ghost p-2 hover:!text-red-400"
                              title="Cancel"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {consultation.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => updateStatus(consultation.id, 'completed')}
                              className="btn-ghost p-2 text-emerald-400 hover:!text-emerald-300"
                              title="Mark Complete"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(consultation.id, 'cancelled')}
                              className="btn-ghost p-2 hover:!text-red-400"
                              title="Cancel"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {consultation.status === 'completed' && (
                          <span className="text-xs font-mono text-carbon-600 px-2">
                            Done
                          </span>
                        )}
                        {consultation.status === 'cancelled' && (
                          <button
                            onClick={() => updateStatus(consultation.id, 'pending')}
                            className="btn-ghost p-2 text-carbon-500 hover:!text-yellow-400"
                            title="Reopen"
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                        )}
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
