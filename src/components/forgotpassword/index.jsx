import React, { useState } from 'react';
import styles from '../Login/style.module.css';
// import { Form, Button, Container, Modal, Row, Col, ButtonToolbar } from 'react-bootstrap';
// import { setTimeout } from 'timers';
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png"
import closeIcon from "../../../public/assets/icons/eva_menu-close.png"
import Image from "next/image";
import { forgotPassword } from '../../actions';
import { connect } from 'react-redux';

function ForgetPassword(props){

  const [status, setStatusState] = useState(null);
  const [message, setMessageState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
  });
  const { email } = formState;

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function formSubmit(e){
    e.preventDefault();
    props.forgotpassword(email)
    props.closeForgetPassword()
  };

    return(
        <div className={styles.forgot_password}>
            <div className={styles.login_top}>
              <div onClick={props.closeForgetPassword} className={styles.login_cancel_con}>
                <Image src={closeIcon} className={styles.login_cancel} />
              </div>
              <Image
                  src={img_logo}
                  alt="logo"
                  className={styles.login_main_logo_img}
                />
            </div>
            <h2>Forgot Password</h2>
            <h3>Can’t remember your login credentials? Enter your details below and we’ll send instructions if your account exists.</h3>
            <div className={styles.login_form}>
              <div className={styles.login_form_group}>
                <label htmlFor="email" className={styles.login_form_label}>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Your email"
                  onChange={handleChange}
                  className={styles.login_form_input}
                />
              </div>
            </div>
            {status === 'success' ? 
            <p className="msg-success">{message}</p>:
            <p className="msg-err">{message}</p>}
  
            <button onClick={formSubmit} className={styles.login_button}>Send reset link</button>
  
            <h3 onClick={props.closeForgetPassword} className={styles.login_new}>I remember my password</h3>

            {/* <button className={styles.login_button2}>Log in</button> */}

        </div>
    )
  }

  function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      forgotpassword: (email) => dispatch(forgotPassword(email))
    };
  }
  
  export default connect(
    mapStateToProp,
    mapDispatchToProps,
  )(ForgetPassword);
