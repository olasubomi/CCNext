import React, { Component } from "react";
import MyModal from "./Mymodal";
import WithScrollbar from "./product_slider/WithScrollbar";
// import "./MealsPage.scoped.scss";
import { Row } from 'react-bootstrap'
import axios from '../../util/Api';

class MealsPage extends Component {
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

      currentMealCount: 12,

      mealList:null,
      col_count:1
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.update();

    console.log("Comes in meal pages component did mount");
    var url = "https://chopchowdev.herokuapp.com/api/get-meals";
        // var url = "http://localhost:5000/api/get-meals";

    // var url = "/get-meals"

    
    // axios(url)
    //   .then(res => res.text())
    //   .then(body => {
      axios.get(url).then((body) => {
        var mealsList = body.data;
        if(mealsList && mealsList.data.length !== 0){
          console.log("shows products does return");
          console.log(mealsList.data.length);
          let products = [];
          for (var i = 0; i < mealsList.data.length; i++) {
            products.push(mealsList.data[i]);
          }
          this.setState({ products: products})
        }
        else{
          console.log("shows products do not return");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  onClickMealCard = ( i, col_count )=>{
    if(i === this.state.selected_index){
      this.setState({slider_flag: !this.state.slider_flag})
    }
    else this.setState({slider_flag: true})

    this.setState({ selected_index: i});
    this.setState({ selectedCard_mealData: this.state.products[i]});
    this.setState({ modalIsOpen: true });  
    this.setState({ firstPart_ind: (parseInt((i )/ col_count)+1)*col_count});   
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
            <div key={i+j} 
            className={`col-sm-${12/ this.state.col_count} mealContainer`}
             style={{ justifyContent:"center"}}
            >
            <div className="meal-card" 
            onClick={()=>this.onClickMealCard(i+j, this.state.col_count)}>
              <div style={containerStyle}>
                <div style={{ textAlign:"center" }}>
                  <img src={'https://chopchowdev.herokuapp.com/getOneMongoFileImage/' + value.mealImageName} className="images" 
                  style={{ width: "200px", height: "200px" }} alt="/">
                  </img>
                </div>
                <div>
                  <span style={{ color: "orange" }} >{value.mealName}</span> <br></br>
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
        console.log(selectedCard_mealData.formatted_ingredient);
        items.push(
          <Row key={Math.min(count, this.state.firstPart_ind)}>
            <div className="col-sm-12" style={{background:"#ffffff"}} key="1000001">
              <div style={{width: "95%", margin:"auto"}}>
                <div className ="detail-card-explain" id={selectedCard_mealData._id} >
                    <div style={{fontSize:"18px", paddingTop:"20px", paddingBottom:"20px"}}>
                      {selectedCard_mealData.intro}
                    </div>
                  </div>

                  <div id={selectedCard_mealData._id + "products"}>                  
                    <WithScrollbar productsObj={this.props.productsObj} products={JSON.parse(selectedCard_mealData.formatted_ingredient[0])} col_count={this.state.col_count}/>
                  </div>

                  <MyModal 
                    value={selectedCard_mealData}
                    mealPrep={selectedCard_mealData.stepSlides}
                    ingredientsList={JSON.parse(selectedCard_mealData.formatted_ingredient[0]) }
                    // func_setMealFlag = {this.setMealSliderModal}
                    // func_removeMealFlag = {this.removeMealSliderModal}
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
              <div key={i+j} 
                className={`col-sm-${12/ this.state.col_count} mealContainer`}
               style={{ justifyContent:"center"}}
              >
                <div className="meal-card" 
                  onClick={()=>this.onClickMealCard(i+j, this.state.col_count)}>
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
                      <span style={{ color: "orange" }} >{value.mealName}</span> <br></br>
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

export default MealsPage;

const containerStyle = {
  display: "inline-block",
  width: "100%",
  height: "100%"
};
