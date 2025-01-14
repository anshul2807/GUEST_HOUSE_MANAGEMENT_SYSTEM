import React from 'react';
import { Link } from 'react-router-dom';

const HomeDisconnect = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome to the Guest House Management System</h2>
        <p className="text-gray-600 mb-4 text-lg">
          Please log in to access the features of the app and manage your guest houses efficiently.
        </p>
        
        {/* Link to Login Component */}
        <div className="text-center">
          <Link 
            to="/login" 
            className="inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition duration-200"
          >
            Login
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-gray-600 mb-4 text-lg">Once logged in, you can:</p>
          <ul className="list-disc list-inside text-gray-600 text-md space-y-2">
            <li>Add and manage multiple guest house details.</li>
            <li>Track tenant bookings and availability.</li>
            <li>Set pricing and promotional offers for each guest house.</li>
            <li>Generate reports on occupancy, revenue, and more.</li>
          </ul>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Not a member yet? <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-semibold">Register here</Link> to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeDisconnect;
