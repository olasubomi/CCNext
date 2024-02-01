import React, { Component, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styles from "../src/components/suggestionPages/suggestion.module.css";
import Link from "next/link";
import SuggestMealForm from "../src/components/suggestionPages/SuggestMeal";
import SuggestProductForm from "../src/components/suggestionPages/SuggestProduct";
import SuggestKitchenUtensilForm from "../src/components/suggestionPages/SuggestKitchenUtensil";
import SuggestCategoryForm from "../src/components/suggestionPages/SuggestCategory";
import Header, { Header2 } from "../src/components/Header/Header";
import SideNav from "../src/components/Header/sidenav";

import Head from "next/head";
import { allMealNames  } from "../src/constants/suggestmeals.constants";

import {
  useQuery,
} from '@tanstack/react-query'
import { useEffect } from "react";

import { getItemNamesFilteredByProduct, getItemNamesFilteredByUtensils } from "../src/services/itemService";
import { getAllCategories } from "../src/services/categoryService";
import { getAllMeasurements } from "../src/services/measurementService";
import { getAllDescription } from "../src/services/descriptionService";

const SuggestMeal = () => {

  const [suggestOption, setSuggestOption] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [suggestionType, setSuggestionType] = useState("Meal");
  const [booleanOfDisplayOfDialogBoxConfirmation, setBooleanOfDisplayOfDialogBoxConfirmation] = useState(false)

  const [productNames, setProductNames] = useState([]);
  const [kitchenUtensils, setKitchenUtensils] = useState([]);
  const [categories, setProductCategories] = useState([]);
  const [measurements, setMeasurement] = useState([]);
  const [nutritionFacts, setNutritionFacts] = useState([]);

  const handleSuggestionType = (type) => {
    setSuggestionType(type);
    setSuggestOption(!suggestOption);
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['suggestMeals'],
    queryFn: getItemNamesFilteredByProduct
  });

  const { isPending: KitchenUtensilsLoading, error: KitchenUtensilsError, data: KitchenUtensilsData } = useQuery({
    queryKey: ['suggestMealsByKitchenUtensils'],
    queryFn: getItemNamesFilteredByUtensils
  });

  const { isPending: loadingCategories, error: categoryError, data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });

  const { isPending: loadingMeasurements, error: measurementError, data: measurementData } = useQuery({
    queryKey: ['measurements'],
    queryFn: getAllMeasurements
  });

  const { isPending: loadingDescription, error: DescriptionError, data: DescriptionData } = useQuery({
    queryKey: ['description'],
    queryFn: getAllDescription
  });

  console.log("DescriptionData", DescriptionData);
  
  useEffect(() => {
    if(data?.data){
      const itemNames = data.data.items.map(item => item.item_name);
      setProductNames(itemNames);
    }

    if(KitchenUtensilsData?.data){
      const kitchenUtensils = KitchenUtensilsData.data.items.map(item => item.item_name);
      setKitchenUtensils(kitchenUtensils);
    }

    if(categoriesData){
      const categoriesItem = categoriesData.data.categories.map(category => category.category_name);
      setProductCategories(categoriesItem);
    }

    if(measurementData){
      setMeasurement(measurementData?.data?.measurement.map(measurement => measurement.measurement_name));    
    }

    if(DescriptionData){
      setNutritionFacts(DescriptionData?.data?.description.map(description => description.description_key));    
    }

  }, [data, categoriesData, measurementData, KitchenUtensilsData, DescriptionData]);


  return (
    <main>
      <Header />
      <Header2 />
      <SideNav />

      <div className={styles.suggestion_container}>
        <Head>
          <title>Suggested Meal Form</title>
          <meta
            key="title"
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div className={styles.suggestion_sections}>
          <div className={styles.suggestion_section_1}>
            <div className={styles.suggestion_section_1_col_1}>
              <ul className={styles.suggestion_header_pages}>
                <WestIcon className={styles.suggestion_header_page_arrow} />
                <li>
                  <Link href="/">back</Link>
                </li>
              </ul>
            </div>
            <div className={styles.suggestion_section_1_col_2}>
              <p className={styles.suggestion_section_1_col_2_p}>
                {" "}
                Choose type
              </p>
              <div className={styles.select_container}>
                <div onClick={() => setSuggestOption(!suggestOption)} className={styles.select_box}>
                  <p>{suggestionType}</p>
                  <ArrowDropDownIcon className={styles.select_box_icon} />
                </div>
                {suggestOption && (
                  <div className={styles.select_options}>
                    <p onClick={() => handleSuggestionType("Meal")}>
                      Meals
                    </p>
                    <p onClick={() => handleSuggestionType("Product")}>
                      Products
                    </p>
                    <p
                      onClick={() => handleSuggestionType("Kitchen Utensil")}
                    >
                      Kitchen Utensils
                    </p>
                    <p onClick={() => handleSuggestionType("Category")}>
                      Category
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {suggestionType === "Meal" && (
            <SuggestMealForm
              allMealNames={allMealNames}
              productNames={productNames}
              measurements={measurements}
              kitchenUtensils={kitchenUtensils}
              categories={categories}
              suggestionType={suggestionType}
            ></SuggestMealForm>
          )}
          {suggestionType === "Product" && (
            <SuggestProductForm
              allMealNames={allMealNames}
              productNames={productNames}
              measurements={measurements}
              kitchenUtensils={kitchenUtensils}
              categories={categories}
              suggestionType={suggestionType}
              nutritionFacts={nutritionFacts}
            ></SuggestProductForm>
          )}
          {suggestionType === "Kitchen Utensil" && (
            <SuggestKitchenUtensilForm
              measurements={measurements}
              kitchenUtensils={kitchenUtensils}
              categories={categories}
              suggestionType={suggestionType}
            ></SuggestKitchenUtensilForm>
          )}
          {suggestionType === "Category" && (
            <SuggestCategoryForm
              categories={categories}
              suggestionType={suggestionType}
            ></SuggestCategoryForm>
          )}
        </div>
        <Dialog
          open={booleanOfDisplayOfDialogBoxConfirmation}
          onClose={() => setBooleanOfDisplayOfDialogBoxConfirmation(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            Meal Submitted Successfully!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Thanks for your submission. Your recipe may be published to our
              meals page upon admin review. Explore our Preview and Print option
              to create a hard copy of this meal.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default SuggestMeal;
