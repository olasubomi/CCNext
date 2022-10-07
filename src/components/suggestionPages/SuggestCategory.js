import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/lab/Autocomplete"; // createFilterOptions,
// import axios from 'axios';
import axios from '../../util/Api';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import "./suggestion.css";


class SuggestCategoryForm extends Component {
  ingredientsQuantityMeasurements = [];

  constructor(props) {
    super(props);
    this.state = {

      // do we want to use current ingredient formats ? Yes.
    //   currentIngredient: "",
    //   currentIngredientMeasurement: "",
    //   currentUtensilQuantity: "",
    //   currentProductImgSrc: null,
    //   currentProductDisplayIndex: 0,

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
          this.props.allMealNames.push(mealList.data[i].mealName);
        }
      } else {
        console.log("get all meal names function does not return");
      }
    })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.props.allMealNames);
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

    //----get category meals-------------------------
    url = "/get-all-categories";
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
    this.categories = this.props.categories;
  }

  handleCategoryDropdownChange = (val) => {
    console.log(this.state.suggestedCategories)
    this.setState({ suggestedCategories: val });
    // below setstate causes an error to make each new set a sum of all previous.
    // this.setState({ suggestedCategories: [...this.state.suggestedCategories, val] });

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

  closeModal() {
    this.setState({ openModal: false });
    // this.props.openModal = false;
    // this.props.func_removeutensilFlag();
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  render() {

    // const [ingredientInput, setIngredientInput] = useState('');    

    // const theme = createMuiTheme({
    //   palette: { primary: green },
    // });

    return (
          <div className="suggestion_section_2" >
            <form className="suggestion_forms" noValidate autoComplete="off" encType="multipart/form-data" method="post" >

              <h3> Categories</h3>
              <div className="suggestion_form">
                <div className="suggestion_form_group">
                  <label htmlFor="tags-outlined" className="suggestion_form_label">
                    Suggest category 
                  </label>
                  <div className="input_button">
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      freeSolo
                      // filterSelectedOptions
                      options={this.props.categories.map((option) => option)}
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
                        />                    )}
                    />
                    <Button variant="contained" disableRipple onClick={this.addCategory} className='ingredient_button' style={{ width: "max-content" }} > Add Category</Button>
                  </div>

                </div>
                <Stack direction="row" spacing={1} className="stack">
                {
                  this.state.suggestedCategories.map((data, index) => (
                    <Chip
                      key={index}
                      label={data}
                      className='chip'
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
                    <Button variant="contained" className='ingredient_button' style={{ width: "100%" }} onClick={() => this.sendSuggestedMealToDB()}> Add Category</Button>
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