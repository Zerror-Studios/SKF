"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const jobTypes = [
  { label: "sikandar", value: "sikandart" },
  { label: "farrey", value: "farrey" },
  { label: "radhe", value: "radhe" },
  { label: "kaagaz", value: "kaagaz" },
  { label: "Dabangg 3", value: "Dabangg 3" },
  { label: "Notebook", value: "Notebook" },
  { label: "Loveyatri", value: "Loveyatri" },
];

export default function DropdownFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showAll, setShowAll] = useState(false); // ✅ control view all
  const containerRef = useRef(null);

  const toggleCheckbox = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Decide how many items to show
  const displayedJobs = showAll ? jobTypes : jobTypes.slice(0, 4);

  return (
    <div className="df-container" ref={containerRef}>
      <div className="df-dropdown">
        <button
          className="df-dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          Filter by Movie:
          <span className={`df-arrow ${isOpen ? "df-open" : ""}`}>
            <IoIosArrowDown />
          </span>
          {isOpen && (
            <div
              className="df-dropdown-content"
              onClick={(e) => e.stopPropagation()}
            >
              {displayedJobs.map((job) => (
                <label key={job.value} className="df-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selected.includes(job.value)}
                    onChange={() => toggleCheckbox(job.value)}
                  />
                  <span
                    className={`df-checkbox-text ${
                      selected.includes(job.value) ? "df-active" : ""
                    }`}
                  >
                    {job.label}
                  </span>
                </label>
              ))}
              {jobTypes.length > 4 && (
                <div className="df-footer-row">
                  <a
                    href="#"
                    className="df-view-all"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAll(!showAll); // toggle show all
                    }}
                  >
                    {showAll ? "Show Less" : "View All"}
                  </a>
                  <span className="df-badge">{jobTypes.length}</span>
                </div>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
