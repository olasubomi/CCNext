import React, { Component } from "react";
import axios from "../src/util/Api";
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
import { withRouter } from "next/router";
class SuggestMeal extends Component {
  allMealNames = [];
  productNames = [
    "Spinach",
    "Brown Beans",
    "Ijebu Garri",
    "Honey Beans",
    "Kale",
    "Water",
    "Squash Potatoes",
    "Oregano",
    "Cashews",
    "Palm Oil",
    "Pineapple",
    "Onions",
    "Flour",
    "Butter",
    "Sugar",
    "Hawaiian Bread",
    "Avocados",
    "Tomatoes",
    "Beef",
    "Green Pepper",
    "Garlic",
    "Ginger",
    "Vegetable Oil",
    "Lemon",
    "Rosemary Powder",
  ];
  productImageLink = [];
  categories = ["Baking", "Cooking", "Home", "Ethiopian", "Quick-Meal"];
  measurements = [
    "mL",
    "oz",
    "L",
    "cup(s)",
    "Tbsp",
    "tsp",
    "pt",
    "g",
    "kg",
    "lb",
    "qt",
    "gallon",
    "dash/pinch",
    "Leaves",
    "cloves",
    "cubes",
    "Large",
    "medium",
    "small",
  ];
  kitchenUtensils = [
    "Baking Sheet",
    "Colander",
    "Cooking Oil",
    "Cutting Board",
    "Fridge",
    "Knife Set",
    "Mixing Bowls",
    "Pot",
    "Pan",
    "Peeler",
    "Thermometer",
    "Wire Mesh",
    "Zester",
  ];
  ingredientsQuantityMeasurements = [];

  constructor(props) {
    super(props);
    this.state = {
      currentStore: "",

      // we need to update how we create image paths
      productImg_path: "",
      new_product_ingredients: [],
      suggested_stores: [],
      currProductIndexInDBsProductsList: -1,
      // currStoreIndexIfExistsInProductsList: -1,

      booleanOfDisplayOfDialogBoxConfirmation: false,

      //mealsModal controller
      openModal: false,
      suggestOption: false,
      suggestionType: "Meal",
      suggestionModal: false,
    };

    this.openMealDetailsModal = this.openMealDetailsModal.bind(this);
    this.openSuggestionModal = this.openSuggestionModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
    // this.handleStoreNameInput = this.handleStoreNameInput.bind(this);

    // this.getProductIndex = this.getProductIndex.bind(this);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.openSuggestionModal();
    console.log("suggestionType---", this.state.suggestionType);
    console.log(this.props.router, 'this.props.router.query')

    setTimeout(() => {
      this.setState({...this.state, suggestionType: this.props.router?.query?.item_type ?? "Meal" })
    }, 1000);
    // get all Meal Names***
    console.log(this.categories, "categories");
    // var url = "/meals/get-meals/1";
    // var url = "/items/getallitemnames";

    // try {
    //   const response = await fetch(`http://localhost:5000/api/items`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   const data = await response.json();

    //   console.log(data.data);
    //   if (data.data === undefined) {
    //     // setProductErrData(data);
    //   } else {
    //     var mealList = data.data;
    //     if (mealList) {
    //       mealList.data.meals.map((meal) =>
    //         // this.allMealNames.push(meal.meal_name)
    //         this.allMealNames.push(meal.item_name)
    //       );
    //     } else {
    //       console.log("no data.");
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }


    console.log("all meals", this.allMealNames);
    // get all store names*, if NEW products section exists.

    // can redux resolve this for us by checking if we recently called this in cache or from another page ??
    // var url = "/get-all-products";
    // url = "https://chopchowserver.vercel.app/api/meals/get-meals/1";

    // axios.get(url).then((body) => {
    //   this.productsList = body.data;
    //   if (this.productsList && this.productsList.data.length !== 0) {
    //     console.log("returns GET ALL PRODUCTS ");
    //     for (var i = 0; i < this.productsList.data.length; i++) {
    //       this.productNames.push(this.productsList.data[i].product_name);
    //       this.productImageLink.push(this.productsList.data[i].product_image);
    //     }
    //   } else {
    //     console.log("get all products function does not return");
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    //----get category meals-------------------------
    // url = "/get-all-categories";
    // axios.get(url).then((body) => {
    //   var categoriesFromDBList = body.data;
    //   if (categoriesFromDBList && categoriesFromDBList.data.length !== 0) {
    //     console.log("returns GET of ALL Categories ");

