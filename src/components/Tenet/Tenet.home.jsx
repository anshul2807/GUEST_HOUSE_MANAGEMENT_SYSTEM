import React from "react";
import { useOutletContext } from "react-router-dom";
import TenetDashboard from "./Tenet.dashboard";

function TenetHome() {
  const outletData = useOutletContext();
  return (
    <div>
      {outletData ? (
        <TenetDashboard outletData={outletData} />
      ) : (
        <div>Kindly select a property first</div>
      )}
    </div>
  );
}

export default TenetHome;
