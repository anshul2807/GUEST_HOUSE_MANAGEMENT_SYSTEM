import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const DashView = () => {
  const { properties, updateProperties, deleteProperty } = useContext(UserContext);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get current route location
  const [outletData,setOutletData] = useState(null);
  // Check if the current route is the nested route
  const isNestedRoute = location.pathname.startsWith("/property-view/tenet-home");

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateProperties(selectedProperty);
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavigation = (property) => {
    setOutletData(property);
    navigate(`/property-view/tenet-home`);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {isNestedRoute ? (
        // Render only the nested route content
        <Outlet context={outletData}/>
      ) : (
        // Render the main content if not in the nested route
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Listed Properties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-gray-100 p-4 rounded-lg shadow hover:cursor-pointer hover:shadow-md transition"
              >
                <div 
                onClick={() => handleNavigation(property)}
                >
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-sm text-gray-700">Address: {property.address}</p>
                  <p className="text-sm text-gray-700">Pincode: {property.pincode}</p>
                  <p className="text-sm text-gray-700">State: {property.state}</p>
                  <p className="text-sm text-gray-700">Type: {property.type}</p>
                  <p className="text-sm text-gray-700">
                    Count: {property.count} {property.type}
                  </p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleEditClick(property)}
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProperty(property.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {isModalOpen && selectedProperty && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Edit Property</h3>
                <form onSubmit={handleSaveChanges} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Property Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedProperty.name}
                      onChange={handleChange}
                      className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={selectedProperty.address}
                      onChange={handleChange}
                      className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={selectedProperty.pincode}
                      onChange={handleChange}
                      className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={selectedProperty.state}
                      onChange={handleChange}
                      className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Property Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={selectedProperty.type}
                      onChange={handleChange}
                      className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="flat">Flat</option>
                      <option value="room">Room</option>
                      <option value="shop">Shop</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="count"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Count of {selectedProperty.type}
                    </label>
                    <input
                      type="number"
                      id="count"
                      name="count"
                      value={selectedProperty.count}
                      onChange={handleChange}
                      className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                      min={0}
                      max={100}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashView;
