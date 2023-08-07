import React from "react";
import suggestStyles from "./index.module.css";
import SuggestedMealCard from "./SuggestedMealCard";

const dummySuggestedMeals = [
  {
    id: "1",
    name: "Gbegiri",
    picture: "/assets/grocery_list/suggestedmeals/gbegiriImg.svg",
    driveTime: "77 mins",
    store: "Chop Chow official store",
    mealRating: 2,
    price: "$8.99",
  },
  {
    id: "2",
    name: "Ijebu Rice",
    picture: "/assets/grocery_list/suggestedmeals/ijebuRiceImg.svg",
    driveTime: "45 mins",
    store: "SandraDeli",
    mealRating: 3,
    price: "$6.45",
  },
  {
    id: "3",
    name: "Ewa Iganyin",
    picture: "/assets/grocery_list/suggestedmeals/ewaIganyiImg.svg",
    driveTime: "23 mins",
    store: "Mancho Mix",
    mealRating: 5,
    price: "$9.99",
  },
  {
    id: "4",
    name: "Goat Meat",
    picture: "/assets/grocery_list/suggestedmeals/goatMeatImg.svg",
    driveTime: "28 mins",
    store: "User3234433",
    mealRating: 4,
    price: "$10.59",
  },
  {
    id: "5",
    name: "Guguru",
    picture: "/assets/grocery_list/suggestedmeals/guguruImg.svg",
    driveTime: "28 mins",
    store: "Mama Cook store",
    mealRating: 1,
    price: "$10.69",
  },
];

function Index() {
  return (
    <div className={suggestStyles.mainBody}>
      <label>Suggested Meals Based On Items In Your Grocery List</label>
      <div className={suggestStyles.mealBody}>
        {dummySuggestedMeals.map((meal) => (
          <SuggestedMealCard
            id={meal.id}
            name={meal.name}
            picture={meal.picture}
            driveTime={meal.driveTime}
            store={meal.store}
            mealRating={meal.mealRating}
            price={meal.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Index;
