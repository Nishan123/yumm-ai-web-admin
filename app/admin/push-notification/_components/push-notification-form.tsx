import React from "react";

interface PushNotificationFormProps {
  formData: {
    title: string;
    message: string;
    targetAudience: string;
  };
  loading: boolean;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const PushNotificationForm = ({
  formData,
  loading,
  handleInputChange,
  handleSubmit,
}: PushNotificationFormProps) => {
  return (
    <div className="overflow-y-auto pr-2">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-gray-200 dark:border-zinc-800">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Send New Notification
        </h2>
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
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              placeholder="Enter notification title"
            />
          </div>
          <div>
            <label
              htmlFor="targetAudience"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Target Audience
            </label>
            <select
              name="targetAudience"
              id="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Users</option>
              <option value="subscribed">Subscribed Users</option>
              <option value="unsubscribed">Unsubscribed Users</option>
            </select>
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
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
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
};
