/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './style.css';
import {Container,  Card, Col} from 'react-bootstrap'

export default class CartPage extends React.Component {
  state = {
    cartInfo:'',
    idItem:'',
    message:''
  }
  componentDidMount() {
    const {
      match:{
        params:{idItem}
      }
    } = this.props;
    this.setState({idItem})
  fetch(`/api/get-data-item/${idItem}`,{
    method:'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res=>{
    return res.json()
  })
  .then(response=>{
    this.setState({cartInfo:response.data[0]})
    
  })
  .catch(()=>{
    this.setState({ message: 'Sorry , Internal Server ERROR' })
    
  })

  }
  render() {
    const { cartInfo } = this.state;

    return (
      <>
            <h3 className="cart-page__title">Current Order</h3>
              <Col xs={12} md={12} lg={12} key={cartInfo.id}>
                <div className="cart-page__card-div">
                    <div className="cart-page__name-product"> {cartInfo.product_name}</div>
                  <Card.Text className="cart-page__size-product">
                    {cartInfo.sizes}
                  </Card.Text>
                  <Card.Text className="cart-page__pice-per-ounce-product">
                    {cartInfo.price_per_ounce}
                  </Card.Text>
                  <Card.Text className="cart-page__price-product">
                    ${cartInfo.product_price}
                  </Card.Text>
                </div>
                </Col>    
              
            </>
    )
        }
      }
