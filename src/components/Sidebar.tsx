import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Calendar,
  Settings,
  User,
  GraduationCap,
  Sparkles,
  Link2,
} from "lucide-react";
import { ConnectionStatus } from "../types";

interface SidebarProps {
  connectionStatus: ConnectionStatus;
  unreadEmailsCount: number;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({
  connectionStatus,
  unreadEmailsCount,
  isOpen,
  onClose,
  onLogout,
}: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Gmail Inbox", path: "/emails", icon: Mail, badge: unreadEmailsCount > 0 ? unreadEmailsCount : undefined },
    { name: "Calendar Events", path: "/events", icon: Sparkles },
    { name: "Calendar View", path: "/calendar", icon: Calendar },
    { name: "My Profile", path: "/profile", icon: User },
    { name: "System Settings", path: "/settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white px-5 py-6 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* App Branding */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white dark:bg-blue-500 shadow-md shadow-blue-500/20">
            <GraduationCap className="h-6 w-6" id="brand-logo" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
              Aegis AI
            </h1>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Student Assistant
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1" id="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Connectivity Monitor */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-950/30" id="connectivity-status">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Integration Status
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Google Auth</span>
              <span
                className={`inline-flex h-2 w-2 rounded-full ${
                  connectionStatus.googleAuth ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Gmail Agent</span>
              <span
                className={`inline-flex h-2 w-2 rounded-full ${
                  connectionStatus.gmailConnected ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">G-Calendar</span>
              <span
                className={`inline-flex h-2 w-2 rounded-full ${
                  connectionStatus.calendarConnected ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">n8n Webhook</span>
              <span
                className={`inline-flex h-2 w-2 rounded-full ${
                  connectionStatus.n8nWebhookConnected ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Gemini AI</span>
              <span
                className={`inline-flex h-2 w-2 rounded-full ${
                  connectionStatus.geminiConnected ? "bg-emerald-500" : "bg-amber-500"
                }`}
                title={connectionStatus.geminiConnected ? "Gemini Key Active" : "Gemini API using Local Fallback"}
              />
            </div>
          </div>
        </div>

        {/* Footer Logout */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onLogout}
            id="logout-btn"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 transition-all duration-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Disconnect Account</span>
          </button>
        </div>
      </aside>
    </>
  );
}
