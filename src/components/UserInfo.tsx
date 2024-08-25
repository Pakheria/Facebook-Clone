import React from "react";

interface UserInfoProps {
  selectedUser: string | null;
  keyLogs: {
    hostname: string;
    ip: string;
  }[];
}

const UserInfo: React.FC<UserInfoProps> = ({ selectedUser, keyLogs }) => {
  return (
    selectedUser && (
      <div className="p-4 bg-slate-50 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-bold text-blue-600">{selectedUser}</h2>
        <p className="text-md">Hostname: {keyLogs[0]?.hostname || "N/A"}</p>
        <p className="text-md">IP Address: {keyLogs[0]?.ip || "N/A"}</p>
      </div>
    )
  );
};

export default UserInfo;
