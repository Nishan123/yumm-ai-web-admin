"use client";

import { useState } from "react";
import { sendNotificationAction } from "@/lib/actions/notification-action";

export default function PushNotificationPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await sendNotificationAction(formData);
    setLoading(false);

    if (result.success) {
      alert("Notification sent successfully");
      (e.target as HTMLFormElement).reset();
    } else {
      alert(result.message || "Failed to send notification");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Send Push Notification
      </h1>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 max-w-2xl border border-gray-200 dark:border-zinc-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              placeholder="Enter notification title"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              placeholder="Enter notification message"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              "Send Notification"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
