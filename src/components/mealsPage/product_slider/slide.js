import React from 'react';
import PropTypes from 'prop-types';
const Slider = ({image, width, height}) => {
    const backgroundImage =`${image}`;
    const styles = {
    //   backgroundImage: '/images/Arrow.png',//`${backgroundImage}`,
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      float: 'left',
      width: `auto`,
      height: `auto`
    }
    return (
      <div className="slide" style={styles}>
      {/* <img src={'/images/products/sugar.jpeg'} /> */}
      <img src={image} style={{width:"100px", height:"100px"}} />

      </div>
    )
}
Slider.defaultProps = {
  width: 300,
  height: 600
}
Slider.propTypes = {
  image: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}
export default Slider;