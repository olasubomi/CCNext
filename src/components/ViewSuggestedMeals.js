import React, { Component } from "react";
// let ejs = require('ejs');
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox, Typography, Toolbar, Dialog, DialogContent, DialogTitle, Button, IconButton, TextField } from '@mui/material';
import clsx from "clsx";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';

import ChipInput from  "@mui/material/Chip"
import Autocomplete from "@mui/lab/Autocomplete";
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import {withStyles} from '@mui/styles';
import { green } from '@mui/material/colors';
// import axios from 'axios';
import axios from '../util/Api';
import { Row, Col } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
// const { GetObjectCommand } = require("@aws-sdk/client-s3");
// const { S3Client } = require("@aws-sdk/client-s3");
// var client = '';
// const client = new S3Client({
//   credientials: {
//     region: const_region,
//     aws_access_key_id: const_id,
//     aws_secret_access_key: const_secret,
//   }
// })

// height of the TextField
const columns = [
  { id: '_id', label: 'id', minWidth: 100 },
  { id: 'mealName', label: 'MealName', minWi859dth: 100 },
  { id: 'intro', label: 'Intro', minWidth: 100 },
  { id: 'servings', label: 'Servings', minWidth: 30 },
  // { id: 'mealImage', label: 'ImageSrc',  minWidth: 100},
  { id: 'prepTime', label: 'prepTime', minWidth: 30 },
  { id: 'cookTime', label: 'cookTime', minWidth: 30 },
  { id: 'active', label: 'Active', minWidth: 150 }
];

const styles = theme => ({
  button: { margin: theme.spacing.unit, },
  leftIcon: { marginRight: theme.spacing.unit, },
  rightIcon: { marginLeft: theme.spacing.unit, },
  iconSmall: { fontSize: 20, },
  root: { width: '95%', margin: 'auto', marginTop: '20px', },
  container: { maxHeight: 440, },
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#c0dbf2',
    color: '#000000',
    boxShadow: theme.shadows[1],
    fontSize: 15,
    marginTop: "50px"
  },
}))(Tooltip);

///////////////////////////////////////////////////////////////////////////////
class ViewSuggestedMeals extends Component {
  productsImg_path = [];
  categories = [];
  measurements = ["mL", "oz", "L", "cup(s)", "Tbsp", "tsp", "pt", "lb",
   "g", "kg", "lb"];

  constructor(props) {
    super(props);

    this.state = {
      mealLabel: "",
      previousMealImageName: "",
      intro: "",
      servings: 0,
      // currentIngredient: "Butter scotch",
      currentIngredient: "control",
      currentIngredientMeasurement: "",
      currentIngredientQuantity: "",
      ingredientStrings: [],
      formatted_ingredient: [],
      instructionsChip: [],
      prepTime: "0 mins read",
      cookTime: "10 mins cook time",
      categoryChips: ["snacks", "abc", "123"],
      productsPopulated: false,
      meal_has_image: false,
      chef: "",

      selected_id: "",
      mealData_list: [],
      mealImages_list: [],
      specificMealImage: "",
      page: 0,
      rowsPerPage: 10,
      open: false,
      suggestMealRole: "",

      mealImage: "",
      mealImageName: '',
      loading_imgSrc: "",
      productImgSetting_flag: null,
      productImgSrc: null,
      productImg_path: "",
      product_ind: 0,
      ingredientGroupList: [],
      new_product_ingredients: [],
      selected: [],

      stepSlides: [],
      instructionImgData: null,
      instructionImgPath: "",
      categoryList: [],
      tips: [],
      suggestedUtensils: [],

      instructionChunkContent1: "",
      instructionChunkContent2: "",
      instructionChunkContent3: "",
      instructionChunkContent4: "",
      instructionChunkContent5: "",
      instructionChunkContent6: "",
    };

    this.addIngredientToMeal = this.addIngredientToMeal.bind(this);
  }

  ////////////////////////////////////////////////////////////////////////////
  componentDidMount() {

    var url1 = "/get-suggested-meals";
    // url1 = 'http://localhost:5000/api/get-suggested-meals';

    axios.get(url1).then(body => {
      var mealsList = body.data;
      if (mealsList && mealsList.data.length !== 0) {
        console.log("shows products does return");
        this.setState({ mealData_list: mealsList.data });
      }
      else { console.log("shows products do not return"); }
      console.log(mealsList);
    }).catch(err => { console.log(err); });


    //----get category meals-------------------------
    // var url = "/get-all-categories";
    // axios.get(url).then((body) => {
    //   var categoryList = body.data;
    //   console.log(categoryList);
    //   if (categoryList && categoryList.data.length !== 0) {
    //     console.log("returns GET of ALL Categories ");

    //     for (var i = 0; i < categoryList.data.length; i++) {
    //       this.categories.push(categoryList.data[i].category_name);
    //     }
    //   } else {
    //     console.log("get all products function does not return");
    //   }
    // })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    this.categories = this.props.categories;

  }

  ////////////////////////////////////////////////////////////////////////////
  onTextFieldChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  ////////////////////////////////////////////////////////////////////////////
  onMealImageUploadButtonClick = (event) => {
    this.setState({ mealImage: event.target.files[0], mealImageName: event.target.files[0].name });

    if (this.state.mealImage !== null) {
      this.setState({ loading_imgSrc: URL.createObjectURL(event.target.files[0]) });
      this.setState({ meal_has_image: true });
    }
  };

