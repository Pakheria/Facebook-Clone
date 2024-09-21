import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface UserInfoProps {
  selectedUser: string | null;
  keyLogs: {
    hostname: string;
    ip: string;
    username: string;
  }[];
}

const UserInfo: React.FC<UserInfoProps> = ({ selectedUser, keyLogs }) => {
  const [userKeyLog, setUserKeyLog] = useState<{
    hostname: string;
    ip: string;
    username: string;
  } | null>(null);

  useEffect(() => {
    // Find and set the keyLog corresponding to the selectedUser whenever selectedUser or keyLogs change
    if (selectedUser) {
      const log = keyLogs.find(log => log.username === selectedUser);
      setUserKeyLog(log || null); // If log is found, set it; otherwise, set null
    }
  }, [selectedUser, keyLogs]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    selectedUser && (
      <div className="p-4 bg-slate-50 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-green-600">User Info</h2>
          <button onClick={toggleCollapse} className="text-blue-600 flex justify-end">
            {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
          </button>
        </div>
        {!isCollapsed && (
          <>
            <hr className="my-1 border-t-2 border-gray-200" />
            <h2 className="text-lg font-bold text-blue-600">{selectedUser}</h2>
            <p className="text-md">Hostname: {userKeyLog?.hostname || "N/A"}</p>
            <p className="text-md">IP Address: {userKeyLog?.ip || "N/A"}</p>
          </>
        )}
      </div>
    )
  );
};

export default UserInfo;
