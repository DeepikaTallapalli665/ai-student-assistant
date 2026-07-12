import { User, Mail, GraduationCap, BookOpen } from "lucide-react";

type Props = {
  profile: any;
  onSaveProfile: (profile: any) => void;
};

export default function Profile({
  profile,
  onSaveProfile,
}: Props) {
  if (!profile) {
    return (
      <div className="text-center py-20 text-slate-500">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Student Profile
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your personal and academic information.
        </p>
      </div>

      {/* Card */}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">

        <div className="flex flex-col items-center">

          <img
            src={
              profile.avatarUrl ||
              "https://ui-avatars.com/api/?name=Student"
            }
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-500"
          />

          <h3 className="mt-4 text-xl font-bold">
            {profile.name}
          </h3>

          <p className="text-slate-500">
            {profile.email}
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">

          <div>

            <label className="text-sm font-semibold flex items-center gap-2 mb-2">
              <User size={16} />
              Name
            </label>

            <input
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
              value={profile.name}
              onChange={(e) =>
                (profile.name = e.target.value)
              }
            />

          </div>

          <div>

            <label className="text-sm font-semibold flex items-center gap-2 mb-2">
              <Mail size={16} />
              Email
            </label>

            <input
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
              value={profile.email}
              onChange={(e) =>
                (profile.email = e.target.value)
              }
            />

          </div>

          <div>

            <label className="text-sm font-semibold flex items-center gap-2 mb-2">
              <GraduationCap size={16} />
              College
            </label>

            <input
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
              value={profile.college}
              onChange={(e) =>
                (profile.college = e.target.value)
              }
            />

          </div>

          <div>

            <label className="text-sm font-semibold flex items-center gap-2 mb-2">
              <BookOpen size={16} />
              Course
            </label>

            <input
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
              value={profile.course}
              onChange={(e) =>
                (profile.course = e.target.value)
              }
            />

          </div>

          <div>

            <label className="text-sm font-semibold mb-2 block">
              Semester
            </label>

            <input
              className="w-full rounded-xl border px-4 py-3 dark:bg-slate-950"
              value={profile.semester}
              onChange={(e) =>
                (profile.semester = e.target.value)
              }
            />

          </div>

        </div>

        <div className="flex justify-end mt-8">

          <button
            onClick={() => onSaveProfile(profile)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}