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

  const onlineUsers = users.filter(user => activeUsers.includes(user));
  const offlineUsers = users.filter(user => !activeUsers.includes(user));

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
          {onlineUsers.length > 0 && (
            <>
              {onlineUsers.map((user, index) => (
                // change the display of username from actual to capitalizes first letter and replace . with space
                

                <li key={index} className="relative group">
                  <button
                    className={`w-full text-left rounded-md py-2 flex items-center ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } hover:bg-gray-500 hover:bg-opacity-20 focus:outline-none px-2 transition-all duration-300 ease-in-out`}
                    onClick={() => onSelectUser(user)}
                    onMouseEnter={() => {
                      const tooltip = document.getElementById(`tooltip-${user}`);
                      if (tooltip) tooltip.style.visibility = 'visible';
                    }}
                    onMouseLeave={() => {
                      const tooltip = document.getElementById(`tooltip-${user}`);
                      if (tooltip) tooltip.style.visibility = 'hidden';
                    }}
                  >
                    <div
                      className={`relative flex items-center ${
                        isCollapsed ? "justify-center" : "justify-start"
                      }`}
                    >
                      <div className="relative w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <FaUser className="text-md" />
                        <span
                          className={`w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full absolute top-0 right-0`}
                        />
                      </div>
                      {!isCollapsed && <span className="ml-4">{user}</span>}
                    </div>
                    {isCollapsed && (
                      <div
                        id={`tooltip-${user}`}
                        className="absolute left-full ml-2 bg-black text-white text-xs rounded px-2 py-1 opacity-90 whitespace-nowrap invisible group-hover:visible z-50" // Increased z-index
                      >
                        {user}
                      </div>
                    )}
                  </button>
                </li>
              ))}
              {offlineUsers.length > 0 && (
                <li className="my-2 border-t-4 border-gray-700"></li> // Separator between online and offline users
              )}
            </>
          )}

          {offlineUsers.length > 0 && (
            <>
              {offlineUsers.map((user, index) => (
                <li key={index} className="relative group">
                  
                  <button
                    className={`w-full text-left rounded-md py-2 flex items-center ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } hover:bg-gray-500 hover:bg-opacity-20 focus:outline-none px-2 transition-all duration-300 ease-in-out`}
                    onClick={() => onSelectUser(user)}
                    onMouseEnter={() => {
                      const tooltip = document.getElementById(`tooltip-${user}`);
                      if (tooltip) tooltip.style.visibility = 'visible';
                    }}
                    onMouseLeave={() => {
                      const tooltip = document.getElementById(`tooltip-${user}`);
                      if (tooltip) tooltip.style.visibility = 'hidden';
                    }}
                  >
                    <div
                      className={`relative flex items-center ${
                        isCollapsed ? "justify-center" : "justify-start"
                      }`}
                    >
                      <div className="relative w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        <FaUser className="text-md" />
                        <span
                          className={`w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full absolute top-0 right-0`}
                        />
                      </div>
                      {!isCollapsed && <span className="ml-4">{user}</span>}
                    </div>
                    {isCollapsed && (
                      <div
                        id={`tooltip-${user}`}
                        className="absolute left-full ml-2 bg-black text-white text-xs rounded px-2 py-1 opacity-90 whitespace-nowrap invisible group-hover:visible z-50" // Increased z-index
                      >
                        {user}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
