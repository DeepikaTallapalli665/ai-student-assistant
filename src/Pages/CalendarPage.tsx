import CalendarWidget from "../components/CalendarWidget";

type Props = {
  events: any[];
};

export default function Calendar({ events }: Props) {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Academic Calendar
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          View all your exams, assignments, workshops, placements and academic
          events in one interactive calendar.
        </p>
      </div>

      {/* Calendar */}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">

        <CalendarWidget events={events} />

      </div>

    </div>
  );
}