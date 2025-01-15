import React, { createContext, useState } from "react";


export const UserContext = createContext();

const dummyPropertiesData = [
  {
    "id": 0,
    "name": "Tripti Home Stay 1",
    "address": "Radha Nagar, Agra",
    "pincode": "221108",
    "state": "Uttar Pradesh",
    "type": "Room",
    "count": "3",
    "tenets": [
      {"advance": "200",
      "generalRent": "1000",
      "name": "Anshul",
      "otherCharges": "100",
      "roomName": "101",}
    ,{},{}]
  },
  {
    "id": 1,
    "name": "Tripti Home Stay 2",
    "address": "Radha Nagar, Agra",
    "pincode": "221108",
    "state": "Uttar Pradesh",
    "type": "Room",
    "count": "14",
    "tenets": Array(14).fill({})
  },
  {
    "id": 2,
    "name": "Tripti Home Stay 3",
    "address": "Radha Nagar, Agra",
    "pincode": "221108",
    "state": "Uttar Pradesh",
    "type": "Room",
    "count": "4",
    "tenets": [{},{},{},{}]
  }
];


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLogin: true });
  const [properties, setProperties] = useState(dummyPropertiesData);

  const loginUser = (userData) => setUser(userData);

  const logoutUser = () => setUser({ isLogin: false });

  const AddProperties = (propertyData) =>
    setProperties([...properties, propertyData]);

  const updateProperties = (propertyData, action) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) => {
        if (property.id === propertyData.id) {
          if (action?.type === "updateTenet") {
            const updatedTenets = property.tenets.map((tenet, index) =>
              index === action.roomNumber
                ? { ...tenet, ...action.tenetData }
                : tenet
            );
            return { ...property, tenets: updatedTenets };
          }

          if (action?.type === "deleteTenet") {
            const updatedTenets = property.tenets.filter(
              (_, index) => index !== action.roomNumber
            );
            return { ...property, tenets: updatedTenets };
          }

          const updatedTenets = (() => {
            const currentTenets = property.tenets || [];
            const diff = propertyData.count - currentTenets.length;

            if (diff > 0) {
              return [
                ...currentTenets,
                ...Array.from({ length: diff }, () => ({})),
              ];
            } else if (diff < 0) {
              return currentTenets.slice(0, diff);
            }
            return currentTenets;
          })();

          return { ...property, ...propertyData, tenets: updatedTenets };
        }
        return property;
      })
    );
  };

  const deleteProperty = (propertyId, action) => {
    if (action?.type === "deleteTenet") {
      setProperties((prevProperties) =>
        prevProperties.map((property) => {
          if (property.id === propertyId) {
            const updatedTenets = property.tenets.map((tenet, index) =>
              index === action.roomNumber ? {} : tenet
            );
            return { ...property, tenets: updatedTenets };
          }
          return property;
        })
      );
    } else {
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
      );
    }
  };
  

  const findProperty = (propertyId) =>
    properties.find((property) => property.id === propertyId);

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        properties,
        AddProperties,
        updateProperties,
        deleteProperty,
        findProperty,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};