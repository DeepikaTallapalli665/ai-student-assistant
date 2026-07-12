import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";

import DashboardContainer from "./Pages/DashboardContainer";
import EmailsPage from "./Pages/EmailsPage";
import EventsPage from "./Pages/EventsPage";
import CalendarPage from "./Pages/CalendarPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [emails, setEmails] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [notifications] = useState<any[]>([]);

  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const meRes = await fetch("http://localhost:3000/api/me", {
          credentials: "include",
        });

        const me = await meRes.json();

        if (!me.loggedIn) {
          setLoading(false);
          return;
        }

        setLoggedIn(true);
        setUser(me.user);

        const emailRes = await fetch("http://localhost:3000/api/emails", {
          credentials: "include",
        });

        const emailData = await emailRes.json();
        setEmails(emailData);

        const eventRes = await fetch("http://localhost:3000/api/events", {
          credentials: "include",
        });

        const eventData = await eventRes.json();
        setEvents(eventData);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />

        <Route
          element={
            loggedIn ? (
              <DashboardLayout
                darkMode={darkMode}
                onDarkModeToggle={() => setDarkMode(!darkMode)}
                notifications={notifications}
                onMarkNotificationRead={() => {}}
                onClearNotifications={() => {}}
                profile={user}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                connectionStatus={{
                  googleAuth: true,
                  gmailConnected: true,
                  calendarConnected: true,
                }}
                unreadEmailsCount={emails.length}
                onLogout={async () => {
                  await fetch("http://localhost:3000/logout", {
                    credentials: "include",
                  });

                  setLoggedIn(false);
                  setUser(null);
                  setEmails([]);
                  setEvents([]);
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            path="/dashboard"
            element={
              <DashboardContainer
                profile={user}
                emails={emails}
                events={events}
              />
            }
          />

          <Route
  path="/emails"
  element={<EmailsPage emails={emails} />}
/>
          <Route
            path="/events"
            element={<EventsPage events={events} />}
          />

          <Route
            path="/calendar"
            element={<CalendarPage events={events} />}
          />

          <Route
            path="/profile"
            element={<ProfilePage profile={user} />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}