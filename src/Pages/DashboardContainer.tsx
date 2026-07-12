import { useEffect, useState } from "react";
import DashboardPage from "./DashboardPage";

export default function DashboardContainer() {
  const [profile, setProfile] = useState<any>(null);
  const [emails, setEmails] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
          credentials: "include",
      }).then((res) => res.json()),

fetch(`${import.meta.env.VITE_API_URL}/api/emails`, {
          credentials: "include",
      }).then((res) => res.json()),

fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
          credentials: "include",
      }).then((res) => res.json()),

fetch(`${import.meta.env.VITE_API_URL}/api/analysis`, {
          credentials: "include",
      }).then((res) => res.json()),
    ])
      .then(([user, emailData, eventData, analysisData]) => {
        setProfile(user.user);
        setEmails(emailData);
        setEvents(eventData);
        setAnalysis(analysisData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2 className="p-10">Loading...</h2>;
  }

  return (
    <DashboardPage
      profile={profile}
      emails={emails}
      events={events}
      analysis={analysis}
    />
  );
}