    //     for (var i = 0; i < categoriesFromDBList.data.length; i++) {
    //       this.props.categories.push(categoriesFromDBList.data[i].category_name);
    //     }
    //     console.log("PRINTING UPDATED CATEGORIES LIST");
    //   } else {
    //     console.log("get all products function does not return");
    //   }
    // })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.categories = this.props.categories || this.categories;
    console.log("PROPER", this.props.categories);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleCloseOfMealSubmissinoDialogMessage = () => {
    this.setState({ booleanOfDisplayOfDialogBoxConfirmation: false });
    // close out of state tracker..
    // productDisplayBooleansOutOfState[index] = false;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////
  openMealDetailsModal = (index) => {
    // toggle products page visibility for product to be Edited.
    // this.productDisplayBooleansOutOfState[this.state.ingredientGroupList.length] = false;
    // this.productDisplayBooleansOutOfState[index] = true;

    // var tmpIngredientGroupList = this.state.ingredientGroupList;
    // tmpIngredientGroupList[index].display = true;
    // tmpIngredientGroupList[currentProductDisplayIndex].display = false;
    // this.setState({ingredientGroupList: tmpIngredientGroupList});
    console.log("Comes in toggle product details div id. Index is : " + index);

    var individualProductDisplay = document.getElementById(
      "ProductAdditionalDataDisplayed"
    );
    console.log(individualProductDisplay);

    // if (individualProductDisplay.style.display === "block") {
    //   individualProductDisplay.style.display = "none";
    // }
    // else {
    //   individualProductDisplay.style.display = "block";
    // }
    this.setState({ openModal: true });
  };

  closeModal() {
    this.setState({ openModal: false });
    // this.props.openModal = false;
    // this.props.func_removeMealFlag();
  }
  openSuggestionModal() {
    setTimeout(() => {
      if (!localStorage.getItem("x-auth-token")) {
        this.setState({...this.state, suggestionModal: true });
      }
    }, 3000);
  }

  suggestOption = () => {
    this.setState({
      suggestOption: !this.state.suggestOption,
    });
  };

  handleSuggestionType = (type) => {
    this.setState({
      suggestionType: type,
    });
    this.suggestOption();
  };
  handleNavigation = () => {
    // Access router properties using this.props.router
    const { router } = this.props;

    // Example: Push a new URL to the router
    router.push("/login");
  };
  ///////////////////////////////////////////////////////////////////////////////////////
  render() {
    // const [ingredientInput, setIngredientInput] = useState('');

    // const theme = createMuiTheme({
    //   palette: { primary: green },
    // });

    const { suggestOption, suggestionType } = this.state;

    return (
      <>
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
            <meta name="description" content="Share your go to meals and 
            everyday cooking ingredients and utensils here on Chop Chow" />
          </Head>
          <div className={styles.suggestion_sections}>
            <div className={styles.suggestion_section_1}>
              {this.state.suggestionModal && (
                <div className={styles.suggestionContainer}>
                  <div className={styles.suggestionModal}>
                    <div className={styles.gif}>
                      <img src="/assets/icons/login.svg" alt="" />
                    </div>
                    <p className={styles.successMessage}>Login to Continue</p>
                    <p className={styles.successText}>
                      To suggest this item, kindly login to your chopchow
                      account{" "}
                    </p>
                    <div className={styles.flexCol}>
                      {" "}
                      <Link href="/login" className={styles.btn}>
                        Login
                      </Link>
                      <p
                        onClick={() =>
                          this.setState({ suggestionModal: false })
                        }
                      >
                        No, thanks
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
                  <div
                    onClick={this.suggestOption}
                    className={styles.select_box}
                  >
                    <p>{suggestionType}</p>
                    <ArrowDropDownIcon className={styles.select_box_icon} />
                  </div>
                  {suggestOption && (
                    <div className={styles.select_options}>
                      <p onClick={() => this.handleSuggestionType("Meal")}>
                        Meals
                      </p>
                      <p onClick={() => this.handleSuggestionType("Product")}>
                        Products
                      </p>
                      <p
                        onClick={() =>
                          this.handleSuggestionType("Kitchen Utensil")
                        }
                      >
                        Kitchen Utensils
                      </p>
                      <p onClick={() => this.handleSuggestionType("Category")}>
                        Category
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {suggestionType === "Meal" && (
              <SuggestMealForm
                allMealNames={this.allMealNames}
                productNames={this.productNames}
                measurements={this.measurements}
                kitchenUtensils={this.kitchenUtensils}
                categories={this.categories}
                suggestionType={this.state.suggestionType}
              ></SuggestMealForm>
            )}
            {suggestionType === "Product" && (
              <SuggestProductForm
allMealNames={this.allMealNames}
                productNames={this.productNames}
                measurements={this.measurements}
                kitchenUtensils={this.kitchenUtensils}
                categories={this.categories}
                suggestionType={this.state.suggestionType}
              ></SuggestProductForm>
            )}
            {suggestionType === "Kitchen Utensil" && (
              <SuggestKitchenUtensilForm
                measurements={this.measurements}
                kitchenUtensils={this.kitchenUtensils}
                categories={this.categories}
                suggestionType={this.state.suggestionType}
              ></SuggestKitchenUtensilForm>
            )}
            {suggestionType === "Category" && (
              <SuggestCategoryForm
                categories={this.categories}
                suggestionType={this.state.suggestionType}
              ></SuggestCategoryForm>
            )}
          </div>
          <Dialog
            open={this.state.booleanOfDisplayOfDialogBoxConfirmation}
            onClose={this.handleCloseOfMealSubmissinoDialogMessage}
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
                meals page upon admin review. Explore our Preview and Print
                option to create a hard copy of this meal.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
}

export default withRouter(SuggestMeal);
