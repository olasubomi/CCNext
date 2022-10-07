import React from 'react';
// import './ProductFullDetail.scss';
import { Row, Col } from "react-bootstrap";

class ProductFullDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customerList: null,
            productData: null,
        }
    }

    //////////////////////////////////////////////////////////////////////
    componentWillMount() {
        this.getCustomerList();
    }

    //////////////////////////////////////////////////////////////////////
    getCustomerList = () => {
        const { productId, customerId } = this.props.match.params;
        if (typeof window !== 'undefined') {

            var localToken = window.localStorage.getItem("userToken");
        }
        console.log("customder id  iss: " + customerId);
        var url = `/api/getCustomerGroceryList/${customerId}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localToken,
            },
        })
            .then((res) => {
                console.log("customer list response is ");
                console.log(res);
                return res.json();
            })
            .then((response) => {
                if (response) {
                    this.setState({ customerList: response.data });

                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].id === productId) {
                            this.setState({ productData: response.data[i] });
                            break;
                        }
                    }

                }
            })
            .catch(() => {
                this.setState(
                    {
                        messageAlert: "Authentication Error while fetching your grocery list...",
                        showAlert: true,
                        variant: "danger",
                    },
                    () =>
                        setTimeout(() => {
                            this.setState({ messageAlert: "", showAlert: false });
                        }, 8000)
                );
            });
    };


    render() {
        return (
            <div style={{}}>
                <div className="productF-detail-modal">
                    <div className="productF-detail-panel">
                        <Row>
                            <Col md={2} style={{ textAlign: "center" }}>
                                {
                                    this.state.productData &&
                                    <img src={`/images/products/${this.state.productData.product_image}`} width="100%" className="productF-img1" alt="" />
                                }
                                {
                                    this.state.productData &&
                                    <img src={`/images/products/${this.state.productData.product_image}`} width="100%" className="productF-img1" alt="" />
                                }
                            </Col>
                            <Col md={5} style={{ textAlign: "center" }}>
                                {
                                    this.state.productData &&
                                    <img src={`/images/products/${this.state.productData.product_image}`} width="100%" className="productF-img" alt="" />
                                }
                            </Col>
                            <Col md={5}>
                                <div className="detail-info-panel" style={{ marginLeft: "10px", marginRight: "20px" }}>
                                    {
                                        this.state.productData &&
                                        <div className="productF-name">{this.state.productData.product_name} </div>
                                    }
                                    <div className="productF-name-descript">Description Lorem Ipsum Dolor Sit Amet</div>
                                    <div className="product-star">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                    <hr />
                                    <div className="productF-size-panel">
                                        <div className="productF-info" >
                                            <div className="productF-size-item">32 oz tub (Medium)</div>
                                            <div className="productF-size-item">$9.99</div>
                                            <div className="productF-size-place">from Lizi Gidi Market</div>
                                        </div>
                                        <div>
                                            <input type="text" className="productF-count" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="productF-size-panel">
                                        <div className="productF-info" >
                                            <div className="productF-size-item">32 oz tub (Medium)</div>
                                            <div className="productF-size-item">$9.99</div>
                                            <div className="productF-size-place">from Lizi Gidi Market</div>
                                        </div>
                                        <div>
                                            <input type="text" className="productF-count" />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="productF-price-panel">
                                        <div className="price-value"><a href="/">Next Day Delivery</a></div>
                                        <div className="price-value">$10.00</div>
                                    </div>
                                    <div className="cart-btn">
                                        <div className="product-star">
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <button className="productF-btn">Add To Card</button>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductFullDetail;
