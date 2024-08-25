import React from 'react';

interface SidebarProps {
  users: string[];
  selectedUser: string | null;
  activeUsers: string[]; // Prop to track active users
  onSelectUser: (username: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, selectedUser, activeUsers, onSelectUser }) => {
  return (
    <aside className="col-span-3 rounded-md bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.length > 0 ? (
          users.map((user, index) => {
            const isActive = activeUsers.includes(user);
            const isSelected = selectedUser === user;
            const baseStyle = "w-full text-left rounded-md py-2 px-4";
            const statusStyle = isActive ? "bg-green-600" : "bg-gray-700";
            const selectedStyle = isSelected
              ? isActive
                ? "bg-blue-600"
                : "bg-orange-500"
              : "";

            return (
              <li key={index}>
                <button
                  className={`${baseStyle} ${statusStyle} ${selectedStyle} hover:${isActive ? 'bg-blue-500' : 'bg-gray-600'} focus:outline-none`}
                  onClick={() => onSelectUser(user)}
                >
                  {user}
                </button>
              </li>
            );
          })
        ) : (
          <li>
            <p className="text-gray-400">No users available</p>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
