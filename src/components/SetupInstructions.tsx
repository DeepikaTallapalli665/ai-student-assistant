import { useState } from "react";
import {
  GraduationCap,
  Key,
  Globe,
  Settings,
  Mail,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SetupInstructions() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    google: false,
    n8n: false,
    ai: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-4" id="setup-instructions-container">
      <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-500/15" id="setup-banner">
        <h3 className="text-base font-bold flex items-center gap-2">
          <GraduationCap className="h-5.5 w-5.5" />
          <span>System Architecture & Integration Walkthrough</span>
        </h3>
        <p className="text-xs text-blue-100 mt-1.5 leading-relaxed">
          AI Student Assistant integrates multiple enterprise components: OAuth flows, Gemini NLP extraction, and an n8n workflow scheduler. Follow the blueprints below to activate production environments!
        </p>
      </div>

      {/* 1. Gemini AI API Key config */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <button
          onClick={() => toggleSection("ai")}
          className="flex w-full items-center justify-between p-4 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Step 1: Set Up Server-Side Gemini API Extraction</span>
          </div>
          {openSections.ai ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {openSections.ai && (
          <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fadeIn">
            <p>
              Aegis AI extracts assignments, exam alerts, and internship notices dynamically using <b>Gemini 3.5 Flash</b>. This occurs server-side in <code>server.ts</code> using the official <code>@google/genai</code> SDK, safeguarding secret keys.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 text-blue-500" />
                <span>How to activate:</span>
              </h4>
              <ol className="list-decimal pl-4 space-y-1.5">
                <li>
                  Go to the <b>Google AI Studio Secrets Panel</b> (the Settings Cog/Secrets icon on the workspace interface).
                </li>
                <li>
                  Add an environment variable named <code>GEMINI_API_KEY</code>.
                </li>
                <li>
                  Get a free key from <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-blue-500 font-semibold underline">Google AI Studio</a>.
                </li>
                <li>
                  Save the key. Our server detects it and upgrades from local regex parsing to full, deep semantic AI models instantly!
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* 2. Google OAuth client ID */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <button
          onClick={() => toggleSection("google")}
          className="flex w-full items-center justify-between p-4 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="h-4 w-4 text-blue-500" />
            <span>Step 2: Google Console Credentials (Gmail & Calendar)</span>
          </div>
          {openSections.google ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {openSections.google && (
          <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fadeIn">
            <p>
              To fetch authentic emails from student Gmail accounts or directly populate calendar grids, register an application in the Google Developer Ecosystem.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Settings className="h-3.5 w-3.5 text-blue-500" />
                <span>Developer Console Setup:</span>
              </h4>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <b>Register Project:</b> Visit <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-blue-500 font-semibold underline">Google Cloud Console</a> and create a project.
                </li>
                <li>
                  <b>API Enablement:</b> Enable both the <span className="font-semibold text-slate-700 dark:text-slate-300">Gmail API</span> and the <span className="font-semibold text-slate-700 dark:text-slate-300">Google Calendar API</span> in the Library.
                </li>
                <li>
                  <b>OAuth Consent Screen:</b> Set the application type to <i>External</i> or <i>Internal (Google Workspace)</i>, configure scopes: <code>gmail.readonly</code> and <code>calendar.events</code>.
                </li>
                <li>
                  <b>Create Credentials:</b> Select <i>Create Credentials &gt; OAuth Client ID</i>, choose <i>Web Application</i>, add authorized redirects (e.g. <code>https://your-domain.app/api/auth/callback</code>), and grab your <b>Client ID</b> and <b>Client Secret</b>.
                </li>
                <li>
                  <b>Apply Keys:</b> Paste these inside our System Settings panel.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 3. n8n workflow */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <button
          onClick={() => toggleSection("n8n")}
          className="flex w-full items-center justify-between p-4 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="h-4 w-4 text-emerald-500" />
            <span>Step 3: n8n Calendar Dispatcher Setup</span>
          </div>
          {openSections.n8n ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {openSections.n8n && (
          <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 animate-fadeIn">
            <p>
              n8n acts as our scheduler and system glue. By routing parsed JSON structures through n8n, you can execute complex workflows (e.g. sending a Slack reminder, alerting roommate channels, and writing to Google Calendar).
            </p>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50 space-y-3">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-emerald-500" />
                <span>n8n Workflow Nodes Blueprint:</span>
              </h4>
              <ol className="list-decimal pl-4 space-y-2">
                <li>
                  <b>Webhook Trigger (Node 1):</b> Create a <i>Webhook Node</i> in n8n, set HTTP Method to <code>POST</code> and Response mode to <code>When Last Node Finishes</code>. Copy the production webhook URL.
                </li>
                <li>
                  <b>Google Calendar (Node 2):</b> Connect an <i>Event Creator Node</i> in Google Calendar. Set the Event Summary dynamically from the incoming body: <code>{"{{ $json.body.event.title }}"}</code>, Start Time to <code>{"{{ $json.body.event.dateTime }}"}</code>, and Venue to <code>{"{{ $json.body.event.location }}"}</code>.
                </li>
                <li>
                  <b>Optionally Add Slack/Discord (Node 3):</b> Send a morning alert summarizing the extracted event to your academic channel.
                </li>
                <li>
                  <b>Configuration:</b> Paste the n8n Webhook URL into the System Settings panel. When clicking "Sync Calendar" on any event, Aegis AI delivers an immediate payload to n8n, populating Google Calendar instantly!
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
