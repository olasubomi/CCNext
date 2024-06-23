import React, { Component } from "react";
import MyModal from "./Mymodal";
import WithScrollbar from "./product_slider/WithScrollbar";
// import "./MealsPage.scoped.scss";
import { Row } from 'react-bootstrap';
// import axios from '../../util/Api';
import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

//No need to Initialize the Amazon Cognito credentials provider
// Because this loads all AWS libraries and we can simply connect to s3 as below
// AWS.config.region = 'us-west-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-west-1:4aa53863-5b7b-484c-8474-b95bc4710bbf',
// });

/**
 * We still want to create a new template that will allow for individual retrieval of images as neccessary for vsm admin, vsm users and meals page.
 */

// Load the required clients and packages for aws js sdk client side 
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");


// Initialize the Amazon Cognito credentials provider
const REGION = "us-west-1"; //e.g., 'us-east-1'
const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: "us-west-1:4aa53863-5b7b-484c-8474-b95bc4710bbf", // IDENTITY_POOL_ID e.g., eu-west-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
  }),
});

class VSMealsPage extends Component {
  // Mongo
  entries;

  constructor(props) {
    super(props);

    window.addEventListener("resize", this.update);
    this.state = {
      products: [],
      width: 0,
      firstPart_ind: 12,
      slider_flag: false,
      selectedCard_mealData: null,
      selected_index: 0,
      selectedCardID: "",

      mealSlider_Flag: false,
      currentMealCount: 12,

      mealList:null,
      col_count:1
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.update();
};

  //////////////////////////////////////////////////////////////////////////////////////////////
  onClickMealCard = ( i, col_count )=>{
    if(i === this.state.selected_index) this.setState({slider_flag: !this.state.slider_flag})
    else this.setState({slider_flag: true})

    this.setState({ selected_index: i});
    this.setState({ selectedCard_mealData: this.state.products[i]});
    this.setState({ modalIsOpen: true });  
    this.setState({ firstPart_ind: (parseInt((i )/ col_count)+1)*col_count});   
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  setMealSliderModal=()=>{
    this.setState({mealSlider_Flag: true});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  removeMealSliderModal=()=>{
    this.setState({mealSlider_Flag: false});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  onhandleLoadMore = () => {
    let count = this.state.currentMealCount;
    if(count>= this.state.products.length)   this.setState({currentMealCount: this.state.products.length});
    else this.setState({currentMealCount: count + 10 });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  update = () => {
    let col_count = 1;
    if (window.innerWidth > 1200) col_count = 4;
    else if(window.innerWidth > 900 && window.innerWidth < 1200) col_count = 3;
    else if(window.innerWidth > 500 && window.innerWidth < 900) col_count = 2;

    if(this.state.products === null && window.innerWidth > 500 && window.innerHeight > 500) col_count = 4;
    // if(this.state.products.length < 4 && window.innerWidth > 500 && window.innerHeight > 500) col_count = 4; //Math.min(count, this.props.products.length);

    this.setState({col_count: col_count});
  };


  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const {selectedCard_mealData} = this.state;
    const items = [];
    let count = Math.min(this.state.products.length, this.state.currentMealCount);

    if(this.state.products.length>0){
      // Meal Cards displayed before selected card
      for (let i = 0; i< Math.min(count, this.state.firstPart_ind); i+= this.state.col_count) {
        const tmp_item = []
        for(let j = 0; j<this.state.col_count; j++)
        {
          if(i+j>= Math.min(count, this.state.firstPart_ind)) break;
          const value = this.state.products[i+j];  
          tmp_item.push(
            <div key={i+j} className={`col-sm-${12/ this.state.col_count} mealContainer`} style={{ justifyContent:"center"}}>
            <div className="meal-card" onClick={()=>this.onClickMealCard(i+j, this.state.col_count)}>
              <div style={containerStyle}>
                <div style={{ textAlign:"center" }}>
                  <img src={value.mealImage} className="images" style={{ width: "200px", height: "200px" }} alt="/"></img>
                </div>
                <div>
                  <span style={{ color: "orange" }} >{value.label}</span> <br></br>
                  <span style={{ color: "grey" }}>View Details | {value.cookTime}  mins to prepare</span>
                  <span style={{ color: "black" }}></span>
                </div>              
              </div>
            </div>
          </div>
          )
        }

        items.push(
          <Row key={i}> {tmp_item}</Row>
        )
      }

      // Meal card for selected card ONLY including Selected Card ingredient images on display
      if(selectedCard_mealData && this.state.slider_flag){
        items.push(
          <Row key={Math.min(count, this.state.firstPart_ind)}>
            <div className="col-sm-12" style={{background:"#ffffff"}} key="1000001">
              <div style={{width: "95%", margin:"auto"}}>
                <div className ="detail-card-explain" id={selectedCard_mealData._id} >
                    <div style={{fontSize:"18px", paddingTop:"20px", paddingBottom:"20px"}}>{selectedCard_mealData.intro}
                    </div>
                  </div>

                  <div id={selectedCard_mealData._id + "products"}>                  
                    <WithScrollbar products={selectedCard_mealData.product_slider} col_count={this.state.col_count}/>
                  </div>

                  <MyModal 
                    value={selectedCard_mealData}
                    mealPrep={selectedCard_mealData.instructions}
                    ingredientsList={selectedCard_mealData.newer_ingredient_format }
                    func_setMealFlag = {this.setMealSliderModal}
                    func_removeMealFlag = {this.removeMealSliderModal}
                  />
                </div>
            </div>
          </Row>
        )
      }
     
      // Meal Cards displayed after selected card
      for (let i = Math.min(count, this.state.firstPart_ind); i< count; i+=this.state.col_count) {
        const tmp_item = []
        for(let j = 0; j<this.state.col_count; j++)
        {
          if(i+j>= count) break;
            const value = this.state.products[i+j];   
            tmp_item.push(
              <div key={i+j} className={`col-sm-${12/ this.state.col_count} mealContainer`} style={{ justifyContent:"center"}}>
                <div className="meal-card" onClick={()=>this.onClickMealCard(i+j, this.state.col_count)}>
                  <div style={containerStyle}>
                    <div style={{ textAlign:"center" }}>
                      <img
                        src={value.mealImage}
                        className="images"
                        style={{ width: "200px", height: "200px" }}
                        alt="/"
                      ></img>
                    </div>
                    <div>
                      <span style={{ color: "orange" }} >{value.label}</span> <br></br>
                      <span style={{ color: "grey" }}>View Details | {value.cookTime}  mins to prepare</span>
                      <span style={{ color: "black" }}></span>
                    </div>              
                  </div>

                </div>
              </div>
            )
        }
       
        items.push(
          <Row key={i+1}>{tmp_item}</Row>
        );
      }
    }
    else{
      console.log("Open space to code in here");
      items.push(<div id = 'viewer'> </div>);
    }


    /**
     * s3 logic to call amazon
     * 
     */
    // A utility function to create HTML.
function getHtml(template) {
  return template.join("\n");
}
// Make the getHTML function available to the browser
window.getHTML = getHtml;

// List the photo albums that exist in the bucket
var albumBucketName = "chopchowmeals"; //BUCKET_NAME
const listMeals = async () => {
  try {
    const data = await s3.send(
      new ListObjectsCommand({ Bucket: albumBucketName, MaxKeys:1 })
    );

      var productsList = data;
      var numberOfsuggestedMealsToDisplay = productsList.Contents.length;
      if(productsList && numberOfsuggestedMealsToDisplay !== 0){
        console.log("suggested meals do return with length of:");
        console.log(numberOfsuggestedMealsToDisplay);

        var href = "https://s3." + REGION + ".amazonaws.com/";
        var bucketUrl = href + albumBucketName + "/";
        var photos = data.Contents.map(function (photo) {
          // var photoKey = photo.Key;
          // var photoUrl = bucketUrl + encodeURIComponent(photoKey);
          return getHtml([
            "<span>",
            "<div>",
            "<br/>",
            '<img style="width:128px;height:128px;" src="' + bucketUrl + photo.Key + '"/>',
            "</div>",
            "<div>",
            // "<span>",
            // photoKey.replace(albumPhotosKey, ""),
            // "</span>",
            "</div>",
            "</span>",
          ]);
        });
        var message = photos.length
          ? "<p>The following photos are present.</p>"
          : "<p>There are no photos in this album.</p>";
        var htmlTemplate = [
          "<div>",
          '<button onclick="listAlbums()">',
          "Back To albums",
          "</button>",
          "</div>",
          // "<h2>",
          // "Album: " + albumName,
          // "</h2>",
          message,
          "<div>",
          getHtml(photos),
          "</div>",
          // "<h2>",
          // "End of album: " + albumName,
          // "</h2>",
          "<div>",
          '<button onclick="listAlbums()">',
          "Back To albums",
          "</button>",
          "</div>",
        ];
        document.getElementById("viewer").innerHTML = getHtml(htmlTemplate);
        document
          .getElementsByTagName("img")[0]
          .setAttribute("style", "display:none;");
    
      }
      else{
        console.log("shows products do not return");
      }
  console.log(data);
} catch (err) {
  return alert("There was an error listing your meals: " + err.message);
}
};
listMeals();
// Make the listMeals function available to the browser
window.listMeals = listMeals;

    
    return (
      <div className="meals-Page">
        <div id="title" className="meal-title"> <b>Meals</b> </div>
        <div className="mealPage-container">
            {items}        
        </div>
        <section className="loadmore-section">
          <button className="btn-loadmore" onClick={()=>this.onhandleLoadMore()}>Load More</button>
        </section>
      </div>
    )
  };
}

export default VSMealsPage;

const containerStyle = {
  display: "inline-block",
  width: "100%",
  height: "100%"
};
