import React, { useState } from "react";
import styles from "./style.module.css";
// import { Form, Button, Container, Modal, Row, Col } from "react-bootstrap";
// import Axios from "axios";
import { connect } from 'react-redux';
import { userSignIn } from '../../actions';
// import { withRouter } from "react-router-dom";
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png"
import facebook from "../../../public/assets/logos/facebook.png"
import altlogin from "../../../public/assets/logos/altlogin.png"
import closeIcon from "../../../public/assets/icons/eva_menu-close.png"
import Image from "next/image";
import Link from "next/link";
import ForgetPassword from "../forgotpassword";
import SignUp from "../signup";
import { EyeSIcon } from "../icons";
import VisibilityIcon from '@mui/icons-material/Visibility';

function Login(props){
  const [forgetPassword, setForgetPasswordState] = useState(false);
  const [signUp, setSignUpState] = useState(false);
  const [status, setStatusState] = useState(null);
  const [message, setMessageState] = useState(null);
  const [showPass, setShowPassState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberPassword: "",
  });
  const { email, password, rememberPassword } = formState;

  function openForgetPassword (){
    setForgetPasswordState(true)
  }

  function closeForgetPassword (){
    setForgetPasswordState(false)
  }

  function openSignUp (){
    setSignUpState(true)
  }

  function closeSignUp (){
    setSignUpState(false)
  }

  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function Login(e){
    e.preventDefault();
    props.login(email, password);
    props.toggleLogin()
  }

  function togglePass(){
    setShowPassState(!showPass)
  }

  return(
    <>
      {!signUp && !forgetPassword &&
      <div className={styles.login}>
        <div className={styles.login_col_2}>
          <div className={styles.login_top}>
            <h2></h2>
            <Image
                src={img_logo}
                alt="logo"
                className={styles.login_main_logo_img}
              />
          </div>
          <h2>Welcome Back</h2>
          <h3>Login</h3>
          <div className={styles.login_form}>
            <div className={styles.login_form_group}>
              <label htmlFor="email" className={styles.login_form_label}>
                Email
              </label>
              <input
                type="text" name="email" value={email} placeholder="Your Email or Username" 
                onChange={onChange}
                className={styles.login_form_input}
              />
            </div>
            <div className={styles.login_form_group}>
              <label htmlFor="password" className={styles.login_form_label}>
                Password
              </label>
              <input
                type={showPass ? "text":"password"} name="password"
                value={password} placeholder="Your password"
                onChange={onChange}
                className={styles.login_form_input}
              />
              <div onClick={togglePass} className={styles.secureEye}>
              {showPass ? 
                <VisibilityIcon className={styles.eye} /> :
                <EyeSIcon style={styles.eye} />
              }
              </div>
            </div>
          </div>

          <div className={styles.login_password_help}>
            <div className={styles.login_remember_pass}>
              <input onChange={onChange} name='rememberPassword' value={rememberPassword} type="checkbox" />
              <label>Remember Password</label>
            </div>
            <div onClick={openForgetPassword} className={styles.login_forgot_pass}>
              Forgot your Password?
            </div>
          </div>

          <button 
           onClick={Login}
           className={styles.login_button}>Login</button>

          <h3 className={styles.login_new}>Don't have an account yet? {props.toggleLogin ? <span onClick={openSignUp}>Sign up here</span>: <Link href='/signup'><a>Sign up here</a></Link> }</h3>

          <div className={styles.login_options}>
            <h3>Login with social media</h3>

            <div className={styles.login_socials}>
              <div className={styles.login_social  + " " + styles.blue}>
                <Image src={facebook} />
                <h4>Facebook</h4>
              </div>
              <div className={styles.login_social}>
                <Image src={altlogin} />
                <h4>Google</h4>
              </div>
            </div>
          </div>
          
        </div>   
        <div style={props.toggleLogin ? {gridTemplateRows: 'max-content 1fr' }: {gridTemplateRows: '1fr'}} className={styles.login_col_1}>
          {props.toggleLogin &&
          <div className={styles.login_top}>
            <h2></h2>
            <div onClick={props.toggleLogin} className={styles.login_cancel_con}>
              <Image src={closeIcon} className={styles.login_cancel} />
            </div>
          </div>}
          <h3>
            Add Convenience to your Home Made Meals
          </h3>
        </div>    
      </div>}
      {forgetPassword &&
      <ForgetPassword closeForgetPassword={closeForgetPassword}  />
      }
      {signUp &&
        <SignUp closeSignUp={closeSignUp} toggleLogin={props.toggleLogin? props.toggleLogin: undefined} />
      }
    </>
  )
}

function mapStateToProp(state) {
  return {
    auth: state.Auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(userSignIn(email, password))
  };
}

// export default Login;

export default connect(
  mapStateToProp,
  mapDispatchToProps,
)(Login);
