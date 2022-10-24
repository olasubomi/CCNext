import React, { Component } from "react";
// import Banner from "./Banners/banner"
import Banner2 from "../src/components/Banners/banner2"
// import HomePageButtons from "./HomePage/HomePageButtons"
import styles from '../src/components/HomePage/home.module.css';
import EastIcon from '@mui/icons-material/East';

import foodImage from "../public/assets/homepage/food.png";
import utensilImage from "../public/assets/homepage/utensil.png";
import shopImage from "../public/assets/homepage/shop.png";
import supplierImage from "../public/assets/homepage/supplier.png";
import shoppingImage from "../public/assets/homepage/shopping.png";
import chefImage from "../public/assets/homepage/chef.png";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Image from 'next/image';
import Head from "next/head";


class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
            slideIndex: 1,
        };
    }

    componentDidMount() {
        let slideIndex = this.state.slideIndex;
        this.slider(slideIndex)
        setInterval(() => {
            console.log('red')
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
        let slides = document.getElementsByClassName("home_mySlides__Te_K_");
        console.log(slides.length)
        let dots = document.getElementsByClassName("home_dot__tB27k");
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
            <div className={styles.home_container}>
                {/* <Banner/> */}
                {/* Slideshow container */}
                <Head>
                    <title>Chop Chow Home Page</title>
                    <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className={styles.home_section_1}>
                    <div className={styles.slideshow_container}>

                        {/* Full-width images with number and caption text */}
                        <div className={styles.mySlides}>
                            <div className={styles.slide_wrapper}></div>
                            <div className={styles.slide_text}>
                                <h2>Get the best Ingredients for your meal</h2>
                                <a href="/" className={styles.slide_button}>
                                    Sign Up Now
                                </a>
                            </div>
                            {/* <Image src={banner1} className={styles.slide_image} /> */}
                            <div className={styles.slide_image}
                                style={{
                                    backgroundImage: `url(/assets/homepage/banner-1.png)`,
                                }}>
                            </div>
                        </div>

                        <div className={styles.mySlides}>
                            <div className={styles.slide_wrapper}></div>
                            <div className={styles.slide_text}>
                                <h2>
                                    Well established
                                    Local and
                                    international
                                    food suppliers
                                </h2>
                                <a href="/" className={styles.slide_button}>
                                    Learn More
                                </a>
                            </div>
                            <div className={styles.slide_image} style={{
                                backgroundImage: `url(/assets/homepage/grocery_bag.jpg)`,
                            }}></div>
                            {/* <Image src={background} className={styles.slide_image} /> */}

                        </div>

                        <div className={styles.mySlides}>
                            <div className={styles.slide_wrapper}></div>
                            <div className={styles.slide_text}>
                                <h2>Enjoy hassle free cooking with CHOP CHOW</h2>
                                <a href="/" className={styles.slide_button}>
                                    Learn More
                                </a>
                            </div>
                            <div className={styles.slide_image} style={{
                                backgroundImage: `url(/assets/homepage/banner-2.png)`,
                            }}></div>
                            {/* <Image src={banner2} className={styles.slide_image} /> */}
                        </div>

                        {/* Next and previous buttons */}
                        <div className={styles.prev} onClick={() => this.plusSlides(-1)}>
                            <KeyboardArrowLeftIcon className={styles.next_icon} />
                        </div>
                        <div className={styles.next} onClick={() => this.plusSlides(1)}>
                            <KeyboardArrowRightIcon className={styles.next_icon} />
                        </div>
                        {/* The dots/circles */}

                    </div>
                    <div className={styles.dots}>
                        <span className={styles.dot} onClick={() => this.currentSlide(1)}></span>
                        <span className={styles.dot} onClick={() => this.currentSlide(2)}></span>
                        <span className={styles.dot} onClick={() => this.currentSlide(3)}></span>
                    </div>
                </div>
                {/* <HomePageButtons/> */}
                <div className={styles.home_section_2}>
                    <div className={styles.features}>
                        <div className={styles.lines}>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.feature_num}>
                                <p>1</p>
                            </div>

                            <Image src={shoppingImage} alt="feature" className={styles.feature_img} />
                            <h2 className={styles.feature_name}>All-in-One Shopping</h2>
                            <p className={styles.feature_desc}>
                                So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through theskin, but no, it would not cause intoxication.
                            </p>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.feature_num}>
                                <p>2</p>
                            </div>
                            <Image src={supplierImage} alt="feature" className={styles.feature_img} />
                            <h2 className={styles.feature_name}>Fast Delivery</h2>
                            <p className={styles.feature_desc}>
                                So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through theskin, but no, it would not cause intoxication.
                            </p>

                        </div>
                        <div className={styles.feature}>
                            <div className={styles.feature_num}>
                                <p>3</p>
                            </div>
                            <Image src={chefImage} alt="feature" className={styles.feature_img} />
                            <h2 className={styles.feature_name}>Earn as a Chef</h2>
                            <p className={styles.feature_desc}>
                                So yes, the alcohol (ethanol) in hand sanitizers can be absorbed through theskin, but no, it would not cause intoxication.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.home_section_3}>
                    <div className={styles.home_section_3_row}>
                        <div className={styles.home_section_3_row_1}>
                            <Image
                                src={shopImage}
                                alt="home"
                                className={styles.home_section_3_row_1}
                            />
                        </div>
                        <div className={styles.home_section_3_row_2}>
                            <h3 className={styles.home_section_3_row_2_h3}>
                                WELL-ESTABLISHED LOCAL AND INTERNATIONAL FOOD SUPPLIERS
                            </h3>
                            <p className={styles.home_section_3_row_2_p}>
                                You are responsible for operations, service, or customer support and face challenges
                                trying to communicate complex procedures to a global market effectively.
                                Traditional methods don&apos;t work and are laborious, costly and error prone.
                            </p>
                            <div className={styles.home_section_3_row_2_link}>
                                <p>Learn More</p>
                                <EastIcon className={styles.home_section_3_row_2_link_icon} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.home_section_3_row}>
                        <div className={`${styles.home_section_3_row_1} ${styles.row_reverse}`}>
                            <Image
                                src={utensilImage}
                                alt="about us"
                                className={styles.home_section_3_row_1}
                            />
                        </div>
                        <div className={styles.home_section_3_row_2}>
                            <h3 className={styles.home_section_3_row_2_h3}>
                                GET PROFESSIONAL RECOMMENDATION OF RECIPIES
                            </h3>
                            <p className={styles.home_section_3_row_2_p}>
                                You are responsible for operations, service, or customer support and face challenges
                                trying to communicate complex procedures to a global market effectively.
                                Traditional methods don&apos;t work and are laborious, costly and error prone.
                            </p>
                            <div className={styles.home_section_3_row_2_link}>
                                <p>Shop Now</p>
                                <EastIcon className={styles.home_section_3_row_2_link_icon} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.home_section_3_row}>
                        <div className={styles.home_section_3_row_1}>
                            <Image
                                src={foodImage}
                                alt="about us"
                                className={styles.home_section_3_row_1}
                            />
                        </div>
                        <div className={styles.home_section_3_row_2}>
                            <h3 className={styles.home_section_3_row_2_h3}>
                                HOME COOKED INTERNATIONAL MEAL
                            </h3>
                            <p className={styles.home_section_3_row_2_p}>
                                You are responsible for operations, service, or customer support and face challenges
                                trying to communicate complex procedures to a global market effectively.
                                Traditional methods don&apos;t work and are laborious, costly and error prone.
                            </p>
                            <div className={styles.home_section_3_row_2_link}>
                                <p>See Collections</p>
                                <EastIcon className={styles.home_section_3_row_2_link_icon} />
                            </div>
                        </div>
                    </div>
                </div>
                <Banner2 />
            </div>
        )
    };

}

export default LandingPage;