import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Keep price as string for the API request (as test expects)
    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price // Keep as string, don't parse to number
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON" // EXACTLY as test expects (capitalized)
      },
      body: JSON.stringify(newPlant)
    })
      .then((response) => response.json())
      .then((data) => {
        // Convert price to number for display consistency with other plants
        const plantWithNumberPrice = {
          ...data,
          price: parseFloat(data.price)
        };
        onAddPlant(plantWithNumberPrice);
        setFormData({ name: "", image: "", price: "" });
      })
      .catch((error) => console.error("Error adding plant:", error));
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;