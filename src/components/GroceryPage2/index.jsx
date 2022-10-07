import React from "react";
import "./style.css";
import PageTitle from "../CommonComponents/PageTitle";
import { Spinner } from "react-bootstrap";
import { Container, Alert, Card, Col, Row, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import ProductDetail from './ProductDetail/ProductModal'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import axios from '../../util/Api';

//////////////////////////////////////////////////////////////////////
class GroceryPage extends React.Component {
  // Mongo
  _isMounted = false;
  products = [];
  productNamesForTypeahead = new Map();

  state = {
    customerList: null,
    Authentication: false,
    customerId: null,
    email: "",
    password: "",

    messageErr: false,
    messageSuccess: false,
    messageErrCreate: false,
    showAlert: false,
    messageAlert: "",

    variant: "",
    productID: "",
    deletedItemId: null,
    selectedProduct: null,
    idsItems: null,
    deletedItemsId: null,
    lasIdListState: null,
    valueProductName: "",
    valueProductImage: "",
    valueProductPrice: "",
    valueProductSize: "",
    valuePricePerOunce: "",
    errormsg: "",
    typeAheadAdded: false,

    product_img: null,
    product_name:"",
    product_modal_flg :false,
  };

  //////////////////////////////////////////////////////////////////////
  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  //////////////////////////////////////////////////////////////////////
  handleProductClick = (_img, _name,productID, flag) =>{
    if(flag){
      this.setState({ product_img: `/images/products/${_img}`, product_name: _name, product_modal_flg:true , productID: productID});
    }else{
      this.setState({ product_img: _img, product_name: _name , product_modal_flg:true, productID: productID});
    }
  }
  onCloseClicked = () => {
    this.setState({ product_modal_flg: false });
  }

//////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      const { authUser, customer_id } = this.props;
      this.setState({ Authentication: authUser });
      this.setState({ customerId: customer_id });
      this.getCustomerList(customer_id);
    }
  }

  //////////////////////////////////////////////////////////////////////
  componentWillReceiveProps(nextProps) {
    // checks if user is already logged in in app.
    const { authUser, customer_id } = nextProps;
    this.setState({ Authentication: authUser });

    if (authUser !== null) {
      this.setState({ customerId: customer_id });
      this.getCustomerList(customer_id);
    }
  }

  //////////////////////////////////////////////////////////////////////
  getCustomerList = (customerId) => {
    var url = `/getCustomerGroceryList/${customerId}`;
    // var url = `http://localhost:5000/api/getCustomerGroceryList/${customerId}`
    // var url = `https://chopchowdev.herokuapp.com/api/getCustomerGroceryList/${customerId}`;
    axios(url)
      .then(({data}) => {
        this.setState({ customerList: data.data });
      })      
      .catch(() => {
        this.setState(
          {
            messageAlert:"Authentication Error while fetching your grocery list...",
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

  //////////////////////////////////////////////////////////////////////
  handleShowDeleteItem = (productID) => {
    this.setState({ deletedItemId: productID });
    const { customerId, deletedItemId } = this.state;
    // var url = `https://chopchowdev.herokuapp.com/api/remove-item/${productID}/${customerId}`
    var url = `./api/remove-item/${productID}/${customerId}`;

    fetch(url, {
      method: "DELETE",
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        this.setState(
          {
            messageAlert: "deleted successfully",
            showAlert: true,
            variant: "success",
          },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: "", showAlert: false });
            }, 3500)
        );
        this.setState((prevState) => {
          // delete item on client side
          const newValueData = prevState.customerList.filter(
            // do we need catch sttmnt for filter
            (item) => item.id !== deletedItemId
          );
          return { customerList: newValueData };
        });
        console.log("Delets item");
        this.componentDidMount();
      })
      .catch(() => {
        this.setState(
          {
            messageAlert: "Internal Server Error while deleting item",
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

  //////////////////////////////////////////////////////////////////////
  handleDeleteList = () => {
    console.log("Comes in deletes list");
    const { customerId } = this.state;
    var url = `https://chopchowdev.herokuapp.com/api/remove-list/${customerId}`;
    // var url = `./api/remove-list/${customerId}`

    fetch(url, {
      method: "DELETE",
      // headers: {
      //   'Content-Type': 'application/json',
      // }
    })
      .then((response) => {
        console.log("delete response is: ");
        console.log(response);
        console.log(response.json);
        this.setState(
          {
            messageAlert: "deleted successfully",
            showAlert: true,
            variant: "success",
          },
          () =>
            setTimeout(() => {
              this.setState({ messageAlert: "", showAlert: false });
            }, 3500)
        );

        this.setState({ customerList: [] });
        this.componentDidMount();
        console.log("deletes list");
        return response.json();
      })
      .catch(() => {
        console.log("caught an error while deleting list");
        this.setState(
          {
            messageAlert: "Internal Server Error while deleting list",
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

  //////////////////////////////////////////////////////////////////////
  handleClickTypeahead = (selected) => {
    this.setState({ selectedProduct: selected });
    // var arrayOfProductNames = Array.from(this.productNamesForTypeahead.keys());
    this.productNamesForTypeahead.get(selected);

    // var index = arrayOfProductNames.findIndex((el) => el === selected[0]);
    var productID = this.productNamesForTypeahead.get(selected[0]);
    console.log("productID is: " + productID);
    console.log("customer id is: " + this.state.customerId);
    if (!isNaN(productID)) {
      // var url = `https://chopchowdev.herokuapp.com/api/addTypeaheadDataToCustomerGroceryList/${productID}/${this.state.customerId}`
      var url = `./api/addTypeaheadDataToCustomerGroceryList/${productID}/${this.state.customerId}`;
      fetch(url, {
        method: "POST",
      }).then((response) => {
        if (response) {
          this.setState(
            {
              messageAlert: "product added successfully",
              showAlert: true,
              variant: "success",
            },
            () =>
              setTimeout(() => {
                this.setState({ messageAlert: "", showAlert: false });
              }, 3500)
          );
          console.log("Comes in handleClickTypeahead's then on client side");
          this.componentDidMount();
        }
      });
    }
  };

  //////////////////////////////////////////////////////////////////////
  render() {
    const { showAlert, variant, messageAlert, customerList } = this.state;

    console.log("Authentication, ", this.state.Authentication);
    console.log("customerId, ", this.state.customerId);
    console.log("customerList, ", this.state.customerList);

    console.log("Props:", this.props)
  

    return (
      <>
        <Typeahead
          // multiple
          options={Array.from(this.productNamesForTypeahead.keys())}
          placeholder="Add products to your grocery list here.."
          id="typeahead"
          onChange={(selected) => {
            this.handleClickTypeahead(selected);
          }}
        />

        {/* Display alert if there is any issue loading grocery page */}
        <Alert show={showAlert} key={1} variant={variant}>
          {messageAlert}
        </Alert>


        <h2>Your Grocery Cart</h2>


        {this.state.messageVisible ? (
          <div>
            you can not add in this item because it is already in customers
            grocery list
          </div>
        ) : null}
        {this.state.Authentication ? (
          <>
          <PageTitle title=" Your Grocery List" />
            <div>
              <Button
                  className="yourlist__buttonDeleteList"
                  variant="danger"
                  onClick={(e) => { e.stopPropagation(); this.handleDeleteList();}}>
                  Delete List Items
              </Button>

              <br></br>
              <Container className="page__container" fluid>
                {/* display grocery list, for any authenticated customer */}
                {
                customerList ? (
                  customerList.map((customer_grocery_product_item) => {
                    let productID = customer_grocery_product_item.id;
                    console.log("customer_grocery_product_item:", customer_grocery_product_item.product_image)
                    return (
                      // <>
                      <Row display="inline-flex" key = {customer_grocery_product_item.id} >
                        <Col key={customer_grocery_product_item.id}>
                          {/* check for private or public images (can be used for suggest meal) */}
                          {customer_grocery_product_item.product_image.startsWith('https://') ? (
                              <img
                                src={customer_grocery_product_item.product_image}
                                alt="product_img "
                                className="card-img"
                                onClick = {() => this.handleProductClick(
                                  customer_grocery_product_item.product_image,
                                   customer_grocery_product_item.product_name, productID,
                                    false)}
                              />
                            ) : (
                              <img
                                src={`/images/products/${customer_grocery_product_item.product_image}`}
                                alt="product_img "
                                className="card-img"
                                onClick = {() => this.handleProductClick(customer_grocery_product_item.product_image, customer_grocery_product_item.product_name, productID, true)}
                              />
                            )}
                        </Col>

                        <Col>
                          <Card.Title className="grocery_item_card-header">
                            Product Name :{" "}
                            {customer_grocery_product_item.product_name}
                          </Card.Title>
                          <Card.Text>
                            Product Price :{" "}
                            {customer_grocery_product_item &&
                              customer_grocery_product_item.product_price}
                            <br></br>
                            Product Size : {customer_grocery_product_item.sizes}
                          </Card.Text>
                        </Col>

                        <Col>
                          <Button onClick={(e) => { e.stopPropagation(); this.handleAddItemToCart(productID);  }} >
                            {" "}  Add To Cart
                          </Button>
                        </Col>
                        <Col>
                          <i
                            className="fa fa-remove"
                            onClick={(e) => {e.stopPropagation();this.handleShowDeleteItem(
                                customer_grocery_product_item.id
                              );
                            }}
                          ></i>
                        </Col>
                      </Row>
                    );
                  })
                ) : (
                  // consider getting items from their cache
                  //  to display something when users arent logged in
                    <div> Your grocery cart looks empty.
                      <Spinner animation="border" variant="info" />
                    </div>
                  )}
              </Container>
            </div>
          </>
        ) : (
            <>
              {/* <Login /> */}
              <div>
                Log into to view your saved grocery list.
            </div>
            </>
          )}



        {
          this.state.product_modal_flg && 
          <ProductDetail state = { this.state } onCloseClicked={this.onCloseClicked} />
        }
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { authUser, role, customer_id } = auth;
  return { authUser, role, customer_id }
};

export default connect(mapStateToProps, ()=>({}))(withRouter(GroceryPage));