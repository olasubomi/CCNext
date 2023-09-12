import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
// import axios from 'axios';
import axios from '../../util/Api';
import { Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import styles from "./suggestion.module.css";
import Popup1 from "../popups/popup1";
import Image from 'next/image';
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { base_url } from "../../util/Api";

class SuggestProductForm extends Component {
  allProductNames = [];
  productNames = ["Spinach", "Brown Beans", "Ijebu Garri", "Honey Beans", "Kale", "Water",
    "Squash Potatoes", "Oregano", "Cashews", "Palm Oil", "Pineapple", "Onions", "Flour",
    "Butter", "Sugar", "Hawaiian Bread", "Avocados", "Tomatoes", "Beef", "Green Pepper",
    "Garlic", "Ginger", "Vegetable Oil", "Lemon", "Rosemary Powder"];
  productImageLink = [];
  categories = ["Baking", "Cooking", "Home", "Ethiopian",];
  measurements = ["mL", "oz", "L", "cup(s)", "Tbsp", "tsp", "pt", "g", "kg", "lb", "qt",
    "gallon", "dash/pinch", "Leaves", "cloves", "cubes", "Large", "medium", "small"];

  nutritionFacts = ["Calories", "Total Carbs", "Net Carbs", "Fiber", "Fat", "Protein"]
  ingredientsQuantityMeasurements = [];

  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      product_images: "",
      productImageName: "",
      productImage1: "",
      productImage2: "",
      productImage3: "",
      productImage4: "",
      productImagesData: [],
      productDescription: "",

      ingredientNames: [],
      // do we need product group list AND strings ?
      ingredientGroupList: [],
      descriptionGroupList: [],
      sizeGroupList: [],
      // store product names of inputted strings to compare with db products
      ingredientStrings: [],
      nutritionalStrings: [],
      sizeStrings: [],
      // do we want to use current ingredient formats ? Yes.
      currentIngredient: "",
      currentIngredientMeasurement: "",
      sizeQuantity: "",
      sizeMeasurement: "",
      currentNutritionNAme: "",
      caloriesQuantity: "",
      caloriesMeasurement: "",
      total_carbsQuantity: "",
      total_carbsMeasurement: "",
      net_carbsQuantity: "",
      net_carbsMeasurement: "",
      fiberQuantity: "",
      fiberMeasurement: "",
      fatQuantity: "",
      fatMeasurement: "",
      proteinQuantity: "",
      proteinMeasurement: "",
      currentIngredientQuantity: "",
      currentProductImgSrc: null,
      currentProductDisplayIndex: 0,

      currentStore: "",
      quantity: "",

      // we need to update how we create image paths
      productImg_path: "",
      new_product_ingredients: [],
      suggested_stores: [],
      currProductIndexInDBsProductsList: -1,
      // currStoreIndexIfExistsInProductsList: -1,
      suggestedCategories: [],

      booleanOfDisplayOfDialogBoxConfirmation: false,

      //productsModal controller
      openModal: false,
      stepInputs: []
    };

    this.closeModal = this.closeModal.bind(this);
    // this.handleStoreNameInput = this.handleStoreNameInput.bind(this);

    // this.getProductIndex = this.getProductIndex.bind(this);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {

    console.log('nutritional-strings=-=-=-', this.state)
    // get all product Names***
    // var url = "https://chopchowdev/api/products/getAllProducts";
    var url = `${base_url}/products/getAllProducts`;
    axios.get(url).then((body) => {
      var productList = body.data;
      if (productList && productList.data.length !== 0) {
        console.log("returns GET of ALL Products ");
        for (var i = 0; i < productList.data.length; i++) {
          this.allProductNames.push(productList.data[i].product_name);
        }
      } else {
        console.log("get all product names function does not return");
      }
    })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.allProductNames);
    // get all store names*, if NEW products section exists.

    // can redux resolve this for us by checking if we recently called this in cache or from another page ??
    // var url = "/get-all-products";
    url = "https://chopchowdev.herokuapp.com/get-all-products";

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

    //----get category products-------------------------
    url = "/get-all-categories";
    // axios.get(url).then((body) => {
    //   var categoriesFromDBList = body.data;
    //   if (categoriesFromDBList && categoriesFromDBList.data.length !== 0) {
    //     console.log("returns GET of ALL Categories ");

    //     for (var i = 0; i < categoriesFromDBList.data.length; i++) {
    //       this.categories.push(categoriesFromDBList.data[i].category_name);
    //     }
    //     console.log("PRINTING UPDATED CATEGORIES LIST");
    //   } else {
    //     console.log("get all products function does not return");
    //   }
    // })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    this.categories = this.categories;
    if (typeof window !== 'undefined') {

      let doc = document.querySelector('#formproduct')
      if (doc) {
        doc.addEventListener('keyup', (e) => {
          localStorage.setItem('suggestProductForm', JSON.stringify(this.state))
        })

        doc.addEventListener('click', (e) => {
          localStorage.setItem('suggestProductForm', JSON.stringify(this.state))
        }, false)
      }

      if (localStorage.getItem('suggestProductForm')) {
        let {
          productName,
          productDescription,

          ingredientNames,
          // do we need product group list AND strings ?
          ingredientGroupList,
          // descriptionGroupList,
          sizeGroupList,
          // store product names of inputted strings to compare with db products
          ingredientStrings,
          nutritionalStrings,
          sizeStrings,
          // do we want to use current ingredient formats ? Yes.
          currentIngredient,
          currentIngredientMeasurement,
          sizeQuantity,
          sizeMeasurement,
          currentIngredientQuantity,
          currentProductImgSrc,
          currentProductDisplayIndex,

          currentStore,
          quantity,

          // we need to update how we create image paths
          productImg_path,
          new_product_ingredients,
          suggested_stores,
          currProductIndexInDBsProductsList,
          // currStoreIndexIfExistsInProductsList,
          suggestedCategories,

          booleanOfDisplayOfDialogBoxConfirmation,

          //productsModal controller
          openModal,
          stepInputs
        } = JSON.parse(localStorage.getItem('suggestProductForm'))


        this.setState({
          productName,
          productDescription,

          ingredientNames,
          // do we need product group list AND strings ?
          ingredientGroupList,
          // descriptionGroupList,
          sizeGroupList,
          // store product names of inputted strings to compare with db products
          ingredientStrings,
          nutritionalStrings,
          sizeStrings,
          // do we want to use current ingredient formats ? Yes.
          currentIngredient,
          currentIngredientMeasurement,
          sizeQuantity,
          sizeMeasurement,
          currentIngredientQuantity,
          currentProductImgSrc,
          currentProductDisplayIndex,

          currentStore,
          quantity,

          // we need to update how we create image paths
          productImg_path,
          new_product_ingredients,
          suggested_stores,
          currProductIndexInDBsProductsList,
          // currStoreIndexIfExistsInProductsList,
          suggestedCategories,

          booleanOfDisplayOfDialogBoxConfirmation,

          //productsModal controller
          openModal: false,
          stepInputs,
        })
      }
    }
  }

  onInputChange = (e) => {
    console.log("Comes in on text field change; ");
    console.log(e.target.value)
    // console.log(" " + [e.target.id] + " " + e.target.value);
    this.setState({ "productName": e.target.value });
  };

  uploadProductImage = () => {
    // <input accept="image/*,video/mp4,video/mov,video/x-m4v,video/*" id="utensilImage" name="utensilImage" type="file" className="mb-2 pr-4" onChange={(ev) => this.onUpdateutensilImage(ev)} />
    const input = document.createElement("input");
    input.accept = "image/*,video/mp4,video/x-m4v,video/*";
    input.id = "productImage";
    input.name = "productImage";
    input.type = "file";
    input.onchange = (ev) => this.onUpdateProductImage(ev);
    input.hidden = true;
    input.click()
  }

  onUpdateProductImage = (event) => {
    if (event.target.files[0] === undefined) return;

    // Allowing file type
    var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;

    if (allowedImageExtensions.exec(event.target.files[0].name)) {
      // if (this.state.productImage === "") {
      // this.setState({
      //   productImage: event.target.files[0],
      //   productImageName: event.target.files[0].name,
      //   productImageData: URL.createObjectURL(event.target.files[0])
      // });
      //display products main image or videoin suggest product
      // if (this.state.productImage1 !== "") {
      this.setState({
        productImagesData: [...this.state.productImagesData, URL.createObjectURL(event.target.files[0])]
      });
      // }


      if (this.state.productImage1 == "") {
        this.setState({ productImage1: event.target.files[0] });
      }
      else if (this.state.productImage2 == "") {
        this.setState({ productImage2: event.target.files[0] });
      }
      else if (this.state.productImage3 == "") {
        this.setState({ productImage3: event.target.files[0] });

      }
      else {
        this.setState({ productImage4: event.target.files[0] });

      }

      // var image = document.getElementById("ProductsMainImages");
      // image.style.display = "block";
      // image.src = URL.createObjectURL(event.target.files[0]);

      console.log(event.target.files[0]);
      console.log(event.target.files[0].name);
      console.log(allowedImageExtensions.exec(event.target.files[0].name));

      // console.log(URL.createObjectURL(event.target.files[0]));
      // } else {
      // var image = document.getElementById("productsMainImages"+(this.state.utensilImagesData.length+1));
      // image.style.display = "block";
      // image.src = URL.createObjectURL(event.target.files[0]);
    }
    else {
      alert("Invalid image type");
    }
  };

  onTextFieldChange = (e) => {
    console.log("Comes in on text field change; ");

    console.log(" " + [e.target.id] + " " + e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleCategoryDropdownChange = (val) => {
    console.log(this.state.suggestedCategories)
    this.setState({ suggestedCategories: val });
    // below setstate causes an error to make each new set a sum of all previous.
    // this.setState({ suggestedCategories: [...this.state.suggestedCategories, val] });

  }

  categoryBlur = (e) => {
    this.setState({
      categoryVal: e.target.value
    })
  }

  addCategory = () => {
    let cat = this.state.categoryVal;
    const categorySentence = cat;
    const categoryWords = categorySentence.split(" ");

    categoryWords.map((categoryWord) => {
      return categoryWord[0].toUpperCase() + categoryWord.substring(1);
    }).join(" ");

    let suggestedCategories = this.state.suggestedCategories;
    suggestedCategories.push(categoryWords);
    this.setState({
      suggestedCategories
    })
  }

  handleProductNameInput = (event, val) => {

    console.log("In handleProductNameInput . \n val is: " + val);
    if (val !== undefined && val !== null) {
      // CHECK IF INPUT MATCHES ANY PRODUCT ALREADY IN DB and
      // set currProductIndexInDBsProductsList variable 
      const searchResult = this.productNames.map(function callback(element) { if (element.toLowerCase() === (val.toLowerCase())) { return true; } else { return false; } });
      const tmpcurrProductIndexInDBsProductsList = searchResult.indexOf(true);
      console.log("Curr Product Index If Exists In Products List is: \n" + tmpcurrProductIndexInDBsProductsList);

      // check if product name is an existing product
      // set product existense to index, so one will not need to edit
      this.setState({ currProductIndexInDBsProductsList: tmpcurrProductIndexInDBsProductsList });

      // set current ingredient to input Product regardless
      // console.log("Event is: \n"+ event.target);
      if (event != null && event.target.value !== null) {
        this.setState({ currentIngredient: event.target.innerHTML });

      } else {
        this.setState({ currentIngredient: val });
      }
    }
    else {
      console.log('val is null or undefined');
    }
  }

  handleIngredientMeasurement = (event, val) => {
    // if (event.target.value) {
    //   this.setState({ currentIngredientMeasurement: event.target.value });
    // } else {
    //   this.setState({ currentIngredientMeasurement: "" });
    // }

    console.log("In handleIngredientMeasurement . \n val is: " + val);

    if (val !== null && val !== undefined) {
      // CHECK IF INPUT MATCHES ANY PRODUCT ALREADY IN DB and
      // set currProductIndexInDBsProductsList variable 
      const searchResult = this.measurements.map(function callback(element) { if (element.toLowerCase() === (val.toLowerCase())) { return true; } else { return false; } });
      const tmpcurrMeasurementIndexInDBsMeasurementList = searchResult.indexOf(true);
      console.log("Curr Product Index If Exists In Products List is: \n" + tmpcurrMeasurementIndexInDBsMeasurementList);

      // check if product name is an existing product
      // set product existense to index, so one will not need to edit
      // this.setState({ currProductIndexInDBsProductsList: tmpcurrMeasurementIndexInDBsMeasurementList });

      // set current ingredient to input Product regardless
      // console.log("Event is: \n"+ event.target);
      if (event != null && event.target.value !== null) {
        this.setState({ currentIngredientMeasurement: event.target.innerHTML });

      } else {
        this.setState({ currentIngredientMeasurement: val });
      }
    }
    else {
      console.log('val is null!');
    }
  }

  handleSizeMeasurement = (event, val) => {
    // if (event.target.value) {
    //   this.setState({ sizeMeasurement: event.target.value });
    // } else {
    //   this.setState({ sizeMeasurement: "" });
    // }

    console.log("In handleSizeMeasurement . \n val is: " + val);

    if (val !== null && val !== undefined) {
      // CHECK IF INPUT MATCHES ANY PRODUCT ALREADY IN DB and
      // set currProductIndexInDBsProductsList variable 
      const searchResult = this.measurements.map(function callback(element) { if (element.toLowerCase() === (val.toLowerCase())) { return true; } else { return false; } });
      const tmpcurrMeasurementIndexInDBsMeasurementList = searchResult.indexOf(true);
      console.log("Curr Product Index If Exists In Products List is: \n" + tmpcurrMeasurementIndexInDBsMeasurementList);

      // check if product name is an existing product
      // set product existense to index, so one will not need to edit
      // this.setState({ currProductIndexInDBsProductsList: tmpcurrMeasurementIndexInDBsMeasurementList });

      // set current ingredient to input Product regardless
      // console.log("Event is: \n"+ event.target);
      if (event != null && event.target.value !== null) {
        this.setState({ sizeMeasurement: event.target.innerHTML });

      } else {
        this.setState({ sizeMeasurement: val });
      }
    }
    else {
      console.log('val is null!');
    }
  }

  addSize = (event) => {
    console.log("COMES IN addIngredientToproduct");
    event.preventDefault();
    var properSizeStringSyntax;
    // var ingredientValue = document.getElementById("currentIngredient").value;
    var sizeQuantityValue = document.getElementById("sizeQuantity").value;
    // best to get the measurement from the state
    // perhaps becuse inner html is defined before state is updated
    // var measurementValue = this.state.currentIngredientMeasurement;
    var sizeMeasurementValue = document.getElementById("sizeMeasurement").value;


    if (sizeMeasurementValue === "") { window.alert("Enter measurement"); return; }
    // update ingredient string syntax for no quantity or no measurement.
    if (sizeQuantityValue === "") {
      properSizeStringSyntax = '';
    } else if (sizeMeasurementValue === "" && sizeQuantityValue !== "") {
      // MAKE sure we are using the right and tested variables to display the right type of string at all times.
      properSizeStringSyntax = "" + sizeQuantityValue;
    } else {
      properSizeStringSyntax =
        "" + sizeQuantityValue + " " + sizeMeasurementValue;
    }
    console.log(properSizeStringSyntax);

    // This is the Object for an Ingredient of a Known Product
    var descriptionObject = {
      description_name: "Size",
      quantity: sizeQuantityValue,
      measurement: sizeMeasurementValue,
      properDescriptionStringSyntax: properSizeStringSyntax
    };

    // refactor to have one size object rather than size group list
    // this.setState({ sizeGroupList: [sizeObject] });
    this.setState({ descriptionGroupList: [...this.state.descriptionGroupList, descriptionObject] });

    // after adding product to ingredient group list
    // reset current product img src and path to null, and same for current ingredient inputs
    // this.setState({ currentProductImgSrc: null, productImg_path: "" });
    this.setState({ sizeQuantity: '', sizeMeasurement: "null" });
    this.setState({ sizeMeasurement: "" });
    this.handleAddSizeChip(properSizeStringSyntax);
  }

  handleAddSizeChip(chip) {
    this.setState({
      sizeStrings: [chip],
    });
  }

  handleDeleteSizeChip(chip) {
    var array = this.state.sizeStrings; // make a separate copy of the array
    var removeFromGroup = this.state.sizeGroupList;

    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      removeFromGroup.splice(index, 1);

      this.setState({ sizeStrings: array, sizeGroupList: removeFromGroup });
    }
  }

  handleDeleteCategoryChip(chip) {
    var array = [...this.state.suggestedCategories]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ suggestedCategories: array });
    }
  }

  handleAddNutritionalInfoChip(chip) {
    console.log(this.state);
    this.setState({
      nutritionalStrings: [...this.state.nutritionalStrings, chip],
    });
  }

  handleDeleteNutritionalInfoChip(chip) {
    console.log(chip, "hello")
    var array = this.state.nutritionalStrings; // make a separate copy of the array
    var removeFromGroup = this.state.ingredientGroupList;

    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      removeFromGroup.splice(index, 1);

      this.setState({ nutritionalStrings: array });
    }

  }
  handleAddIngredientChip(chip) {
    this.setState({
      ingredientStrings: [...this.state.ingredientStrings, chip],
    });
  }

  handleDeleteIngredientChip(chip, element) {
    var array = this.state.ingredientStrings; // make a separate copy of the array
    var removeFromGroup = this.state.ingredientGroupList;

    if (Boolean(element)) {
      let copy = this.state.nutritionalStrings;
      copy.splice(this.state.nutritionalStrings.indexOf(chip), 1);

      this.setState({ ...this.state, nutritionalStrings: copy })
    }

    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      removeFromGroup.splice(index, 1);

      this.setState({ ingredientStrings: array, ingredientGroupList: removeFromGroup });
    }
  }

  addNutritionalFactToProduct = (
    event,
    id = 'currentIngredient',
    qty = 'currentIngredientQuantity',
    msr = 'currentIngredientMeasurement') => {


    console.log("COMES IN addIngredientToProduct", this.state.nutritionalStrings);
    event.preventDefault();
    var properIngredientStringSyntax;
    var ingredientValue = document.getElementById(id).value;
    var quantityValue = document.getElementById(qty).value;
    // best to get the measurement from the state
    // perhaps becuse inner html is defined before state is updated
    // var measurementValue = this.state.currentIngredientMeasurement;
    var measurementValue = document.getElementById(msr).value;


    if (ingredientValue === "") { window.alert("Enter an ingredient to add to product@@"); return; }
    // update ingredient string syntax for no quantity or no measurement.

    // Calories: 5g, 5%
    properIngredientStringSyntax =
      ingredientValue + " : " + quantityValue + "" + measurementValue;
    console.log(properIngredientStringSyntax);

    // This is the Object for an Ingredient of a Known Product
    var currNutritionObject = {
      description_name: ingredientValue,
      quantity: quantityValue,
      measurement: measurementValue,
      properIngredientStringSyntax: properIngredientStringSyntax
    };

    console.log("current state of product index at Add Ingredient To product is : \n" + this.state.currProductIndexInDBsProductsList);

    // create state for each nutritional value

    // after adding product to ingredient group list
    // reset current product img src and path to null, and same for current ingredient inputs
    this.setState({ currentIngredient: "null", currentIngredientQuantity: '', currentIngredientMeasurement: "null" });
    this.setState({ currentIngredient: "", currentIngredientMeasurement: "" });

    this.handleAddNutritionalInfoChip(properIngredientStringSyntax);

    this.setState({ descriptionGroupList: [...this.state.descriptionGroupList, currNutritionObject] });
    console.log(this.state.descriptionGroupList);


  }
  addIngredientToProduct = (event) => {
    console.log("COMES IN addIngredientToProduct");
    event.preventDefault();
    var properIngredientStringSyntax;
    var ingredientValue = document.getElementById("currentIngredient").value;
    var quantityValue = document.getElementById("currentIngredientQuantity").value;
    // best to get the measurement from the state
    // perhaps becuse inner html is defined before state is updated
    // var measurementValue = this.state.currentIngredientMeasurement;
    var measurementValue = document.getElementById("currentIngredientMeasurement").value;


    if (ingredientValue === "") { window.alert("Enter an ingredient to add to product"); return; }
    // update ingredient string syntax for no quantity or no measurement.
    if (quantityValue === "") {
      properIngredientStringSyntax = ingredientValue;
    } else if (measurementValue === "" && quantityValue !== "") {
      // MAKE sure we are using the right and tested variables to display the right type of string at all times.
      properIngredientStringSyntax = "" + quantityValue + " " + ingredientValue;
    } else {
      properIngredientStringSyntax =
        "" + quantityValue + " " + measurementValue +
        " of " + ingredientValue;
    }
    console.log(properIngredientStringSyntax);

    // This is the Object for an Ingredient of a Known Product
    var currIngredientObject = {
      productName: ingredientValue,
      // productImgFile: this.state.currentProductImgSrc,
      productImgPath: null,

      // these are added to ingredient packets on submit, and not relevant in product object details
      quantity: quantityValue,
      measurement: measurementValue,
      properIngredientStringSyntax: properIngredientStringSyntax
    };

    console.log("current state of product index at Add Ingredient To product is : \n" + this.state.currProductIndexInDBsProductsList);

    const searchResult = this.productNames.map(function callback(element) { if (element.toLowerCase() === (ingredientValue.toLowerCase())) { return true; } else { return false; } });
    const tmpcurrProductIndexInDBsProductsList = searchResult.indexOf(true);

    this.setState({ ingredientGroupList: [...this.state.ingredientGroupList, currIngredientObject] });
    // after adding product to ingredient group list
    // reset current product img src and path to null, and same for current ingredient inputs
    // this.setState({ currentProductImgSrc: null, productImg_path: "" });
    this.setState({ currentIngredient: "null", currentIngredientQuantity: '', currentIngredientMeasurement: "null" });
    this.setState({ currentIngredient: "", currentIngredientMeasurement: "" });
    this.handleAddIngredientChip(properIngredientStringSyntax);

    //  Resetting inner html directly to clear ingredient inputs without changing state
    // document.getElementById("currentIngredient").value = 'NewPs';
    // document.getElementById("currentIngredientQuantity").value = 8;
    // document.getElementById("currentIngredientMeasurement").value = 'Removed';

  }

  handleDeleteNutritionChip(chip) {
    var array = this.state.nutritionalStrings; // make a separate copy of the array
    var removeFromGroup = this.state.descriptionGroupList;

    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      removeFromGroup.splice(index, 1);

      this.setState({ nutritionalStrings: array, descriptionGroupList: removeFromGroup });
    }
  }

  closeModal() {
    this.setState({ openModal: false });
    // this.props.openModal = false;
    // this.props.func_removeProductFlag();
  }

  openProductDetailsModal = (index) => {
    // toggle products page visibility for product to be Edited.
    // this.productDisplayBooleansOutOfState[this.state.ingredientGroupList.length] = false;
    // this.productDisplayBooleansOutOfState[index] = true;

    // var tmpIngredientGroupList = this.state.ingredientGroupList;
    // tmpIngredientGroupList[index].display = true;
    // tmpIngredientGroupList[currentProductDisplayIndex].display = false;
    // this.setState({ingredientGroupList: tmpIngredientGroupList});
    console.log("Comes in toggle product details div id. Index is : " + index);

    var individualProductDisplay = document.getElementById("ProductAdditionalDataDisplayed");
    console.log(individualProductDisplay);

    // if (individualProductDisplay.style.display === "block") {
    //   individualProductDisplay.style.display = "none";
    // }
    // else {
    //   individualProductDisplay.style.display = "block";
    // }
    this.setState({ openModal: true });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  sendSuggestedProductToDB = async (e) => {
    const { productName, productImageName, productDescription, productImagesData,
      ingredientGroupList, descriptionGroupList, suggestedCategories,
      productImage1, productImage2, productImage3, productImage4, productImages, ingredientStrings, sizeStrings, nutritionalStrings } = this.state;


    console.log('nutritionalStrings', nutritionalStrings)
    // handle edge case Product name, ingredienrs or image upload required to submit form
    if (productName === "") { console.log("product label blank"); return; }
    if (productImagesData === null || productImagesData === undefined ||
      productImagesData === []) { window.alert("You didn't add suggested product image"); return; }

    // Handle instruction/product images to create url for product images on server
    /*Loop through Ingredients product data
    Check if all products listed exist in the database.
    If not, let server create placeholder before submitting to db.
    Get list of new products and new Categories
    This for loop is making sure we are building a product_slider.
    we could probably merge this in the above for loop easily, but we want to call this path function,
    so lets figure out what its even doing!*/

    const all_ingredients_formatted = [];
    const product_slider = [];
    let i = 0;


    let new_measurements = [];
    for (i = 0; i < ingredientGroupList.length; i++) {
      const productString = ingredientGroupList[i].productName;
      const productWords = productString.split(" ");

      productWords.map((productWord) => {
        return productWord[0].toUpperCase() + productWord.substring(1);
      }).join(" ");

      // store ingredient format to submit ingredient product objects
      var tmp_ingredient = {
        // name and optional image added to new product,
        // we can add remainder products data after testing current
        product_name: productWords,
        quantity: ingredientGroupList[i].quantity,
        measurement: ingredientGroupList[i].measurement,
        productImgPath: ingredientGroupList[i].productImgPath,
        properIngredientStringSyntax: ingredientGroupList[i].properIngredientStringSyntax
      };

      all_ingredients_formatted.push(tmp_ingredient);
      console.log(tmp_ingredient);

      const tmp_slider_data = {
        ingredient: ingredientGroupList[i].product,
        image: ingredientGroupList[i].productImgPath,
        display: ingredientGroupList[i].display,
      };
      // store product slider format to submit slider object to product
      product_slider.push(tmp_slider_data);


      // get new_Measurements from inputted ingredient packets
      if (ingredientGroupList[i].measurement !== "") {
        let index = this.measurements.indexOf(ingredientGroupList[i].measurement);
        if (index === -1) new_measurements.push(ingredientGroupList[i].measurement);
      }
    }


    //prepare product data to Mongo and Recipe Steps Images and Video content to s3
    const instructionGroupData = [];
    const contentNameToContentImageOrVideoMapForS3 = new FormData();
    console.log("product name:");
    console.log(this.state.productName);

    contentNameToContentImageOrVideoMapForS3.append('productContentName', this.state.productName);
    console.log(contentNameToContentImageOrVideoMapForS3);
    var keyValueData = { productContentName: this.state.productName };
    // console.log("Stringified version:");
    // console.log(keyValueData);
    var singleTitleTest = JSON.stringify(keyValueData);
    console.log(singleTitleTest);


    //-------------Submit remainder data of product to Mongo ------------------------------------------
    let suggestProductForm = new FormData();
    suggestProductForm.append('item_name', productName);

    if (productImage1) {
      suggestProductForm.append('item_images', productImage1);
    }
    if (productImage2) {
      suggestProductForm.append('item_images', productImage2);
    } if (productImage3) {
      suggestProductForm.append('item_images', productImage3);
    } if (productImage4) {
      suggestProductForm.append('item_images', productImage4);
    }

    // suggestProductForm.append('product_images', productImage2);
    // suggestProductForm.append('product_images', productImage3);
    // suggestProductForm.append('product_images', productImage4);
    // suggestProductForm.append('productImageName', productImageName);
    suggestProductForm.append('item_intro', productDescription);
    descriptionGroupList.map((individualDescriptions) => {
      console.log(individualDescriptions);
      // suggestProductForm.append('product_descriptions', individualDescriptions);
    })

    const arr = nutritionalStrings.map(ele => {
      let obj = {}
      let information = ele.split(':')[0]?.trim()?.toLowerCase();
      let value = ele.split(':')[1]?.trim()?.toLowerCase()
      information = information?.split(' ')?.length > 1 ? information?.split(' ').map(ele => ele.toLowerCase()).join('_') : information;
      obj[information] = value;
      return obj
    })

    const productObject = {
      product_size: sizeStrings,
      product_name: productName
    }

    let description = {}

    if (arr.length) {
      for (let ele of arr) {
        for (let val in ele) {
          // productObject[val] = ele[val];
          description[val] = ele[val];
        }
      }
    }

    productObject.product_size = sizeStrings.toString();


    let arr2 = []

    const capitalizeFirstLetter = (str) => {
      return str.replace(/\b\w/g, (match) => match.toUpperCase());
    };

    for (let ele of Object.keys(description)) {
      arr2.push({
        object_name: ele,
        object_quantity: description[ele].match(/\d+/)[0],
        object_measurement: description[ele].match(/[a-zA-Z]+/)[0],
        formatted_string: `${ele.split('_').map(capitalizeFirstLetter).join(' ')}: ${description[ele]}`
      })
    }

    suggestProductForm.append("item_data", JSON.stringify(productObject))

    suggestProductForm.append('description', JSON.stringify(arr2));

    suggestProductForm.append("formatted_ingredients", JSON.stringify(ingredientStrings));
    // suggestProductForm.append("store_available", '63d426b416b83177aaeaed96');
    suggestProductForm.append("item_type", this.props.suggestionType)
    suggestProductForm.append("user", JSON.parse(localStorage.getItem('user'))._id);
    // list of products quantity measurements (created on submit Product)
    // suggestProductForm.append('ingredientsQuantityMeasurements', JSON.stringify(this.ingredientsQuantityMeasurements));
    // suggestProductForm.append('new_measurements', JSON.stringify(new_measurements));

    // suggestProductForm.append('product_slider', JSON.stringify(product_slider));
    // suggestProductForm.append('formatted_ingredient', JSON.stringify(all_ingredients_formatted));
    all_ingredients_formatted.map((individualIngredients) => {
      console.log(individualIngredients);
      // suggestProductForm.append('hidden_ingredients_in_product', JSON.stringify(individualIngredients));
    })
    // new suggested products
    // suggestProductForm.append('new_product_ingredients', JSON.stringify(new_product_ingredients));

    suggestProductForm.append('item_categories', JSON.stringify(suggestedCategories));

    // suggestedCategories.map(data => {
    //   suggestProductForm.append("item_categories", JSON.stringify(suggestedCategories));
    // })

    // suggestProductForm.append('product_type', JSON.stringify("Ingredient"));
    // suggestProductForm.append('publicly_available', JSON.stringify("Draft"));


    //---------------------------------------------Submit Product to Mongo---------------------------------------------------
    // var url = "/createProduct/";
    // var url = "http://localhost:5000/api/products/create/";
    var url = `${base_url}/items/`;

    const config = {
      method: 'POST', data: suggestProductForm, url: url,
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        // application/x-www-form-urlencoded
        // 'content-type': 'multipart/form-data'
      }
    };

    console.log("Printing Chunk Contents");

    var instructionData = JSON.parse(JSON.stringify(instructionGroupData));
    console.log(instructionData);

    axios(config).then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({ booleanOfDisplayOfDialogBoxConfirmation: true });
        console.log(response);
        console.log("Display Product submitted successfully");
        // window.location.href = "/SuggestProduct"
        toast.success("Product submitted sucessfully")
      } else {
        console.log("Something wrong happened ");
      }
    }).catch(error => {
      toast.error(error.message)
      console.log(error.message);
    });

  }

  deleteImages(id) {
    const deleteImg = this.state.productImagesData
    deleteImg.splice(id, 1)
    this.setState({ ...this.state, productImagesData: deleteImg })
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  render() {

    const { ingredientStrings, sizeStrings, nutritionalStrings } = this.state;


    return (
      <div className={styles.suggestion_section_2}>
        <form id="formproduct" className={styles.suggestion_forms} noValidate autoComplete="off" encType="multipart/form-data" method="post" >
          <div className={styles.suggestion_form}>
            <div className={styles.suggestion_form_group}>
              <label htmlFor="productName" className={styles.suggestion_form_label}>
                Product Name
              </label>
              {/* <Autocomplete
                    id="productName"
                    options={this.props.allproductNames.map((option) => option)}
                    // onChange={(ev, val) => this.onInputChange(ev, val)}
                    onInputChange={(ev, val) => this.onInputChange(ev, val)}
                    freeSolo
                    renderInput={(params) => (<TextField {...params} variant="outlined" />)}
                    fullWidth
                    value={this.state.productName}
                  /> */}
              <TextField value={this.state.productName} id="productName" fullWidth onChange={this.onInputChange} variant="outlined" required />
            </div>

            <h3>Upload Product Images <em>(Up to 4)</em></h3>
            {
              this.state.productImagesData.length < 4 &&
              <div className={styles.suggestion_form_image}>
                <div className={styles.suggestion_form_image_col_1}>
                  <div onClick={() => this.uploadProductImage()} className={styles.suggestion_form_image_icon_con}>
                    <AddIcon className={styles.suggestion_form_image_icon} />
                  </div >
                </div >
                <div className={styles.suggestion_form_image_col_2}>
                  <p>Upload picture with : Jpeg or Png format and not more than 500kb</p>
                </div>
              </div>}

            {/* <Row>
              <Col md={12} style={{ marginTop: "20px" }}>
                < p > <img id="ProductsMainImages" width="100%" height="100%" alt="main_product_Image" style={{ display: "none" }} />
                </p >
              </Col >
            </Row > */}

            {
              this.state.productImagesData.map((data, index) =>
                <Row key={index}>
                  <Col md={12} style={{ marginTop: "20px" }}>
                    <p><Image src={data} width="100%" height="100%" alt="main_product_Images" />
                    </p>
                    <div className={styles.close} onClick={() => this.deleteImages(index)}>
                      <AiOutlineClose className={styles.closeIcon} />
                    </div>
                  </Col>
                </Row>
              )
            }

            < h3 > Product Intro</h3 >
            <div className={styles.suggestion_form_group}>
              <label htmlFor="productDescription" className={styles.suggestion_form_label
              }>
                Intro(150 words)
              </label >
              <TextField value={this.state.productDescription} multiline id="productDescription" fullWidth onChange={this.onTextFieldChange} variant="outlined" />
            </div >
          </div >

          <h3>Product Size </h3>
          <div className={styles.suggestion_form}>
            <div className={styles.suggestion_form_2_col}>

              <div className={styles.suggestion_form_2_col_2}>
                <div className={styles.suggestion_form_group}>
                  <label htmlFor="sizeQuantity" className={styles.suggestion_form_label}>
                    Quantity
                  </label>
                  <TextField fullWidth id="sizeQuantity" type="number" onChange={this.onTextFieldChange}
                    variant="outlined" placeholder="1.." value={this.state.sizeQuantity} />
                </div>
              </div >

              <div className={styles.suggestion_form_2_col_1}>
                <div className={styles.suggestion_form_group}>
                  <label htmlFor="sizeMeasurement" className={styles.suggestion_form_label}>
                    Measurement
                  </label>
                  <Autocomplete
                    id="sizeMeasurement"
                    options={this.measurements.map((option) => option)}
                    value={this.state.sizeMeasurement} x
                    onChange={this.handleSizeMeasurement}
                    freeSolo
                    renderInput={(params) => (<TextField {...params}
                      value={this.state.sizeMeasurement} id="sizeMeasurement"
                      variant="outlined" type="text" />)}
                  />
                </div>

              </div >

              <Button variant="contained" disableRipple onClick={this.addSize} className={styles.ingredient_button} style={{ width: "max-content" }} > Add Size</Button>
            </div >

            <Stack direction="row" spacing={1} className={styles.stack}>
              {
                sizeStrings.map((data, index) => (
                  <Chip
                    key={index}
                    label={data}
                    className={styles.chip}
                    onClick={() => this.handleDeleteSizeChip(data)}
                    onDelete={() => this.handleDeleteSizeChip(data)}
                  />
                ))
              }
            </Stack>

          </div>
          <h3>Add Product Ingredients</h3>
          <div className={styles.suggestion_form}>
            <div className={styles.suggestion_form_group}>
              <label htmlFor="currentIngredient" className={styles.suggestion_form_label}>
                Ingredient Name
              </label>
              <Autocomplete
                id="currentIngredient"
                options={this.productNames.map((option) => option)}
                // onChange={(ev)=>this.onTextFieldChange(ev)}
                value={this.state.currentIngredient}
                onChange={(ev, val) => this.handleProductNameInput(ev, val)}
                freeSolo
                renderInput={(params) => (<TextField {...params} id="currentIngredient"
                  value={this.state.currentIngredient} variant="outlined" type="text"
                />)}
                fullWidth

              />
            </div >
            <div className={styles.suggestion_form_2_col}>

              <div className={styles.suggestion_form_2_col_1}>
                <div className={styles.suggestion_form_group}>
                  <label htmlFor="currentIngredientQuantity" className={styles.suggestion_form_label}>
                    Quantity
                  </label>
                  <TextField fullWidth id="currentIngredientQuantity" type="number" onChange={this.onTextFieldChange}
                    variant="outlined" placeholder="1.." value={this.state.currentIngredientQuantity} />
                </div >
              </div >

              <div className={styles.suggestion_form_2_col_2}>
                <div className={styles.suggestion_form_group}>
                  <label htmlFor="currentIngredientMeasurement" className={styles.suggestion_form_label}>
                    Measurements
                  </label>
                  <Autocomplete
                    id="currentIngredientMeasurement"
                    options={this.measurements.map((option) => option)}
                    value={this.state.currentIngredientMeasurement}
                    onChange={this.handleIngredientMeasurement}
                    freeSolo
                    renderInput={(params) => (<TextField {...params}
                      value={this.state.currentIngredientMeasurement} id="currentIngredientMeasurement"
                      variant="outlined" type="text" />)}
                  />
                </div>
              </div >

              <Button variant="contained" disableRipple onClick={this.addIngredientToProduct} className={styles.ingredient_button} style={{ width: "max-content" }} > Add Ingredient</Button>
            </div >

            <Stack direction="row" spacing={1} className={styles.stack}>
              {
                ingredientStrings.map((data, index) => (
                  <Chip
                    key={index}
                    label={data}
                    className={styles.chip}
                    onClick={() => this.handleDeleteIngredientChip(data)}
                    onDelete={() => this.handleDeleteIngredientChip(data)}
                  />
                ))
              }
            </Stack>
          </div >
          <h3>Product Description</h3>
          <div className={styles.suggestion_form}>
            <div className={styles.suggestion_form_group}>
              <label htmlFor="currentIngredient" className={styles.suggestion_form_label}>
                Nutrition Name
              </label>
              <Autocomplete
                id="currentNutritionName"
                options={this.nutritionFacts.map((option) => option)}
                // onChange={(ev)=>this.onTextFieldChange(ev)}
                value={this.state.currentNutritionName}
                onChange={(ev, val) => this.handleProductNameInput(ev, val, 'currentNutritionName')}
                freeSolo
                renderInput={(params) => (<TextField {...params} id="currentNutritionName"
                  value={this.state.currentNutritionName} variant="outlined" type="text"
                />)}
                fullWidth

              />
            </div >
            <div className={styles.suggestion_form_2_col}>

              <div className={styles.suggestion_form_2_col_1}>
                <div className={styles.suggestion_form_group}>
                  <label htmlFor="currentIngredientQuantity" className={styles.suggestion_form_label}>
                    Quantity
                  </label>
                  <TextField fullWidth id="currentIngredientQuantity" type="number" onChange={this.onTextFieldChange}
                    variant="outlined" placeholder="1.." value={this.state.currentIngredientQuantity} />
                </div >
              </div >

              <div className={styles.suggestion_form_2_col_2}>
                <div className={styles.suggestion_form_group}>
                  <label htmlFor="currentIngredientMeasurement1" className={styles.suggestion_form_label}>
                    Measurements
                  </label>
                  <Autocomplete
                    id="currentIngredientMeasurement1"
                    options={this.measurements.map((option) => option)}
                    value={this.state.currentIngredientMeasurement}
                    onChange={this.handleIngredientMeasurement}
                    freeSolo
                    renderInput={(params) => (<TextField {...params}
                      value={this.state.currentIngredientMeasurement} id="currentIngredientMeasurement1"
                      variant="outlined" type="text" />)}
                  />
                </div>
              </div >

              <Button variant="contained" disableRipple onClick={(event) => this.addNutritionalFactToProduct(event, 'currentNutritionName', 'currentIngredientQuantity', 'currentIngredientMeasurement1')} className={styles.ingredient_button} style={{ width: "max-content" }} > Add Nutrition info</Button>
            </div >

            <Stack direction="row" spacing={1} className={styles.stack}>
              {
                nutritionalStrings.map((data, index) => (
                  <Chip
                    key={index}
                    label={data}
                    className={styles.chip}
                    onClick={() => this.handleDeleteIngredientChip(data, 'nutritional')}
                    onDelete={() => this.handleDeleteIngredientChip(data, 'nutritional')}
                  />
                ))
              }
            </Stack>
          </div >

          <h3>Product Categories</h3>
          <div className={styles.suggestion_form}>
            <div className={styles.suggestion_form_group}>
              <label htmlFor="tags-outlined" className={styles.suggestion_form_label}>
                Suggest category for this product
              </label>
              <div className={styles.input_button}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  freeSolo
                  style={{
                    textTransform: 'capitalize'
                  }}
                  clearOnBlur
                  onBlur={this.categoryBlur}
                  // filterSelectedOptions
                  options={this.categories.map((option) => option)}
                  // onChange={(ev,val)=>this.handleCategoryDropdownChange(ev,val)}
                  onChange={(e, newValue) => this.handleCategoryDropdownChange(newValue)}
                  // getOptionLabel={option => option}
                  // renderTags={() => {}}
                  value={this.state.suggestedCategories}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Suggest categories for this product.."
                      fullWidth
                    />)}
                />
                < Button variant="contained" disableRipple onClick={this.addCategory} className={styles.ingredient_button} style={{ width: "max-content" }} > Add Category</Button >
              </div >

            </div >
            <Stack direction="row" spacing={1} className={styles.stack}>
              {
                [].map((data, index) => (
                  <Chip
                    key={index}
                    label={data}
                    className={styles.chip}
                    onClick={() => this.handleDeleteIngredientChip(data)}
                    onDelete={() => this.handleDeleteIngredientChip(data)}
                  />
                ))
              }
            </Stack>
          </div >




          <u style={{ color: "#F47900" }} onClick={this.openProductDetailsModal}> Show Preview</u>

          {/* <Row>
                <Col md={12}> */}
          {/* <ThemeProvider theme={theme}> */}
          <Button variant="contained" className={styles.ingredient_button} style={{ width: "100%" }} onClick={() => this.sendSuggestedProductToDB()}> Add Product</Button>
          {/* </ThemeProvider> */}
          {/* </Col>
                
              </Row> */}
          <u >View privacy policy</u>
          <div id="ProductAdditionalDataDisplayed" >
            <Popup1
              popup='product' openModal={this.state.openModal} closeModal={this.closeModal}
              name={this.state.productName} description={this.state.productDescription}
              imageData={this.state.productImagesData[0]}
              image={this.state.productImagesData[0]}
              imagesData={this.state.productImagesData.slice(1)} categories={this.state.suggestedCategories}
              sizesList={this.state.sizeStrings}
              ingredientList={ingredientStrings}
              ingredientGroupList={ingredientStrings}
              nutritionalStrings={this.state.nutritionalStrings}
            />
          </div>
        </form >
      </div >
    );
  }
}

export default SuggestProductForm;