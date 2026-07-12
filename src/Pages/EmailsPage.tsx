type Props = {
  emails: any[];
};

export default function EmailsPage({ emails }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gmail Inbox</h1>

      {emails.length === 0 ? (
        <div className="text-gray-500">
          No emails found.
        </div>
      ) : (
        <div className="space-y-4">
          {emails.map((email) => (
            <div
              key={email.id}
              className="border rounded-xl p-5 shadow-sm bg-white"
            >
              <h2 className="font-bold text-lg">
                {email.subject}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                From: {email.from}
              </p>

              <p className="mt-3 text-gray-700">
                {email.snippet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}