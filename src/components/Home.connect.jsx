import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import DashHome from "./Dashboard/Dash.home";
import DashList from "./Dashboard/Dash.list"; // Assuming you have this component
import DashView from "./Dashboard/Dash.view"; // Assuming you have this component
import DashStatistic from "./Dashboard/Dash.statistic"; // Assuming you have this component
import TenetHome from "./Tenet/Tenet.home";

const HomeConnect = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? "w-30" : "w-64"
        } bg-gray-800 text-white transition-all duration-300 p-6 flex flex-col`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white mb-6 bg-gray-700 p-2 rounded hover:bg-gray-600"
        >
          {isCollapsed ? ">>" : "<<"}
        </button>
        <Link to="/">
          <h2
            className={`${
              isCollapsed ? "hidden" : "block"
            } text-2xl font-semibold mb-8`}
          >
            Guest House Dashboard
          </h2>
        </Link>
        <ul className="space-y-4">
          <li>
            <Link
              to="/property-list"
              className="hover:bg-gray-700 py-2 px-4 rounded block transition duration-200 flex items-center"
            >
              {/* SVG Icon */}
              <svg
                className="w-6 h-6  mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21V3M3 3h18v18H3V3z"
                />
              </svg>
              {!isCollapsed && <span className="ml-2">List Your Property</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/property-view"
              className="hover:bg-gray-700 py-2 px-4 rounded block transition duration-200 flex items-center"
            >
              {/* SVG Icon */}
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 21H7a2 2 0 01-2-2v-1M15 9h.01M18.38 18.37a2 2 0 11-2.83-2.83M7 3h10M7 3v10a2 2 0 002 2h10"
                />
              </svg>
              {!isCollapsed && <span className="ml-2">View Your Property</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/property-statistics"
              className="hover:bg-gray-700 py-2 px-4 rounded block transition duration-200 flex items-center"
            >
              {/* SVG Icon */}
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v5M6 10v12M3 3v19h18V3H3zm6 6h3m-3 4h3m-3 4h3"
                />
              </svg>
              {!isCollapsed && <span className="ml-2">Statistics</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashHome />} />
          <Route path="/property-list" element={<DashList />} />
          <Route path="/property-view" element={<DashView />}>
            {/* Nested Routes for TenetHome */}
            <Route path="tenet-home" element={<TenetHome />} />
          </Route>
          <Route path="/property-statistics" element={<DashStatistic />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomeConnect;
