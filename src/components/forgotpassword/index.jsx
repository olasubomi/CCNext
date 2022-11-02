import React, { useState } from 'react';
import styles from '../Login/style.module.css';
// import { Form, Button, Container, Modal, Row, Col, ButtonToolbar } from 'react-bootstrap';
// import { setTimeout } from 'timers';
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png"
import closeIcon from "../../../public/assets/icons/eva_menu-close.png"
import Image from "next/image";

export default function ForgetPassword(props){

  const [status, setStatusState] = useState(null);
  const [message, setMessageState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
  });
  const { email } = formState;

  function formSubmit(e){
    e.preventDefault();
    if((email)) {
      submitForm();
    } else {
      setStatusState('error')
      setMessageState('Please enter correct data.')
    }
  };

  function submitForm() {
    fetch('https://chopchowdev.herokuapp.com/api/forgotpass', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(state),
    }).then(response => {
      console.log(response)
        if (response.status === 400 || response.status === 404) {
          setStatusState('error')
          setMessageState('Bad Request , Your username or email does not exist.')
        } else if (response.status === 401) {
          setStatusState('error')
          setMessageState('you are UnAuthorized')
        } else if (response.status >= 500) {
          setStatusState('error')
          setMessageState('Sorry , Internal Server ERROR')
        } else {
          setStatusState('success')
          setMessageState('Please check your inbox for more details! ')
          this.handleClose(5000);
        }
      })
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
