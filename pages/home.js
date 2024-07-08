import heroImage1 from "../public/assets/home/hero-image.png";
import heroImage2 from "../public/assets/home/hero-2.png";
import heroImage3 from "../public/assets/home/hero03.png";
import arrow from "../public/assets/home/arrow.svg";
import meal from "../public/assets/home/meal.svg";
import plus from "../public/assets/home/plus.svg";
import icon1 from "../public/assets/home/icon-1.svg";
import icon2 from "../public/assets/home/icon-2.svg";
import icon3 from "../public/assets/home/icon-3.svg";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import locationPin from "../public/assets/home/location.svg";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";


const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

export default function HomePage() {
  const [active, setActive] = useState(1);

  return (
    <div>
      <div className="home_page_container">
        <Carousel
          showDots
          responsive={responsive}
          infinite={true}
          autoPlay
          autoPlaySpeed={3000}
          className="home_page_container"
          customRightArrow={
            <div
              className="arrow-right arrow"
              style={{
                backgroundImage: `url(${arrow.src})`,
              }}
            />
          }
          customLeftArrow={
            <div
              className="arrow-left arrow"
              style={{
                backgroundImage: `url(${arrow.src})`,
              }}
            />
          }
        >
          <div
            className="hero"
            style={{
              backgroundImage: `url(${heroImage1.src})`,
            }}
          >
            <div className="overlay">
              <h1>Chop Chow Marketplace is your new go-to when deciding what to cook</h1>
              <button>Get Started</button>
            </div>
          </div>
          <div
            className="hero"
            style={{
              backgroundImage: `url(${heroImage2.src})`,
            }}
          >
            <div className="overlay">
              <h1>Decide, in advance, what to eat with Chop Chow subscriptions</h1>
              <button>Subscribe now</button>
            </div>
          </div>
          <div className="hero-box">
            <div className="hero-content">
              <div>
                <h1>Share your go to meals with friends on Chop Chow</h1>
                <button>Suggest a meal</button>
              </div>
              <div className="hero-content-image" />
            </div>
            <div className="box-child-one">
            </div>
            <div className="box-child-two">
            </div>
          </div>
        </Carousel>
      </div>
      <section className="home-section-one home-section">
        <div className="section-one-child">
          <div>
            <h2>
              Share your recipes <br />
              with your fans
            </h2>
            <button>Suggest A Recipe</button>
          </div>
          <div className="section-image" />
        </div>
      </section>
      <section className="home-section-two ">
        <div className="home-section">
          <div className="section-two-child">
            <div className="section-two-image" />
            <div className="text-container">
              <h2>
                Find local and international chefs, and food blogger recipes
              </h2>
              <p>Connect with Lorem Ipsum</p>
              <div className="input-container">
                <Image src={locationPin} />
                <input placeholder="Enter your current address" />
                <button>Find Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section-one home-section">
        <div className="section-one-child">
          <div className="cont">
            <h2>
              Put your recipes on Chop Chow to show off what you’ve cooked with
              family and friends
            </h2>
            <button>Ge Started</button>
          </div>
          <div className="section-3-image" />
        </div>
      </section>
      <div className="section-four-container">
        <section className="section-four" />
        <div className="box-1 box" />
        <div className="box-2 box" />
        <div className="box-3 box" />
        <div className="box-4 box" />
        <div className="section-content">
          <div className="section-box">
            <h1>Plan your meal prep with Chop Chow’s Grocery List</h1>
            <div className="section-image" />
            <div className="section-footer">
              {[
                {
                  title:
                    "Get meal Suggestion based on the items in your grocery list",
                  image: meal,
                },
                {
                  title:
                    "Add Ingredients from your meals to your list in a click with our AI function",
                  image: plus,
                },
              ].map((element) => (
                <div key={element.title}>
                  <Image src={element.image} />
                  <p>{element.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="section-six">
        <div>
          <h1>Sign Up with Us Today</h1>
          <div className="user-types">
            {
              [
                'Supplier',
                'Customer',
                'Driver'
              ].map((element, idx) => <button onClick={() => setActive(idx + 1)} key={element}>{element}</button>
              )
            }

          </div>
          <div className="chef-box"
            style={{
              backgroundColor: active === 1 ? '#1B5218' : active === 2 ? "#FF6D00" : '#A6DAE5',
            }}
          >
            <h2
              style={{
                color: active === 3 ? '#000' : "#fff"

              }}
            >
              {active === 1 ? "Become a Supplier on Chop Chow" : active === 2 ? "Join Our Esteemed Customers" : "Become A Driver"}
            </h2>
            <p
              style={{
                color: active === 3 ? '#000' : "#fff"

              }}
            >
              {
                active === 1 ?
                  "Elevate your brand by becoming a supplier on ChowChop, the ultimate meal and grocery online destination. Showcase your finest creations, connect with a global audience, and unleash the full potential of your culinary expertise!"
                  : active === 2
                    ? "Drive with purpose: Join our team as a ChowChop driver and play a vital role in connecting culinary delights with doorsteps. Enjoy flexibility, earn rewards, and be the driving force behind a seamless delivery experience for our valued customers!"
                    : "We offer a wide range of delivery options that make it easy to get your favorite products delivered to you. If you want to schedule an order for a specific time, or if you just want to get it immediately, we've got you covered."
              }
            </p>
            <button>Get Started</button>
            <div className="chef-image"
              style={{
                backgroundImage: active === 1 ? 'url(./assets/home/chef.png)' : active === 2 ? 'url(./assets/home/card-2.png)' : 'url(./assets/home/card-3.png)',
              }}
            />
          </div>
        </div>
      </section>
      <Carousel
        showDots
        containerClass="footer-carousel"
        responsive={responsive}
        arrows={false}
        infinite={true}
        autoPlay
        autoPlaySpeed={3000}

      >
        <section className="section-seven">
          <div className="seven-seven-box">
            <div className="section-seven-content">
              <h2>AI-Powered Label Scanner</h2>
              <p>Chop Chow uses artificial intelligence to add convenience to how technology is used in the food supply and management space.</p>
              <div className="section-list">
                {
                  [
                    {
                      title: "Time Saving",
                      image: icon1
                    },
                    {
                      title: "Accurate",
                      image: icon2
                    },
                    {
                      title: "Ease of Use",
                      image: icon3
                    },
                  ].map((element) => (
                    <div key={element.title} className="section-list-box">
                      <Image src={element.image} />
                      <p>{element.title}</p>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="section-seven-image" />
          </div>
        </section>
        <section className="section-carousel-card">
          <div className="section-div">
            <div className="section-div-image" />
            <div>
              <h1>Suggest your meal with AI</h1>
              <p>Chop chow  uses artificial intelligence to add convenience to how
                technology is used in the food supply and management space.
              </p>
              <div />
              <div />
            </div>
          </div>
        </section>
      </Carousel>
      <secion className="section-eight">
        <div className="section-eight-box">
          <h1>Our Locations</h1>
          <div className="section-eight-container">
            {
              ['San Diego', 'Houston', 'San Antonio', "Chicago", "New York", "Philadelphia", "Los Angeles", "Phoenix",
                "Philadelphia", "Los Angeles", "Chicago", "San Diego", "Phoenix", "Houston", "San Antonio", "New York"]
                .map((element, idx) => <p className="section-name" key={element + idx}>{element}</p>)
            }
          </div>
        </div>
      </secion>
    </div>
  );
}
