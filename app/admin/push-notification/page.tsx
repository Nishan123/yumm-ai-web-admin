"use client";

import { useState, useEffect } from "react";
import { sendNotificationAction } from "@/lib/actions/notification-action";
import { notificationApi } from "@/lib/api/notification/notification";
import { NotificationLog } from "./_components/types";
import { PushNotificationForm } from "./_components/push-notification-form";
import { NotificationLogs } from "./_components/notification-logs";

export default function PushNotificationPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;

  // Controlled form state
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    targetAudience: "all",
  });

  const fetchLogs = async () => {
    setLogsLoading(true);
    const result = await notificationApi.getLogs(page, LIMIT);
    if (result.success) {
      if (result.data.logs) {
        setLogs(result.data.logs);
        setTotal(result.data.total);
      } else {
        setLogs(Array.isArray(result.data) ? result.data : []);
        setTotal(0);
      }
    }
    setLogsLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const result = await sendNotificationAction(data);
    setLoading(false);

    if (result.success) {
      alert("Notification sent successfully");
      setFormData({ title: "", message: "", targetAudience: "all" });
      fetchLogs();
    } else {
      alert(result.message || "Failed to send notification");
    }
  };

  const handleResend = (log: NotificationLog) => {
    setFormData({
      title: log.title,
      message: log.message,
      targetAudience: log.targetAudience,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this log?")) return;

    const result = await notificationApi.deleteLog(id);
    if (result.success) {
      fetchLogs();
    } else {
      alert(result.message || "Failed to delete log");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 h-screen overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white shrink-0">
        Push Notifications
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        {/* Left Side: Form */}
        <PushNotificationForm
          formData={formData}
          loading={loading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

        {/* Right Side: Logs */}
        <NotificationLogs
          logs={logs}
          loading={logsLoading}
          page={page}
          limit={LIMIT}
          onPageChange={setPage}
          onResend={handleResend}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
