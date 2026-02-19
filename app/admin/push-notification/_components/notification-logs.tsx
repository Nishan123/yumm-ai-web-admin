import { NotificationLog } from "./types";
import { ChevronLeft, ChevronRight, RotateCcw, Trash2 } from "lucide-react";

interface NotificationLogsProps {
  logs: NotificationLog[];
  loading: boolean;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onResend: (log: NotificationLog) => void;
  onDelete: (id: string) => void;
}

export const NotificationLogs = ({
  logs,
  loading,
  page,
  limit,
  onPageChange,
  onResend,
  onDelete,
}: NotificationLogsProps) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-900 rounded-lg shadow border border-gray-200 dark:border-zinc-800">
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Notification Logs
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && logs.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            No logs found
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log._id}
              className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-lg border border-gray-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group relative"
            >
              <div className="flex items-center gap-3 mb-2 pr-16">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate flex-1">
                  {log.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {log.message}
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 gap-4">
                  <span>
                    Target:{" "}
                    <strong className="capitalize text-gray-700 dark:text-gray-300">
                      {log.targetAudience}
                    </strong>
                  </span>
                  <span>
                    Sent:{" "}
                    <strong className="text-gray-700 dark:text-gray-300">
                      {log.sentCount}
                    </strong>
                  </span>
                  <span>
                    Failed:{" "}
                    <strong className="text-gray-700 dark:text-gray-300">
                      {log.failureCount}
                    </strong>
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full capitalize w-fit ${
                      log.status === "success"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : log.status === "failed"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {log.status}
                  </span>

                  <div className="text-xs text-gray-400">
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString()
                      : "N/A"}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2 transition-opacity">
                <button
                  onClick={() => onResend(log)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                  title="Resend Notification"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(log._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  title="Delete Log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1 || loading}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {page}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={logs.length < limit || loading}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
