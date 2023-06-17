import React from "react";
import cartStyles from "./TimeBar.module.css";
import Timer from "../../../GlobalComponents/Timer";

function TimeBar() {
  return (
    <div className={cartStyles.timeContainer}>
      <label>Checkout within <Timer/> so we don’t run out of stock</label>
    </div>
  );
}

export default TimeBar;
