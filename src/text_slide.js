import React, { Component } from "react";
import { Carousel,  } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./text_slider.css";
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import no_mealImg from '../src/assets/images/no_meal_step_image.png';

class TextSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      increment: 0,
      checked: false,
      base_index: 0,
      index: 0
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.updateInstructionsDisplayBaseIndex = this.updateInstructionsDisplayBaseIndex.bind(
      this
    );
  }

  handleSelect(selectedIndex) {
    this.setState({ index: selectedIndex + 1 });
  }

  updateInstructionsDisplayBaseIndex(event) {
    console.log(event.target.innerText);
    var button = event.target.innerText;
    // var regExp = "/^w+[ ]/d  $/";
    // var slide_index = button.match(regExp);
    //console.log(slide_index);
    var last_chars = button.slice(6, 7);
    var slide_num = Number(last_chars);
    this.setState({ base_index: slide_num * 3 });
    //var base_index = slide_num*3;
    //console.log("Updating base index on click to: " +this.state.base_index);
  }

  render() {
    const { instructionData } = this.props;
 
    // const mealPrep1 = instructionData[0].step;
    // const meal_background = instructionData[0].image;
    var carouselSlides = [];
    var i;

    var count_index = 1;
    
    for (i = 0; i < instructionData.length ; i++) {
      const mealPrep1 = instructionData[i].instructionSteps;

      if(i!==0){
        count_index += instructionData[i-1].instructionSteps.length;
      }

      carouselSlides.push(
        <Carousel.Item key={i} style={{'height':"300px"}} className="instruction_slider_page">
          <Paper style={{maxHeight: 200, overflow: 'auto'}} className = "mealPrepChunk">
              <List>
                <div className="ml-2">
                {
                  mealPrep1.map((mealItem, index)=>(
                    <div key={index}>
                      {index+count_index}. {mealItem} 
                      <p></p> 
                    </div>   
                  ))
                }
                </div>
                <p/>
                 <img
                  className="img-responsive imageHeighgt"
                  src={instructionData[i].dataName !==null? instructionData[i].dataName: no_mealImg}
                  alt="First slide"
                  style ={{height:"auto", width:"80%", marginLeft:"10%"}}
                />
              </List>
            </Paper>
         
          {/* <Carousel.Caption>
            
          </Carousel.Caption> */}
        </Carousel.Item>
      )
    }

    return (

      <div>
        <b>Instructions</b>< br></br>
          <Carousel className="instruction-slider" onSelect={this.handleSelect} interval={null}>          
            {carouselSlides}
          </Carousel>
      </div>

    );
  }
}
export default TextSlider;