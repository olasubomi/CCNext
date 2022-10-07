import React, { Component } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import './popup.css';


class Popup1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_fetched: false,
        };
    }

    render() {

        const { imageData, imagesData, name, description, categories, quantity, sizesList } = this.props

        return (
            <>
            {this.props.openModal &&
            <div className="popup_container">
                <div className="popup">
                <div className="popup_col_1">
                    <img
                        src={imageData}
                        alt="pop up"
                        className="popup_main_img"
                        />
                    <div className="popup_images">
                        {
                            imagesData.map((data, index) => 
                                <img key={index} alt="pop up" src={data} className="popup_image" />
                            )
                        }
                        
                    </div>
                    <div className="popup_categories2">
                        <h3 className="popup_category_name">Product Category</h3>
                        <p className="popup_category">{categories.map((cat) => cat + ', ')}</p>
                    </div>
                </div>
                <div className="popup_col_2">
                    <div className="popup_top">
                    <div></div>
                    <CancelIcon onClick={this.props.closeModal} className="popup2_cancel_con" />
                    </div>
                    <div className="popup_details">
                        <h2 className="popup_name">{name}</h2>
                        <p className="popup_description">
                            {description}
                        </p>
                        <div className="popup_categories">
                            <h3 className="popup_category_name">Product Category</h3>
                            <p className="popup_category">{categories.map((cat) => cat + ', ')}</p>
                        </div>
                        <div className="popup_sizes">
                            <h3>Sizes</h3>
                            <div className="popup_size">
                                {sizesList.map((sizeSyntax, index) => 
                                    <React.Fragment key={index}>
                                        <p>{sizeSyntax}</p>
                                    </React.Fragment>
                                )}
                                
                            </div>
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