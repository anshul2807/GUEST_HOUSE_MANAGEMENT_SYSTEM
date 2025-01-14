import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

function TenetDashboard({ outletData }) {
  const { findProperty, updateProperties,deleteProperty } = useContext(UserContext);
  const [propertyData, setPropertyData] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenetDetails, setTenetDetails] = useState({});

  useEffect(() => {
    const property = findProperty(outletData.id);
    setPropertyData(property);
  }, [outletData, findProperty]);

  const handleGridClick = (roomIndex) => {
    setSelectedRoom(roomIndex);
    setTenetDetails(propertyData.tenets?.[roomIndex] || {});
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedRoom(null);
    setIsModalOpen(false);
    setTenetDetails({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenetDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProperties(propertyData, {
      type: "updateTenet",
      roomNumber: selectedRoom,
      tenetData: tenetDetails,
    });
    handleModalClose();
  };

  const handleDelete = () => {
    // updateProperties(propertyData, {
    //   type: "updateTenet",
    //   roomNumber: selectedRoom,
    //   tenetData: {},
    // });
    
    deleteProperty(propertyData.id, {  
        type: "deleteTenet",
        roomNumber: selectedRoom,
    });

    handleModalClose();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard: {propertyData.name}</h1>
      <div className="grid grid-cols-4 gap-6 p-4">
        {Array.from({ length: propertyData.count || 0 }).map((_, index) => (
            <div
            key={index}
            onClick={() => handleGridClick(index)}
            className={`h-28 w-28 border rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer text-center transition-transform transform hover:scale-105 ${
                propertyData.tenets?.[index] &&
                Object.keys(propertyData.tenets[index]).length > 0
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            >
            <span className="text-lg font-semibold">
                {propertyData.tenets?.[index]?.roomName || `Room ${index + 1}`}
            </span>
            {propertyData.tenets?.[index] && (
                <span className="text-xs mt-1">
                {`Tenet Name : ${propertyData.tenets[index]?.name || "Vacant"}`}
                </span>
            )}
            </div>
        ))}
        </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Room Details</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  name="roomName"
                  value={tenetDetails.roomName || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter room name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Floor Number
                </label>
                <input
                  type="text"
                  name="floorNumber"
                  value={tenetDetails.floorNumber || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter floor number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tenant Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={tenetDetails.name || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter tenant name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  name="aadhar"
                  value={tenetDetails.aadhar || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Aadhar number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={tenetDetails.mobile || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Joining
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={tenetDetails.joiningDate || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rent Details
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="generalRent"
                    value={tenetDetails.generalRent || ""}
                    onChange={handleInputChange}
                    className="w-1/3 p-2 border border-gray-300 rounded"
                    placeholder="General Rent"
                  />
                  <input
                    type="text"
                    name="advance"
                    value={tenetDetails.advance || ""}
                    onChange={handleInputChange}
                    className="w-1/3 p-2 border border-gray-300 rounded"
                    placeholder="Advance"
                  />
                  <input
                    type="text"
                    name="otherCharges"
                    value={tenetDetails.otherCharges || ""}
                    onChange={handleInputChange}
                    className="w-1/3 p-2 border border-gray-300 rounded"
                    placeholder="Other Charges"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Electric Reading
                </label>
                <input
                  type="text"
                  name="electricReading"
                  value={tenetDetails.electricReading || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter first electric reading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Electric Unit Charge
                </label>
                <input
                  type="text"
                  name="electricUnitCharge"
                  value={tenetDetails.electricUnitCharge || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter cost per electric unit"
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                >
                  Delete Tenant
                </button>
                <div className="space-x-4">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TenetDashboard;
