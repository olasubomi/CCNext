import React, { Component } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Image from 'next/image';
import printImage from "../../../public/assets/logos/print.png";
import twitterImage from "../../../public/assets/logos/twitter.png";
import facebookImage from "../../../public/assets/logos/facebook.png";
import instagramImage from "../../../public/assets/logos/instagram.png";
import styles from './popup2.module.css';
import ReactToPrint from 'react-to-print';
import ComponentToPrint from "../mealsPage/ComponentToPrint";


class Popup2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
            curIn: 1
        };
    }

    incIn = () => {
        this.setState({
            curIn: this.state.curIn + 1
        })
    }

    decIn = () => {
        this.setState({
            curIn: this.state.curIn - 1
        })
    }

    edit = () => {
        const { name, description, categories, ingredientsList, ingredientGroupList, cookTime, prepTime, serves, instructionChunk1, instructionChunk2, instructionChunk3, instructionChunk4, instructionChunk5, instructionChunk6 } = this.props
        var stepInputs = []
        if(instructionChunk1){
            stepInputs = []
        }
        if(instructionChunk2){
            stepInputs = [2]
        }

        if(instructionChunk3){
            stepInputs = [2,3]
        }

        if(instructionChunk4){
            stepInputs = [2,3,4]
        }

        if(instructionChunk5){
            stepInputs = [2,3,4,5]
        }

        if(instructionChunk6){
            stepInputs = [2,3,4,5,6]
        }

        let group = ingredientGroupList.map(ingredient => {
            return {
                productName: ingredient.product_name?.join(" "),
                // productImgFile: this.state.currentProductImgSrc,
                productImgPath: null,
          
                // these are added to ingredient packets on submit, and not relevant in product object details
                quantity: ingredient.quantity,
                measurement: ingredient.measurement,
                properIngredientStringSyntax: ingredient.properIngredientStringSyntax
            }
        })

        let meal = {
            mealId: this.props.id, 
            mealName: name,
            intro: description,
  
            // ingredientNames,
            // do we need product group list AND strings ?
            ingredientGroupList: group,
            // store product names of inputted strings to compare with db products
            ingredientStrings: ingredientsList,
            // do we want to use current ingredient formats ? Yes.
            // currentIngredient,
            // currentIngredientMeasurement,
            // currentIngredientQuantity,
            // currentProductImgSrc,
            // currentProductDisplayIndex,
  
            // currentStore,
  
            // we need to update how we create image paths
            // productImg_path,
            // new_product_ingredients,
            // suggested_stores,
            // currProductIndexInDBsProductsList,
            // currStoreIndexIfExistsInProductsList,
            suggestedUtensils: this.props.utensilsList,
  
            cookTime: cookTime,
            prepTime: prepTime,
  
            instructionChunk6: this.props.instructionChunk6,
            instructionChunk1: this.props.instructionChunk1,
            instructionChunk2: this.props.instructionChunk2,
            instructionChunk3: this.props.instructionChunk3,
            instructionChunk4: this.props.instructionChunk4,
            instructionChunk5: this.props.instructionChunk5,
            instructionWordlength: this.props.instructionWordlength,
  
            // do we want all the instruction variables ?
            // instructionGroupList:[],
  
            // instructionimagesAndVideos,
  
            // chef,
            suggestedCategories: categories,
            servings: serves,
            tips: this.props.tips,
            stepInputs: []
        }
        localStorage.setItem('suggestionType', 'Meal')
        localStorage.setItem('mealId', this.props.id,)
        localStorage.setItem('suggestMealForm', JSON.stringify(meal))
        window.location.assign('/suggestmeal')
        
    }

    render() {

        const { popupType, imageData, imagesData, name, description, categories, ingredientsList } = this.props
        const { curIn } = this.state;

        var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;
        var allowedVideoExtensions = /(\.mp4|\.m4v|\.)$/i;
        return (
            <>
                {this.props.openModal &&
                    <div className={styles.popup2_container}>
                        <div className={styles.popup2}>
                            <div className={styles.popup2_top}>
                                <h2>{popupType}</h2>
                                <CancelIcon onClick={this.props.closeModal} className={styles.popup2_cancel_con} />
                            </div>
                            <div className={styles.popup2_row_2}>
                                <div className={styles.popup2_col_1}>
                                    <div className={styles.img_col}>
                                        {imageData !== '' &&
                                            <Image
                                                src={imageData}
                                                alt="pop up"
                                                className={styles.popup2_main_img}
                                                height={"100%"} width={"100%"}
                                            />}
                                        {imagesData.length > 0 &&
                                            <div className={styles.popup2_images}>
                                                {
                                                    imagesData.map((data, index) =>
                                                        <Image key={index} alt="pop up" src={data}
                                                            className={styles.popup2_image}
                                                            height={"100%"} width={"100%"} />
                                                    )
                                                }

                                            </div>}
                                    </div>
                                    <div className={styles.del}>
                                        <h2 className={styles.popup2_name}>{name}</h2>
                                        <ul className={styles.popup2_del}>
                                            <li><p>CookTime:</p><h5>{this.props.cookTime} Minute{parseInt(this.props.cookTime) > 1 ? 's' : ''}</h5></li>
                                            <li><p>PrepTime:</p><h5>{this.props.prepTime} Minute{parseInt(this.props.prepTime) > 1 ? 's' : ''}</h5></li>
                                            <li><p>Serves:</p><h5>{this.props.serves} {parseInt(this.props.serves) > 1 ? 'people' : 'person'}</h5></li>
                                            <li><p>Chef:</p><h5>{this.props.chef}</h5></li>
                                        </ul>
                                        <p className={styles.popup2_description}>
                                            Intro:<br />
                                            {description}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.popup2_col_2}>
                                    <div className={styles.popup2_details}>
                                        <div style={{ overflowY: "scroll" }}>
                                            <h3 className={styles.popup2_category_name}>Ingredients</h3>
                                            <table>
                                                <tr>
                                                    <th>Names</th>
                                                    <th>Quantity</th>
                                                    <th>Measurement</th>
                                                </tr>
                                                {ingredientsList.map((ingredient, index) => (
                                                    <tr key={index}>
                                                        <td>{ingredient.split('of').length > 1 ? ingredient.split('of')[1] : ingredient.split(' ')[1]}</td>
                                                        <td>{ingredient.split('of').length > 1 ? ingredient.split(' ')[0] : ingredient.split(' ')[0]}</td>
                                                        <td>{ingredient.split('of').length > 1 ? ingredient.split(' ')[1] : ''}</td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </div>
                                        <div className={styles.popup2_categories}>
                                            <h3 className={styles.popup2_category_name}>Meal Category</h3>
                                            <p className={styles.popup2_category}>{categories.map((cat) => <span>{cat} &nbsp; &nbsp;</span>)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.popup2_col_3}>
                                    <h2>Recipe Steps</h2>
                                    <div className={styles.popup2_steps}>
                                        {this.props['instructionChunk' + curIn].title !== '' &&
                                            <>
                                                {allowedImageExtensions.exec(this.props['instructionChunk' + curIn].dataName) && this.props['chunk' + curIn + 'Content'] !== undefined &&
                                                    <Image
                                                        src={this.props['chunk' + curIn + 'Content']}
                                                        alt={this.props['instructionChunk' + curIn].title}
                                                        className={styles.popup2_step_img}
                                                        height={"100%"} width={"100%"}
                                                    />}

                                                {allowedVideoExtensions.exec(this.props['instructionChunk' + curIn].dataName) && this.props['chunk' + curIn + 'Content'] !== undefined &&
                                                    <video className={styles.popup2_step_img} src={this.props['chunk' + curIn + 'Content']} controls>
                                                        Your browser does not support the video tag.
                                                    </video>}
                                                <div className={styles.del}>
                                                    <h2 className={styles.popup2_step_name}>{this.props['instructionChunk' + curIn].title}</h2>
                                                    <p className={styles.popup2_instructions}>
                                                        {this.props['instructionChunk' + curIn].instructionSteps && this.props['instructionChunk' + curIn].instructionSteps.map((step, index) => (index + 1) + ". " + step + " ")}
                                                    </p>
                                                </div>
                                            </>
                                        }
                                        {this.props['instructionChunk' + (curIn + 1)] !== undefined &&
                                            <ArrowCircleRightIcon onClick={this.incIn} className={styles.popup2_inc_con} />}
                                        {curIn > 1 &&
                                            <ArrowCircleLeftIcon onClick={this.decIn} className={styles.popup2_dec_con} />}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.popup2_footer}>
                                <p>Share this product</p>
                                <Image src={facebookImage} alt='facebook'
                                    height={"100%"} width={"100%"} />
                                <Image src={instagramImage} alt='instagram'
                                    height={"100%"} width={"100%"} />
                                <Image src={twitterImage} alt='twitter'
                                    height={"100%"} width={"100%"} />
                                <ReactToPrint
                                    trigger={() => {
                                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                        // to the root node of the returned component as it will be overwritten.
                                        return <div>
                                            <Image alt='print' src={printImage}
                                                height={"100%"} width={"100%"} /></div>;
                                    }}
                                    content={() => this.componentRef}
                                />
                                {this.props.suggested && 
                                <button onClick={this.edit} className={styles.edit_button2}>Edit</button>
                                }
                                <div style={{ display: 'none' }}>
                                    <ComponentToPrint ref={el => (this.componentRef = el)}
                                        mealName={this.props.name} mealImage={this.props.image}
                                        categories={this.props.categories}
                                        prepTime={this.props.prepTime} cookTime={this.props.cookTime}
                                        serves={this.props.serves} componentRef={this.componentRef}
                                        openModal={this.props.openModal} closeModal={this.props.closeModal}
                                        ingredientsList={this.props.ingredientsList} utensilsList={this.props.utensilsList}
                                        instructionChunk1={this.props.instructionChunk1} instructionChunk2={this.props.instructionChunk2}
                                        instructionChunk3={this.props.instructionChunk3} instructionChunk4={this.props.instructionChunk4}
                                        instructionChunk5={this.props.instructionChunk5} instructionChunk6={this.props.instructionChunk6}
                                        chunk1Content={this.props.chunk1Content} chunk2Content={this.props.chunk2Content}
                                        chunk3Content={this.props.chunk3Content} chunk4Content={this.props.chunk4Content}
                                        chunk5Content={this.props.chunk5Content} chunk6Content={this.props.chunk6Content}
                                        instructionWordlength={this.props.instructionWordlength}
                                        tips={this.props.tips} mealImageData={this.props.imageData}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>}
            </>
        )
    };

}

export default Popup2;