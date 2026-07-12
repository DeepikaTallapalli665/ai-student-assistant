import React, { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  Trash2,
  CalendarPlus,
  CalendarCheck,
  Check,
  Share2,
} from "lucide-react";
import { CalendarEvent, EventType } from "../types";

interface EventListProps {
  events: CalendarEvent[];
  isSyncing: Record<string, boolean>;
  onSyncEvent: (eventId: string) => void;
  onAddEvent: (event: Omit<CalendarEvent, "id" | "calendarSynced">) => void;
  onDeleteEvent: (id: string) => void;
}

export default function EventList({
  events,
  isSyncing,
  onSyncEvent,
  onAddEvent,
  onDeleteEvent,
}: EventListProps) {
  const [filter, setFilter] = useState<"all" | "synced" | "unsynced">("all");
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState<EventType>("college_notice");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dateTime) return;
    onAddEvent({
      title,
      dateTime,
      location,
      description,
      eventType,
    });
    // Reset Form
    setTitle("");
    setDateTime("");
    setLocation("");
    setDescription("");
    setEventType("college_notice");
    setShowForm(false);
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === "all") return true;
    if (filter === "synced") return ev.calendarSynced;
    if (filter === "unsynced") return !ev.calendarSynced;
    return true;
  });

  const getCategoryBorder = (type: string) => {
    switch (type) {
      case "placement":
        return "border-blue-500 dark:border-blue-500";
      case "internship":
        return "border-emerald-500 dark:border-emerald-500";
      case "interview":
        return "border-purple-500 dark:border-purple-500";
      case "assignment":
        return "border-amber-500 dark:border-amber-500";
      case "exam":
        return "border-red-500 dark:border-red-500";
      case "webinar":
        return "border-pink-500 dark:border-pink-500";
      default:
        return "border-slate-400 dark:border-slate-500";
    }
  };

  const getCategoryBadge = (type: string) => {
    switch (type) {
      case "placement":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400";
      case "internship":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
      case "interview":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400";
      case "assignment":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
      case "exam":
        return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
      case "webinar":
        return "bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-6" id="event-list-container">
      {/* Event Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Academic Schedule & Events
          </h2>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            View AI extracted academic milestones, track exams, and sync deadlines to external accounts
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          id="add-event-toggle"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 transition"
        >
          <CalendarPlus className="h-4 w-4" />
          <span>Add Custom Event</span>
        </button>
      </div>

      {/* Manual Add Event Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          id="add-event-form"
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
            Create Custom Schedule Event
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. DBMS Practicals"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Category Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                >
                  <option value="placement">Placement Drive</option>
                  <option value="internship">Internship Notice</option>
                  <option value="interview">Interview Schedule</option>
                  <option value="assignment">Assignment Deadline</option>
                  <option value="exam">Examination Date</option>
                  <option value="webinar">Webinar/Seminar</option>
                  <option value="college_notice">General Notice</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Date and Time
                </label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Location / Platform
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lab 3, Block A or Microsoft Teams"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Description / Notes
              </label>
              <textarea
                rows={3}
                placeholder="Details of the syllabus, login links, or reminders..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Event</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Sync Filter Bar */}
      <div className="flex items-center justify-between" id="event-filters">
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-850">
          {[
            { id: "all", label: "All Schedules" },
            { id: "synced", label: "Google Calendar Synced" },
            { id: "unsynced", label: "Pending Sync" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition outline-none ${
                filter === item.id
                  ? "bg-white text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-100"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" id="event-cards-grid">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <CalendarDays className="h-10 w-10 mb-2 stroke-[1.2] text-slate-300 dark:text-slate-600" />
            <p className="text-xs font-medium">No events found under current filters</p>
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const syncing = isSyncing[ev.id];
            return (
              <div
                key={ev.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm dark:bg-slate-900 transition-all border-l-4 ${getCategoryBorder(
                  ev.eventType
                )}`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="space-y-1">
                    <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getCategoryBadge(ev.eventType)}`}>
                      {ev.eventType.replace("_", " ")}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {ev.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onDeleteEvent(ev.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 transition"
                    title="Remove Event"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {ev.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {ev.description}
                  </p>
                )}

                {/* Event Schedule Footer Stats */}
                <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800/60 pt-4 text-[11px] text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>
                        {new Date(ev.dateTime).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    {ev.location && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span className="truncate max-w-[180px]">{ev.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 mt-2 sm:mt-0">
                    {ev.calendarSynced ? (
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1.5 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30">
                        <CalendarCheck className="h-4 w-4" />
                        <span>Synced to G-Calendar</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSyncEvent(ev.id)}
                        disabled={syncing}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 px-2.5 py-1.5 rounded-xl border border-blue-200/40 dark:border-blue-900/40 transition"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>{syncing ? "Syncing..." : "Sync Calendar"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
