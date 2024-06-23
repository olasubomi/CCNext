import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ButtonFirst, ButtonLast} from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css';

export default class CarouselSlider extends React.Component {
 

  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={3}
      >
        <Slider>
          <Slide index={0}><img src="/images/products/sugar.jpeg" className="images" style={{width:"80%"}} alt=""></img></Slide>
          <Slide index={1}><img src="/images/products/onion.jpg" className="images" style={{width:"80%"}} alt=""></img></Slide>
          <Slide index={2}><img src="/images/products/tomato.jpg" className="images" style={{width:"80%"}} alt=""></img></Slide>
        </Slider>
        <div style={{'text-align': 'center'}} >
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
          <ButtonFirst>First</ButtonFirst>
          <ButtonLast>Last</ButtonLast> 
        
        </div>
      </CarouselProvider>
    );
  }
}