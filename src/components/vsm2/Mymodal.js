import React, { Component } from "react";
// import Modal from "react-modal";
// import HeartCheckbox from 'react-heart-checkbox';
// import Slider from "react-animated-slider";
// import "react-animated-slider/build/horizontal.css";
// import { Carousel } from 'react-responsive-carousel';
// import ImagePopup from "./ImagePopup";
import { Modal } from "react-bootstrap";
// import {Button} from 'react-bootstrap/Button';
import TextSlider from "../../text_slide";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import "./Mymodal.scoped.scss";
import "../../App.css";

const content = [1, 2];
class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      increment: 0,
      checked: false,
      index: 0
    };
    this.openModal = this.openModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  decrease = () => {
    if (this.state.increment > 0) {
      this.setState(prevState => ({ increment: prevState.increment - 1 }));
    }
  };

  onClick = (evnet, props) => {
    this.setState({ checked: !this.state.checked });
  };

  increase = () => {
    this.setState({ increment: this.state.increment + 1 });
  };

  openModal() {
    this.props.func_setMealFlag();
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = "#f00";
  // }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.props.func_removeMealFlag();
  }

  handleSelect(selectedIndex, e) {
    this.setState({ index: selectedIndex });
  }
  render() {
    // const { checked } = this.state;
    const { value, mealPrep, ingredientsList } = this.props;

    return (
      <>
        <Modal
          show = {this.state.modalIsOpen}
          onHide = { this.closeModal }
          dialogClassName="modal-90w"
          centered
        >
          <Modal.Header closeButton style={{'borderBottom': '30px', 'padding': '0px'}}/> 
          <Modal.Body style={{ padding: "0px" }}> 
            <div className="container">
              <div className="row" style={{ width: "100%"}}>
                <div className="detail-firstCol col-md-5 col-sm-12" >
                  <Carousel showThumbs={false} infiniteLoop={false} style={{width:"96%" }}>
                    {content.map(index => (
                      <img style={{ height: "250px" }} alt="pp" key={index} src={value.mealImage} />
                    ))}                    
                  </Carousel>
                  <br />
                  <div className="col-md-12 col-xs-12">
                    <h3> {value.label}</h3>
                    <div>
                      {value.readTime} mins read | {value.cookTime} mins to prepare
                    </div>
                    <div> 
                      <button  style={{ backgroundColor: "grey",color: "white"}} >
                        Compare items
                      </button>
                    </div>
                    <br />
                  </div>
                </div>
                
                <div className="col-md-6 col-xs-12">
                  <div className="row col-md-6 col-xs-12" style={{ width: "100%"}}> Meal Quantity &nbsp;
                    <div className="def-number-input number-input" style={{ backgroundColor: "lightgrey" }}>
                      <button onClick={this.decrease} className="minus"></button>
                      <input className="quantity" name="quantity" value={this.state.increment}  onChange={() => console.log("change")}  type="number"/>
                      <button onClick={this.increase} className="plus"></button>
                    </div>                    
                  </div>

                  <br />
                  <div className="row col-md-6 col-sm-12"><b>Ingredients</b></div>                  
                  <div className="row ingredient-section" >
                      { ingredientsList &&
                        ingredientsList.map(ingredient => (
                          <div className="col-md-6 col-sm-12" key={value.label + ingredient.product}>
                            <input type="checkbox" value="" />{" "+ ingredient.product} <br />
                          </div>
                        ))} 
                  </div>    

                  <button className="btn-addToCard" style={{ marginBottom: "20px"}}>Add to Cart</button>
                  <TextSlider instructionData={mealPrep} value={value} />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div id ={value.name}>
          <button
            className = "detail-step-btn"
            style={{ backgroundColor: "orange"}}
            key={value.id+value.label} onClick={this.openModal}>
              See Full Recipe
          </button>
        </div>
      </>
    );
  }
}
export default MyModal;
