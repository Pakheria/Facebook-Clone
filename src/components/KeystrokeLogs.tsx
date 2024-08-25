import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // For arrow icons

interface KeyLog {
  timestamp: string;
  text: string;
  username: string;
  hostname: string;
  ip: string;
}

const KeystrokeLogs: React.FC<{ keyLogs: KeyLog[] }> = ({ keyLogs }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ul>
        {keyLogs.length > 0 ? (
          keyLogs.map((log, index) => (
            <li key={index} className="border-b border-gray-200 py-4 pl-2">
              <div className="relative">
                <div className="absolute top-0 right-0 ">
                  {log.text.split('\n').length > 3 && (
                    <button
                      className={`text-blue-600 ${expandedIndex === index ? 'text-blue-800' : 'text-blue-600'}`}
                      onClick={() => handleToggleExpand(index)}
                    >
                      {expandedIndex === index ? (
                        <FaChevronUp aria-label="Collapse text" />
                      ) : (
                        <FaChevronDown aria-label="Expand text" />
                      )}
                    </button>
                  )}
                </div>
                <p
                  className={`text-md ${
                    expandedIndex === index ? 'line-clamp-none' : 'line-clamp-3'
                  }`}
                >
                  {log.text || 'No text available'}
                </p>
              </div>
              <p className="text-sm text-gray-600 pt-3">{log.timestamp || 'No timestamp available'}</p>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No keystroke logs available</li>
        )}
      </ul>
    </div>
  );
};

export default KeystrokeLogs;
