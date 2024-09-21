"use client";

import React, { useEffect } from "react";

interface NotificationProps {
  notifications: { id: number; type: "success" | "error" | "warning"; message: string }[];
  onRemove: (id: number) => void;
}

const Notification: React.FC<NotificationProps> = ({ notifications, onRemove }) => {
  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => onRemove(notification.id), 5000); // Dismiss after 5 seconds
      return () => clearTimeout(timer);
    });
  }, [notifications, onRemove]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow ${
            notification.type === "success"
              ? "bg-green-100 text-green-600"
              : notification.type === "error"
              ? "bg-red-100 text-red-600"
              : "bg-orange-100 text-orange-600"
          }`}
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${
              notification.type === "success"
                ? "bg-green-200 text-green-600"
                : notification.type === "error"
                ? "bg-red-200 text-red-600"
                : "bg-orange-200 text-orange-600"
            } rounded-lg`}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {notification.type === "success" && (
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              )}
              {notification.type === "error" && (
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
              )}
              {notification.type === "warning" && (
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
              )}
            </svg>
          </div>
          <div className="ms-3 text-sm font-normal">{notification.message}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
            onClick={() => onRemove(notification.id)}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
