import React from "react";
import * as BsIcons from "react-icons/bs";
import suggestStyles from "./index.module.css";

const styleStar = { color: "#04D505" };

function SuggestedMealCard(props) {
  return (
    <div className={suggestStyles.mealCard}>
      <img id="suggestedMeal" src={props.picture} alt="suggested meal" />
      <div className={suggestStyles.mealName}>
        <label>{props.name}</label>
        <p>{props.driveTime}</p>
      </div>
      <h1>{props.store}</h1>
      <div className={suggestStyles.mealRate}>
        <div className={suggestStyles.starDiv}>
          {Array(props.mealRating).fill(
            <BsIcons.BsStarFill style={styleStar} />
          )}
          {Array(5 - props.mealRating).fill(
            <BsIcons.BsStar style={styleStar} />
          )}
          {/*<BsIcons.BsStarFill style={styleStar} />
          <BsIcons.BsStarFill style={styleStar} />
          <BsIcons.BsStarFill style={styleStar} />
          <BsIcons.BsStar style={styleStar} />
          <BsIcons.BsStar style={styleStar} />*/}
        </div>
        <p>{props.price}</p>
      </div>
    </div>
  );
}

export default SuggestedMealCard;
