import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Mail,
  Calendar as CalendarIcon,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Email, CalendarEvent } from "../types";

interface StatsSectionProps {
  emails: Email[];
  events: CalendarEvent[];
}

export default function StatsSection({ emails, events }: StatsSectionProps) {
  const totalEmails = emails.length;
  const unreadEmails = emails.filter((e) => !e.isRead).length;
  const totalEvents = events.length;
  const syncedEvents = events.filter((e) => e.calendarSynced).length;

  // Compute category distribution for charts
  const categories = [
    { name: "Placement", count: 0, color: "#3b82f6" }, // Blue
    { name: "Internship", count: 0, color: "#10b981" }, // Emerald
    { name: "Interview", count: 0, color: "#8b5cf6" }, // Purple
    { name: "Assignment", count: 0, color: "#f59e0b" }, // Amber
    { name: "Exam", count: 0, color: "#ef4444" }, // Red
    { name: "Webinar", count: 0, color: "#ec4899" }, // Pink
    { name: "Notices", count: 0, color: "#64748b" }, // Slate
  ];

  emails.forEach((e) => {
    if (e.category === "placement") categories[0].count++;
    else if (e.category === "internship") categories[1].count++;
    else if (e.category === "interview") categories[2].count++;
    else if (e.category === "assignment") categories[3].count++;
    else if (e.category === "exam") categories[4].count++;
    else if (e.category === "webinar") categories[5].count++;
    else if (e.category === "college_notice") categories[6].count++;
  });

  const chartData = categories.filter((c) => c.count > 0);

  const statCards = [
    {
      title: "Total Academic Emails",
      value: totalEmails,
      description: `${unreadEmails} unanalyzed in inbox`,
      icon: Mail,
      iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400",
    },
    {
      title: "Active Events",
      value: totalEvents,
      description: "Extracted from academic emails",
      icon: CalendarIcon,
      iconColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400",
    },
    {
      title: "Google Calendar Synced",
      value: syncedEvents,
      description: `${totalEvents - syncedEvents} events remaining`,
      icon: CheckCircle,
      iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      title: "Assignments & Exams",
      value: categories[3].count + categories[4].count,
      description: "Immediate action required",
      icon: AlertTriangle,
      iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6" id="stats-section">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {card.title}
                </span>
                <div className={`rounded-xl p-2.5 ${card.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {card.value}
              </p>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart Panel */}
      {chartData.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
            AI Classification Distribution
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(148, 163, 184, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "rgb(15, 23, 42)",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "11px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={36}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
