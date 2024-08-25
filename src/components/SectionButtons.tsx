import React from "react";

interface SectionButtonsProps {
  activeSection: "keystrokes" | "screenshots" | "applications" | "liveview";
  handleButtonClick: (
    section: "keystrokes" | "screenshots" | "applications" | "liveview"
  ) => void;
}

const SectionButtons: React.FC<SectionButtonsProps> = ({
  activeSection,
  handleButtonClick,
}) => {
  return (
    <div className="mb-4">
      <div className="btn-group flex space-x-2">
        <button
          className={`btn rounded-md px-4 py-2 ${
            activeSection === "keystrokes"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleButtonClick("keystrokes")}
        >
          Keystrokes
        </button>
        <button
          className={`btn rounded-md px-4 py-2 ${
            activeSection === "screenshots"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => handleButtonClick("screenshots")}
        >
          Screenshots
        </button>
        <button
          className={`btn rounded-md px-4 py-2 ${
            activeSection === "applications"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Applications
        </button>
        <button
          className={`btn rounded-md px-4 py-2 ${
            activeSection === "liveview"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Live View
        </button>
      </div>
    </div>
  );
};

export default SectionButtons;
