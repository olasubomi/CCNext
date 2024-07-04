import heroImage1 from "../public/assets/home/hero-image.png";
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

const data = [
  {
    title: "Chop Chow Marketplace is your new go-to when deciding what to cook",
    image: heroImage1,
  },
  {
    title: "Chop Marketplace is your new go-to when deciding what to cook",
    image: heroImage1,
  },
  {
    title: "Chow Marketplace is your new go-to when deciding what to cook",
    image: heroImage1,
  },
  {
    title: "Chow Marketplace is your new go-to when deciding what to cook",
    image: heroImage1,
  },
  {
    title: "Chow Marketplace is your new go-to when deciding what to cook",
    image: heroImage1,
  },
];
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
    items: 2,
    partialVisibilityGutter: 30,
  },
};

export default function HomePage() {
  return (
    <div>
      <div className="home_page_container">
        <Carousel
          showDots
          responsive={responsive}
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
          {data.map((element, idx) => (
            <div
              key={element.title}
              className="hero"
              style={{
                backgroundImage: `url(${element.image.src})`,
              }}
            >
              <div className="overlay">
                <h1>{element.title}</h1>
                <button>Get Started</button>
              </div>
            </div>
          ))}
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
            <button>Supplier</button>
            <button>Customer</button>
            <button>Driver</button>
          </div>
          <div className="chef-box">
            <h2>Become a Supplier on Chop Chow</h2>
            <p>Elevate your brand by becoming a supplier on ChowChop, the ultimate meal and grocery online destination. Showcase your finest creations, connect with a global audience, and unleash the full potential of your culinary expertise!</p>
            <button>Get Started</button>
            <div className="chef-image" />
          </div>
        </div>
      </section>
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
