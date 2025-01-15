import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function DashStatistic() {
  const { properties } = useContext(UserContext);

  // Calculate statistics
  const totalRooms = properties.reduce((sum, property) => sum + parseInt(property.count, 10), 0);
  const occupiedRooms = properties.reduce(
    (sum, property) => sum + property.tenets.filter((tenet) => Object.keys(tenet).length > 0).length,
    0
  );
  const vacantRooms = totalRooms - occupiedRooms;

  const revenue = properties.reduce((sum, property) => {
    return (
      sum +
      property.tenets.reduce((roomSum, tenet) => {
        if (Object.keys(tenet).length > 0) {
          const advance = parseFloat(tenet.advance || 0);
          const generalRent = parseFloat(tenet.generalRent || 0);
          const otherCharges = parseFloat(tenet.otherCharges || 0);
          return roomSum + advance + generalRent + otherCharges;
        }
        return roomSum;
      }, 0)
    );
  }, 0);

  // Chart data
  const vacancyData = {
    labels: properties.map((property) => property.name),
    datasets: [
      {
        label: "Vacant Rooms",
        data: properties.map(
          (property) => parseInt(property.count, 10) - property.tenets.filter((tenet) => Object.keys(tenet).length > 0).length
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Occupied Rooms",
        data: properties.map((property) =>
          property.tenets.filter((tenet) => Object.keys(tenet).length > 0).length
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const revenueData = {
    labels: properties.map((property) => property.name),
    datasets: [
      {
        label: "Revenue",
        data: properties.map((property) =>
          property.tenets.reduce((sum, tenet) => {
            if (Object.keys(tenet).length > 0) {
              const advance = parseFloat(tenet.advance || 0);
              const generalRent = parseFloat(tenet.generalRent || 0);
              const otherCharges = parseFloat(tenet.otherCharges || 0);
              return sum + advance + generalRent + otherCharges;
            }
            return sum;
          }, 0)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Section */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p>Total Rooms: {totalRooms}</p>
          <p>Occupied Rooms: {occupiedRooms}</p>
          <p>Vacant Rooms: {vacantRooms}</p>
          <p>Total Revenue: ₹{revenue.toFixed(2)}</p>
        </div>

        {/* Vacancy Pie Chart */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Vacancy Overview</h2>
          <Pie data={vacancyData} />
        </div>

        {/* Revenue Bar Chart */}
        <div className="bg-white p-4 shadow rounded col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Revenue by Property</h2>
          <Bar data={revenueData} />
        </div>
      </div>
    </div>
  );
}

export default DashStatistic;
