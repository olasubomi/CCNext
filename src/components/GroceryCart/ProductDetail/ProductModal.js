import React from 'react';
// import './ProductModal.scss';
import {  Row, Col} from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class ProductModal extends React.Component {
    gotoViewPage = (customerId, productID) => {
        const url = `/product-detail/${customerId}/${productID}`;
        this.props.history.push(url);
    }
    render() {
        const { product_img, product_name, productID, customerId} = this.props.state;
        return (
            <div style={{
                position: "fixed",
                top: "0px",
                left: "0px",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(255,255,255,0.6)",
                zIndex: "9999"
            }}>
                <div style={{ display: "flex", height: "100%" }}>
                    <div className="product-detail-modal">
                        <div className="product-detail-panel">
                            <div className="close-btn" style={{ fontSize: "12px", textAlign: "right" }}  onClick={this.props.onCloseClicked}>
                                <i className="fa fa-remove"></i>
                            </div>
                            <Row>
                                <Col md={6} style={{ textAlign: "center" }}>
                                    <img src={product_img} width="100%" className="product-img" alt=""/>
                                </Col>
                                <Col md={6}>
                                    <div className="detail-info-panel" style={{ marginLeft: "10px", marginRight: "20px" }}>
                                        <div className="product-name">{product_name}</div>
                                        <div className="product-name-descript">Description Lorem Ipsum Dolor Sit Amet</div>
                                        <div className="product-size-panel">
                                            <div className="product-info" >
                                                <div className="product-size-item">32 oz tub (Medium)-$9.99</div>
                                                <div className="product-size-place">from Lizi Gidi Market</div>
                                            </div>
                                            <div>
                                                <input type="text" className="product-count" />
                                            </div>
                                        </div>
                                        <div className="product-size-panel">
                                            <div className="product-info" >
                                                <div className="product-size-item">32 oz tub (Medium)-$9.99</div>
                                                <div className="product-size-place">from Lizi Gidi Market</div>
                                            </div>
                                            <div>
                                                <input type="text" className="product-count" />
                                            </div>
                                        </div>
                                        <div className="product-price-panel">
                                            <div className="price-item">Delivery (select one):</div>
                                            <div className="price-value"><a href="/">Next Day Delivery</a> - $10.00</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="btn-panel">
                                <Col md={6} style={{ textAlign: "center" }}>
                                    <button className="product-btn"  onClick={() => this.gotoViewPage(customerId, productID)} >View Item</button>
                                </Col>
                                <Col md={6} style={{ textAlign: "center" }}>
                                    <button className="product-btn">Add To Card</button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(ProductModal);
