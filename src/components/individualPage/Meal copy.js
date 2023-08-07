import React, { useState } from "react";
import styles from "./meal.module.css";

import Head from "next/head";
import Image from "next/image";
import { FacebookEIcon, InstaEIcon, LocationIcon, PrintEIcon, ShareIcon, TwitterEIcon, WhatsappEIcon } from "../icons";
import Stores from "./stores";
import Reviews from "./Reviews";
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

function Meal(props){
    const url = 'http://localhost:3000/'
    const [serves, setServes] = useState(parseInt(props.props?.meal?.servings))

    // useEffect(() => {
    //     setServes(parseInt(props.props.meal.servings))
    // })

    function addServe(val){
        let s= serves + val;
        if(s >= props.props.meal.servings){
            setServes(s)
        }
    }
    console.log(props.meal, 'individual meal')
    console.log(serves)
    // console.log(props.props.props.props.meal, "meal props.props")

    return (
        <>
            <Head>
                <title>Meal</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {props.props?.meal &&
            <div className={styles.meal_sections}>
                
                <div className={styles.meal_section_2}>
                    <div className={styles.meal_section_2_col_1}>
                        {props.props.meal.meal_images.length > 0&&
                        <>
                        {(props.props.meal.meal_images[0].length > 0 && props.props.meal.meal_images[0] !== "[object HTMLImageElement]") ? 
                        <Image
                            src={props.props.meal.meal_images[0]}
                            alt={props.props.meal.meal_name}
                            className={styles.meal_section_2_main_img}
                            height={500} width={500}
                        />:<span></span>
                        }
                        </>
                        }
                        <div className={styles.meal_section_2_images}>
                            {props.props.meal.meal_images.length > 1 &&
                            <>
                            {props.props.meal.meal_images.slice(1).map((image, index) => {
                               return(
                                <React.Fragment key={index}>
                                {image.length > 0 &&
                                <Image key={index} alt={props.props.meal.meal_name} src={image}
                                height={300} width={300}
                                className={styles.meal_section_2_image} />
                                }
                                </React.Fragment>
                               ) 
                            })}
                            </>
                            }

                        </div>
                    </div>
                    <div className={styles.meal_section_2_col_2}>
                        <div className={styles.meal_section_2_details}>
                            <h2 className={styles.meal_section_2_name}>{props.props.meal.meal_name}</h2>
                            <div className={styles.store}>
                                <h4>Chop Chow Store</h4>
                                {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                                <div>
                                    <LocationIcon style={styles.store_icon} />
                                    <p>6391 Elgin St. Celina, Delaware 10299</p>
                                </div>
                                } */}
                            </div>
                            <div className={styles.meal_section_32}>
                                <div className={styles.meal_details}>
                                    <div className={styles.hide}>
                                        <h3>Serves: </h3>
                                        <p>{serves}</p>
                                    </div>
                                    <div>
                                        <h3>PrepTime:</h3>
                                        <p>{props.props.meal.prep_time} Minutes</p>
                                    </div>
                                    <div>
                                        <h3>CookTime : </h3>
                                        <p>{props.props.meal.cook_time} Minutes </p>
                                    </div>
                                    <div>
                                        <h3>Chef:</h3>
                                        <p>{props.props.meal.chef}</p>
                                    </div>
                                </div>
                                <div className={styles.meal_details}>
                                    <div>
                                        <h3>intro: </h3>
                                        <p>{props.props.meal.intro}</p>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.meal_section_2_description}>
                                {props.props.meal.intro}
                            </p>
                            <div className={styles.meal_section_2_categories}>
                                <h3 className={styles.meal_section_2_category_name}>Product Category</h3>
                                {/* <p className={styles.meal_section_2_category}>
                                    {props.props.meal.meal_categories.length > 0 &&
                                    <>
                                    {JSON.parse(props.props.meal.meal_categories[0]).map((cat, j) => <span key={j}>{cat} &nbsp; &nbsp;</span>)}
                                    </>
                                    }
                                </p> */}
                            </div>
                        </div>
                        {
                            props.props.meal.publicly_available === 'Public' && props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                        
                            <div className={styles.meal_section_2_price}>
                                <h3>Price</h3>
                                <p>$7.65<span>/piece</span></p>
                            </div>
                        }
                    </div>
                </div>
                {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                <div className={styles.section_2_footer}>
                    <div className={styles.hide}>
                        <p><ShareIcon />Share this product:</p>
                        <FacebookShareButton>
                            <FacebookEIcon quote={props.props.meal.intro} url={url+'meal/'+props.props.meal._id} />
                        </FacebookShareButton>
                        <TwitterShareButton title={props.props.meal.meal_name} url={url+'meal/'+props.props.meal._id}>
                            <TwitterEIcon />
                        </TwitterShareButton>
                        <InstapaperShareButton title={props.props.meal.meal_name} url={url+'meal/'+props.props.meal._id}>
                            <InstaEIcon />
                        </InstapaperShareButton>
                        <WhatsappShareButton title={props.props.meal.meal_name} url={url+'meal/'+props.props.meal._id} >
                            <WhatsappEIcon />
                        </WhatsappShareButton>
                    </div>
                    <div className={styles.hide}>
                        <p>Print Preview</p>
                        <PrintEIcon />
                    </div>
                    {
                            props.props.meal.publicly_available === 'Public' && props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                    <div className={styles.btnGroup}>
                        <div className={styles.btnoutline}>Add to Grocery List</div>
                        <div className={styles.btnfill}>Add to Cart</div>
                    </div>}
                </div>
                } */}
                <div className={styles.meal_section_3}>
                    <div className={styles.meal_details}>
                        <div className={styles.hide}>
                            <h3>Serves: </h3>
                            <div><p onClick={() => addServe(-1)}>-</p>{serves}<p onClick={() => addServe(1)}>+</p></div>
                        </div>
                        <div>
                            <h3>PrepTime:</h3>
                            <p>{props.props.meal.prep_time} Minutes</p>
                        </div>
                        <div>
                            <h3>CookTime : </h3>
                            <p>{props.props.meal.cook_time} Minutes </p>
                        </div>
                        <div>
                            <h3>Chef:</h3>
                            <p>{props.props.meal.chef}</p>
                        </div>
                    </div>
                </div>
                {props.props.meal.formatted_instructions &&
                <div className={styles.meal_section_4}>
                    <div className={styles.ingredient_container}>
                        <h3>Ingredients</h3>
                        <div className={styles.ingredient_groups}>
                            <div className={styles.ingredients_head} style={{backgroundColor: 'transparent'}}>
                                <div></div>
                                <div className={styles.ingredients_th}>Names</div>
                                <div className={styles.ingredients_th + ' ' + styles.hide} style={{textAlign: 'center'}}>Quantity</div>
                                <div className={styles.ingredients_th + ' ' + styles.hide}>Measurement</div>
                                <div className={styles.ingredients_th} style={{textAlign: 'center'}}>Availability in store</div>
                                <div className={styles.ingredients_th}>Price</div>
                            </div>
                            <div className={styles.ingredients_body}>
                                <div className={styles.ingredients_table}>
                                    <div>
                                        {props.props.meal.formatted_ingredients.length > 0 &&
                                        <>
                                        {props.props.meal.formatted_ingredients.map((ingredient, index) => {
                                            return(
                                                <div key={index} className={styles.ingredients_tr}>
                                                    <input name='id' type="checkbox" />
                                                    <div style={{color: '#000000'}} className={styles.ingredients_td}>{JSON.parse(ingredient).product_name}</div>
                                                    <div className={styles.ingredients_td + ' ' + styles.hide} style={{textAlign: 'center'}}>{serves === parseInt(props.props.meal.servings) ? JSON.parse(ingredient).quantity : JSON.parse(ingredient).quantity * serves }</div>
                                                    <div className={styles.ingredients_td + ' ' + styles.hide}>{JSON.parse(ingredient).measurement}</div>
                                                    <div className={styles.ingredients_td} style={{textAlign: 'center'}}></div>
                                                    <div className={styles.ingredients_td}>Unavailable</div>
                                                </div>
                                            )
                                        })}
                                        </>
                                        }
                                    
                                    </div>
                                </div>
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
                        {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                        <div className={styles.btnGroup}>
                            <div className={styles.btnoutline}>Add to Grocery List</div>
                            <div className={styles.btnfill}>Add to Cart</div>
                        </div>} */}
                    </div>
                </div>
                }
                {props.props.meal.formatted_instructions &&
                <div className={styles.meal_section_5}>
                    <h3>Steps</h3>
                    {/* {props.props.meal.formatted_instructions.length > 0 &&
                    <>
                        {JSON.parse(props.props.meal.formatted_instructions[0]).map((instruction, index) => {
                            return(
                                <div key={index} className={styles.meal_section_5_row}>
                                    <div className={styles.meal_section_5_row_1}>
                                        {props.props.meal['image_or_video_content_'+index+1] && props.props.meal['image_or_video_content_'+index][0] !== '' ? 
                                        <Image
                                        width={300}
                                        height={300}
                                            src={props.props.meal['image_or_video_content_'+index+1][0]}
                                            alt="home"
                                            className={styles.meal_section_5_row_1}
                                        />:
                                        <p></p>}
                                    </div>
                                    <div className={styles.meal_section_5_row_2}>
                                        <h3 className={styles.meal_section_5_row_2_h3}>
                                            {instruction.title}
                                        </h3>
                                        <p className={styles.meal_section_5_row_2_p}>
                                            {instruction.instructionSteps?.map((int) => <> {int + ' '} </>) }
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                    } */}
                    
                </div>}

                <div className={styles.meal_section_6}>
                    <h3>Meal Categories</h3>
                    {/* <ul>
                        {props.props.meal.meal_categories.length > 0 &&
                        <>
                        {JSON.parse(props.props.meal.meal_categories[0]).map((cat, index) => <li key={index}>{cat}</li>)}
                        </>
                        }
                    </ul> */}
                </div>

                <div className={styles.meal_section_7}>
                    <h3>Tips</h3>
                    <div>
                        {props.props.meal.tips && props.props.meal.tips.length > 0 &&
                        <ul>
                            {JSON.parse(props.props.meal.tips[0]).map((tip, index) => {
                                return(
                                    <li key={index}>{tip}</li>
                                )
                            })
                            
                            }
                        </ul>
                        }
                    </div>
                </div>

                {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                <div className={styles.meal_section_8}>
                    <h3>Stores location</h3>
                    <Stores />
                </div>
                } */}

                {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                <div className={styles.meal_section_8}>
                    <h3>Add Review</h3>
                    <Reviews />
                </div>
                } */}

                <div className={styles.productcard_row}>
                    <div className={styles.productcard_col_1}>
                        <h3>Related Meal</h3>
                    </div>
                    <div className={styles.productcard_col_2}>
                        <div className={styles.productcard_productcards}>
                            {props.props.meal.similar_meals.map((data, index) => {
                                return(
                                <div key={index} className={styles.productcard_productcard}>
                                    {data.meal_images && 
                                    <div className={styles.productcard_productcard_img_container}>
                                    {data.meal_images && data.meal_images.length > 0 && data.meal_images[0].length > 0 && data.meal_images[0] !== "[object HTMLImageElement]" &&
                                    <Image
                                        priority
                                        src={data.meal_images[0]}
                                        alt="Related Meal"
                                        height={500} width={500}
                                        className={styles.productcard_productcard_img}
                                    />
                                    }
                                    </div>}
                                    <div className={styles.productcard_productcard_col}>
                                        <h6 className={styles.productcard_productcard_name}>{data.meal_name}</h6>
                                        <p className={styles.productcard_productcard_duration}>
                                            {data.cook_time} min
                                        </p>
                                    </div>
                                    <div className={styles.productcard_productcard_col}>
                                        {/* <div className={styles.product_review_rating_icons}>
                                            {
                                                Array.from({ length: 5 }).map((i,j) => {
                                                    var rate = 4;
                                                    if((j+1) <= rate){
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon} />
                                                        )
                                                    }else{
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon2} />
                                                        )}
                                                })
                                            }
                                        </div> */}
                                        <p className={styles.productcard_productcard_price}>
                                            {/* $666 */}
                                        </p>
                                    </div>
                                </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default Meal;