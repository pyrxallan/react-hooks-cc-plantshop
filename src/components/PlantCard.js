import React from "react";

function PlantCard({ plant, onSoldOut }) {
  const { id, name, image, price, soldOut } = plant;

  const handleSoldOut = () => {
    onSoldOut(id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p> {/* REMOVED $ SYMBOL */}
      {soldOut ? (
        <button onClick={handleSoldOut}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleSoldOut}>
          In Stock
        </button>
      )}
    </li>
  );
}

export default PlantCard;