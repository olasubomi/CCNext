import React, { Component } from "react";
// import Banner from "./Banners/banner"
import Banner2 from "./Banners/banner2"
// import HomePageButtons from "./HomePage/HomePageButtons"
import './HomePage/home.css';
import EastIcon from '@mui/icons-material/East';
import background from "../assets/images/homepage/grocery_bag.jpg";
import foodImage from "../assets/images/homepage/food.png";
import utensilImage from "../assets/images/homepage/utensil.png";
import shopImage from "../assets/images/homepage/shop.png";
import banner1 from "../assets/images/homepage/banner-1.png";
import banner2 from "../assets/images/homepage/banner-2.png";
import supplierImage from "../assets/images/homepage/supplier.png";
import shoppingImage from "../assets/images/homepage/shopping.png";
import chefImage from "../assets/images/homepage/chef.png";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_fetched: false,
      slideIndex: 1,
    };
  }

  componentDidMount() {
    let slideIndex = this.state.slideIndex;

    setInterval(() => {
      this.plusSlides(slideIndex)
    }, 6000)
  }

  plusSlides = (n) => {
    let slideIndex = this.state.slideIndex;
    slideIndex += n;
    this.setState({
      slideIndex
    }, () => {
      this.slider(slideIndex);
    })
  }

  currentSlide = (n) => {
    let slideIndex = this.state.slideIndex;
    slideIndex = n
    this.setState({
      slideIndex
    }, () => {
      this.slider(n);
    })
  }

  slider = (n) => {
    let { slideIndex } = this.state;
    console.log(slideIndex)
    // if(slideIndex < images.length-1){
    //   this.setState({
    //     slideIndex: slideIndex + 1
    //   })
    // }else if (slideIndex >= images.length-1){
    //   this.setState({
    //     slideIndex: 0
    //   })
    // }

    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
      this.setState({
        slideIndex
      })
    }
    if (n < 1) {
      slideIndex = slides.length;
      this.setState({
        slideIndex
      })
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "grid";
    dots[slideIndex - 1].className += " active";
  }

  render() {

    return (
      <div className="home_container">
        {/* <Banner/> */}
        {/* Slideshow container */}
        <div className="home_section_1">
          <div className="slideshow_container">

            {/* Full-width images with number and caption text */}
            <div className="mySlides">
              <div className="slide_wrapper"></div>
              <div className="slide_text">
                <h2>Get the best Ingredients for your meal</h2>
                <a href="/" className="slide_button">
                  Sign Up Now
                </a>
              </div>
              {/* <img src={banner1} className="slide_image" /> */}
              <div className="slide_image" style={{
                backgroundImage: `url(${banner1})`,
              }}></div>
            </div>

            <div className="mySlides">
              <div className="slide_wrapper"></div>
              <div className="slide_text">
                <h2>
                  Well established
                  Local and
                  international
                  food suppliers
                </h2>
                <a href="/" className="slide_button">
                  Learn More
                </a>
              </div>
              {/* <img src={background} className="slide_image" /> */}
              <div className="slide_image" style={{
                backgroundImage: `url(${background})`,
              }}></div>
            </div>

            <div className="mySlides">
              <div className="slide_wrapper"></div>
              <div className="slide_text">
                <h2>Enjoy hassle free cooking with CHOP CHOW</h2>
                <a href="/" className="slide_button">
                  Learn More
                </a>
              </div>
              <div className="slide_image" style={{
                backgroundImage: `url(${banner2})`,
              }}></div>
              {/* <img src={banner2} className="slide_image" /> */}
            </div>

            {/* Next and previous buttons */}
            <div className="prev" onClick={() => this.plusSlides(-1)}>
              <KeyboardArrowLeftIcon className="next_icon" />
            </div>
            <div className="next" onClick={() => this.plusSlides(1)}>
              <KeyboardArrowRightIcon className="next_icon" />
            </div>
            {/* The dots/circles */}

          </div>
          <div className="dots">
            <span className="dot" onClick={() => this.currentSlide(1)}></span>
            <span className="dot" onClick={() => this.currentSlide(2)}></span>
            <span className="dot" onClick={() => this.currentSlide(3)}></span>
          </div>
        </div>
        {/* <HomePageButtons/> */}
        <div className="home_section_2">
          <div className="features">
            <div className="lines">
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="feature">
              <div className="feature_num">
                <p>1</p>
              </div>
              <img src={shoppingImage} alt="feature" className="feature_img" />
              <h2 className="feature_name">All-in-One Shopping</h2>
              <p className="feature_desc">
                So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through theskin, but no, it would not cause intoxication.
              </p>
            </div>
            <div className="feature">
              <div className="feature_num">
                <p>2</p>
              </div>
              <img src={supplierImage} alt="feature" className="feature_img" />
              <h2 className="feature_name">Fast Delivery</h2>
              <p className="feature_desc">
                So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through theskin, but no, it would not cause intoxication.
              </p>

            </div>
            <div className="feature">
              <div className="feature_num">
                <p>3</p>
              </div>
              <img src={chefImage} alt="feature" className="feature_img" />
              <h2 className="feature_name">Earn as a Chef</h2>
              <p className="feature_desc">
                So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through theskin, but no, it would not cause intoxication.
              </p>
            </div>
          </div>
        </div>
        <div className="home_section_3">
          <div className="home_section_3_row">
            <div className="home_section_3_row_1">
              <img
                src={shopImage}
                alt="home"
                className="home_section_3_row_1"
              />
            </div>
            <div className="home_section_3_row_2">
              <h3 className="home_section_3_row_2_h3">
                WELL-ESTABLISHED LOCAL AND INTERNATIONAL FOOD SUPPLIERS
              </h3>
              <p className="home_section_3_row_2_p">
                You are responsible for operations, service, or customer support and face challenges
                trying to communicate complex procedures to a global market effectively.
                Traditional methods don&apos;t work and are laborious, costly and error prone.
              </p>
              <div className="home_section_3_row_2_link">
                <p>Learn More</p>
                <EastIcon className="home_section_3_row_2_link_icon" />
              </div>
            </div>
          </div>
          <div className="home_section_3_row">
            <div className="home_section_3_row_1 row_reverse">
              <img
                src={utensilImage}
                alt="about us"
                className="home_section_3_row_1"
              />
            </div>
            <div className="home_section_3_row_2">
              <h3 className="home_section_3_row_2_h3">
                GET PROFESSIONAL RECOMMENDATION OF RECIPIES
              </h3>
              <p className="home_section_3_row_2_p">
                You are responsible for operations, service, or customer support and face challenges
                trying to communicate complex procedures to a global market effectively.
                Traditional methods don&apos;t work and are laborious, costly and error prone.
              </p>
              <div className="home_section_3_row_2_link">
                <p>Shop Now</p>
                <EastIcon className="home_section_3_row_2_link_icon" />
              </div>
            </div>
          </div>

          <div className="home_section_3_row">
            <div className="home_section_3_row_1">
              <img
                src={foodImage}
                alt="about us"
                className="home_section_3_row_1"
              />
            </div>
            <div className="home_section_3_row_2">
              <h3 className="home_section_3_row_2_h3">
                HOME COOKED INTERNATIONAL MEAL
              </h3>
              <p className="home_section_3_row_2_p">
                You are responsible for operations, service, or customer support and face challenges
                trying to communicate complex procedures to a global market effectively.
                Traditional methods don&apos;t work and are laborious, costly and error prone.
              </p>
              <div className="home_section_3_row_2_link">
                <p>See Collections</p>
                <EastIcon className="home_section_3_row_2_link_icon" />
              </div>
            </div>
          </div>
        </div>
        <Banner2 />
      </div>
    )
  };

}

export default HomePage;