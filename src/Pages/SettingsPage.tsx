import SetupInstructions from "../components/SetupInstructions";

type Props = {
  settings: any;
  onSaveSettings: (settings: any) => void;
};

export default function Settings({
  settings,
  onSaveSettings,
}: Props) {
  if (!settings) {
    return (
      <div className="text-center py-20 text-slate-500">
        Loading Settings...
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-6">

      {/* Left */}

      <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          Integration Settings
        </h2>

        <div className="space-y-5">

          <div>

            <label className="block text-sm font-semibold mb-2">
              n8n Webhook URL
            </label>

            <input
              type="url"
              value={settings.n8nWebhookUrl}
              onChange={(e) =>
                (settings.n8nWebhookUrl = e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold mb-2">
              Google Client ID
            </label>

            <input
              type="text"
              value={settings.customGoogleClientId}
              onChange={(e) =>
                (settings.customGoogleClientId = e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold mb-2">
              Google Client Secret
            </label>

            <input
              type="password"
              value={settings.customGoogleClientSecret}
              onChange={(e) =>
                (settings.customGoogleClientSecret = e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
            />

          </div>

          <div>

            <label className="block text-sm font-semibold mb-2">
              Gemini API Key
            </label>

            <input
              type="password"
              value={settings.geminiApiKey || ""}
              onChange={(e) =>
                (settings.geminiApiKey = e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
            />

          </div>

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={settings.enableAutoSync}
              onChange={(e) =>
                (settings.enableAutoSync = e.target.checked)
              }
            />

            <span className="text-sm">
              Enable Automatic Calendar Sync
            </span>

          </div>

          <button
            onClick={() => onSaveSettings(settings)}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
          >
            Save Settings
          </button>

        </div>

      </div>

      {/* Right */}

      <div className="lg:col-span-6">

        <SetupInstructions />

      </div>

    </div>
  );
}