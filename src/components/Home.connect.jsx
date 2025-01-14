import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import DashHome from "./Dashboard/Dash.home";
import DashList from "./Dashboard/Dash.list"; // Assuming you have this component
import DashView from "./Dashboard/Dash.view"; // Assuming you have this component
import DashStatistic from "./Dashboard/Dash.statistic"; // Assuming you have this component
import TenetHome from "./Tenet/Tenet.home";
const HomeConnect = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <Link
        to ="/"
        >
        <h2 className="text-2xl font-semibold mb-8">Guest House Dashboard</h2>
        </Link>
        <ul className="space-y-4">
          <li>
            <Link
              to="/property-list"
              className="hover:bg-gray-700 py-2 px-4 rounded block transition duration-200"
            >
              List Your Property
            </Link>
          </li>
          <li>
            <Link
              to="/property-view"
              className="hover:bg-gray-700 py-2 px-4 rounded block transition duration-200"
            >
              View Your Property
            </Link>
          </li>
          <li>
            <Link
              to="/property-statistics"
              className="hover:bg-gray-700 py-2 px-4 rounded block transition duration-200"
            >
              Statistics
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashHome />} />
          <Route path="/property-list" element={<DashList />} />
          <Route path="/property-view" element={<DashView />} >
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
