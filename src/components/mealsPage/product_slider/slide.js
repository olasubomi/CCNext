import React from 'react';
import PropTypes from 'prop-types';
import { migrateS3UrlToCloudinary } from '../../../common/migrateS3UrlToCloudinary';
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
      {/* <img src={migrateS3UrlToCloudinary('/images/products/sugar.jpeg'} /> */}
      <img src={migrateS3UrlToCloudinary(image)} style={{width:"100px", height:"100px"}} />

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