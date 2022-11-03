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

    render() {

        const { popup, imageData, imagesData, name, description, categories, descriptionsList, ingredientList, sizesList } = this.props

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
                                />
                                <div className={styles.popup_images}>
                                    {
                                        imagesData.map((data, index) =>
                                            <Image key={index} alt="pop up" src={data} className={styles.popup_image} />
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
                            </div>


                        </div>
                    </div>}
            </>
        )
    };

}

export default Popup1;