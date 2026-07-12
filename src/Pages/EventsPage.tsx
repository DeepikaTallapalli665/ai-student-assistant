import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
        credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>

      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-xl p-5 mb-4 shadow bg-white"
        >
          <h2 className="text-xl font-bold">
            {event.summary}
          </h2>

          <p className="text-gray-600 mt-2">
            📅 {event.start?.dateTime || event.start?.date}
          </p>

          <p className="mt-2">
            📍 {event.location || "No Location"}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {event.description}
          </p>
        </div>
      ))}
    </div>
  );
}