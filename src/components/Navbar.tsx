import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Search,
  Check,
  Trash2,
  Settings,
  User,
  ExternalLink,
} from "lucide-react";
import { AppNotification, UserProfile } from "../types";

interface NavbarProps {
  onMenuToggle: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
  profile: UserProfile;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export default function Navbar({
  onMenuToggle,
  darkMode,
  onDarkModeToggle,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  profile,
  searchQuery,
  onSearchQueryChange,
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter((n) => !n.read);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      id="app-navbar"
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 md:px-6"
    >
      {/* Mobile Toggle & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          id="mobile-menu-toggle"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden max-w-xs sm:block" id="nav-search-container">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search emails or events..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="h-9 w-60 rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-xs font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-950"
          />
        </div>
      </div>

      {/* Utility Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={onDarkModeToggle}
          id="theme-toggle"
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            id="notifications-dropdown-toggle"
            className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none" id="notifications-menu">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Notifications
                </span>
                {notifications.length > 0 && (
                  <button
                    onClick={onClearNotifications}
                    className="flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:text-rose-600 outline-none"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto py-1">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                    No recent notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`group flex items-start justify-between px-4 py-3 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${
                        !notif.read ? "bg-blue-50/30 dark:bg-blue-950/10" : ""
                      }`}
                    >
                      <div className="flex-1 pr-3">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              notif.type === "success"
                                ? "bg-emerald-500"
                                : notif.type === "warning"
                                ? "bg-amber-500"
                                : notif.type === "alert"
                                ? "bg-rose-500"
                                : "bg-blue-500"
                            }`}
                          />
                          <p className="font-semibold text-slate-700 dark:text-slate-300">
                            {notif.title}
                          </p>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                          {new Date(notif.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {!notif.read && (
                        <button
                          onClick={() => onMarkNotificationRead(notif.id)}
                          className="rounded bg-slate-100 p-1 text-slate-400 hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                          title="Mark as read"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            id="profile-dropdown-toggle"
            className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-100 dark:hover:bg-slate-800 outline-none"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
            />
            <span className="hidden text-xs font-semibold text-slate-700 dark:text-slate-300 md:block">
              {profile.name}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none animate-fadeIn" id="profile-menu">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {profile.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {profile.email}
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                >
                  <Settings className="h-4 w-4" />
                  <span>System Settings</span>
                </Link>
                <a
                  href="https://ai.studio/build"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>AI Studio Home</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
