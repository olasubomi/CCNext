import React, { Component } from "react";
import styles from './banner2.module.css';
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
                    backgroundImage: `url(/assets/homepage/banner-3.png)`,
                }}
                    className={styles.banner_container}
                >
                    {/* <!-- <h1>Book a Consultation</h1> --> */}
                    <div className={styles.banner2container}>
                        <p className={styles.banner2_text}>
                            ENJOY HASSLE FREE COOKING WITH CHOP CHOW
                        </p>
                        <Link href="/v2"><a className={styles.banner2_button}>Learn More</a></Link>
                    </div>

                </div>
            </div>
        )
    };

}

export default Banner2;