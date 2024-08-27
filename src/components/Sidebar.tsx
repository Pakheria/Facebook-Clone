import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";

interface SidebarProps {
  users: string[];
  selectedUser: string | null;
  activeUsers: string[];
  onSelectUser: (username: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  users,
  selectedUser,
  activeUsers,
  onSelectUser,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-48"
      } bg-gray-800 text-white flex flex-col relative`}
    >
      {/* Toggle Button */}
      <button
        className={`absolute top-2 transform ${
          isCollapsed
            ? "left-1/2 -translate-x-1/2"
            : "left-2"
        } p-2.5 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none transition-all duration-300 ease-in-out`}
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <FaChevronRight className="text-lg" />
        ) : (
          <FaChevronLeft className="text-lg" />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col flex-grow mt-14">
        <ul className="space-y-2">
          {users.length > 0 ? (
            users.map((user, index) => {
              const isActive = activeUsers.includes(user);
              const statusDotStyle = isActive ? "bg-green-500" : "bg-red-500";

              return (
                <li key={index} className="relative group">
                  <button
                    className={`w-full text-left rounded-md py-2 flex items-center ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } hover:bg-gray-500 hover:bg-opacity-20 focus:outline-none px-2 transition-all duration-300 ease-in-out`}
                    onClick={() => onSelectUser(user)}
                  >
                    {isCollapsed ? (
                      <div className="relative flex items-center justify-center w-10 h-10">
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                          <FaUser className="text-md" />
                          <span
                            className={`w-3.5 h-3.5 ${statusDotStyle} border-2 border-white rounded-full absolute top-0 right-0`}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                          <FaUser className="text-md" />
                          <span
                            className={`w-3.5 h-3.5 ${statusDotStyle} border-2 border-white rounded-full absolute top-0 right-0`}
                          />
                        </div>
                        <span className="ml-4">{user}</span>
                      </div>
                    )}
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
      </div>
    </aside>
  );
};

export default Sidebar;
