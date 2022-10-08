import React, { Component } from "react";
import Link from "next/link";
import './HomePageButtons.css';


class HomePageButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_fetched: false,
    };
  }

  render() {

    return (
      <div className="container">

        <div className="row">
          <button className="homepage_button" onClick={"./v2"}>
            <Link href="/SuggestMeal" className="nav-link px-2">Suggest A Meal</Link>
          </button>
        </div>
      </div>
    )
  };

}

export default HomePageButtons;