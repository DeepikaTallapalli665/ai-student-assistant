import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from "lucide-react";
import { CalendarEvent } from "../types";

interface CalendarWidgetProps {
  events: CalendarEvent[];
}

export default function CalendarWidget({ events }: CalendarWidgetProps) {
  // We can default to July 2026 since the mock data is around July 2026.
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed (6 is July)
  const [selectedDay, setSelectedDay] = useState<number | null>(4); // Default to July 4th

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Helper to get number of days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  // Check if a day has events
  const getDayEvents = (day: number) => {
    return events.filter((e) => {
      const eventDate = new Date(e.dateTime);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
  };

  // Format date helper
  const formatDateISO = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${currentYear}-${monthStr}-${dayStr}`;
  };

  // Build calendar matrix
  const calendarCells = [];
  // Empty spaces for previous month days
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  // Month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  const activeEvents = selectedDay ? getDayEvents(selectedDay) : [];

  const getCategoryStyles = (type: string) => {
    switch (type) {
      case "placement":
        return "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400";
      case "internship":
        return "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400";
      case "interview":
        return "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400";
      case "assignment":
        return "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400";
      case "exam":
        return "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400";
      case "webinar":
        return "border-pink-500 bg-pink-50 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400";
      default:
        return "border-slate-500 bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-400";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12" id="calendar-widget-wrapper">
      {/* Interactive Calendar Grid */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <div className="flex gap-1.5">
            <button
              onClick={prevMonth}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextMonth}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Row */}
        <div className="grid grid-cols-7 text-center mb-2">
          {daysOfWeek.map((day, i) => (
            <span key={i} className="text-xs font-semibold text-slate-400 dark:text-slate-500 py-2">
              {day}
            </span>
          ))}
        </div>

        {/* Days Matrix */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendarCells.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-10 sm:h-12" />;
            }

            const dayEvents = getDayEvents(day);
            const hasEvents = dayEvents.length > 0;
            const isSelected = selectedDay === day;

            return (
              <button
                key={`day-${day}`}
                onClick={() => setSelectedDay(day)}
                className={`relative flex h-10 sm:h-12 flex-col items-center justify-center rounded-xl text-xs font-medium transition-all outline-none ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                }`}
              >
                <span>{day}</span>
                {hasEvents && (
                  <span
                    className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                      isSelected ? "bg-white" : "bg-blue-500 dark:bg-blue-400"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side Event Inspector Panel */}
      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>
            {selectedDay
              ? `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`
              : "Select a date"}
          </span>
        </h3>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {activeEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 dark:text-slate-500">
              <Calendar className="h-8 w-8 mb-2 stroke-[1.5]" />
              <p className="text-xs font-medium">No events scheduled for this day</p>
            </div>
          ) : (
            activeEvents.map((ev) => (
              <div
                key={ev.id}
                className={`rounded-xl border-l-4 p-4 shadow-sm ${getCategoryStyles(
                  ev.eventType
                )}`}
              >
                <h4 className="font-bold text-xs truncate mb-1">{ev.title}</h4>
                <div className="space-y-1 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 opacity-70" />
                    <span>
                      {new Date(ev.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {ev.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 opacity-70" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                  )}
                </div>
                {ev.description && (
                  <p className="mt-2 text-[10px] leading-relaxed opacity-90 line-clamp-2 border-t border-black/5 dark:border-white/5 pt-1.5">
                    {ev.description}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
