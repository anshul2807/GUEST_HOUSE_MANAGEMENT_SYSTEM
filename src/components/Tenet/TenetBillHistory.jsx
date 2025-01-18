import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function TenetBillHistory({ outletData,billDetails }) {
  const {findProperty} = useContext(UserContext);
  const [propertyData, setPropertyData] = useState({}); 
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ paymentMode: "All", sortBy: "date" });

  // Extract all transactions from property data

  React.useEffect(() => {
    const property = findProperty(outletData.id);
    // console.log(propertyData);
    
    const allTransactions = property.tenets.flatMap((tenet) => tenet.billHistory || []);
    setTransactions(allTransactions);
    setPropertyData(property);
  }, [propertyData,billDetails]);

  // Handle filter and sorting logic
  const filteredAndSortedTransactions = transactions
    .filter((transaction) =>
      filters.paymentMode === "All"
        ? true
        : transaction.paymentMode === filters.paymentMode
    )
    .sort((a, b) => {
      if (filters.sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      }
      return a[filters.sortBy].localeCompare(b[filters.sortBy]);
    });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Filter by Payment Mode */}
        <select
          className="border px-4 py-2 rounded"
          value={filters.paymentMode}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, paymentMode: e.target.value }))
          }
        >
          <option value="All">All Payment Modes</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>

        {/* Sort by */}
        <select
          className="border px-4 py-2 rounded"
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
          }
        >
          <option value="date">Sort by Date</option>
          <option value="electricReading">Sort by Electric Reading</option>
          <option value="roomRent">Sort by Room Rent</option>
        </select>
      </div>

      {/* Transactions Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Room Name</th>
            <th className="py-2 px-4 border">Electric Reading</th>
            <th className="py-2 px-4 border">Room Rent</th>
            <th className="py-2 px-4 border">Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTransactions.map((transaction, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-2 px-4 border">{transaction.date}</td>
              <td className="py-2 px-4 border">{transaction.roomName}</td>
              <td className="py-2 px-4 border">{transaction.electricReading}</td>
              <td className="py-2 px-4 border">{transaction.roomRent}</td>
              <td className="py-2 px-4 border">{transaction.paymentMode}</td>
            </tr>
          ))}
          {filteredAndSortedTransactions.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TenetBillHistory;
