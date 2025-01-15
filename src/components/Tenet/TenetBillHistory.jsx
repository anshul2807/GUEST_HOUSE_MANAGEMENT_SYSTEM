import React, { useState } from "react";

function TenetBillHistory({ onClose, tenetData }) {
  const [filter, setFilter] = useState("");

  const filteredBills = () => {
    // Implement filtering logic based on `filter`
    return tenetData || [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Tenant Bill History</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by date, pending status, etc."
            className="w-full p-2 border border-gray-300 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div>
          {/* Display filtered bill history */}
          {filteredBills().map((bill, index) => (
            <div
              key={index}
              className="p-4 border-b last:border-0 flex justify-between"
            >
              <span>{bill.name}</span>
              <span>{bill.amount}</span>
              <span>{bill.date}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TenetBillHistory;
