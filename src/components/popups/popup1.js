import React, { Component } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './popup.module.css';
import Image from 'next/image';



class Popup1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
        };
    }

    edit = () => {
        const { name, description, categories, ingredientList, sizesList, ingredientGroupList } = this.props;
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
        console.log(this.props, DISPLAY)
        console.log(group)
        let product = {
            productName: name,
            productDescription: description,
  
            // ingredientNames,
            // do we need product group list AND strings ?
            ingredientGroupList: group,
            // descriptionGroupList,
            sizeGroupList: sizesList,
            // store product names of inputted strings to compare with db products
            ingredientStrings: ingredientList,
            // nutritionalStrings,
            sizeStrings: sizesList,
            // do we want to use current ingredient formats ? Yes.
            // currentIngredient,
            // currentIngredientMeasurement,
            // sizeQuantity,
            // sizeMeasurement,
            // currentIngredientQuantity,
            // currentProductImgSrc,
            // currentProductDisplayIndex,
  
            // currentStore,
            // quantity,
  
            // we need to update how we create image paths
            // productImg_path,
            // new_product_ingredients,
            // currProductIndexInDBsProductsList,
            // currStoreIndexIfExistsInProductsList,
            suggestedCategories: categories,
        }
        localStorage.setItem('suggestionType', 'Product')
        localStorage.setItem('productId', this.props.id,)
        localStorage.setItem('suggestProductForm', JSON.stringify(product))
        window.location.assign('/suggestmeal')
        
    }

    render() {

        // const { popup, imageData, imagesData, name, description, categories, descriptionsList, ingredientList, sizesList, nutritionalStrings } = this.props
        // console.log(ingredientList)
        console.log(this.props, "DISPLAY")

        return (
            <>
                {this.props.openModal &&
                    <div className={styles.popup_container}>
                        <div className={styles.popup}>
                            <div className={styles.popup_col_1}>
                                <Image
                                    src={imageData}
                                    alt="pop up"
                                    className={styles.popup_main_img}
                                    height={"100%"} width={"100%"}
                                />
                                <div className={styles.popup_images}>
                                    {/* {console.log(imageData)} */}
                                    {
                                        imagesData.map((data, index) =>
                                            <Image key={index} alt="pop up" src={data}
                                                height={"100%"} width={"100%"}
                                                className={styles.popup_image} />
                                        )
                                    }

                                </div>
                                <div className={styles.popup_categories2}>
                                    <h3 className={styles.popup_category_name}>Product Category</h3>
                                    <p className={styles.popup_category}>{categories.map((cat) => cat + ', ')}</p>
                                </div>
                            </div>
                            <div className={styles.popup_col_2}>
                                <div className={styles.popup_top}>
                                    <div></div>
                                    <CancelIcon onClick={this.props.closeModal} className={styles.popup2_cancel_con} />
                                </div>
                                <div className={styles.popup_details}>
                                    <h2 className={styles.popup_name}>{name}</h2>
                                    <p className={styles.popup_description}>
                                        {description}
                                    </p>
                                    {popup === 'product' &&
                                        <React.Fragment>
                                            <div className={styles.popup_categories}>
                                                <h3 className={styles.popup_category_name}>Product Ingredients</h3>
                                                <p className={styles.popup_category}>{ingredientList.map((ingredient) => {
                                                    return (ingredient.split('of').length > 1 ?
                                                        ingredient.split('of')[1] + '(' + ingredient.split(' ')[0] + ingredient.split(' ')[1] + ')' :
                                                        ingredient.split(' ')[1] + ingredient.split(' ')[0]) + ', '
                                                })}
                                                </p>
                                            </div>
                                            <div className={styles.popup_sizes}>
                                                <h3>Size</h3>
                                                <div className={styles.popup_size}>
                                                    {sizesList.map((sizeSyntax, index) =>
                                                        <React.Fragment key={index}>
                                                            <p>{sizeSyntax}</p>
                                                        </React.Fragment>
                                                    )}

                                                </div>
                                            </div>
                                            {/* <div>
                                                <p>
                                                    {nutritionalStrings}
                                                </p>
                                            </div> */}
                                        </React.Fragment>
                                    }
                                    {popup === 'kitchen' &&
                                        <div className={styles.popup_sizes}>
                                            <h3>Descriptions</h3>
                                            <div className={styles.popup_size}>
                                                {descriptionsList.map((descriptionSyntax, index) =>
                                                    <React.Fragment key={index}>
                                                        <p>{descriptionSyntax.split('-')[1]}</p>
                                                        <div></div>
                                                        <p>{descriptionSyntax.split('-')[0]}</p>
                                                    </React.Fragment>
                                                )}

                                            </div>
                                        </div>
                                    }
                                    <div className={styles.popup_categories}>
                                        <h3 className={styles.popup_category_name}>Product Category</h3>
                                        <p className={styles.popup_category}>{categories.map((cat) => cat + ', ')}</p>
                                    </div>
                                </div>
                                {this.props.suggested && 
                                <button onClick={this.edit} className={styles.edit_button2}>Edit</button>
                                }
                            </div>


                        </div>
                    </div>}
            </>
        )
    };

}

export default Popup1;