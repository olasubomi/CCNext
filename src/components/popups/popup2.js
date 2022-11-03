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
                                            />}
                                        {imagesData.length > 0 &&
                                            <div className={styles.popup2_images}>
                                                {
                                                    imagesData.map((data, index) =>
                                                        <Image key={index} alt="pop up" src={data} className={styles.popup2_image} />
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
                                                    />}

                                                {allowedVideoExtensions.exec(this.props['instructionChunk' + curIn].dataName) && this.props['chunk' + curIn + 'Content'] !== undefined &&
                                                    <video className={styles.popup2_step_img} src={this.props['chunk' + curIn + 'Content']} controls>
                                                        Your browser does not support the video tag.
                                                    </video>}
                                                <div className={styles.del}>
                                                    <h2 className={styles.popup2_step_name}>{this.props['instructionChunk' + curIn].title}</h2>
                                                    <p className={styles.popup2_instructions}>
                                                        {this.props['instructionChunk' + curIn].instructionSteps.map((step, index) => (index + 1) + ". " + step + " ")}
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
                                <Image src={facebookImage} alt='facebook' />
                                <Image src={instagramImage} alt='instagram' />
                                <Image src={twitterImage} alt='twitter' />
                                <ReactToPrint
                                    trigger={() => {
                                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                        // to the root node of the returned component as it will be overwritten.
                                        return <div>
                                            <Image alt='print' src={printImage} /></div>;
                                    }}
                                    content={() => this.componentRef}
                                />
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