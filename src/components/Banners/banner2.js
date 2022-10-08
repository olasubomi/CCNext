import React, { Component } from "react";
import banner3 from "../../../public/assets/homepage/banner-3.png";
import './banner2.module.css';
import Link from "next/link";

class Banner2 extends Component {

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
                    backgroundImage: `url(${banner3})`,
                }}
                    className="banner_container"
                >
                    {/* <!-- <h1>Book a Consultation</h1> --> */}
                    <div className="banner2container">
                        <p className="banner2_text">
                            ENJOY HASSLE FREE COOKING WITH CHOP CHOW
                        </p>
                        <Link href="/v2" className="banner2_button">Learn More</Link>
                    </div>

                </div>
            </div>
        )
    };

}

export default Banner2;