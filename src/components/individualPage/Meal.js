import React, { useState } from "react";
import styles from "./meal.module.css";

import Head from "next/head";
import Image from "next/image";
import { FacebookEIcon, InstaEIcon, LocationIcon, PrintEIcon, ShareIcon, TwitterEIcon, WhatsappEIcon, EmailIcon, CallIcon } from "../icons";
import Stores from "./stores";
import Reviews from "./Reviews";
import { UserIcon} from "../icons";

function Meal(props) {
    const url = 'http://localhost:3000/'

    const [serves, setServes] = useState(parseInt(props.meal?.servings))

    // useEffect(() => {
    //     setServes(parseInt(props.props.meal.servings))
    // })

    function addServe(val) {
        let s = serves + val;
        if (s >= props.meal.servings) {
            setServes(s)
        }
    }

    // console.log(props.props.props.props.meal, "meal props.props")
    let num = 0;

    console.log('meald data', props.meal)
    console.log(props.meal.item_images, 'serve me')
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
                            {props.meal.item_images?.length > 0 &&
                                <>
                                    {(props.meal.itemImage0?.length > 0 && props.meal.itemImage0 !== "[object HTMLImageElement]") ?
                                        <Image
                                            src={props.meal.itemImage0}
                                            alt={props.meal.item_name}
                                            className={styles.meal_section_2_main_img}
                                            height={500} width={500}
                                        /> : <span></span>
                                    }
                                </>
                            }
                            <div className={styles.meal_section_2_images}>
                                {props.meal.item_images?.length > 1 &&
                                    <>
                                        {props.meal.item_images.slice(1).map((image, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {image.length > 0 &&
                                                        <Image key={index} alt={props.meal.item_name} src={image}
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
                                <h2 className={styles.meal_section_2_name}>{props.meal.item_name}</h2>
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
                                            <p>{props.meal.meal_servings}</p>
                                        </div>
                                        <div>
                                            <h3>PrepTime:</h3>
                                            <p>{props.meal.meal_prep_time} Minutes</p>
                                        </div>
                                        <div>
                                            <h3>CookTime : </h3>
                                            <p>{props.meal.meal_cook_time} Minutes </p>
                                        </div>
                                        <div>
                                            <h3>Chef:</h3>
                                            <p>{props.meal.meal_chef}</p>
                                        </div>
                                    </div>
                                    <div className={styles.meal_details}>
                                        <div>
                                            <h3>intro: </h3>
                                            <p>{props.meal.item_intro}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.meal_section_2_description}>
                                    {props.meal.item_intro}
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
                                props.meal.publicly_available === 'Public' && props.auth.authUser && props.auth.authUser.user_type !== 'admin' &&

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
                            props.meal.publicly_available === 'Public' && props.auth.authUser && props.auth.authUser.user_type !== 'admin' &&

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
                                <div><p onClick={() => addServe(-1)}>-</p>{props.meal.meal_servings}<p onClick={() => addServe(1)}>+</p></div>
                            </div>
                            <div>
                                <h3>Prep time:</h3>
                                <p>{props.meal.meal_prep_time} Minutes</p>
                            </div>
                            <div>
                                <h3>Cook time : </h3>
                                <p>{props.meal.meal_cook_time} Minutes </p>
                            </div>
                            <div>
                                <h3>Chef:</h3>
                                <p>{props.meal.meal_chef}</p>
                            </div>
                        </div>

                    </div>
                    {props.meal.meal_formatted_instructions &&
                        <div className={styles.meal_section_4}>
                            <div className={styles.ingredient_container}>
                                <h3>Ingredients</h3>
                                <div className={styles.ingredient_groups}>
                                    <div className={styles.ingredients_head} style={{ backgroundColor: 'transparent' }}>
                                        <div></div>
                                        <div className={styles.ingredients_th}>Names</div>
                                        <div className={styles.ingredients_th + ' ' + styles.hide} style={{ textAlign: 'center' }}>Quantity</div>
                                        <div className={styles.ingredients_th + ' ' + styles.hide}>Measurement</div>
                                        <div className={styles.ingredients_th} style={{ textAlign: 'center' }}>Availability in store</div>
                                        <div className={styles.ingredients_th}>Price</div>
                                    </div>
                                    <div className={styles.ingredients_body}>
                                        <div className={styles.ingredients_table}>
                                            <div>
                                                {props.meal.formatted_ingredients.length > 0 &&
                                                    <>
                                                        {props.meal.formatted_ingredients.map((ingredient, index) => {
                                                            return (
                                                                <div key={index} className={styles.ingredients_tr}>
                                                                    <input name='id' type="checkbox" />
                                                                    <td className={styles.td}>{ingredient.split('of').length > 1 ? ingredient.split('of')[1] : ingredient.split(' ')[1]}</td>
                                                                    <td className={styles.td}>{ingredient.split('of').length > 1 ? ingredient.split(' ')[0] : ingredient.split(' ')[0]}</td>
                                                                    <td className={styles.td}>{ingredient.split('of').length > 1 ? ingredient.split(' ')[1] : ''}</td>
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
                    {props.meal.formatted_instructions &&
                        <div className={styles.meal_section_5}>
                            <h3>Steps</h3>
                            {props.meal.formatted_instructions.length > 0 &&
                                <>
                                    {props.meal.meal_formatted_instructions?.map((instruction, index) => {
                                        num = index + 1
                                        console.log(index + 1)
                                        return (
                                            <div key={index} className={styles.meal_section_5_row}>
                                                <div className={styles.meal_section_5_row_1}>
                                                    {props.meal.hasOwnProperty([`meal_image_or_video_content_${Math.abs(index + 1)}`]) &&
                                                        <Image
                                                            width={300}
                                                            height={300}
                                                            src={props.meal[`meal_image_or_video_content_${Math.abs(index + 1)}`]}
                                                            alt="home"
                                                            className={styles.meal_section_5_row_1}
                                                        />}
                                                </div>
                                                <div className={styles.meal_section_5_row_2}>
                                                    <h3 className={styles.meal_section_5_row_2_h3}>
                                                        {meal_formatted_instructions.title}
                                                    </h3>
                                                    <p className={styles.meal_section_5_row_2_p}>
                                                        {meal_formatted_instructionsinstructionSteps?.map((int) => <> {int + ', '} </>)}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }

                        </div>}

                    <div className={styles.meal_section_6}>
                        <h3>Meal Categories</h3>
                        <ul>
                            {props.meal.item_categories?.length > 0 &&
                                <>
                                    {props.meal.item_categories.map((cat, index) => <li key={index}>{cat.category_name}</li>)}
                                </>
                            }
                        </ul>
                    </div>


                    <div className={styles.meal_section_7}>
                        <h3>Tips</h3>
                        <div>
                            {props.meal.meal_tips && props.meal.meal_tips?.length > 0 &&
                                <ul>
                                    {props.meal.meal_tips.map((tip, index) => {
                                        return (
                                            <li key={index}>{tip}</li>
                                        )
                                    })

                                    }
                                </ul>
                            }
                        </div>
                    </div>
                    {/* <div className={styles.reject_card}>
                        <h3>Posted By</h3>
                        <div className={styles.flex_card}>
                            <div className={styles.cards}>
                                <div className={styles.flex}>
                                    <UserIcon style={styles.users} />
                                    <p className={styles.info}>{props.meal.item_data?.chef}</p>
                                </div>
                                <div className={styles.flex}>
                                    <p>Posted on: </p>
                                    <p className={styles.info}>10 June, 2023</p>
                                </div>
                            </div>
                            <div className={styles.flex}>
                                <EmailIcon style={styles.users} />
                                <p className={styles.info}>Olatundun@gmail.com</p>
                            </div>
                            <div className={styles.flex}>
                                <CallIcon style={styles.users} />
                                <p className={styles.info}>+2348064667542</p>
                            </div>
                            <div className={styles.flex}>
                                <LocationIcon style={styles.users}/>
                                <p className={styles.info}>Lagos, Nigeria</p>
                            </div>
                        </div>
                        <div className={styles.admin_buttons}>
                            <div className={styles.submit_button}>
                                <p>Reject</p>
                            </div>
                            <div className={styles.submit_button2}>
                                <p>Accept Request</p>
                            </div>
                        </div>
                    </div> */}

                    {props.props?.auth?.authUser && props.props?.auth?.authUser?.user_type !== 'admin' &&
                <div className={styles.meal_section_8}>
                    <h3>Stores location</h3>
                    <Stores />
                </div>

                } 

                   {/* {props.props?.auth?.authUser && props.props?.auth?.authUser?.user_type !== 'admin' && */}
                <div className={styles.meal_section_8}>
                    <h3>Add Review</h3>
                    <Reviews itemId={props.meal._id} />
                </div>

                

                    <div className={styles.productcard_row}>
                        <div className={styles.productcard_col_1}>
                            <h3>Related Meal</h3>
                        </div>
                        <div className={styles.productcard_col_2}>
                            <div className={styles.productcard_productcards}>
                                {/* {props.meal.similar_meals.map((data, index) => {
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
                                {/* <p className={styles.productcard_productcard_price}> */}
                                {/* $666 */}
                                {/* </p>
                                    </div>
                                </div> */}



                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Meal;