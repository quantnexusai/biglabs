'use client';

import { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Zap,
  Loader2,
  Bot,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { demoAnalyticsData, demoAiInsights } from '@/lib/demo-data';

const PIE_COLORS = ['#5682B1', '#739EC9', '#FFE8DB', '#3D6A99', '#444444'];

const insightIcons: Record<string, typeof TrendingUp> = {
  growth: TrendingUp,
  risk: AlertTriangle,
  efficiency: Zap,
};

const insightAccents: Record<string, string> = {
  growth: 'border-emerald-400/30 bg-emerald-400/5',
  risk: 'border-yellow-400/30 bg-yellow-400/5',
  efficiency: 'border-horizon/30 bg-horizon/5',
};

const insightIconColors: Record<string, string> = {
  growth: 'text-emerald-400',
  risk: 'text-yellow-400',
  efficiency: 'text-horizon-light',
};

export default function AnalyticsPage() {
  const [generating, setGenerating] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);

  const handleGenerateReport = () => {
    setGenerating(true);
    setReportVisible(false);
    setTimeout(() => {
      setGenerating(false);
      setReportVisible(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <DashboardHeader
        title="Analytics"
        subtitle="AI-powered business intelligence"
      />

      <div className="p-6 space-y-6">
        {/* Generate AI Report button */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono text-carbon-400 uppercase tracking-wider">
            Business Intelligence
          </h2>
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="btn-primary"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate AI Report
              </>
            )}
          </button>
        </div>

        {/* Row 1: Bar chart + Pie chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Service */}
          <div className="card">
            <h3 className="text-sm font-mono text-carbon-400 uppercase tracking-wider mb-4">
              Revenue by Service
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demoAnalyticsData.revenueByService}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
                  <XAxis
                    dataKey="service"
                    tick={{ fill: '#6B7280', fontSize: 11, fontFamily: 'Roboto Mono' }}
                    axisLine={{ stroke: '#222222' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#6B7280', fontSize: 11, fontFamily: 'Roboto Mono' }}
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
                    formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" radius={[0, 0, 0, 0]}>
                    {demoAnalyticsData.revenueByService.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#FFE8DB' : '#5682B1'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Client Distribution by Industry */}
          <div className="card">
            <h3 className="text-sm font-mono text-carbon-400 uppercase tracking-wider mb-4">
              Client Distribution by Industry
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demoAnalyticsData.clientsByIndustry}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    dataKey="count"
                    nameKey="industry"
                    stroke="#0A0A0A"
                    strokeWidth={2}
                  >
                    {demoAnalyticsData.clientsByIndustry.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0A0A0A',
                      border: '1px solid #333333',
                      borderRadius: 0,
                      fontFamily: 'Roboto Mono',
                      fontSize: 12,
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                    formatter={(value: number, name: string) => [
                      `${value} clients`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 -mt-4">
                {demoAnalyticsData.clientsByIndustry.map((item, index) => (
                  <div key={item.industry} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                    />
                    <span className="text-xs font-mono text-carbon-400">
                      {item.industry}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: AI-generated insights (conditionally shown or always shown) */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono text-carbon-400 uppercase tracking-wider">
              AI-Generated Insights
            </h3>
            <span className="badge flex items-center gap-1.5">
              <Bot className="h-3 w-3" />
              Powered by Claude AI
            </span>
          </div>

          {generating && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-10 h-10 border-2 border-horizon border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-mono text-carbon-400 tracking-wider">
                Analyzing business data...
              </p>
            </div>
          )}

          {!generating && !reportVisible && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Sparkles className="h-8 w-8 text-carbon-700" />
              <p className="text-sm font-mono text-carbon-500 text-center max-w-md">
                Click &ldquo;Generate AI Report&rdquo; to analyze your business data and receive
                actionable insights powered by Claude AI.
              </p>
            </div>
          )}

          {!generating && reportVisible && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demoAiInsights.map((item) => {
                const Icon = insightIcons[item.type] || Zap;
                return (
                  <div
                    key={item.id}
                    className={`card-highlight ${insightAccents[item.type] || ''}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon
                        className={`h-4 w-4 ${insightIconColors[item.type] || 'text-horizon'}`}
                      />
                      <h4 className="font-sans font-semibold text-sm text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs font-mono text-carbon-300 leading-relaxed">
                      {item.insight}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
