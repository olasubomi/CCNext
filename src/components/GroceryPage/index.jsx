import React from "react";
import styles from "./style.module.css";
import PageTitle from "../CommonComponents/PageTitle";
import { Container, Alert, Card, Col, Row, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import ProductDetail from './ProductDetail/ProductModal'
import { connect } from 'react-redux';
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
    product_name: "",
    product_modal_flg: false,
  };

  //////////////////////////////////////////////////////////////////////
  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  //////////////////////////////////////////////////////////////////////
  handleProductClick = (_img, _name, productID, flag) => {
    if (flag) {
      this.setState({ product_img: `/images/products/${_img}`, product_name: _name, product_modal_flg: true, productID: productID });
    } else {
      this.setState({ product_img: _img, product_name: _name, product_modal_flg: true, productID: productID });
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
    }
    if (this.props.customerId) {
      this.getCustomerList(this.props.customer_id);
    } else if (typeof window !== 'undefined' && localStorage.getItem("customerList")) {
      this.setState({ customerList: JSON.parse(localStorage.getItem("customerList")) })
    }
    console.log(this.props.customer_id, )
  }

  //////////////////////////////////////////////////////////////////////
  componentWillReceiveProps(nextProps) {
    // checks if user is already logged in in app.
    const { authUser, customer_id } = nextProps;
    this.setState({ Authentication: authUser });

    if (authUser !== null) {
      this.setState({ customerId: customer_id });
      this.getCustomerList(customer_id);
    } else if (typeof window !== 'undefined' && localStorage.getItem("customerList")) {
      this.setState({ customerList: JSON.parse(localStorage.getItem("customerList")) })
    }
  }

  //////////////////////////////////////////////////////////////////////
  getCustomerList = (customerId) => {
    var url = `/getCustomerGroceryList/${customerId}`;
    // var url = `http://localhost:5000/api/getCustomerGroceryList/${customerId}`
    // var url = `https://chopchowdev.herokuapp.com/api/getCustomerGroceryList/${customerId}`;
    axios(url)
      .then(({ data }) => {
        this.setState({ customerList: data.data });
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


    if (this.state.customerId !== undefined && productID !== -1) {
      this.setState({ deletedItemId: productID });

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
            console.log(newValueData)
            if (typeof window !== 'undefined') {
              localStorage.setItem("customerList", JSON.stringify(newValueData))
            }
            return { customerList: newValueData };
          });
          console.log("Deletse item");
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
    }
    else {

      // Remove from displyed list with images
      this.setState((prevState) => {
        // delete item on client side
        const newValueData = prevState.customerList.filter(
          // do we need catch sttmnt for filter
          (item) => item.product_name !== product_name
        );
        console.log(newValueData)
        if (typeof window !== 'undefined') {

          localStorage.setItem("customerList", JSON.stringify(newValueData))
        }
        return { customerList: newValueData };
      });
      // remove from customer List variable
      let temp_list = this.state.customerList; // make a separate copy of the array
      let index = temp_list.indexOf(product_name);
      if (index !== -1) {
        temp_list.splice(index, 1);
        this.setState({ customerList: JSON.stringify(temp_list) });
        if (typeof window !== 'undefined') {

          localStorage.setItem("customerList", temp_list)
        }
      }
      // remove from selected list state

      // selected = selected.filter(e => e !== product_name);
    }
  };

  //////////////////////////////////////////////////////////////////////
  handleDeleteList = () => {
    console.log("Comes in deletes list");
    const { customerId } = this.state;
    if (customerId !== undefined) {

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
          if (typeof window !== 'undefined') {

            localStorage.removeItem("customerList")
          }
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

    }
    else {
      if (typeof window !== 'undefined') {

        localStorage.removeItem("customerList")
      }
      this.setState({ customerList: [] })
    }
  };

  //////////////////////////////////////////////////////////////////////
  handleClickTypeahead = (selected) => {
    // var multiSelections = this.props.productNames
    // const [multiSelections , setMultiSelections] = useState([]);

    // var arrayOfProductNames = Array.from(this.props.productNames);
    var foundIndex = this.props.productNames.findIndex((el) => el === selected[0]);
    this.setState({ selectedProduct: selected });
    this.productNamesForTypeahead.get(selected);
    var productID = this.productNamesForTypeahead.get(selected[0]);
    console.log("productID is: " + productID);
    // console.log("customer id is: " + this.state.customerId);
    console.log(selected);
    let selectedProductsListLength = selected.length;

    if (selectedProductsListLength === 0) {
      console.log("sees that selected is empty");
      return;
    }
    if (!isNaN(productID) && this.state.customerId != null) {
      console.log("Comes in if");
      // var url = `https://chopchowdev.herokuapp.com/api/addTypeaheadDataToCustomerGroceryList/${productID}/${this.state.customerId}`
      var url = `./api/addTypeaheadDataToCustomerGroceryList/${productID}/${this.state.customerId}`;
      fetch(url, {
        method: "POST",
      }).then((response) => {
        if (response) {

          console.log("Comes in handleClickTypeahead's then on client side");
          this.componentDidMount();
        }
      });
    }
    if (foundIndex !== -1) {
      var mealObject = {
        id: foundIndex,
        product_name: selected[selectedProductsListLength - 1],
        product_image: 'chopchow_default_instruction.png',
        size: 'N/A'
      };

      console.log(mealObject);
    }
    else {
      console.log("Comes in else, means it soes not have a product id for this product");
      console.log(foundIndex);
      console.log(selected);

      // add to local list
      // var mealObject = Object;
      mealObject = {
        id: -1,
        product_name: selected[0].label,
        product_image: 'butter.jpg',
        size: 'N/A'
      };
    }

    if (this.state.customerList == null) {
      this.setState({ customerList: [mealObject] })
      if (typeof window !== 'undefined') {

        localStorage.setItem("customerList", JSON.stringify([mealObject]))
      }
    }
    else {
      let temp_list = this.state.customerList
      temp_list.push(mealObject);
      if (typeof window !== 'undefined') {
        localStorage.setItem("customerList", JSON.stringify(temp_list))
      }
      this.setState({ customerList: temp_list })
    }

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
    selected = [];
    return;
  };

  //////////////////////////////////////////////////////////////////////
  render() {
    const { showAlert, variant, messageAlert, customerList } = this.state;
    //create product names to always exclude what is already in the customers list
    let productNamesMinusCustomersList = this.props.productNames;
    if (customerList != null) {
      for (let i = 0; i < this.state.customerList.length; i++) {
        let curr_product_name = customerList[i].product_name;
        productNamesMinusCustomersList = productNamesMinusCustomersList.filter(e => e !== curr_product_name);
      }
    }
    const ref = React.createRef();


    console.log("Authentication, ", this.state.Authentication);
    console.log("customerId, ", this.state.customerId);
    console.log("customerList, ", this.state.customerList);

    console.log("Props:", this.props)


    return (
      <>
        {/* <Typeahead
          allowNew
          multiple
          options={productNamesMinusCustomersList}
          placeholder="Add products to your grocery list here.."
          id="typeahead"
          onChange={(selected) => {
            this.handleClickTypeahead(selected);
            ref.current.clear();
          }} */}
          {/* // create reference to clear after onChange
          ref={ref}
        // selected={this.props.productNames}
        /> */}

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
        <>
          <PageTitle title=" Your Grocery List" />
          <div>
            <Button
              className={styles.yourlist__buttonDeleteList}
              variant="danger"
              onClick={(e) => { e.stopPropagation(); this.handleDeleteList(); }}>
              Delete List Items
            </Button>

            <br></br>
            <Container className={styles.page__container} fluid>
              {/* display grocery list, for any authenticated customer */}
              {
                customerList ? (
                  customerList.map((customer_grocery_product_item) => {
                    // console.log(customerList);
                    console.log(customer_grocery_product_item);
                    let productID = customer_grocery_product_item.id;
                    console.log("customer_grocery_product_item:", customer_grocery_product_item.product_image)
                    return (
                      // <>
                      <Row display="inline-flex" key={customer_grocery_product_item.product_name} >
                        <Col key={customer_grocery_product_item.product_name + 'images'}>
                          {/* check for private or public images (can be used for suggest meal) */}
                          {customer_grocery_product_item.product_image.startsWith('https://') ? (
                            <img
                              src={customer_grocery_product_item.product_image}
                              alt="product_img "
                              className={styles.card_img}
                              onClick={() => this.handleProductClick(
                                customer_grocery_product_item.product_image,
                                customer_grocery_product_item.product_name, productID,
                                false)}
                            />
                          ) : (
                            <img
                              src={`/images/products/${customer_grocery_product_item.product_image}`}
                              alt="product_img "
                              className={styles.card_img}
                              onClick={() => this.handleProductClick(customer_grocery_product_item.product_image, customer_grocery_product_item.product_name, productID, true)}
                            />
                          )}
                        </Col>

                        <Col key={customer_grocery_product_item.product_name + 'details'}>
                          <Card.Title >
                            Product Name :{" "}
                            {customer_grocery_product_item.product_name}
                          </Card.Title>
                          <Card.Text>
                            Product Price :{" "}
                            {/* {customer_grocery_product_item && */}
                            {customer_grocery_product_item.product_price}
                            <br></br>
                            Product Size : {customer_grocery_product_item.size}
                          </Card.Text>
                        </Col>

                        <Col>
                          <Button onClick={(e) => { e.stopPropagation(); this.handleAddItemToCart(productID); }} >
                            {" "}  Add To Cart
                          </Button>
                        </Col>
                        <Col>
                          <i
                            // className={styles.fa styles.fa-remove}
                            onClick={(e) => {
                              e.stopPropagation(); this.handleShowDeleteItem(
                                customer_grocery_product_item.product_name,
                                customer_grocery_product_item.productID,
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
                    {/* <Spinner animation="border" variant="info" /> */}
                  </div>
                )}
            </Container>
          </div>
        </>
        {
          this.state.product_modal_flg &&
          <ProductDetail state={this.state} onCloseClicked={this.onCloseClicked} />
        }
      </>
    );
  }
}

// const mapStateToProps = ({ auth }) => {
//   const { authUser, role, customer_id } = auth;
//   return { authUser, role, customer_id }
// };

export default GroceryPage