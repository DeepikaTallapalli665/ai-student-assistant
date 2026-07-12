
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

type Props = {
  darkMode: boolean;
  onDarkModeToggle: () => void;
  notifications: any[];
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
  profile: any;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  connectionStatus: any;
  unreadEmailsCount: number;
  onLogout: () => void;
};

export default function DashboardLayout({
  darkMode,
  onDarkModeToggle,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  profile,
  searchQuery,
  onSearchQueryChange,
  connectionStatus,
  unreadEmailsCount,
  onLogout,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] flex">
      <Sidebar
        connectionStatus={connectionStatus}
        unreadEmailsCount={unreadEmailsCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Navbar
          onMenuToggle={() => setSidebarOpen(true)}
          darkMode={darkMode}
          onDarkModeToggle={onDarkModeToggle}
          notifications={notifications}
          onMarkNotificationRead={onMarkNotificationRead}
          onClearNotifications={onClearNotifications}
          profile={profile}
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
        />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}