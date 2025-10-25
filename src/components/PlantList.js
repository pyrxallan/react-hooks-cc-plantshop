import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants = [], onSoldOut }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id} // Make sure key is set
          plant={plant}
          onSoldOut={onSoldOut}
        />
      ))}
    </ul>
  );
}

export default PlantList;