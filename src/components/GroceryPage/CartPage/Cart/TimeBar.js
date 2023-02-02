import React from "react";
import cartStyles from "./TimeBar.module.css";

function TimeBar() {
  return (
    <div className={cartStyles.timeContainer}>
      <label>Checkout within 07:36 so we don’t run out of stock</label>
    </div>
  );
}

export default TimeBar;