  ///////////////////////////////////////////////////////////////////////////
  onhandleProductImg = (event) => {
    this.setState({ productImgSrc: event.target.files[0] });
    if (event.target.files[0] !== null) {
      this.setState({ productImg_path: URL.createObjectURL(event.target.files[0]) });
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  handleAddIngredientChip(chip) {
    let temp = this.state.ingredientStrings;
    temp.push(chip);
    this.setState({ ingredientStrings: temp });
  }

  ///////////////////////////////////////////////////////////////////////////
  onHandleIngredientItem = (ind) => {
    var array = this.state.ingredientStrings; // make a separate copy of the array
    var array3 = this.state.ingredientGroupList;
    if (ind !== -1) {
      array.splice(ind, 1);
      array3.splice(ind, 1);
      this.setState({ ingredientStrings: array, ingredientGroupList: array3 });
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  onUpdateIngredientImg = (event, ind) => {
    // if (event.target.files[0] === null || this.state.ingredientData.length<= ind) return;
    // const tmp_ingredientData = this.state.ingredientData;
    // const tmp = {mealImage:event.target.files[0], path_flag: true, path:URL.createObjectURL(event.target.files[0])}
    // tmp_ingredientData[ind] = tmp;
    // this.setState({ingredientData: tmp_ingredientData});
    if (event.target.files[0] === null || this.state.ingredientGroupList.length <=
       ind) return;
    const tmp_ingredientData = this.state.ingredientGroupList;
    const tmp_ingredientItem = tmp_ingredientData[ind];

    var tmp1 = {
      product: tmp_ingredientItem.product,
      quantity: tmp_ingredientItem.quantity,
      measurement: tmp_ingredientItem.measurement,
      productImgData: event.target.files[0],
      productImgPath: URL.createObjectURL(event.target.files[0]),
      flag: true,
    };
    tmp_ingredientData[ind] = tmp1;
    this.setState({ ingredientGroupList: tmp_ingredientData });
  }
  ////////////////////////////////////////////////////////////////////////////
  handleIngredientQuantity(event) {
    console.log(event.target.value);
    this.setState({ currentIngredientQuantity: event.target.value });
  }

  ////////////////////////////////////////////////////////////////////////////
  handleDeleteIngredientChip(chip) {
    var array = this.state.ingredientStrings; // make a separate copy of the array
    var array3 = this.state.ingredientGroupList;

    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      array3.splice(index, 1);

      this.setState({ ingredientStrings: array, ingredientGroupList: array3 });
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  handleDeleteMealItem = (data) => {
    // var url = `./api/removeSeggestItem/${data._id}`;
    var url = `https://chopchowdev.herokuapp.com/api/removeSeggestItem/${data._id}`;

    fetch(url).then((res) => {
      return res.json();
    })
      .then((response) => {
        console.log("Delets item");
        return (window.location.href = "/ViewSuggestedMeals");
      })
      .catch((err) => {
        console.log("unDelets item");
        console.log(err);
      });
  }


  ////////////////////////////////////////////////////////////////////////////
  addIngredientToMeal(event) {
    event.preventDefault();
    console.log(this.state.currentIngredientMeasurement);
    var properIngredientStringSyntax;

    if (document.getElementById("currentIngredient").value === "") {
      window.alert("Enter an ingredient to add to meal");
      return;
    }

    if (document.getElementById('currentIngredientQuantity').value === 0 ) {
      properIngredientStringSyntax = document.getElementById("currentIngredient").value;
    } else if (
      document.getElementById("currentIngredientMeasurement").value === null
    ) {
      properIngredientStringSyntax = "" + document.getElementById('currentIngredientQuantity').value + " " + document.getElementById("currentIngredient").value;
    } else {
      properIngredientStringSyntax = "" + document.getElementById('currentIngredientQuantity').value + " " + document.getElementById("currentIngredientMeasurement").value + " of " + document.getElementById("currentIngredient").value;
    }

    var currProductObject = {
      productName: document.getElementById('currentIngredient').value,
      quantity:  document.getElementById('currentIngredientQuantity').value,
      measurement: document.getElementById('currentIngredientMeasurement').value,

      productImgData: this.state.productImgSrc,
      productImgPath: null,
      flag: this.state.productImgSetting_flag,
      properIngredientStringSyntax: properIngredientStringSyntax
    };

    if (this.state.productImgSetting_flag) {
      currProductObject.productImgPath = this.state.productImg_path;
      currProductObject.flag = true
    } else {
      currProductObject.productImgPath = 
      this.productsImg_path[this.state.product_ind];
      currProductObject.flag = false;
    }

    const searchResult = this.props.productNames.map(element=> { if (element.toLowerCase() === (currProductObject.productName.toLowerCase())) { return true; } else { return false; } });
    const tmpcurrProductIndexInDBsProductsList = searchResult.indexOf(true);
    console.log("Curr Product Index If Exists In Products List is: \n" + tmpcurrProductIndexInDBsProductsList);

    if (tmpcurrProductIndexInDBsProductsList !== -1) {
      console.log("using already existing product object from db");
      console.log("DOES NOT ADD to new _product_ingredients");
    }
    else {
      console.log("ADDs to new_product_ingredients");
      console.log("creating new product object");
      // edit product details for new product object
      currProductObject.productIndex = 0;
      // this.setState({ new_product_ingredients: updatedProductList })
      this.setState({ new_product_ingredients: [...this.state.new_product_ingredients, currProductObject] });
    }

    // add to container display
    let temp = this.state.ingredientGroupList;
    temp.push(currProductObject);
    this.setState({ ingredientGroupList: temp });


    document.getElementById('currentIngredient').value = "";
    document.getElementById('currentIngredientQuantity').value = 0;
    document.getElementById('currentIngredientMeasurement').value = "";
    this.handleAddIngredientChip(properIngredientStringSyntax);

  }

  handleInstructionTitle(event, chunkIndex) {

    console.log("Index is : " + chunkIndex);
    let chip = event.target.value;
    console.log("Chip is : " + chip);

    const tmp_stepSlides_data = this.state.stepSlides;
    const tmp_stepSlide = tmp_stepSlides_data[chunkIndex];

    // set file name in step slide
    tmp_stepSlide.title = chip;
    tmp_stepSlides_data[chunkIndex] = tmp_stepSlide;
    this.setState({ stepSlides: tmp_stepSlides_data });

  }

///////////////////////////////////////////////////////////////////////////////////////
handleAddInstructionStep(chip, chunkIndex) {
  console.log("Index is : " + chunkIndex);
  console.log("Chip is : " + chip);

  const tmp_stepSlides_data = this.state.stepSlides;
  const tmp_stepSlide = tmp_stepSlides_data[chunkIndex];

  // set file name in step slide
  tmp_stepSlide.instructionSteps = 
  [...this.state.stepSlides[chunkIndex].instructionSteps, chip];
  tmp_stepSlides_data[chunkIndex] = tmp_stepSlide;
  this.setState({ stepSlides: tmp_stepSlides_data });

}

///////////////////////////////////////////////////////////////////////////////////////
handleDeleteInstructionsStep(chip, chunkIndex) {
  console.log("In delete instruction step/chip")
  console.log("Chip is " + chip);
  console.log("Index is " + chunkIndex);

  let index;
  let arraySteps;

  const tmp_stepSlides_data = this.state.stepSlides;
  let tmp_stepSlide = tmp_stepSlides_data[chunkIndex];
  arraySteps = tmp_stepSlide.instructionSteps;

  index = arraySteps.indexOf(chip);
  if (index !== -1) {
    arraySteps.splice(index, 1);
    tmp_stepSlide.instructionSteps = arraySteps;
    tmp_stepSlides_data[chunkIndex] = tmp_stepSlide;

    console.log("new array : \n"+ tmp_stepSlide);
    this.setState({ stepSlides: tmp_stepSlides_data });
  }

}
  

  /////////////////////////////////////////////////////////////////////////////
  onUpdateInstructionImg = (event, ind) => {
    console.log("Comes in update function with:");
    console.log("ind: "+ ind+ "stepSlides length: "+ this.state.stepSlides.length);
    if (event.target.files[0] === null || 
      this.state.stepSlides.length <= ind) return;
    const tmp_stepSlides_data = this.state.stepSlides;
    const tmp_stepSlide = tmp_stepSlides_data[ind];

    // set file name in step slide
    tmp_stepSlide.dataName = event.target.files[0].name;
    tmp_stepSlides_data[ind] = tmp_stepSlide;
    console.log("Addded img name to step slides.. PRinting stepslides below");
    console.log(event.target.files[0]);
    console.log(event.target.files[0].name);
    console.log(tmp_stepSlides_data[ind]);
    console.log(tmp_stepSlides_data);
    this.setState({ stepSlides: tmp_stepSlides_data });

    console.log("gets to switch case");

    // we use index value 0-5 to match chunk contents 1-6
    switch (ind) {
      case 0:
        this.setState({ instructionChunkContent1: event.target.files[0] });
        break;
      case 1:
        this.setState({ instructionChunkContent2: event.target.files[0] });
        break;
      case 2:
        this.setState({ instructionChunkContent3: event.target.files[0] });
        break;
      case 3:
        this.setState({ instructionChunkContent4: event.target.files[0] });
        break;
      case 4:
        this.setState({ instructionChunkContent5: event.target.files[0] });
        break;
      case 5:
        this.setState({ instructionChunkContent6: event.target.files[0] });
        break;
      default:
      // ..do nothing
    }
    console.log(this.state.stepSlides);

  }
  ///////////////////////////////////////////////////////////////////////////////////////
  handleKitchenUtensilInputName = (val) => {
    this.setState({ suggestedUtensils: val });
  }

    ///////////////////////////////////////////////////////////////////////////////////////
    handleUtensilsDropdownChange(event) {
      if (event.target.value) {
        this.setState({ suggestedUtensils: [...this.state.suggestedUtensils, event.target.value] });
      } else {
        this.setState({ suggestedUtensils: [...this.state.suggestedUtensils, event.target.innerHTML] });
      }
    }

      ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteUtensilsChip(chip) {
    var array = [...this.state.suggestedUtensils]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ suggestedUtensils: array });
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////
  handleAddCategoryChip(chip) {
    this.setState({ categoryChips: [...this.state.categoryChips, chip] }); //
  }

  ////////////////////////////////////////////////////////////////////////////
  handleDeleteCategoryChip(chip, index) {
    console.log("handleDeleteCategoryChip:", index)
  }
  
  /////////////////////////////////////////////////////////////////////////////
  handleCategoryDropdownChange = (val) => {
    this.setState({ categoryList: val });
  }

  /////////////////////////////////////////////////////////////////////////////
  updateTip(chip) {
    this.setState({ tips: [...this.state.tips, chip] })
  }

  ////////////////////////////////////////////////////////////////////////////
  deleteTip(chip) {
    let tipsList = this.state.tips;

    var index = tipsList.indexOf(chip);
    if (index !== -1) {
      tipsList.splice(index, 1);
      this.setState({ tips: tipsList });
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  onhandleSendData = () => {
    fetch("http://localhost:5000/api/send-mealData", {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state.selected),
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        return (window.location.href = "/ViewSuggestedMeals");
      }
    })
      .catch(error => {
        console.log(error);
      });
  }

  ////////////////////////////////////////////////////////////////////////////
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  ////////////////////////////////////////////////////////////////////////////
  handleChangeRowsPerPage = (event) => {
    this.setState({ page: 0 });
    this.setState({ rowsPerPage: +event.target.value });
  };

  ////////////////////////////////////////////////////////////////////////////
  viewMealDetailsForUpdate = (data, mealRole) => {
    this.setupCurrentMealStates(data, mealRole);
    console.log("Gets in Update meal details: data is:");
    console.log(data);
    // const last_slider = data.product_slider[data.product_slider.length-1];
    // this.setState({productImg_path: last_slider.image});
    let tmp_inst_groupList = [];
    let temp = [];
    let parsed_ingredients = JSON.parse(data.formatted_ingredient);
    console.log("Parsed ingredients");
    console.log(parsed_ingredients);
    for (let i = 0; i < parsed_ingredients.length; i++) {
      var currProductObject = {
        productName: parsed_ingredients[i].productName,
        quantity: parsed_ingredients[i].quantity,
        measurement: parsed_ingredients[i].measurement,
        productImgData: null,
        properIngredientStringSyntax: 
        parsed_ingredients[i].properIngredientStringSyntax,
        // productImgPath: data.product_slider[i].image,
        flag: false,
      };
      tmp_inst_groupList.push(currProductObject);
      temp.push(parsed_ingredients[i].properIngredientStringSyntax);
    }
    this.setState({ ingredientGroupList: tmp_inst_groupList });
    this.setState({ ingredientStrings: temp });
    // this.setState({ ingredientData: tmp_ingredientData }); 
  }

  setupCurrentMealStates = (data, mealRole) => {
    console.log("data is :");
    console.log(data);
    console.log(data.stepSlides);
    let parsed_instructionData = data.stepSlides;
    const tmp_stepSlides_data = [];
    console.log("Parsed Step Instructions: ");
    console.log(parsed_instructionData);
    // console.log(data.mealImage)

    for (let i = 0; i < parsed_instructionData.length; i++) {
      console.log("i : " + i);
      console.log("Length of instruction data: " + parsed_instructionData.length);
      let instructionChunk = parsed_instructionData[i];
      console.log("instruction is: ");
      console.log(instructionChunk);
      console.log("instruction steps is: ");
      console.log(instructionChunk.instructionSteps);
      // let instructionSteps = instructionChunk['instructionSteps'];
      let tmp = {
        title: instructionChunk.title,
        instructionSteps: instructionChunk.instructionSteps,
        dataName: instructionChunk.dataName,
      }
      // this.getDataFromS3(tmp.dataName, i);
      tmp_stepSlides_data.push(tmp);
      console.log(tmp);
    }

    this.setState({
      selected_id: data._id, stepSlides: tmp_stepSlides_data,
      suggestMealRole: mealRole, mealLabel: data.mealName, 
      previousMealImageName: data.mealImageName, 
      intro: data.intro, servings: data.servings,
      mealImage: data.mealImage, mealImageName: data.mealImageName,
       formatted_ingredient: data.formatted_ingredient,
       chef: data.chef
       
    });
    this.setState({ open: true });

    const last_ingredient = 
    data.formatted_ingredient[(data.formatted_ingredient.length - 1)];
    let parsed_categories = JSON.parse(data.categories);
    // let parsed_tips = data.tips;
    // let parsed_utensils = data.kitchenUtensils;
    let parsed_tips = JSON.parse(data.tips);
    let parsed_utensils = JSON.parse(data.kitchenUtensils);

    this.setState({
      currentIngredientMeasurement: last_ingredient.measurement,
      currentIngredientQuantity: last_ingredient.quantity, 
      currentIngredient: last_ingredient.product
    });

    this.setState({
      prepTime: data.prepTime, cookTime: data.cookTime,
      categoryList: parsed_categories, 
      suggestedUtensils: parsed_utensils,
      tips: parsed_tips,
      product_slider: data.product_slider, productImgSetting_flag: false
    });
    // const last_slider = data.product_slider[data.product_slider.length-1];
    // this.setState({productImg_path: last_slider.image});
    let temp = [];
    let tmp_ingredientData = []
    let parsed_ingredients = JSON.parse(data.formatted_ingredient);
    for (let i = 0; i < parsed_ingredients.length; i++) {
      const last_ingredient = parsed_ingredients[i];
      console.log(last_ingredient)
      // var properIngredientStringSyntax;
      // if (last_ingredient.quantity === 0) properIngredientStringSyntax = last_ingredient.product;
      // else if (last_ingredient.measurement === null ) properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.product;
      // else properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.measurement+" of " + last_ingredient.product;
      temp.push(last_ingredient.properIngredientStringSyntax);
      tmp_ingredientData.push(null)
    }
    console.log("All currently formatted ingredients are: ");
    console.log(temp);
    this.setState({ ingredientStrings: temp });
    this.setState({ ingredientData: tmp_ingredientData });
  }

  ////////////////////////////////////////////////////////////////////////////
  viewMealDetailsPopup = (data, mealRole) => {
    this.setupCurrentMealStates(data, mealRole);
    console.log("Trying to call image to display ");
    //get meal image from gridfs
    // let url = 'http://localhost:5000/getOneMongoFileImage/' + data.mealImageName;
    let url = 'https://chopchowdev.herokuapp.com/getOneMongoFileImage/' + data.mealImageName;
    this.setState({ mealImage: url })
  };

  ////////////////////////////////////////////////////////////////////////////
  handleClose = () => { this.setState({ open: false }); };


  ////////////////////////////////////////////////////////////////////////////
  handleSelectAllClick = (event) => {
    // add all meals to selected array ? 
    if (event.target.checked) {
      const newSelecteds = this.state.mealData_list.map((n) => n._id);
      this.setState({ selected: newSelecteds });
      return;
    }
    this.setState({ selected: [] });
  };

  ////////////////////////////////////////////////////////////////////////////
  handleClick = (event, id) => {
    // update selected meals in vsm meals display using meal id
    const selected = this.state.selected;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };

  ////////////////////////////////////////////////////////////////////////////
  submitMealUpdate = async () => {
    const data = this.state;
    const { selected_id, mealImage, mealLabel, previousMealImageName, mealImageName, intro, 
      servings, stepSlides, ingredientGroupList, ingredientStrings,
       prepTime, cookTime, categoryList, tips, new_product_ingredients,
       suggestedUtensils, instructionChunkContent1,instructionChunkContent2,
       instructionChunkContent3,instructionChunkContent4,
       instructionChunkContent5,instructionChunkContent6 } = data;

    let productImgForm = new FormData();
    let img_count1 = 0;
    let new_measurements = [];
    for (var i = 0; i < ingredientGroupList.length; i++) {
      if (ingredientGroupList[i].productImgData !== null) {
        productImgForm.append('productImgs', ingredientGroupList[i].productImgData);
        img_count1++;
      }

     // get new_Measurements from inputted ingredient packets
      if (ingredientGroupList[i].measurement !== "") {
        let index = this.props.measurements.indexOf(ingredientGroupList[i].measurement);
        if (index === -1) new_measurements.push(ingredientGroupList[i].measurement);
      }
    }

    let productImg_paths = null;
    if (img_count1 !== 0) {
      var productImg_url = "/getProductImgURL/";
      const productImg_config = { method: 'POST', data: productImgForm, url: productImg_url };

      const response = await axios(productImg_config)
      productImg_paths = response.data.productImg_paths;
    }
    console.log("productImg_paths: ", productImg_paths);

    //-------------to make product data ------------------------------------------
    const formatted_ingredient1 = [];
    const product_slider = [];
    let n1 = -1;
    console.log("Creating product data");
    for (i = 0; i < ingredientGroupList.length; i++) {
      var tmp_ingredient = {
        productName: ingredientGroupList[i].productName,
        quantity: ingredientGroupList[i].quantity,
        measurement: ingredientGroupList[i].measurement,
        productImgPath: ingredientGroupList[i].productImgPath,
        properIngredientStringSyntax: ingredientGroupList[i].properIngredientStringSyntax
      };
      console.log(tmp_ingredient);
      formatted_ingredient1.push(tmp_ingredient);

      //-----------------------------------------------
      let image = "";
      if (ingredientGroupList[i].productImgData !== null) {
        n1++; image = productImg_paths[n1]
      }
      else {
        image = ingredientGroupList[i].productImgPath;
      }

      const tmp_slider_data = {
        ingredient: ingredientGroupList[i].product,
        image: image,
        flag: ingredientGroupList[i].flag,
      };
      product_slider.push(tmp_slider_data);
    }


    //-------------to store new category data ------------------------------------------
    let new_categories = [];
    for (i = 0; i < categoryList.length; i++) {
      let index = this.categories.indexOf(categoryList[i]);
      if (index === -1) new_categories.push(categoryList[i])
    }

    //-------------to store new utensils data ------------------------------------------
    let new_kitchen_utensils = [];
    for (i = 0; i < suggestedUtensils.length; i++) {
      // check if categories already exist, only add new categories to db,
      // though all will still be attached to meal, as mentioned
      let index = this.props.kitchenUtensils.indexOf(suggestedUtensils[i]);
      if (index === -1) new_kitchen_utensils.push(suggestedUtensils[i]);
    }

    let suggestMealForm = new FormData();
    suggestMealForm.append('id', selected_id);
    suggestMealForm.append('mealName', mealLabel);
    suggestMealForm.append('mealImageName', mealImageName);

    // check for if we want to re-update/re-add meal image data or leave as-is
    if(previousMealImageName !== mealImageName){
      suggestMealForm.append('mealImage', mealImage);
    }
    else{
      console.log("previous meal image name is same as current: "+ mealImageName);
    }

    // check if instruction content has been updated before passing to server
    console.log("Printing instruction chunk contents in state");
    console.log(instructionChunkContent1);
    console.log(instructionChunkContent2);
    console.log(instructionChunkContent3);
    console.log(instructionChunkContent4);
    console.log(instructionChunkContent5);
    console.log(instructionChunkContent6);

    if(instructionChunkContent1!== ""){
      suggestMealForm.append('instructionChunkContent1', instructionChunkContent1)
    }
    if(instructionChunkContent2!== ""){
      suggestMealForm.append('instructionChunkContent2', instructionChunkContent2)
    }    if(instructionChunkContent3!== ""){
      suggestMealForm.append('instructionChunkContent3', instructionChunkContent3)
    }    if(instructionChunkContent4!== ""){
      suggestMealForm.append('instructionChunkContent4', instructionChunkContent4)
    }    if(instructionChunkContent5!== ""){
      suggestMealForm.append('instructionChunkContent5', instructionChunkContent5)
    }    if(instructionChunkContent6!== ""){
      suggestMealForm.append('instructionChunkContent6', instructionChunkContent6)
    }

    suggestMealForm.append('prepTime', prepTime);
    suggestMealForm.append('cookTime', cookTime);
    suggestMealForm.append('intro', intro);

    console.log("ingredient strings submitted as formaated ingredients is:");
    console.log(formatted_ingredient1);
    console.log(ingredientStrings);
    suggestMealForm.append('tips',  JSON.stringify(tips)); 
    suggestMealForm.append('chef', this.state.chef);
    suggestMealForm.append('servings', servings);

    suggestMealForm.append('formatted_ingredient',
     JSON.stringify(formatted_ingredient1));
     suggestMealForm.append('new_product_ingredients', JSON.stringify(new_product_ingredients));

    suggestMealForm.append('new_measurements', JSON.stringify(new_measurements));

    suggestMealForm.append('categories', JSON.stringify(categoryList));
    suggestMealForm.append('newCategories', JSON.stringify(new_categories));

    suggestMealForm.append('kitchenUtensils', JSON.stringify(suggestedUtensils)); // or kitchen utensils
    suggestMealForm.append('newKitchenUtensils', JSON.stringify(new_kitchen_utensils));

    suggestMealForm.append('stepSlides', JSON.stringify(stepSlides)); // or instruction group lists

    console.log(selected_id);
    var url = "/updateSuggestedMealItem";
    // var url = "http://localhost:5000/api/updateSuggestedMealItem";

    const config = { method: 'POST', data: suggestMealForm, url: url };
    const response = await axios(config)
    if (response.status >= 200 && response.status < 300) {
      console.log("Updated Meal submitted successfully");
      // return (window.location.href = "/ViewSuggestedMeals");
    } else {
      console.log("Something happened wrong");
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  render() {
    console.log("this.state.stepSlides: ", this.state.stepSlides)
    if( this.state.stepSlides.length > 0){
      console.log("first content name : ", this.state.stepSlides[0].dataName);
    }

   
    var composed_instructions = [];
    for (let i = 0; i < this.state.stepSlides.length; i++) {
      let sectionTitle = 'Section' +(i+1) + 'Title';
      let chunkTitle = 'chunk'+(i+1)+'Title';

      // Allowing file type
      var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;
      var allowedVideoExtensions = /(\.mp4|\.m4v|\.)$/i;
      let instructionContent = '';
      if (allowedVideoExtensions.exec(this.state.stepSlides[i].dataName)) {
        instructionContent = <video id={"instructionVideo" + i} controls>
          <source src={'https://meal-chunk-images-and-videos.s3.us-west-1.amazonaws.com/' + this.state.stepSlides[i].dataName} type={this.state.stepSlides[i].mimetype} />
        </video>
      }
      else if (allowedImageExtensions.exec(this.state.stepSlides[i].dataName)) {
        instructionContent = <img id={"instructionImg" + i}
        src={'https://meal-chunk-images-and-videos.s3.us-west-1.amazonaws.com/' + this.state.stepSlides[i].dataName} 
        alt={this.state.stepSlides[i].dataName}
        style={{width: "inherit"}} />
      }
      else {
        // use generic content
        instructionContent = <img id={"instructionImg" + i} 
        src={'images/meal_pics/chopchow_default_instruction.png'} 
        alt="chop chow placeholder" 
        style={{width:"inherit"}}/>
      }


      composed_instructions.push(
        <div key={i} className="mb-3" style={{ margin: "10px", 
        padding: "10px", backgroundColor: "white",
         boxShadow: "1px 1px 4px 2px #00000030" }}>

          {/* Step Slide Title */}
          <Row >
              <TextField id={chunkTitle}
              className="mb-2" 
              onChange={(ev) => this.handleInstructionTitle(ev, i)}
               label={sectionTitle} defaultValue={this.state.stepSlides[i].title} variant="filled" />
          </Row>
          <Row >
            {/* // list all steps on each step slide  */}
            <Col md={4} className="mb-2" style={{ overflowWrap: "break-word" }}>
              <div className="mdc-list">
              <ChipInput label="Instructions" className="mb-2" fullWidth
               value={this.state.stepSlides[i].instructionSteps} 
               onAdd={(chip) => this.handleAddInstructionStep(chip, i)}
               onDelete={(chip) => this.handleDeleteInstructionsStep(chip, i)}
                variant="filled" />
                {/* {this.state.stepSlides[i].instructionSteps.map((chip, index1) => (
                  <div className="mdc-list-item" key={index1}>
                    <span className="mdc-list-item__text"> {chip}</span>
                  </div>
                ))} */}
              </div>
            </Col>
            {/* Display step content image/videos for each step slide  */}
            <Col md={4} className="mb-2" style={{ textAlign: "center" }}>
              {/* determine how img path is determined vs using dataname */}
              <img className="mb-2" src={this.state.stepSlides[i].imgpath}
               width="auto" height="150px" alt="" />
              <input accept="image/*" id="imgSrc1" type="file" 
              className="mb-2, ml-3" 
              onChange={(ev) => this.onUpdateInstructionImg(ev, i)} />
            </Col>
            <Col md={4} className="mb-2"></Col>
          </Row>
          <Row>
            <br>
            </br>
            {/* <button onClick={this.getDataFromS3("dmnn9dog_massage.jpeg", i)}> View Content1 </button><br></br> */}
            {/* <Button onClick={this.getDataFromS3("dmnn9dog_massage.jpeg", i)}> 
            View Content
           </Button>
           <Button onClick={this.getDataFromS3("dmnn9dog_massage.jpeg", i)}> 
            View Content2
           </Button> */}
            {instructionContent}
          </Row>
        </div>
      )
    }

    const { classes } = this.props;
    const { mealData_list, page, rowsPerPage, open, suggestMealRole,
       loading_imgSrc, categoryList, mealImage } = this.state;
    const { mealLabel, intro, prepTime, cookTime, servings,
        suggestedUtensils, chef } = this.state;

    const theme = createMuiTheme({
      palette: { primary: green, },
    });

    const numSelected = this.state.selected.length;
    const rowCount = mealData_list ? mealData_list.length : 0;

    return (
      <div className={classes.root} style={{ boxShadow: "2px 2px 8px 0px #a0a0a0" }}>
        <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0 })} >
          {numSelected > 0 ?
            (<Typography className={classes.title} color="inherit" 
              variant="subtitle1" component="div" 
              style={{ fontSize: "16px", fontWeight: "600", marginRight: "20px", color: "blue" }}>
                {numSelected} selected</Typography>)
            : (<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              None Selected  
              </Typography>)}

          {numSelected > 0 ? (<Button variant="outlined" color="primary" endIcon={<SendIcon />}
           onClick={this.onhandleSendData}>Send</Button>) : null}
        </Toolbar>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={this.handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize: '15x', fontWeight: '600', padding: '10px 5px' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {mealData_list &&
                mealData_list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const isSelected = (id) => this.state.selected.indexOf(id) !== -1;
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>

                      {columns.map((column) => {
                        if (column.id === "active") {
                          return (
                            <TableCell key={column.id} style={{ padding: '0px 0px' }}>
                              <LightTooltip title="  View  " placement="top">
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.viewMealDetailsPopup(row, "moreView")}>
                                  <VisibilityIcon />
                                </IconButton>
                              </LightTooltip>

                              <LightTooltip title="  Update  " placement="top">
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => this.viewMealDetailsForUpdate(row, "edit")}>
                                  <EditIcon style={{ color: 'green' }} />
                                </IconButton>
                              </LightTooltip>

                              <LightTooltip title="  Delete  " placement="top">
                                <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => this.handleDeleteMealItem(row)}>
                                  <DeleteIcon />
                                </IconButton>
                              </LightTooltip>
                            </TableCell>
                          );
                        }
                        else { const value = row[column.id]; return (<TableCell key={column.id} style={{ padding: '5px 5px' }}>{value}</TableCell>); }
                      })
                      }
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{suggestMealRole === "moreView" ? "Suggest Meal" : "Update Meal"}</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              <Row className="mb-3">
                <Col md={4}>
                  <TextField id="mealLabel" fullWidth onChange={this.onTextFieldChange} label="Meal Name" required variant="filled" className="mb-3" value={mealLabel} />
                  <TextField multiline id="intro" fullWidth onChange={this.onTextFieldChange} label="Intro" variant="filled" className="mb-3" value={intro} />
                </Col>
                <Col md={4} style={{ marginTop: "20px" }}>
                  <input accept="image/*" id="mealImage" type="file" className="mb-2 pr-4" onChange={(ev) => this.onMealImageUploadButtonClick(ev)} />
                  <img src={mealImage} width="100%" alt="meal"></img>
                </Col>
                <Col md={4} style={{ marginTop: "20px", textAlign: "center" }}>
                  <img src={loading_imgSrc} width="70%" height="auto" alt="meal loading" />

                </Col>
              </Row>

              <hr />
              <Row className="mb-2">
                <Col md={12}>
                  <ChipInput
                    label="IngredientsList"
                    value={this.state.ingredientStrings}
                    onAdd={(chip) => this.handleAddIngredientChip(chip)}
                    placeholder="e.g 1 Onion, 2 Cups of Water, etc"
                    onDelete={(chip, index) => this.handleDeleteIngredientChip(chip, index)}
                    variant="filled"
                    fullWidth
                    className="mb-2"
                  />
                </Col>
              </Row>

              {
                this.state.ingredientGroupList &&
                this.state.ingredientGroupList.map((data, index) => (
                  <div key={index} className="mb-3" style={{ margin: "10px", padding: "10px", backgroundColor: "white", boxShadow: "1px 1px 4px 2px #00000030" }}>
                    <Row style={{ justifyContent: "flex-end" }}>
                      <i className="fa fa-remove" style={{ fontSize: "50%", marginTop: "0px", marginRight: "15px" }} onClick={() => this.onHandleIngredientItem(index)}></i>
                    </Row>
                    <Row >
                      <Col md={5} className="mb-2" style={{ overflowWrap: "break-word" }}>
                        <div className="card-ingredient-content">
                          <div><span style={{ fontWeight: "600" }}>1. Product &emsp;&emsp;&nbsp; :</span> {data.productName}</div>
                          <div><span style={{ fontWeight: "600" }}>2. Quantity&emsp;&emsp; :</span> {data.quantity}</div>
                          <div><span style={{ fontWeight: "600" }}>3. Measurement:</span> {data.measurement}</div>

                          <input accept="image/*" id="imgSrc1" type="file" className="mb-2 ml-3 mt-3 " onChange={(ev) => this.onUpdateIngredientImg(ev, index)} />
                        </div>
                      </Col>
                      <Col md={4} className="mb-2" style={{ textAlign: "center" }}>
                        <img className="mb-2" src={data.productImgPath} width="auto" height="150px" alt="" />

                      </Col>
                      <Col md={3} className="mb-2"></Col>
                    </Row>
                  </div>
                ))
              }

              <Row className="mb-1">
                <Col md={4}>
                  <Autocomplete
                    freeSolo
                    id="currentIngredient"
                    options={this.props.productNames.map((option) => option)}
                    renderInput={(params) => (<TextField {...params} label="Ingredient.." variant="filled" />)}
                    fullWidth
                    className="mb-3"
                    // value={currentIngredient}
                  />
                  <TextField fullWidth id="currentIngredientQuantity" 
                  type="number" 
                  // onChange={this.onTextFieldChange}
                   label="Quantity" variant="filled"
                    placeholder="1.." className="mb-3" 
                     />
                </Col>

                <Col md={4}>
                  {
                    this.state.productImgSetting_flag ?
                      <input accept="image/*" id="imgSrc1" type="file" className="mt-3 mb-4" onChange={(ev) => this.onhandleProductImg(ev)} /> : <div style={{ marginTop: "70px" }} />
                  }

                  <Autocomplete
                    id="currentIngredientMeasurement"
                    options={this.measurements.map((option) => option)}
                    // value={currentIngredientMeasurement}
                    freeSolo
                    renderInput={(params) => (<TextField {...params} label="Measurement.." variant="filled" />)}
                    className="mb-3"
                  />
                </Col>

                <Col md={4} style={{ textAlign: "center", margin: "auto" }}>
                  <Button variant="contained" color="primary" disableRipple onClick={this.addIngredientToMeal} style={{ color: "white" }} className="mb-3" > Add Ingredient</Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} style={{ textAlign: "center", margin: "auto" }}>
                  <TextField id="servings" fullWidth type="number" 
                  onChange={this.onTextFieldChange} 
                  label="Servings" variant="filled" className="mb-2" 
                  placeholder="1 person, 2, 4 or 10 people" 
                  style={{ marginTop: "10px" }} value={servings} />
                </Col>
                <Col md={6} style={{ textAlign: "center", margin: "auto" }}>
                  <TextField id="chef" fullWidth 
                  onChange={this.onTextFieldChange} 
                  label="Chef" variant="filled" className="mb-2" 
                  placeholder="Author/Chef" 
                  style={{ marginTop: "10px" }} value={chef} />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4} style={{ textAlign: "center", margin: "auto" }}>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    className="mb-2"
                    freeSolo
                    // filterSelectedOptions
                    options={this.props.kitchenUtensils.map((option) => option)}
                    onChange={(e, val) => this.handleKitchenUtensilInputName(val)}
                    value={suggestedUtensils}
                    renderInput={params => (
                      <TextField 
                      {...params}
                      id="Kitchen Utensils" fullWidth
                  // onChange={(ev,val)=>this.handleUtensilsDropdownChange(ev,val)}
                   label="Utensils" variant="filled" 
                   placeholder="Pots, pans and/or both ?" 
                   style={{ marginTop: "10px" }} 
                    />
                    )}
                  />

                  
                </Col>
              </Row>
              <hr />

              {
                composed_instructions
              }



              <Row className="mb-3">
                <Col md={4}>
                  <TextField id="prepTime" className="mb-2" type="number" fullWidth onChange={this.onTextFieldChange} label="prepTime (mins)" variant="filled" required value={prepTime} />
                </Col>
                <Col md={4}>
                  <TextField id="cookTime" className="mb-2" type="number" fullWidth onChange={this.onTextFieldChange} label="CookTime (mins)" variant="filled" required value={cookTime} />
                </Col>
                <Col md={4}>

                  <Autocomplete
                    multiple
                    id="tags-standard"
                    className="mb-2"
                    freeSolo
                    // filterSelectedOptions
                    options={this.categories.map((option) => option)}
                    // onChange={(ev,val)=>this.handleCategoryDropdownChange(ev,val)}
                    onChange={(e, newValue) => this.handleCategoryDropdownChange(newValue)}
                    // getOptionLabel={option => option}
                    // renderTags={() => {}}
                    value={categoryList}
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Categories"
                        placeholder="Suggest categories for this meal.."
                        fullWidth
                      />
                    )}
                  />
                </Col>
              </Row>
              {
                suggestMealRole !== "moreView" &&
                <Row className="mb-5">
                  <Col md={4} style={{ textAlign: "center", margin: "auto" }}>
                    <ThemeProvider theme={theme}>
                      <Button variant="contained" className="mb-2" color="primary" size="small" style={{ color: "white" }} onClick={() => this.submitMealUpdate()}> Update Meal</Button>
                    </ThemeProvider>
                  </Col>
                </Row>
              }
              <Row className="mb-3">
                <Col md={12}>
                  <ChipInput label="Tips" className="mb-2" fullWidth value={this.state.tips} onAdd={(chip)=>this.updateTip(chip)} onDelete={(chip, index)=>this.deleteTip(chip,index)} variant="filled" />
                </Col>
              </Row>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )}
}

