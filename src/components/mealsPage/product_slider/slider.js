import React, { Component } from 'react';
import Slide from './slide.js'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    // match product names passed from props, to product image passed to Slider
    this.state = {
        width: 200,
        height: 100,
        images: ['/images/products/sugar.jpeg', '/images/products/onion.jpg', '/images/products/tomato.jpg', '/images/products/water.jpeg', '/images/products/vegetable_oil.jpg']
      }

  }
  slideLeft() {
    let last = this.state.images.slice(-1)
    let rest = this.state.images.slice(0, -1)
    let images = [last, ...rest]
    this.setState({images: images});
  }

  slideRight() {
    let [first, ...rest] = this.state.images;
    let images = [...rest, first];
    this.setState({images: images});
  }
    
  renderNavigation(){
    return (
      <div className="slider-arrows">
    <a className="arrow left" onClick={() => this.slideLeft()}>
      <img src={'/images/Arrow.png'} style={{"width":"50px"}}/> 
    </a>
    <a className="arrow right" onClick={() => this.slideRight()}>
      <img src={'/images/Arrow.png'} style={{"width":"50px"}}/>
    </a>
    </div>
    )
  }

  renderSlides=()=> {
    const images = this.state.images;
    return (
      <div className="slider-items">
        {
          images.map((image, index) => {
            return (
              <Slide image={image} width={this.state.width} height={this.state.height} key={index} />
            )
          })
        }
      </div>
    )
  }
render() {
return (
    <div className="slider">
                {this.renderNavigation()}
                {this.renderSlides()}
    </div>
    )
  }
}