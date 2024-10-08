import React, { useState } from "react";

import { useRouter } from "next/router";
import styles from "../../src/components/Checkout/style.module.css";
import GoBack from "../../src/components/CommonComponents/goBack";
import Header, { Header2 } from "../../src/components/Header/Header";
import Head from "next/head";
import Footer from "../../src/components/Footer/Footer";
import Subscription from "../../src/components/Checkout/Subscription";
import Delivery from "../../src/components/Checkout/Delivery";
import ContactInformation from "../../src/components/Checkout/ContactInformation";
import PaymentMethod from "../../src/components/Checkout/PaymentMethod";
import DeliveryAddress from "../../src/components/Checkout/DeliveryAddress";
import PlaceOrderBtn from "../../src/components/Checkout/PlaceOrderBtn";
import OrderSummary from "../../src/components/Checkout/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
const Checkout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { cartItems: items } = useSelector((state) => {
    return state.Cart;
  });
  const [deliveryType, setDeliveryType] = useState();
  const [tax, setTax] = useState(40);

  const dispatch = useDispatch();

  const SubTotal = items.reduce((a, c) => a + c.price * c.amount, 0).toFixed(2);

  const TotalPrice = SubTotal + tax;

  const [error, setError] = useState({
    subscription: "",
    dateOfDelivery: "",
    Delivery: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    address1: "",
    address12: "",
    state: "",
    city: "",
    postalcode: "",
    country: "",
    delivery_note: "",
    timetodeliver: "",
  });
  const payload = {
    subscription: "",
    dateOfDelivery: "",
    Delivery: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    address1: "",
    address12: "",
    state: "",
    city: "",
    postalcode: "",
    country: "",
    delivery_note: "",
    timetodeliver: "",
  };

  const PlaceOrder = () => {
    dispatch();
  };

  const [data, setData] = useState(payload);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "firstname":
          if (!value) {
            stateObj[name] = "Please enter your first name.";
          }
          break;

        case "lastname":
          if (!value) {
            stateObj[name] = "Please enter your last name.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Please enter your email address.";
          }
          break;

        case "phone":
          if (!value) {
            stateObj[name] = "Please enter your phone number.";
          }
          break;

        case "address":
          if (!value) {
            stateObj[name] = "Please enter your home address.";
          }
          break;

        case "address1":
          if (!value) {
            stateObj[name] = "Please enter other address.";
          }
          break;

        case "address2":
          if (!value) {
            stateObj[name] = "Please enter other address.";
          }
          break;

        case "state":
          if (!value) {
            stateObj[name] = "Please enter your state.";
          }
          break;

        case "city":
          if (!value) {
            stateObj[name] = "Please enter your city.";
          }
          break;

        case "postalcode":
          if (!value) {
            stateObj[name] = "Please enter your postal code.";
          }
          break;

        case "country":
          if (!value) {
            stateObj[name] = "Please enter your country.";
          }
          break;

        case "delivery_note":
          if (!value) {
            stateObj[name] = "Kindly enter a Delivery Note.";
          }
          break;
        case "subscription":
          if (!value) {
            stateObj[name] = "Kindly select a subscription plan.";
          }
          break;

        case "dateOfDelivery":
          if (!value) {
            stateObj[name] = "Select a date for your delivery.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Chop Chow Checkout</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Header />
      <Header2 />
      <div className={styles.inner_container}>
        <div className={styles.constraint}>
          <div className={styles.header}>
            <GoBack />
            <b>Checkout</b>
          </div>
          <div className={styles.checkout}>
            <div className={styles.checkout_left}>
              <Subscription
                data={data}
                setData={setData}
                handleChange={handleChange}
              />

              <Delivery
                data={data}
                setData={setData}
                handleChange={handleChange}
                deliveryType={deliveryType}
                setDeliveryType={setDeliveryType}
              />

              <ContactInformation
                data={data}
                setData={setData}
                handleChange={handleChange}
              />

              <DeliveryAddress
                data={data}
                setData={setData}
                handleChange={handleChange}
              />

              <PaymentMethod />
              <div className={styles.show_on_mobile}>
                <PlaceOrderBtn />
              </div>
            </div>
            <div className={styles.checkout_right}>
              <div className={styles.sticky}>
                <OrderSummary
                  items={items}
                  TotalPrice={TotalPrice}
                  SubTotal={SubTotal}
                />
                <div className={styles.hide_on_mobile}>
                  <PlaceOrderBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
