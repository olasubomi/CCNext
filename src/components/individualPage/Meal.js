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
                        {props.meal.meal_images.length > 0&&
                        <Image
                            src={props.meal.meal_images[0]}
                            alt="pop up"
                            className={styles.meal_section_2_main_img}
                            height={"100%"} width={"100%"}
                        />}
                        <div className={styles.meal_section_2_images}>
                            {props.meal.meal_images.length > 1 &&
                            <>
                            {props.meal.meal_images.slice(1).map((image, index) => {
                               return(
                                <Image key={index} alt="pop up" src={image}
                                height={"100%"} width={"100%"}
                                className={styles.meal_section_2_image} />
                               ) 
                            })}
                            </>
                            }

                        </div>
                    </div>
                    <div className={styles.meal_section_2_col_2}>
                        <div className={styles.meal_section_2_details}>
                            <h2 className={styles.meal_section_2_name}>{props.meal.meal_name}</h2>
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
                                <p className={styles.meal_section_2_category}>
                                    {props.meal.meal_categories.length > 0 &&
                                    <>
                                    {JSON.parse(props.meal.meal_categories[0]).map((cat, j) => <span key={j}>{cat} &nbsp; &nbsp;</span>)}
                                    </>
                                    }
                                </p>
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
                            <p>{props.meal.prep_time} Minutes</p>
                        </div>
                        <div>
                            <h3>CookTime : </h3>
                            <p>{props.meal.cook_time} Minutes </p>
                        </div>
                        <div>
                            <h3>Chef:</h3>
                            <p>{props.meal.chef}</p>
                        </div>
                    </div>
                </div>
                {props.meal.formatted_instructions &&
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
                                        {props.meal.formatted_ingredients.length > 0 &&
                                        <>
                                        {JSON.parse(props.meal.formatted_ingredients[0]).map((ingredient, index) => {
                                            return(
                                                <tr key={index} className={styles.ingredients_tr}>
                                                    <input name='id' type="checkbox" />
                                                    <td style={{color: '#000000'}} className={styles.ingredients_td}>{ingredient.productName}</td>
                                                    <td className={styles.ingredients_td} style={{textAlign: 'center'}}>{ingredient.quantity}</td>
                                                    <td className={styles.ingredients_td}>{ingredient.measurement}</td>
                                                    <td className={styles.ingredients_td} style={{textAlign: 'center'}}></td>
                                                    <td className={styles.ingredients_td}>Unavailable</td>
                                                </tr>
                                            )
                                        })}
                                        </>
                                        }
                                    
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
                {props.meal.formatted_instructions &&
                <div className={styles.meal_section_5}>
                    <h3>Steps</h3>
                    {props.meal.formatted_instructions.map((instruction, index) => {
                        return(
                            <div key={index} className={styles.meal_section_5_row}>
                                <div className={styles.meal_section_5_row_1}>
                                    {instruction.image ? 
                                    <Image
                                    width={'100%'}
                                    height={'100%'}
                                        src={instruction.image}
                                        alt="home"
                                        className={styles.meal_section_5_row_1}
                                    />:
                                    <p></p>}
                                </div>
                                <div className={styles.meal_section_5_row_2}>
                                    <h3 className={styles.meal_section_5_row_2_h3}>
                                        Step 1 Title
                                    </h3>
                                    <p className={styles.meal_section_5_row_2_p}>
                                        {instruction.step?.map((int) => <>{int}</>) }
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
                        {props.meal.meal_categories.length > 0 &&
                        <>
                        {JSON.parse(props.meal.meal_categories[0]).map((cat, index) => <li key={index}>{cat}</li>)}
                        </>
                        }
                    </ul>
                </div>

                <div className={styles.meal_section_7}>
                    <h3>Tips</h3>
                    <div>
                        {props.meal.tips && props.meal.tips.length > 0 &&
                        <ul>
                            {JSON.parse(props.meal.tips[0]).map((tip, index) => {
                                return(
                                    <li key={index}>{tip}</li>
                                )
                            })
                            
                            }
                        </ul>
                        }
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