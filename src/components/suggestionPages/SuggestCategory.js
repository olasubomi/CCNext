import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
// import axios from 'axios';
import axios from '../../util/Api';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import styles from "./suggestion.module.css";
import { toast } from "react-toastify";
import { base_url } from "../../util/Api";

class SuggestCategoryForm extends Component {
  allMealNames = [];
  productNames = ["Spinach", "Brown Beans", "Ijebu Garri", "Honey Beans", "Kale", "Water",
    "Squash Potatoes", "Oregano", "Cashews", "Palm Oil", "Pineapple", "Onions", "Flour",
    "Butter", "Sugar", "Hawaiian Bread", "Avocados", "Tomatoes", "Beef", "Green Pepper",
    "Garlic", "Ginger", "Vegetable Oil", "Lemon", "Rosemary Powder"];
  productImageLink = [];
  categories = ["Baking", "Cooking", "Home", "Ethiopian", "Quick-Meal"];
  measurements = ["mL", "oz", "L", "cup(s)", "Tbsp", "tsp", "pt", "g", "kg", "lb", "qt",
    "gallon", "dash/pinch", "Leaves", "cloves", "cubes", "Large", "medium", "small"];
  kitchenUtensils = ["Baking Sheet", "Colander", "Cooking Oil", "Cutting Board",
    "Fridge", "Knife Set", "Mixing Bowls", "Pot", "Pan", "Peeler", "Thermometer",
    "Wire Mesh", "Zester"];

  ingredientsQuantityMeasurements = [];

  constructor(props) {
    super(props);
    this.state = {

      currentStore: "",

      // we need to update how we create image paths
      suggested_stores: [],
      currProductIndexInDBsProductsList: -1,

      instructionWordlength: 0,

      suggestedCategories: [],

      booleanOfDisplayOfDialogBoxConfirmation: false,

      //mealsModal controller
      openModal: false,
    };

    this.closeModal = this.closeModal.bind(this);
    // this.handleStoreNameInput = this.handleStoreNameInput.bind(this);

    // this.getProductIndex = this.getProductIndex.bind(this);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {

    // get all Meal Names***
    var url = "/get-meals";
    axios.get(url).then((body) => {
      var mealList = body.data;
      if (mealList && mealList.data.length !== 0) {
        console.log("returns GET of ALL MEALS ");
        for (var i = 0; i < mealList.data.length; i++) {
          this.allMealNames.push(mealList.data[i].mealName);
        }
      } else {
        console.log("get all meal names function does not return");
      }
    })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.allMealNames);
    // get all store names*, if NEW products section exists.

    // can redux resolve this for us by checking if we recently called this in cache or from another page ??
    // var url = "/get-all-products";
    url = "https://chopchowdev.herokuapp.com/get-all-products";

    url = "/get-all-categories";

    this.categories = this.categories;
  }

  handleCategoryDropdownChange = (val) => {
    this.setState({ suggestedCategories: val });
    // below setstate causes an error to make each new set a sum of all previous.
    // this.setState({ suggestedCategories: [...this.state.suggestedCategories, val] });
    console.log(this.state.suggestedCategories)

  }

  addCategory = () => {
    let cat = document.getElementById('tags-outlined');
    let suggestedCategories = this.state.suggestedCategories;
    suggestedCategories.push(cat.value);
    this.setState({
      suggestedCategories
    })
    cat.value = '';
  }

  handleDeleteCategoryChip(chip) {
    var array = [...this.state.suggestedCategories]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ suggestedCategories: array });
    }
  }

  closeModal() {
    this.setState({ openModal: false });
    // this.props.openModal = false;
    // this.props.func_removeutensilFlag();
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  sendSuggestedCategoriesToDB = async (e) => {
    const { suggestedCategories } = this.state;
    console.log(suggestedCategories);

    console.log(this.props.categories);



    //-------------to make new category data ------------------------------------------
    // get list of new categories to submit to mongo
    let new_categories = [];
    for (var i = 0; i < suggestedCategories.length; i++) {

      const categorySentence = suggestedCategories[i];
      const categoryWords = categorySentence.split(" ");

      categoryWords.map((categoryWord) => {
        return categoryWord[0].toUpperCase() + categoryWord.substring(1);
      }).join(" ");

      // check if categories already exist, only add new categories to db,
      // though all will still be attached to product, as mentioned
      let index = this.props.categories?.indexOf(categoryWords);
      if (index === -1) {
        if (categoryWords.length) {
          for (let ele of categoryWords) {
            let category_object = {};
            category_object.category_name = ele;
            category_object.affiliated_objects = "ANY";
            category_object.publicly_available = "Draft";
            new_categories.push(category_object);
          }
        }
      }
      else {
        console.log("does not append to string")
      }
    }

    //-------------Submit remainder data of category to Mongo ------------------------------------------
    // new suggested products
    // chunk content should be passed as file
    //---------------------------------------------Submit Product to Mongo---------------------------------------------------
    // var url = "/createProduct/";
    var url = `${base_url}/categories/create/`

    console.log(new_categories);
    // console.log({ new_categories });

    const config = {
      method: 'POST', data: new_categories, url: url,
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        // application/x-www-form-urlencoded
        // 'content-type': 'multipart/form-data'
      }
    };

    console.log("Printing Chunk Contents");

    axios(config).then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({ booleanOfDisplayOfDialogBoxConfirmation: true });
        console.log(response);
        console.log("Display Product submitted successfully");
        // window.location.href = "/SuggestProduct"
        toast.success("Category submitted sucessfully")
      } else {
        console.log("Something wrong happened ");
      }
    }).catch(error => {
      console.log(error);
      toast.error(error.message)
    });

  }
  ///////////////////////////////////////////////////////////////////////////////////////
  render() {

    return (
      <div className={styles.suggestion_section_2} >
        <form className={styles.suggestion_forms} noValidate autoComplete="off" encType="multipart/form-data" method="post" >

          <h3> Categories</h3>
          <div className={styles.suggestion_form}>
            <div className={styles.suggestion_form_group}>
              <label htmlFor="tags-outlined" className={styles.suggestion_form_label}>
                Suggest category
              </label>
              <div className={styles.input_button}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  freeSolo
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
                      placeholder="Suggest categories.."
                      fullWidth
                    />)}
                />
                <Button variant="contained" disableRipple onClick={this.addCategory} className={styles.ingredient_button} style={{ width: "max-content" }} > Add Category</Button>
              </div>

            </div>
            <Stack direction="row" spacing={1} className={styles.stack}>
              {
                this.state.suggestedCategories.map((data, index) => (
                  <Chip
                    key={index}
                    label={data}
                    className={styles.chip}
                    onClick={() => this.handleDeleteCategoryChip(data)}
                    onDelete={() => this.handleDeleteCategoryChip(data)}
                  />
                ))
              }
            </Stack>
          </div>

          {/* <Row>
                <Col md={12}> */}
          {/* <ThemeProvider theme={theme}> */}
          <Button variant="contained" className={styles.ingredient_button} style={{ width: "100%" }} onClick={() => this.sendSuggestedCategoriesToDB()}> Add Category</Button>
          {/* </ThemeProvider> */}
          {/* </Col>
                
              </Row> */}
          <u >View privacy policy</u>
        </form>
      </div>
    );
  }
}

export default SuggestCategoryForm;