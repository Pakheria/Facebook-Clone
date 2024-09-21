import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface KeyLog {
  timestamp: string;
  text: string;
  username: string;
  hostname: string;
  ip: string;
}


const KeystrokeLogs: React.FC<{ keyLogs: KeyLog[] }> = ({ keyLogs }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(30); // Default to 30 logs per page

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(keyLogs.length / logsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLogsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLogsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when logsPerPage changes
  };

  const currentLogs = keyLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Dropdown for selecting logs per page */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 text-gray-600" htmlFor="logsPerPage">
          Logs per page:
        </label>
        <select
          id="logsPerPage"
          className="border rounded-md p-1"
          value={logsPerPage}
          onChange={handleLogsPerPageChange}
        >
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>

      <ul>
        {currentLogs.length > 0 ? (
          currentLogs.map((log, index) => (
            <li key={index} className="border-b border-gray-200 py-4">
              <div className="relative">
                <div className="absolute top-0 right-0">
                  {log.text.split('\n').length > 3 && (
                    <button
                      className={`text-blue-600 ${
                        expandedIndex === index ? 'text-blue-800' : 'text-blue-600'
                      }`}
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
                  className={`text-md pr-2 ${
                    expandedIndex === index ? 'line-clamp-none' : 'line-clamp-3'
                  }`}
                >
                  {log.text || 'No text available'}
                </p>
              </div>
              <p className="text-sm text-gray-600 pt-3">
                {log.timestamp || 'No timestamp available'}
              </p>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No keystroke logs available</li>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`p-2 rounded-full ${
            currentPage === 1 ? 'text-gray-400' : 'text-blue-600'
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {Math.ceil(keyLogs.length / logsPerPage)}
        </span>
        <button
          className={`p-2 rounded-full ${
            currentPage === Math.ceil(keyLogs.length / logsPerPage)
              ? 'text-gray-400'
              : 'text-blue-600'
          }`}
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(keyLogs.length / logsPerPage)}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default KeystrokeLogs;
