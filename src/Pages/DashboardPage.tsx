import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Mail,
  Calendar,
  Bell,
  Brain,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";
import StatsSection from "../components/StatsSection";

type Props = {
  profile: any;
  emails: any[];
  events: any[];
  analysis: any[];
};

export default function DashboardPage({
  profile,
  emails,
  events,
  analysis,
}: Props) {
  const [loadingAI, setLoadingAI] = useState(false);


    const runAI = async () => {
  alert("runAI started");

  try {
    setLoadingAI(true);

    console.log("Before fetch");

const response = await fetch(`${import.meta.env.VITE_API_URL}/api/run-ai`, {
        method: "POST",
      credentials: "include",
    });

    console.log("After fetch");
    console.log(response);

    const data = await response.json();

    console.log(data);

    alert("Success");
  } catch (err) {
    console.error(err);
    alert("ERROR");
  } finally {
    setLoadingAI(false);
  }
};
  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold">
          Welcome back, {profile?.displayName || "Student"} 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Your AI assistant is monitoring Gmail,
          extracting important events and reminding you
          about placements, exams and deadlines.
        </p>
        <div className="mt-6">
  <button
  onClick={() => {
    alert("Button works");
    runAI();
  }}
  disabled={loadingAI}
  className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold"
>
  Analyze Gmail with AI
</button>
</div>

      </div>

      {/* Stats */}

      <StatsSection
        emails={emails}
        events={events}
      />

      {/* Quick Actions */}

      <div>

        <h2 className="text-xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-5">

          <Link
            to="/emails"
            className="rounded-2xl border p-6 bg-white hover:shadow-lg transition"
          >
            <Mail className="h-8 w-8 text-blue-600" />

            <h3 className="mt-4 font-semibold">
              Gmail Inbox
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              View academic emails
            </p>

          </Link>

          <Link
            to="/events"
            className="rounded-2xl border p-6 bg-white hover:shadow-lg transition"
          >
            <Calendar className="h-8 w-8 text-purple-600" />

            <h3 className="mt-4 font-semibold">
              Events
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              AI extracted schedule
            </p>

          </Link>

          <Link
            to="/calendar"
            className="rounded-2xl border p-6 bg-white hover:shadow-lg transition"
          >
            <Bell className="h-8 w-8 text-green-600" />

            <h3 className="mt-4 font-semibold">
              Calendar
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Google Calendar Sync
            </p>

          </Link>

          <Link
            to="/settings"
            className="rounded-2xl border p-6 bg-white hover:shadow-lg transition"
          >
            <Brain className="h-8 w-8 text-orange-600" />

            <h3 className="mt-4 font-semibold">
              AI Settings
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Configure Gemini & n8n
            </p>

          </Link>

        </div>

      </div>

    {/* AI Analysis */}

<div className="rounded-2xl border bg-white p-6">

  <h2 className="text-xl font-bold mb-5">
    AI Analysis
  </h2>

  {analysis.length === 0 ? (

    <div className="text-slate-400">
      No analysis available.
    </div>

  ) : (

    analysis.map((item: any) => (

      <div
        key={item._id}
        className="border rounded-xl p-4 mb-4"
      >
        <h3 className="font-semibold text-lg">
          {item.title}
        </h3>

        <p className="text-sm text-slate-600 mt-2">
          {item.description}
        </p>

        <div className="mt-3 text-sm">
          <strong>Date:</strong> {item.eventDate}
        </div>

        <div className="text-sm">
          <strong>Time:</strong> {item.eventTime}
        </div>

        <div className="text-sm">
          <strong>Event:</strong> {item.isEvent ? "Yes" : "No"}
        </div>

      </div>

    ))

  )}

</div>

{/* Lower Section */}

<div className="grid lg:grid-cols-2 gap-6">

        {/* Upcoming Events */}

        <div className="rounded-2xl border bg-white p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="font-bold text-lg">
              Upcoming Events
            </h2>

            <Link
              to="/events"
              className="text-blue-600 flex items-center gap-1"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>

          {events.length === 0 ? (

            <div className="text-center py-12 text-slate-400">
              No Events Found
            </div>

          ) : (

            events.slice(0, 5).map((event: any) => (

              <div
                key={event.id}
                className="border rounded-xl p-4 mb-3"
              >

                <div className="flex justify-between">

                  <h3 className="font-semibold">
                    {event.summary}
                  </h3>

                  <span className="text-green-600 text-sm">
                    Synced
                  </span>

                </div>

                <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">

                  <Clock size={15} />

                  {event.start?.dateTime
                    ? new Date(event.start.dateTime).toLocaleString()
                    : "No Date"}

                </div>

                {event.location && (

                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">

                    <MapPin size={15} />

                    {event.location}

                  </div>

                )}

              </div>

            ))

          )}

        </div>

        {/* Recent Emails */}

        <div className="rounded-2xl border bg-white p-6">

          <div className="flex justify-between items-center mb-5">

            <h2 className="font-bold text-lg">
              Recent Gmail Emails
            </h2>

            <Link
              to="/emails"
              className="text-blue-600 flex items-center gap-1"
            >
              View Inbox
              <ArrowRight size={16} />
            </Link>

          </div>

          {emails.length === 0 ? (

            <div className="text-center py-12 text-slate-400">
              No Emails Yet
            </div>

          ) : (

            emails.slice(0, 5).map((email: any) => (

              <div
                key={email.id}
                className="border rounded-xl p-4 mb-3"
              >

                <div className="flex justify-between">

                  <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
                    Gmail
                  </span>

                  <span className="text-xs text-slate-500">
                    Inbox
                  </span>

                </div>

                <h3 className="font-semibold mt-3">
                  {email.subject}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {email.snippet}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}