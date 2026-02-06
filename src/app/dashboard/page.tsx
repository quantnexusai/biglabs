'use client';

import {
  DollarSign,
  Users,
  CheckCircle2,
  Star,
  TrendingUp,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '@/lib/auth-context';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { demoAnalyticsData, demoAiInsights, demoConsultations } from '@/lib/demo-data';

const statCards = [
  {
    label: 'Total Revenue',
    value: `$${(demoAnalyticsData.overview.totalRevenue / 1000000).toFixed(1)}M`,
    icon: DollarSign,
    accent: true,
  },
  {
    label: 'Active Clients',
    value: demoAnalyticsData.overview.activeClients.toString(),
    icon: Users,
    accent: false,
  },
  {
    label: 'Projects Completed',
    value: demoAnalyticsData.overview.projectsCompleted.toString(),
    icon: CheckCircle2,
    accent: false,
  },
  {
    label: 'Avg Satisfaction',
    value: `${demoAnalyticsData.overview.avgSatisfaction}/5`,
    icon: Star,
    accent: false,
  },
];

const insightIcons: Record<string, typeof TrendingUp> = {
  growth: TrendingUp,
  risk: AlertTriangle,
  efficiency: Zap,
};

const insightDotColors: Record<string, string> = {
  growth: 'bg-emerald-400',
  risk: 'bg-yellow-400',
  efficiency: 'bg-horizon-light',
};

const statusClasses: Record<string, string> = {
  pending: 'status-pending',
  confirmed: 'status-confirmed',
  completed: 'status-completed',
  cancelled: 'status-cancelled',
};

export default function DashboardPage() {
  const { profile } = useAuth();
  const firstName = profile?.first_name || 'there';

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Dashboard"
        subtitle={`Welcome back, ${firstName}`}
      />

      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-carbon-400 text-xs uppercase tracking-wider font-mono">
                      {stat.label}
                    </p>
                    <p
                      className={`text-2xl font-sans font-bold mt-1 ${
                        stat.accent ? 'text-warmth' : 'text-white'
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-2 bg-carbon-800 rounded">
                    <Icon className="h-5 w-5 text-horizon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue chart */}
        <div className="card">
          <h2 className="text-sm font-mono text-carbon-400 uppercase tracking-wider mb-4">
            Revenue Trend
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoAnalyticsData.revenueByMonth}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5682B1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5682B1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Roboto Mono' }}
                  axisLine={{ stroke: '#222222' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B7280', fontSize: 12, fontFamily: 'Roboto Mono' }}
                  axisLine={{ stroke: '#222222' }}
                  tickLine={false}
                  tickFormatter={(value: number) => `$${value / 1000}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid #333333',
                    borderRadius: 0,
                    fontFamily: 'Roboto Mono',
                    fontSize: 12,
                  }}
                  labelStyle={{ color: '#9CA3AF' }}
                  itemStyle={{ color: '#5682B1' }}
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5682B1"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row: AI Insights + Recent Consultations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Insights */}
          <div className="card">
            <h2 className="text-sm font-mono text-carbon-400 uppercase tracking-wider mb-4">
              AI Insights
            </h2>
            <div className="space-y-4">
              {demoAiInsights.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 bg-carbon-950 border border-carbon-800"
                >
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      insightDotColors[item.type] || 'bg-carbon-500'
                    }`}
                  />
                  <div>
                    <p className="font-sans font-semibold text-sm text-white">
                      {item.title}
                    </p>
                    <p className="text-xs font-mono text-carbon-300 mt-1 leading-relaxed">
                      {item.insight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Consultations */}
          <div className="card">
            <h2 className="text-sm font-mono text-carbon-400 uppercase tracking-wider mb-4">
              Recent Consultations
            </h2>
            <div className="space-y-3">
              {demoConsultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="flex items-center justify-between p-3 bg-carbon-950 border border-carbon-800"
                >
                  <div>
                    <p className="font-sans font-semibold text-sm text-white">
                      {consultation.name}
                    </p>
                    <p className="text-xs font-mono text-carbon-400 mt-0.5">
                      {consultation.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={statusClasses[consultation.status] || 'text-carbon-400'}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1" />
                      {consultation.status}
                    </span>
                    <span className="text-xs font-mono text-carbon-500">
                      {consultation.preferred_date
                        ? new Date(consultation.preferred_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'TBD'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