export default withStyles(styles)(ViewSuggestedMeals);
          /* 'x' icon to Delete intruction slide */
          /* <Row style={{ justifyContent: "flex-end" }}>
            <i className="fa fa-remove" style={{ fontSize: "50%", marginTop: "0px", marginRight: "15px" }} onClick={() => this.onHandleInstructionItem(i)}></i>
          </Row> */
      ////////////////////////////////////////////////////////////////////////////
 //     x on step slides container
  // onHandleInstructionItem = (ind) => {
  //   const array = this.state.stepSlides;
  //   array.splice(ind, 1);
  //   this.setState({ stepSlides: array });
  // }
  
  //   <Row className="mb-3">
  //   <Col md={12}>
  //     <ChipInput label="Instructions" className="mb-2" 
  //fullWidth value={this.state.instructionsChip} 
  //onAdd={(chip) => this.handleAddInstructionStep(chip)} 
  //onDelete={(chip, index) => this.handleDeleteInstructionsStep(chip, index)} 
  // variant="filled" />
  //   </Col>
  // </Row>


  ///////////////////////////////////////////////////////////////////////////
  // addInstructionList = () => {
  //   if (this.state.instructionsChip.length === 0) return;
  //   let tmp = {
  //     step: this.state.instructionsChip,
  //     imgdata: this.state.instructionImgData,
  //     image: this.state.instructionImgPath,
  //   }
  //   this.setState({ stepSlides: [...this.state.stepSlides, tmp] });
  //   this.setState({ instructionsChip: [], instructionImgData: null, instructionImgPath: "" });
  // }
  ////////////////////////////////////////////////////////////////////////////
  // onhandleInstructionImg = (event) => {
  //   this.setState({ instructionImgData: event.target.files[0] });
  //   if (event.target.files[0] !== null) {
  //     this.setState({ instructionImgPath: URL.createObjectURL(event.target.files[0]) });
  //   }
  // };
              /* <Row className="mb-3">
                <Col md={4} className="mb-2">
                  <input accept="image/*" id="imgSrc1" type="file" className="mb-2" onChange={(ev) => this.onhandleInstructionImg(ev)} />
                </Col>
                <Col md={4} style={{ textAlign: "center", margin: "auto" }}>
                  <Button variant="contained" color="primary" disableRipple style={{ color: "white", width: "300px" }} className="mb-3" onClick={this.addInstructionList}  > ADD NEW INSTRUCTION SET</Button>
                </Col>
                <Col md={4}> </Col>
              </Row> */


                //------------- to get glabal path for instrution image ----------------------------------------
    // let instructionImgForm = new FormData();
    // let img_count = 0;
    // for (i = 0; i < stepSlides.length; i++) {
    //   if (stepSlides[i].imgdata !== null && stepSlides[i].imgdata !== -1) {
    //     instructionImgForm.append('instructionImgs', stepSlides[i].imgdata);
    //     img_count += 1;
    //   }
    // }

    // if (img_count !== 0) {
    //   var instructionImg_url = "/getInstructionImgURL/";
    //   const instructionImg_config = { method: 'POST', data: instructionImgForm, url: instructionImg_url };

    //   const response = await axios(instructionImg_config)
    //   instructionImg_paths = response.data.instrutionImg_paths;
    // }

  // /////////////////////////////////////////////////////////////////////////
  // handleDeleteCategoryChip(chip) {
  //   console.log("removing chop input");
  //   var array = [...this.state.categoryChips]; // make a separate copy of the array
  //   var index = array.indexOf(chip);
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //     this.setState({ categoryChips: array });
  //   }
  // }
                // this.state.stepSlides.length > 0 &&
                // this.state.stepSlides.map((data, index)=>(
                //   <div key={index}  className="mb-3" style={{margin:"10px", padding:"10px", backgroundColor:"white",  boxShadow: "1px 1px 4px 2px #00000030"}}>
                //     <Row style={{justifyContent: "flex-end"}}>
                //       <i className="fa fa-remove" style={{fontSize:"50%", marginTop: "0px", marginRight: "15px"}} onClick={()=>this.onHandleInstructionItem(index)}></i>
                //     </Row>
                //     <Row >
                //       <Col md={4}  className="mb-2" style={{overflowWrap: "break-word"}}>
                //         <ol className="mdc-list">
                //           {data.step.map((chip, index1) => (
                //             <li className="mdc-list-item" tabIndex="0" key={index1}>
                //               <span className="mdc-list-item__text">{chip}</span>
                //             </li>
                //           ))}
                //         </ol>
                //       </Col>
                //       <Col md={4}  className="mb-2" style={{textAlign: "center"}}>
                //         <img className="mb-2" src={data.image} width="auto" height="150px" alt=""/>
                //         <input accept="image/*" id="imgSrc1" type="file" className="mb-2, ml-3" onChange={(ev)=>this.onUpdateInstructionImg(ev, index)} />
                //       </Col>
                //       <Col md={4}  className="mb-2"></Col>
                //     </Row>
                //   </div>
                // ))

    // if(this.state.productImgSetting_flag ){
    //   const tmp_data = {mealImage:this.state.productImgSrc, path_flag: true, path:""}
    //   this.setState({ ingredientData: [...this.state.ingredientData, tmp_data] });
    // }else{
    //   const tmp_data = {mealImage:[], path_flag: false, path:this.productsImg_path[this.state.product_ind]}
    //   this.setState({ ingredientData: [...this.state.ingredientData, tmp_data] });
    // }

    // this.setState({ formatted_ingredient: [ ...this.state.formatted_ingredient, currProductObject, ],
    //   productImg_path:null,
    //   product_slider: [...this.state.product_slider, null],
    // });


  ///////////////////////////////////////////////////////////////////////////////
  // getDataFromS3 = (fileName, index) => {
    // console.log("clients gets3 func,\n i is: " + index + " file name is: " + fileName);
    // if (fileName) {
      // let url = 'http://localhost:5000/api/getFromS3/' + fileName;

      // fetch(url, {
      //   method: 'GET',
      // }).then(response => {
      //   console.log(response)
      //   if (response.status === 200) {
      //     console.log("content returned to be displayed on client");
      //     console.log(response.body);
      //     // console.log(response.blob);
      //     const responseBody = response.body;

      //     let binaryImageToString = responseBody.toString('base64');
      //     console.log(binaryImageToString);

      //     console.log('data:image/image/png;base64,' + binaryImageToString);
          // let imgUrl = 'data:image/image/png;base64,' + binaryImageToString;
          // let imgUrl = 'https://meal-chunk-images-and-videos.s3.us-west-1.amazonaws.com/'+fileName;

          // this.setState({ contentData: imgUrl });
          // return response;
          // return (window.location.href = "/ViewSuggestedMeals");
      //   }
      // })
      //   .catch(error => {
      //     console.log("no content returned.. file not found ?");
      //     console.log(error);
      //   });



      // axios.get(url).then(body => {
      //   console.log("Returns content");

      //   var content = body.data;
      //   // console.log(content);

      //   if (content) {
      //     console.log("content returned to be displayed on client");
      //     // this.setState({ contentData:content });
      //     return content;
      //   }
      //   else { console.log("no content returned.. file not found ?"); }
      // }).catch(err => { console.log(err); });
    // }
    // else {
      // No content available to display
    // }

    // // Create an object and upload it to the Amazon S3 bucket.
    // const input = {
    //   Bucket: process.env.REACT_APP_S3_BUCKET, // The name of the bucket. For example, 'sample_bucket_101'.
    //   Key: fileName // The name of the object.
    // };


    // const run = async (input) => {

    //   console.log("input: ");
    //   console.log(input);
    //   try {

    //     console.log(client);
    //     // Create a helper function to convert a ReadableStream to a string.
    //     const streamToString = (stream) =>
    //       new Promise((resolve, reject) => {
    //         const chunks = [];
    //         stream.on("data", (chunk) => chunks.push(chunk));
    //         stream.on("error", reject);
    //         stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    //         // console.log(chunks);
    //       });


    //     // const client = new S3Client(config);
    //     const command = new GetObjectCommand(input);
    //     const data = await client.send(command);

    //     console.log(data);

    //     // return false;
    //   } catch (err) {
    //     // console.log(client)
    //     console.log("Error", err);

    //   };
    // };

    // if (input.Key !== '') {
    //   run(input);
    // }
    // else {
    //   console.log("No  content in instructions group list to check");
    // }
  // }


    // var url = "/get-all-products";
    // axios.get(url)
    //   .then((body) => {
    //     var productsList = body.data;
    //     if (productsList && productsList.data.length !== 0) {

    //       console.log("returns GET ALL PRODUCTS ");
    //       for (var i = 0; i < productsList.data.length; i++) {
    //         this.productsImg_path.push(productsList.data[i].product_image);
    //       }

    //       console.log("PRINTING ALL PRODUCTS LIST", this.products);
    //       this.setState({ productsPopulated: true });
    //     } else { console.log("get all products function does not return"); }
    //   })
    //   .catch((err) => { console.log(err); });
   // get suggested meal images ?
    // var url = "/get-suggested-meals-images"
    // axios.get(url).then(body => {
    //   var mealImagesList = body.data;
    //   if (mealImagesList && mealImagesList.data.length !== 0) {
    //     console.log("meal images does return");
    //     this.setState({ mealImages_list: mealImagesList.data });
    //   }
    //   else { console.log("meal images do not return"); }
    //   console.log(mealImagesList);
    // }).catch(err => { console.log(err); });

        // this.setState({open: true});
    // this.setState({ suggestMealRole: mealRole, mealLabel: data.label, intro: data.intro, servings: data.servings, formatted_ingredient:data.formatted_ingredient   });

    // const last_ingredient = data.formatted_ingredient[data.formatted_ingredient.length-1];
    // this.setState({ currentIngredientMeasurement: last_ingredient.measurement, currentIngredientQuantity: last_ingredient.quantity, currentIngredient: last_ingredient.product });
    // this.setState({ instructionsChip:  data.instructions, prepTime:  data.prepTime, cookTime:  data.cookTime, loading_imgSrc:  data.mealImage, product_slider:  data.product_slider});
    // const last_slider = data.product_slider[data.product_slider.length-1];
    // if(!last_slider.flag) {
    //   this.setState({productImg_path: "public/products/"+last_slider.image});
    // }else{
    //   this.setState({productImg_path: last_slider.image});
    // }
    // this.setState({productImgSetting_flag: false});

    // let temp = [];
    // for(let i=0; i<data.formatted_ingredient.length; i++)
    // {
    //   const last_ingredient = data.formatted_ingredient[i];
    //   var properIngredientStringSyntax;

    //   if (last_ingredient.quantity === 0) {
    //     properIngredientStringSyntax = last_ingredient.product;
    //   }
    //   else if (last_ingredient.measurement === null )
    //   {
    //     properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.product;
    //   }
    //   else {
    //     properIngredientStringSyntax ="" + last_ingredient.quantity + " " +  last_ingredient.measurement+" of " + last_ingredient.product;
    //   }
    //   temp.push(properIngredientStringSyntax);
    // }
    // this.setState({ ingredientStrings: temp });
    // axios call to get meal image from gridfs
    // we determined that we should instead make the call inside of the image url src rather than referencing call in src
        // axios.get(url).then((body) => {
    //   mealImage = body;
    //   if (mealImage && mealImage.data.length !== 0) {
    //     console.log("returns specific meal image  ");
    //     console.log(mealImage);
    //     console.log(mealImage.data);
    //     let mealImageData = mealImage.data;
    //     let binaryImageToString = mealImageData.toString('base64');

    //     let url = 'http://localhost:5000/getOneMongoFileImage/'+data.mealImage;

    //     this.setState({mealImage: url})
    //     // for (var i = 0; i < mealImage.data.length; i++) {
    //     //   this.setState({specificMealImage: mealImage.data[i]})
    //     //   // this.specificMealImage = mealImage.data[i];
    //     // }
    //   } else {
    //     console.log("get specific meal image function does not return");
    //   }
    // })
    //   .catch((err) => {
    //     console.log(err);
    //   });