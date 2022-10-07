import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/lab/Autocomplete"; // createFilterOptions,
// import axios from 'axios';
import axios from '../util/Api';
import { Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import { createMuiTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import {Dialog, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

class SuggestProduct extends Component {
  products = [];
  productsImg_path = [];
  categories = [];
  measurements = ["mL","oz","L","cup(s)","Tbsp","tsp","pt","lb","g","kg","lb"];

  constructor(props) {
    super(props);
    this.state = {
      productLabel: "",
      currentIngredientMeasurement: "",
      currentIngredientQuantity: "",
      ingredientStrings: [],
      instructionsChip: [],      
      categoryChips: ["snacks", "abc", "123"],
      productsPopulated: false,
      imgSrc: null,
      loading_imgSrc:"",
      open:false,
      productImgSetting_flag: false,
      productImgSrc: null,
      productImg_path:"",
      product_ind: 0,
      categoryList:[]
    };

    this.handleIngredientDropdownChange = this.handleIngredientDropdownChange.bind(
      this
    );
    this.handleIngredientMeasurement = this.handleIngredientMeasurement.bind(
      this
    );
    this.handleIngredientQuantity = this.handleIngredientQuantity.bind(this);
    this.addIngredientToMeal = this.addIngredientToMeal.bind(this);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    var url = "/get-all-products";
      axios.get(url).then((body) => {
        var productsList = body.data;
        if (productsList && productsList.data.length !== 0) {
          console.log("returns GET ALL PRODUCTS ");
          for (var i = 0; i < productsList.data.length; i++) {
            this.products.push(productsList.data[i].product_name);
            this.productsImg_path.push(productsList.data[i].product_image);
          }
          console.log("PRINTING ALL PRODUCTS LIST");
          console.log(this.products);
          this.setState({ productsPopulated: true });          
        } else {
          console.log("get all products function does not return");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //----get category meals-------------------------
    url = "/get-all-categories";
    axios.get(url).then((body) => {        
        var categoryList = body.data;
        if (categoryList && categoryList.data.length !== 0) {
          console.log("returns GET of ALL Categories ");

          for (var i = 0; i < categoryList.data.length; i++) {
            this.categories.push(categoryList.data[i].category_name);
          }
          console.log("PRINTING UPDATED CATEGORIES LIST");
        } else {
          console.log("get all products function does not return");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleClose = () => { this.setState({open: false});};

  ///////////////////////////////////////////////////////////////////////////////////////
  onTextFieldChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  onTextFieldClick = (event) => {    
    if (event.target.files[0] === undefined ) return;
    this.setState({ imgSrc: event.target.files[0] });
    this.setState({ loading_imgSrc:  URL.createObjectURL(event.target.files[0]) });
    this.setState({ img_change_flag: true });

  };

///////////////////////////////////////////////////////////////////////////////////////
  onhandleProductImg = (event) => {   
    if (event.target.files[0] === undefined ) return;
    this.setState({ productImgSrc: event.target.files[0] });
    if (event.target.files[0] !== null) {
        this.setState({ productImg_path:  URL.createObjectURL(event.target.files[0]) });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////
  onhandleInstructionImg = (event) => { 
    if (event.target.files[0] === undefined ) return;  
    this.setState({ instructionImgData: event.target.files[0] });
    if (event.target.files[0] !== null) {
        this.setState({ instructionImgPath:  URL.createObjectURL(event.target.files[0]) });
    }
  };

///////////////////////////////////////////////////////////////////////////////////////
  handleAddIngredientChip(chip) {
    this.setState({
      ingredientStrings: [...this.state.ingredientStrings, chip],
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleAddCategoryChip(chip) {
    this.setState({ categoryChips: [...this.state.categoryChips, chip] }); //
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleAddInstructionStep(chip) {
    this.setState({
      instructionsChip: [...this.state.instructionsChip, chip],
    });
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  handleAddCategoryStep() {
   console.log("FFFFFFFFFFFFFF+++++++++");
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////
  onHandleIngredientItem = (ind) =>{
    var array = this.state.ingredientStrings; // make a separate copy of the array
    var array3 = this.state.ingredientGroupList;
    if (ind !== -1) {
      array.splice(ind, 1);
      array3.splice(ind, 1);
      this.setState({ ingredientStrings: array,ingredientGroupList: array3});
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  onHandleInstructionItem = (ind) =>{
    const array  =this.state.instructionGroupList;
    array.splice(ind, 1);
    this.setState({instructionGroupList: array});
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  onUpdateIngredientImg= (event, ind) =>{
    if (event.target.files[0] === null || this.state.ingredientGroupList.length<= ind) return;
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
    this.setState({ingredientGroupList: tmp_ingredientData});
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  onUpdateInstructionImg = (event, ind) =>{
    if (event.target.files[0] === null || this.state.instructionGroupList.length<= ind) return;
    const tmp_instructionData = this.state.instructionGroupList;
    const tmp_instructionItem = tmp_instructionData[ind];

    let tmp = {
      step: tmp_instructionItem.step,
      imgdata: event.target.files[0],
      imgpath: URL.createObjectURL(event.target.files[0]),
    };

    tmp_instructionData[ind] = tmp;
    this.setState({instructionGroupList: tmp_instructionData});
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteIngredientChip(chip) {
    var array = this.state.ingredientStrings; // make a separate copy of the array
    var array3 = this.state.ingredientGroupList;

    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      array3.splice(index, 1);

      this.setState({ ingredientStrings: array, ingredientGroupList:array3});
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteCategoryChip(chip) {
    var array = [...this.state.categoryChips]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ categoryChips: array });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleDeleteInstructionsStep(chip) {
    var array = [...this.state.instructionsChip]; // make a separate copy of the array
    var index = array.indexOf(chip);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ instructionsChip: array });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleIngredientQuantity(event) {
    console.log(event.target.value);
    this.setState({ currentIngredientQuantity: event.target.value });
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleIngredientDropdownChange=(event,val)=>{
    var array = this.products; 
    var index = array.indexOf(val);
    if (index !== -1) {      
      this.setState({ product_ind: index });
    }

    if (event.target.value!== null) {
      this.setState({ currentIngredient: val });
    } else {
      this.setState({ currentIngredient: event.target.innerHTML });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  handleProductName=(event, val)=>{
    const searchResult = this.products.map(element=>element.toLowerCase().includes(val.toLowerCase()));
    const flag = searchResult.find(element=>element === true);

    if(flag !== true || flag ===null) {
      this.setState({productImgSetting_flag:true});
      this.setState({ currentIngredient: val });
    }else{
      this.setState({productImgSetting_flag:false});
      this.setState({ currentIngredient: val});
    }
  }


 ///////////////////////////////////////////////////////////////////////////////////////
  handleCategoryDropdownChange=(val)=>{
    this.setState({categoryList: val});
  }


///////////////////////////////////////////////////////////////////////////////////////
  handleIngredientMeasurement(event) {
    if (event.target.value) {
      this.setState({ currentIngredientMeasurement: event.target.value });
    } else {
      this.setState({ currentIngredientMeasurement: event.target.innerHTML });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  addIngredientToMeal(event) {
    event.preventDefault();
    var properIngredientStringSyntax;
    if (document.getElementById("currentIngredient").value === "") {   window.alert("Enter an ingredient to add to meal");   return;  }
    // update ingredient string syntax for no quantity or no measurement.
    if (this.state.currentIngredientQuantity === 0) {
      properIngredientStringSyntax = document.getElementById("currentIngredient").value;
    } else if (  document.getElementById("currentIngredientMeasurement").value === null  ) {
      properIngredientStringSyntax = "" + this.state.currentIngredientQuantity +  " " +  document.getElementById("currentIngredient").value;
    } else {
      properIngredientStringSyntax =
        "" + this.state.currentIngredientQuantity + " " +  document.getElementById("currentIngredientMeasurement").value +
        " of " + document.getElementById("currentIngredient").value;
    }

    var currProductObject = { 
      product: this.state.currentIngredient,  
      quantity: this.state.currentIngredientQuantity,  
      measurement: this.state.currentIngredientMeasurement, 
      productImgData: this.state.productImgSrc,
      productImgPath: null,
      flag: this.state.productImgSetting_flag,
    };

    if(this.state.productImgSetting_flag ){
      currProductObject.productImgPath = this.state.productImg_path;
      currProductObject.flag = true
    }else{
      currProductObject.productImgPath = this.productsImg_path[this.state.product_ind];
      currProductObject.flag = false;
    }
   

    this.handleAddIngredientChip(properIngredientStringSyntax);
    this.setState({ ingredientGroupList: [ ...this.state.ingredientGroupList,  currProductObject ] });
    this.setState({ productImgSrc: null, productImg_path:"" });
    this.setState({ currentIngredient:"",  currentIngredientQuantity:"", currentIngredientMeasurement:""});

  }

  ///////////////////////////////////////////////////////////////////////////////////////
  addInstructionList =()=>{
    if( this.state.instructionsChip.length ===0 ) return;
    let tmp = {
      step: this.state.instructionsChip,
      imgdata: this.state.instructionImgData,
      imgpath: this.state.instructionImgPath,
    }
    this.setState({instructionGroupList: [...this.state.instructionGroupList, tmp ]});
    this.setState({instructionsChip:[], instructionImgData: null, instructionImgPath:"" });
  }
 

///////////////////////////////////////////////////////////////////////////////////////
  sendSuggestedMealToDB = async (e) => {
    const { productLabel, intro,servings,ingredientStrings,ingredientGroupList, instructionGroupList,imgSrc,readTime,cookTime,categoryList} = this.state;

    if (productLabel === "") {  console.log("meal label blank"); return; }
    if (ingredientStrings.length === 0) {   window.alert( "Suggested meal requires adding at least one ingredient to submit" );   return;  }
    if (imgSrc === null) {   window.alert( "You didn't add suggested meal image" );   return;  }

    //------------- to get glabal path for instrution image ----------------------------------------
    let productImgForm = new FormData();
    let img_count1 = 0;
    for (var i = 0; i < ingredientGroupList.length; i++){
      if (ingredientGroupList[i].productImgData !== null)
      {
        productImgForm.append('productImgs', ingredientGroupList[i].productImgData);
        img_count1 ++;
      }
    }

    let productImg_paths = null;
    if(img_count1 !== 0){
      var productImg_url = "/getProductImgURL/";
      const productImg_config = {  method: 'POST',  data: productImgForm, url: productImg_url };

      const response = await axios(productImg_config)
      console.log("UploadedImage_URL: ", response)
      productImg_paths = response.data.productImg_paths;
    }

    //-------------to make prodcut data ------------------------------------------
    const formatted_ingredient1 = [];
    const product_slider = [];
    let n1 = -1;
    for (i = 0; i < ingredientGroupList.length; i++){
      var tmp_ingredient = { 
        product: ingredientGroupList[i].product,  
        quantity: ingredientGroupList[i].quantity,  
        measurement: ingredientGroupList[i].measurement, 
      };
      formatted_ingredient1.push(tmp_ingredient);

      //-----------------------------------------------
     let image = "";
     if (ingredientGroupList[i].productImgData !== null)
     {   
       n1 ++; image = productImg_paths[n1]
     }
     else{
       image = ingredientGroupList[i].productImgPath;
     }
      const tmp_slider_data = { 
        ingredient: ingredientGroupList[i].product,  
        image: image,  
        flag: ingredientGroupList[i].flag, 
      };
      product_slider.push(tmp_slider_data);
    }

    //------------- to get glabal path for instrution image ----------------------------------------
    let instructionImgForm = new FormData();
    let img_count = 0;
    for ( i = 0; i < instructionGroupList.length; i++){
      if (instructionGroupList[i].imgdata !== null)
      {
        instructionImgForm.append('instructionImgs', instructionGroupList[i].imgdata);
        img_count ++;
      }
    }

    var instructionImg_paths = null;
    if(img_count !== 0){
      var instructionImg_url = "/getInstructionImgURL/";
      const instructionImg_config = {  method: 'POST',  data: instructionImgForm, url: instructionImg_url };

      const response = await axios(instructionImg_config)
      instructionImg_paths = response.data.instrutionImg_paths;
    }

    //-------------to make instruction data ------------------------------------------
    const instructionGroupData = [];
    let n = -1;
    for ( i = 0; i < instructionGroupList.length; i++){
      let image = null;
      if (instructionGroupList[i].imgdata !== null)
      {   n ++; image = instructionImg_paths[n] }

      let tmp = {
        step: instructionGroupList[i].step,
        image: image,
      }
      instructionGroupData.push(tmp);
    }

    //-------------to make new category data ------------------------------------------
    let new_categories = [];
    for(i =0; i< categoryList.length; i++)
    {
      let index = this.categories.indexOf(categoryList[i]);
      if(index===-1) new_categories.push(categoryList[i])
    }

    //-------------to make ingredient data ------------------------------------------
    var url = "/addMealSuggestion/";

    let suggestMealForm = new FormData();
    suggestMealForm.append('productLabel', productLabel);
    suggestMealForm.append('intro', intro);
    suggestMealForm.append('servings', servings);
    suggestMealForm.append('product_slider', JSON.stringify(product_slider));
    suggestMealForm.append('formatted_ingredient', JSON.stringify(formatted_ingredient1));
    suggestMealForm.append('instructionsGroupList', JSON.stringify(instructionGroupData));
    suggestMealForm.append('ingredientStrings', ingredientStrings);
    suggestMealForm.append('readTime', readTime);
    suggestMealForm.append('cookTime', cookTime);
    suggestMealForm.append('categoryChips', JSON.stringify(categoryList));    
    suggestMealForm.append('newCategories', JSON.stringify(new_categories)); 

    suggestMealForm.append('imgSrc', imgSrc);
    
    const config = {  method: 'POST',  data: suggestMealForm, url: url };
    axios(config).then(response => {
      if (response.status >= 200 && response.status < 300) {
        this.setState({ open : true});
        console.log(response);
        console.log("Display Meal submitted successfully");   
        window.location.href = "/SuggestMeal"  
      } else {
        console.log("Somthing happened wrong");
      }
    }).catch(error => {
      console.log(error);
    });
  }



  ///////////////////////////////////////////////////////////////////////////////////////
  render(){
    const theme = createMuiTheme({
      palette: { primary: green, },
    });
  
    const {loading_imgSrc, categoryList} = this.state;

    return (
      <div>
        <div style={{ width:"85%" , margin:"auto", backgroundColor: "#f4f4f4"}}>
          <div style={{ padding:"20px", boxShadow: "1px 1px 4px 2px #00000030"}}>
            <div id="title" style={{  marginTop:"20px", marginBottom:"20px", }}>
              <b>Suggest Product</b>
            </div>
            <form noValidate autoComplete="off">      
                <Row className="mb-1">
                  <Col md={4}>
                    <Autocomplete
                      id="currentIngredient"
                      options={this.products.map((option) => option)}
                      onChange={(ev,val)=>this.handleIngredientDropdownChange(ev,val)}
                      onInputChange={(ev, val) => this.handleProductName(ev, val)}
                      freeSolo
                      renderInput={(params) => ( <TextField {...params} label="Product Name" variant="filled"/>)}
                      fullWidth 
                      className="mb-3"
                      value={this.state.currentIngredient}
                    />
                   
                    {/* <TextField fullWidth id="currentIngredientQuantity" type="number"  onChange={this.onTextFieldChange}  label="Quantity" variant="filled" placeholder="1.."  className="mb-3" value={this.state.currentIngredientQuantity}/> */}
                  </Col>
                  <Col md={4} style={{  marginTop:"20px"}}>
                    <input accept="image/*" id="imgSrc" type="file" className="mb-2 pr-4" onChange={(ev)=>this.onTextFieldClick(ev)} /> 
                </Col>
                <Col md={4} style={{  marginTop:"20px", textAlign:"center"}}>
                  <img src={loading_imgSrc} width="70%" height="auto"  alt=""/>
                </Col>   

                  {/* <Col md={4}  style={{textAlign:"center", margin: "auto"}}> 
                    <Button variant="contained" color="primary" disableRipple onClick={this.addIngredientToMeal} style={{color:"white", width:"80%"}}  className="mb-3" > Add Ingredient</Button>
                  </Col>             */}
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Autocomplete
                        multiple
                        id="tags-filled"
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

                <hr/>

                <Row className="mb-5">
                  <Col md={4} style={{textAlign:"center", margin: "auto"}}>
                    <ThemeProvider theme={theme}>
                      <Button variant="contained" className="mb-2" color="primary" style={{color:"white"}} onClick={()=>this.sendSuggestedMealToDB()}> Add Product</Button>
                    </ThemeProvider>
                  </Col>       
                </Row>              
              </form>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth = "xs"
          fullWidth
          >
          <DialogTitle id="alert-dialog-title">Informtation</DialogTitle>
          <DialogContent>  
            <DialogContentText>Successfully added in database</DialogContentText>       
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default SuggestProduct;
