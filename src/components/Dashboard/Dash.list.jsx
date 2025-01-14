import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {generateId} from "../../utility/generateId";

const DashList = () => {
  const { AddProperties,properties} = useContext(UserContext);
  
  useEffect(() => {
    console.log(properties);
    
  }, [properties]);
  
  const [property, setProperty] = useState({
    id:generateId(),
    name: "",
    address: "",
    pincode: "",
    state: "",
    type: "flat", // default type as flat
    count: 0,
    tenets : []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AddProperties({...property,tenets: Array.from({ length: property.count }, () => ({}))}); // Add property to context
    // console.log("Property listed:", property);
    setProperty({
      id : "",
      name: "",
      address: "",
      pincode: "",
      state: "",
      type: "flat",
      count: 0,
      tenets : []
    }); // Reset form
    // console.log(properties);
    
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        List Your Property
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Property Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Property Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={property.name}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={property.address}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={property.pincode}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={property.state}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Property Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              id="type"
              name="type"
              value={property.type}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="flat">Flat</option>
              <option value="room">Room</option>
              <option value="shop">Shop</option>
            </select>
          </div>

          {/* Count of Rooms/Flats */}
          <div>
            <label htmlFor="count" className="block text-sm font-medium text-gray-700">
              Count of {property.type}
            </label>
            <input
              type="number"
              id="count"
              name="count"
              value={property.count}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              min={0}
              max={100}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              List Property
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashList;
