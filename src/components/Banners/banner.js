import React, { Component } from "react";
import background from "../../assets/images/homepage/food_prep.jpg";
import './banner.css';
import Link from "next/link";


class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
        };
    }

    render() {

        return (
            <div>
                <div style={{
                    height: "510px",
                    verticalAlign: "top",
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    // backgroundSize: "100%",
                    backgroundColor: "transparent",
                    backgroundSize: "cover"
                }}

                >
                    {/* <!-- <h1>Book a Consultation</h1> --> */}
                    <div className="banner_spacing"></div>

                    <p className="banner_text">
                        <b>
                            WELL-ESTABLISHED<br></br>
                            LOCAL AND<br></br>
                            INTERNATIONAL<br></br>
                            FOOD SUPPLIERS<br></br>
                            <u>
                                <Link href="/products" className="nav-link px-2">
                                    LEARN MORE
                                </Link>

                            </u>
                        </b>
                    </p>
                </div>
            </div>
        )
    };

}

export default Banner;