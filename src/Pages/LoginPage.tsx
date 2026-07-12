import { GraduationCap, Lock } from "lucide-react";

export default function LoginPage() {

  const handleGoogleLogin = () => {
window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

          <div className="text-center mb-8">

            <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <GraduationCap />
            </div>

            <h1 className="text-2xl font-black mt-4">
              Aegis AI Assistant
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              Sign in with your Google account
            </p>

          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center gap-3 border rounded-xl py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >

            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-5"
            />

            Continue with Google

          </button>

          <div className="mt-8 flex justify-center items-center gap-2 text-xs text-slate-400">
            <Lock size={14} />
            Protected by Google OAuth 2.0
          </div>

        </div>

      </div>

    </div>
  );
}