import React from "react";
import styles from "./meal.module.css";

import Head from "next/head";
import Header, { Header2 } from "../Header/Header";
import Sidenav from "../Header/sidenav";
import img_logo from "../../../public/assets/logos/sezzle.png"
import Image from "next/image";
import { FacebookEIcon, InstaEIcon, LocationIcon, PrintEIcon, ShareIcon, TwitterEIcon, WhatsappEIcon } from "../icons";
import Stores from "./stores";
import Reviews from "./Reviews";

function Meal(props){
    console.log(props.meal)
    return (
        <>
            <Head>
                <title>Meal</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {props.meal &&
            <div className={styles.meal_sections}>
                
                <div className={styles.meal_section_2}>
                    <div className={styles.meal_section_2_col_1}>
                        <Image
                            src={img_logo}
                            alt="pop up"
                            className={styles.meal_section_2_main_img}
                            height={"100%"} width={"100%"}
                        />
                        <div className={styles.meal_section_2_images}>
                            <Image alt="pop up" src={img_logo}
                                height={"100%"} width={"100%"}
                                className={styles.meal_section_2_image} />
                            <Image alt="pop up" src={img_logo}
                                height={"100%"} width={"100%"}
                                className={styles.meal_section_2_image} />
                            <Image alt="pop up" src={img_logo}
                                height={"100%"} width={"100%"}
                                className={styles.meal_section_2_image} />

                        </div>
                    </div>
                    <div className={styles.meal_section_2_col_2}>
                        <div className={styles.meal_section_2_details}>
                            <h2 className={styles.meal_section_2_name}>{props.meal.mealName}</h2>
                            <div className={styles.store}>
                                <h4>Chop Chow Store</h4>
                                <div>
                                    <LocationIcon style={styles.store_icon} />
                                    <p>6391 Elgin St. Celina, Delaware 10299</p>
                                </div>
                            </div>
                            <p className={styles.meal_section_2_description}>
                                {props.meal.intro}
                            </p>
                            <div className={styles.meal_section_2_categories}>
                                <h3 className={styles.meal_section_2_category_name}>Product Category</h3>
                                <p className={styles.meal_section_2_category}>{props.meal.categories.map((cat) => <span>{cat} &nbsp; &nbsp;</span>)}</p>
                            </div>
                        </div>
                        <div className={styles.meal_section_2_price}>
                            <h3>Price</h3>
                            <p>$7.65<span>/piece</span></p>
                        </div>
                    </div>
                </div>
                <div className={styles.section_2_footer}>
                    <div>
                        <p><ShareIcon />Share this product:</p>
                        <FacebookEIcon />
                        <TwitterEIcon />
                        <InstaEIcon />
                        <WhatsappEIcon /> 
                    </div>
                    <div>
                        <p>Print Preview</p>
                        <PrintEIcon />
                    </div>
                    <div className={styles.btnGroup}>
                        <div className={styles.btnoutline}>Add to Grocery List</div>
                        <div className={styles.btnfill}>Add to Cart</div>
                    </div>
                </div>
                <div className={styles.meal_section_3}>
                    <div className={styles.meal_details}>
                        <div>
                            <h3>Serves: </h3>
                            <p>{props.meal.servings}</p>
                        </div>
                        <div>
                            <h3>PrepTime:</h3>
                            <p>{props.meal.readTime} Minutes</p>
                        </div>
                        <div>
                            <h3>CookTime : </h3>
                            <p>{props.meal.cookTime} Minutes </p>
                        </div>
                        <div>
                            <h3>Chef:</h3>
                            <p>lddd</p>
                        </div>
                    </div>
                </div>
                {props.meal.ingredients &&
                <div className={styles.meal_section_4}>
                    <div className={styles.ingredient_container}>
                        <h3>Add Ingredients</h3>
                        <div className={styles.ingredient_groups}>
                            <div className={styles.ingredients_head} style={{backgroundColor: 'transparent'}}>
                                <div></div>
                                <div className={styles.ingredients_th}>Names</div>
                                <div className={styles.ingredients_th} style={{textAlign: 'center'}}>Quantity</div>
                                <div className={styles.ingredients_th}>Measurement</div>
                                <div className={styles.ingredients_th} style={{textAlign: 'center'}}>Availability in store</div>
                                <div className={styles.ingredients_th}>Price</div>
                            </div>
                            <div className={styles.ingredients_body}>
                                <table className={styles.ingredients_table}>
                                    <tbody>
                                        {props.meal.ingredients.map((ingredient, index) => {
                                            return(
                                                <tr key={index} className={styles.ingredients_tr}>
                                                    <input name='id' type="checkbox" />
                                                    <td style={{color: '#000000'}} className={styles.ingredients_td}>{ingredient.split('x').length > 1 ? ingredient.split('x')[0] : ingredient.split('-')[0]}</td>
                                                    <td className={styles.ingredients_td} style={{textAlign: 'center'}}>{ingredient.split('x').length > 1 ? ingredient.split('x')[1].split(' ')[1] : ingredient.split('-')[1].split(' ')[1]}</td>
                                                    <td className={styles.ingredients_td}>{ingredient.split('x').length > 1 ? ingredient.split('x')[1] && ingredient.split('x')[1].split(' ')[2] : ingredient.split('-')[1] && ingredient.split('-')[1].split(' ')[2]}</td>
                                                    <td className={styles.ingredients_td} style={{textAlign: 'center'}}>afa</td>
                                                    <td className={styles.ingredients_td}>Unavailable</td>
                                                </tr>
                                            )
                                        })}
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className={styles.ingredient_radio}>
                            <div className={styles.ingredient_radio_option}>
                                <input
                                className={styles.ingredient_radio_radioInput}
                                type="radio"
                                id="non packaged"
                                name="meal_type"
                                value="non packaged"
                                />
                                <label
                                htmlFor="non packaged"
                                className={styles.ingredient_radio_radio_button}
                                ></label>
                                <label
                                htmlFor="non packaged"
                                className={styles.ingredient_radio_radioLabel}
                                >
                                Get all ingredient from Chopchow Official Store <span>(Recommeded)</span>
                                </label>
                            </div>
                            <div className={styles.ingredient_radio_option}>
                                <input
                                className={styles.ingredient_radio_radioInput}
                                type="radio"
                                id="packaged"
                                name="meal_type"
                                value="packaged"
                                />
                                <label
                                htmlFor="packaged"
                                className={styles.ingredient_radio_radio_button}
                                ></label>
                                <label htmlFor="packaged" className={styles.ingredient_radio_radioLabel}>
                                Get all ingredient from this store
                                </label>
                            </div>
                        </div>
                        <div className={styles.btnGroup}>
                            <div className={styles.btnoutline}>Add to Grocery List</div>
                            <div className={styles.btnfill}>Add to Cart</div>
                        </div>
                    </div>
                </div>
                }
                {props.meal.instructions &&
                <div className={styles.meal_section_5}>
                    <h3>Steps</h3>
                    {props.meal.instructions.map(instruction => {
                        return(
                            <div className={styles.meal_section_5_row}>
                                <div className={styles.meal_section_5_row_1}>
                                    <Image
                                    width={'100%'}
                                    height={'100%'}
                                        src={instruction.image}
                                        alt="home"
                                        className={styles.meal_section_5_row_1}
                                    />
                                </div>
                                <div className={styles.meal_section_5_row_2}>
                                    <h3 className={styles.meal_section_5_row_2_h3}>
                                        Step 1 Title
                                    </h3>
                                    <p className={styles.meal_section_5_row_2_p}>
                                        {instruction.step.map((int) => <>{int}</>) }
                                    </p>
                                </div>
                            </div>
                        )
                    })
                    }
                    
                </div>}

                <div className={styles.meal_section_6}>
                    <h3>Meal Categories</h3>
                    <ul>
                        <li>color</li>
                        <li>React</li>
                        <li>TagIcon</li>
                    </ul>
                </div>

                <div className={styles.meal_section_7}>
                    <h3>Tips</h3>
                    <div>
                        <ul>
                            <li>color</li>
                            <li>React</li>
                            <li>TagIcon</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.meal_section_8}>
                    <h3>Stores location</h3>
                    <Stores />
                </div>

                <div className={styles.meal_section_8}>
                    <h3>Add Review</h3>
                    <Reviews />
                </div>
            </div>
            }
        </>
    );
}

export default Meal;