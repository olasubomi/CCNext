import React, { Component } from "react";
// import { Modal } from "react-bootstrap";
// import {Button} from 'react-bootstrap/Button';
// import { Text } from "react-native";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ComponentToPrint from "./ComponentToPrint";


class MealPageModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openModal: this.props.openModal,
      increment: 0,
      checked: false,
      index: 0
    };
  }

  render() {
    return (
      <>
      {this.props.openModal &&
      <div className="print_container">
        <div className="print_2">
          <div className="print_col_2">
            <div className="print_top">
              {/* <ReactToPrint
                trigger={() => {
                  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                  // to the root node of the returned component as it will be overwritten.
                  return "Print/Share";
                }}
                content={() => this.componentRef}
              /> */}
              <div onClick={this.props.closeModal} className="print_cancel_con">
                <span
                className="iconify print_cancel"
                data-icon="bi:x"
                >x</span>
              </div>
            </div>
            <ComponentToPrint ref={el => (this.componentRef = el)}
                mealName={this.props.mealName} mealImage={this.props.mealImage}
                categories={this.props.categories}
                prepTime={this.props.prepTime} cookTime={this.props.cookTime}
                serves={this.props.serves} componentRef={this.componentRef}
                openModal={this.props.openModal} closeModal={this.props.closeModal}
                ingredientsList={this.props.ingredientsList} utensilsList={this.props.utensilsList}
                instructionChunk1={this.props.instructionChunk1} instructionChunk2={this.props.instructionChunk2}
                instructionChunk3={this.props.instructionChunk3} instructionChunk4={this.props.instructionChunk4}
                instructionChunk5={this.props.instructionChunk5} instructionChunk6={this.props.instructionChunk6}
                chunk1Content={this.props.chunk1Content} chunk2Content={this.props.chunk2Content}
                chunk3Content={this.props.chunk3Content} chunk4Content={this.props.chunk4Content}
                chunk5Content={this.props.chunk5Content} chunk6Content={this.props.chunk6Content}
                instructionWordlength={this.props.instructionWordlength}
                tips={this.props.tips} mealImageData={this.props.mealImageData}
              />
          </div>
          
        </div>
      </div>}
      </>
    );
  }
}
export default MealPageModal;
