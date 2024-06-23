import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import no_mealImg from '../../../assets/images/no_meal_step_image.png';
// import "./WithScrollbar.scss";

export default class WithScrollbar extends Component {
  constructor() {
    super();

    // this.state = {  width: 0 };
    // window.addEventListener("resize", this.update);
  }

  // update = () => {
  //   this.setState({  width: window.innerWidth });
  //   let count = 1;
  //   if (this.state.width > 1200) count = 4;
  //   else if(this.state.width > 1000 && this.state.width < 1200) count = 3;
  //   else if(this.state.width > 800 && this.state.width < 1000) count = 2;

  //   if(this.props.products === null && this.state.width > 800) count = 4;
  //   else if(this.props.products.length < 4 && this.state.width > 800) count = 4; //Math.min(count, this.props.products.length);
  // };

  render() {
    let col_count = this.props.col_count;

    return (
        <Carousel className="withScroll_slider" showThumbs={false} infiniteLoop={false} selectedItem = { parseInt(this.props.products.length /2) } centerMode={true} centerSlidePercentage={100 / (1.4*col_count)}>
          {this.props.products.map((ingredient, index) => (
            <div key={index}>                    
                <img src={ingredient.image!==""? ingredient.image: no_mealImg} alt={ingredient.ingredient} height="200px" width="auto"/>
                <p style={{fontSize:"20px"}}>{ingredient.ingredient}</p>
            </div>
          ))}
            
        </Carousel>
    );
  }
}
