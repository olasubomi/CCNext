import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";

const Items = ({ itemName, itemPrice, itemStore }) => {
  const [cardName, setCardName] = useState("");

  return (
    <div className={styles.container}>
      <p>{itemName}</p>
      <p>{itemStore}</p>
      <p>{itemPrice}</p>
      <button>Add Item</button>
    </div>
  );
};

export default Items;
