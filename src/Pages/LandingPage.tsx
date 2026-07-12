import { Link } from "react-router-dom";
import { GraduationCap, Calendar, Mail, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-2xl">
              <GraduationCap size={32} />
            </div>

            <div>
              <h1 className="text-3xl font-black">
                Aegis AI Assistant
              </h1>

              <p className="text-slate-500">
                AI Powered Student Productivity Platform
              </p>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-8">
            Automatically scan university emails, extract deadlines,
            create calendar events, send reminders and organize your
            academic life using AI.
          </p>

          <div className="mt-8">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="space-y-5">

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow">
            <div className="flex gap-4 items-center">
              <Mail className="text-blue-600" />
              <div>
                <h3 className="font-bold">Smart Email Analysis</h3>
                <p className="text-sm text-slate-500">
                  AI reads important university emails.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow">
            <div className="flex gap-4 items-center">
              <Calendar className="text-green-600" />
              <div>
                <h3 className="font-bold">Automatic Calendar</h3>
                <p className="text-sm text-slate-500">
                  Important dates are added automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow">
            <div className="flex gap-4 items-center">
              <Sparkles className="text-purple-600" />
              <div>
                <h3 className="font-bold">Gemini AI</h3>
                <p className="text-sm text-slate-500">
                  AI summaries and deadline extraction.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}