import React, { Component } from "react";
import Header, { Header2 } from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import LandingPage from "./landingpage";
import { useEffect } from "react";
import CartProvider from "./store/CartProvider";
import Head from "next/head";

  import { ToastContainer, toast } from 'react-toast'


// import { Route, Switch, Redirect } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import MealsPage from "./components/mealsPage/MealsPage";
// import VSMealsPage from "./components/vsm2/VSMealsPage";

// import ProductsSection from "./components/productsPage/ProductsPage";
// import Login from "./components/Login";
// import GroceryPage from "./components/GroceryPage";
// import ProductFullDetail from "./components/ProductFullDetail/ProductFullDetail";
// import SignUp from "./components/signup";
// import ForgotPassword from "./components/forgotpassword";
// import ResetPassword from "./components/resetpassword";
// import SuggestMeal from "./components/SuggestMeal";
// import SuggestProduct from "./components/SuggestProduct";
// import ViewSuggestedMeals from "./components/ViewSuggestedMeals";
// import AdminPanel from "./components/AdminPanel/AdminPanel";
import { setInitUrl, getUser } from "../src/actions";
import { connect } from "react-redux";
import axios from "../src/util/Api";
import productsObj from "../src/custom_data/products.json";
import SideNav from "../src/components/Header/sidenav";
// import { createMuiTheme, ThemeProvider } from '@mui/material';

class App extends Component {
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
  // productDisplayBooleansOutOfState = [];
  availableLocations = [
    "African Carribean Market",
    "Abule",
    "Scotch Bonnet Restaurant",
    "Ralphs",
    "Target",
    "Walmart",
    "Vons",
  ];

  groceryList = [];
  locationAddressComponent = [];

  //////////////////////////////////////////////////////////////////////

  render() {
    // const { customer_id } = this.props;

    return (
      <CartProvider>
        <Head>
          <title>Chop Chow Landing Page</title>
          <meta
            key="title"
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Header />
        <Header2 />
        <SideNav />

        <LandingPage />
        <Footer />
      </CartProvider>
    );
  }
}

// export default App;
export default App;
{
  /* <Switch>
                    <Route exact path="/login"
                        render={() => (<Login openFlag={true} />)}
                    />
                    <Route exact path="/admin" render={(props) => {
                        return ((customer_id !== undefined) && userRole === 'admin' ? <AdminPanel {...props} /> : <Redirect to={{ pathname: "#" }} />)
                    }} />
                    <Route exact path="/signup" render={(props) => <SignUp {...props} />} />
                    <Route exact path="/resetpass" render={(props) => <ResetPassword {...props} />} />
                    <Route exact path="/forgotpass" render={(props) => <ForgotPassword {...props} />} />

                    <Route exact path="/" render={(props) => <HomePage {...props} />} />

                    {/* <Route path="/home" render={() => (customer_id !== undefined) ? <HomePage /> : (<Redirect to={{ pathname: "#" }} />)} /> 
                    <Route path="/home" render={(props) => <HomePage {...props} />} />

                    <Route path="/v2" render={() => <MealsPage productsObj={productsObj} />} />
                    <Route path="/v3" render={() => <VSMealsPage />} />

                    <Route exact path="/grocery" render={() => {
                        return ((customer_id !== undefined || customer_id !== 'null') ? <GroceryPage productNames={this.productNames} /> : <Redirect to={{ pathname: "#" }} />)
                    }} />

                    <Route path="/products" render={(props) => {
                        return <ProductsSection />
                    }} />
                    <Route exact path="/SuggestProduct" render={(props) => {
                        console.log("Customer Id:", customer_id)
                        return (
                            <SuggestProduct />
                        )
                    }} />
                    <Route exact path="/SuggestMeal" render={(props) => {
                        console.log("Customer Id:", customer_id)
                        return (
                            <SuggestMeal productNames={this.productNames} allMealNames={this.allMealNames}
                                measurements={this.measurements} kitchenUtensils={this.kitchenUtensils}
                                categories={this.categories} />
                            // (customer_id !== undefined) ? <SuggestMeal /> : <Redirect to={{ pathname: "#" }} /> )
                        )
                    }} />
                    {/* <Route exact path="/ViewSuggestedMeals" render={(props) => ((customer_id !== undefined) && (userRole === "admin")) ? <ViewSuggestedMeals /> : (<Redirect to={{ pathname: "#" }} />)} /> 
                    <Route exact path="/ViewSuggestedMeals"
                        render={(props) => <ViewSuggestedMeals
                            kitchenUtensils={this.kitchenUtensils}
                            categories={this.categories}
                            productNames={this.productNames}
                            measurements={this.measurements} />} />
                    {/* <Route path="/product-detail/:customerId/:productId" render={(props) => (customer_id !== undefined) ? <ProductFullDetail /> : (<Redirect to={{ pathname: "#" }} />)} /> 
                    {/* <Route path="/product-detail/:customerId/:productId" component={ProductFullDetail} /> 
                </Switch> */
}
