"use client";

import React from 'react';

interface NotificationProps {
  messages: string[];
}

const Notification: React.FC<NotificationProps> = ({ messages }) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-md border border-gray-300">
      {messages.map((message, index) => (
        <div key={index} className="mb-2 text-sm text-gray-800">
          {message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
