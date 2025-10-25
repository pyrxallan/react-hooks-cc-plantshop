import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true; // Add cleanup flag
    
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) { // Only update state if component is still mounted
          setPlants(data);
        }
      })
      .catch((error) => console.error("Error fetching plants:", error));

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const toggleSoldOut = (plantId) => {
    setPlants(plants.map(plant => 
      plant.id === plantId 
        ? { ...plant, soldOut: !plant.soldOut } 
        : plant
    ));
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onSoldOut={toggleSoldOut} />
    </main>
  );
}

export default PlantPage;