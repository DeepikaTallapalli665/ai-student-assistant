import React, { useState } from "react";
import {
  Sparkles,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Inbox,
  AlertTriangle,
  Plus,
  Send,
  User,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Email, EventType } from "../types";

interface EmailListProps {
  emails: Email[];
  isAnalyzing: Record<string, boolean>;
  isSyncing: Record<string, boolean>;
  onAnalyzeEmail: (id: string) => void;
  onSyncToCalendar: (emailId: string) => void;
  onAddCustomEmail: (subject: string, sender: string, body: string) => void;
  geminiKeyActive: boolean;
}

export default function EmailList({
  emails,
  isAnalyzing,
  isSyncing,
  onAnalyzeEmail,
  onSyncToCalendar,
  onAddCustomEmail,
  geminiKeyActive,
}: EmailListProps) {
  const [activeTab, setActiveTab] = useState<"all" | "career" | "academic" | "other">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Custom composed notice form state
  const [showCompose, setShowCompose] = useState(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeSender, setComposeSender] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeSubject || !composeSender || !composeBody) return;
    onAddCustomEmail(composeSubject, composeSender, composeBody);
    setComposeSubject("");
    setComposeSender("");
    setComposeBody("");
    setShowCompose(false);
  };

  // Filter logic
  const filteredEmails = emails.filter((email) => {
    if (activeTab === "all") return true;
    if (activeTab === "career") {
      return ["placement", "internship", "interview"].includes(email.category);
    }
    if (activeTab === "academic") {
      return ["assignment", "exam"].includes(email.category);
    }
    if (activeTab === "other") {
      return ["webinar", "college_notice", "other"].includes(email.category);
    }
    return true;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "placement":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400";
      case "internship":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400";
      case "interview":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400";
      case "assignment":
        return "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400";
      case "exam":
        return "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400";
      case "webinar":
        return "bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400";
      case "college_notice":
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ");
  };

  return (
    <div className="space-y-6" id="email-list-container">
      {/* Inbox Header & Compose */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Gmail Integration Inbox
          </h2>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Analyze received notifications or simulate custom notices using server-side AI
          </p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          id="simulate-notice-btn"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Simulate Custom Notice</span>
        </button>
      </div>

      {/* Custom Compose Form Drawer/Modal */}
      {showCompose && (
        <form
          onSubmit={handleComposeSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          id="simulate-notice-form"
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
            Simulate Incoming University/Recruiter Email
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Sender (Email or Department)
                </label>
                <input
                  type="text"
                  placeholder="e.g. academic-section@university.edu"
                  value={composeSender}
                  onChange={(e) => setComposeSender(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schedule: End Term Exams July 2026"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                Email Body Content
              </label>
              <textarea
                rows={4}
                placeholder="Paste the notice body. Make sure to include some dates, time, venue, or instructions so the AI can extract the schedule event!"
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                required
              />
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Deliver to Inbox</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tabs Filter */}
      <div className="flex border-b border-slate-200 dark:border-slate-800" id="inbox-tabs">
        {[
          { id: "all", label: "All Items" },
          { id: "career", label: "Careers & Placements" },
          { id: "academic", label: "Assignments & Exams" },
          { id: "other", label: "Notices & Webinars" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 outline-none -mb-[2px] ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* API Key Connection Banner */}
      {!geminiKeyActive && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20" id="api-key-warning">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-800 dark:text-amber-400">
              Rule-Based NLP Fallback Active
            </p>
            <p className="text-[11px] text-amber-700 dark:text-amber-500 mt-0.5 leading-relaxed">
              To trigger the real deep model-based classifications, please add your Google Gemini
              API key in the <b>Settings Secrets</b> panel. Currently, local regex extractors are simulating AI outputs.
            </p>
          </div>
        </div>
      )}

      {/* Emails Interactive List */}
      <div className="space-y-3" id="email-accordion-list">
        {filteredEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Inbox className="h-10 w-10 mb-2 stroke-[1.2] text-slate-300 dark:text-slate-600" />
            <p className="text-xs font-medium">No emails found in this category</p>
          </div>
        ) : (
          filteredEmails.map((email) => {
            const isExpanded = expandedId === email.id;
            const analyzing = isAnalyzing[email.id];
            const syncing = isSyncing[email.id];

            return (
              <div
                key={email.id}
                className={`rounded-2xl border transition-all duration-300 bg-white dark:bg-slate-900 ${
                  isExpanded
                    ? "border-blue-200 shadow-sm dark:border-blue-900/40"
                    : "border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Accordion Row Header */}
                <div
                  onClick={() => toggleExpand(email.id)}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between cursor-pointer select-none"
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getCategoryBadge(email.category)}`}>
                        {getCategoryLabel(email.category)}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">{email.sender}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(email.date).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                      {email.subject}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {email.aiSummary || email.body}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 justify-end shrink-0">
                    {/* Compact actions */}
                    {email.extractedEvent && !email.syncedToCalendar && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSyncToCalendar(email.id);
                        }}
                        disabled={syncing}
                        className="rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-900/60 p-2 border border-blue-200/50 dark:border-blue-900/30"
                        title="Quick Sync to Calendar"
                      >
                        <CalendarDays className="h-4 w-4" />
                      </button>
                    )}
                    {email.syncedToCalendar && (
                      <span
                        className="rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 p-2 border border-emerald-200/30 dark:border-emerald-900/30"
                        title="Synced"
                      >
                        <CalendarCheck className="h-4 w-4" />
                      </span>
                    )}

                    <div className="text-slate-400 dark:text-slate-500">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800/60 pt-4 space-y-4 text-xs animate-fadeIn">
                    {/* Tabs / Side-by-side Layout: Email Body & AI Summary */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl bg-slate-50/50 p-4 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/50">
                        <h4 className="font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider text-[9px]">
                          Original Mail Body
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap select-text">
                          {email.body}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-xl bg-blue-50/20 p-4 border border-blue-100/50 dark:bg-blue-950/10 dark:border-blue-900/20">
                          <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-1.5 uppercase tracking-wider text-[9px] flex items-center gap-1">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>AI Summary</span>
                          </h4>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {email.aiSummary}
                          </p>
                        </div>

                        {/* Extracted Schedule Event Card */}
                        {email.extractedEvent && (
                          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                            <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800/60 pb-2">
                              <h4 className="font-bold text-slate-700 dark:text-slate-300">
                                AI Extracted Event
                              </h4>
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getCategoryBadge(email.extractedEvent.eventType)}`}>
                                {email.extractedEvent.eventType}
                              </span>
                            </div>
                            <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
                              <p className="font-bold text-slate-800 dark:text-slate-200">
                                {email.extractedEvent.title}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                <span>
                                  {new Date(email.extractedEvent.dateTime).toLocaleString([], {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  })}
                                </span>
                              </p>
                              <p className="truncate">
                                <b>Venue:</b> {email.extractedEvent.location}
                              </p>
                              <p className="opacity-90 mt-1 block">
                                {email.extractedEvent.description}
                              </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                              <button
                                onClick={() => onSyncToCalendar(email.id)}
                                disabled={syncing || email.syncedToCalendar}
                                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold ${
                                  email.syncedToCalendar
                                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 cursor-default"
                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10"
                                }`}
                              >
                                {email.syncedToCalendar ? (
                                  <>
                                    <CalendarCheck className="h-4 w-4" />
                                    <span>Synced to Google Calendar</span>
                                  </>
                                ) : (
                                  <>
                                    <CalendarDays className="h-4 w-4" />
                                    <span>{syncing ? "Syncing Event..." : "Sync Event via n8n"}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {!email.extractedEvent && (
                          <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400 dark:text-slate-500 rounded-xl bg-slate-50 dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-slate-800">
                            <Sparkles className="h-6 w-6 mb-1.5 text-slate-400 dark:text-slate-600" />
                            <p className="text-xs font-semibold">No schedule events extracted yet</p>
                            <button
                              onClick={() => onAnalyzeEmail(email.id)}
                              disabled={analyzing}
                              className="mt-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5"
                            >
                              {analyzing ? "AI Parsing..." : "Extract Events with AI"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
