import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png"
import styles from './Footer.module.css'


const Footer = () => {
  return (
    <Container className={styles.footerWraper} >
      {/* <Container> */}

      <Row style={{ width: "100%" }}>
        <hr
          className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
          style={{ width: "100%" }}
        />
        <Col md={3} className="footer-colmun">
          <h6 className="text-uppercase font-weight-bold" style={{ color: "gray" }}>
            <strong>Services</strong>
          </h6>
          <hr
            className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: "100px" }}
          />
          <p><a href="#!">Recipes</a></p>
          <p><a href="#!">GroceryList</a></p>
          <p><a href="#!">Food Products</a></p>
          <p><a href="#!">Kitchen Products</a></p>
          <p><a href="#!">Household Products</a></p>
        </Col>
        <Col md={3} className="footer-colmun">
          <h6 className="text-uppercase font-weight-bold" style={{ color: "gray" }}>
            <strong>Resources</strong>
          </h6>
          <hr
            className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: "100px" }}
          />
          <p><a href="#!">Login/ My Account</a></p>
          <p><a href="#!">Sign Up</a></p>
          <p><a href="#!">Supplier Home</a></p>
          <p><a href="#!">Shipping + Returns</a></p>
          <p><a href="#!">FAQ + Support</a></p>
          <p><a href="#!">Contact</a></p>
        </Col>
        <Col md={3} className="footer-colmun">
          <h6 className="text-uppercase font-weight-bold" style={{ color: "gray" }}>
            <strong>Company</strong>
          </h6>
          <hr
            className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
            style={{ width: "100px" }}
          />
          <p><a href="#!" className="fa mr-3" > About Us</a></p>
          <p><a href="#!" className="fa mr-3" > Careers</a></p>
          <p><a href="#!" className="fa mr-3" > Partner</a></p>
          <p><a href="#!" className="fa mr-3" > Terms of Service</a></p>
          <p><a href="#!" className="fa mr-3" > Privacy Policy</a></p>
        </Col>
        <Col md={3} className="footer-colmun" style={{ textAlign: "center" }}>
          <img src={img_logo} width="100px" alt="" />
          <div className="logo-text">Adding convenience to home made mealsTM</div>
          <div style={{ marginTop: "20px" }}>
            <i className="fa fa-facebook-square m-2" aria-hidden="true" style={{ fontSize: "30px" }}></i>
            <i className="fa fa-instagram m-2" aria-hidden="true" style={{ fontSize: "30px" }}></i>
          </div>
          <div className=""> &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.awokorpenterprises.com"> ChopChowSD </a></div>
        </Col>
      </Row>
    </Container >
  );
};

export default Footer;
