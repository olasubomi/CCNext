import React, { useState } from 'react';
import styles from '../Login/style.module.css';
// import { Form, Button, Container, Modal, Row, Col, ButtonToolbar } from 'react-bootstrap';

import Link from 'next/link';
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png"
import closeIcon from "../../../public/assets/icons/eva_menu-close.png"
import Image from "next/image";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { connect } from 'react-redux';
import { userSignUp } from '../../actions';
import { base_url } from '../../util/Api';

// import { setTimeout } from 'timers';

// export default class SignUp extends React.Component {
//   state = {
//     email: '',
//     phone_number: '',
//     first_name: '',
//     last_name: '',
//     username: '',
//     password: '',
//     messageErr: false,
//     messageSuccess: false,
//     showModal: true,
//     email_notifications: false
//   };


//   handleChange = (e) => {
//     let name = e.currentTarget.name;
//     let value = e.currentTarget.value;
//     name === "email_notifications" ?
//       this.setState({ emailNotification: e.currentTarget.checked })
//       : this.setState({ [name]: value });

//   }


//   handleClose = (delay) => {
//     // setTimeout(() => {
//       this.props.history.push('/grocery');
//     // }, delay, || 0);
//   };

//   formSubmit = (e) => {
//     e.preventDefault();
//     //validate email
//     let email = this.state.email;
//     if (email !== "" && /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email) ){
//       var [account, address] = email.split('@'); 
//       var domainParts = address.split('.');

//       if(  email.length < 256 && account.length < 64 && domainParts.some(function (part) {
//         return part.length < 63;
//       })){
//         this.setState({ messageErr: '' });

//           this.submitForm();
//       }else{
//         this.setState({ messageErr: 'Please enter a valid email.' });
//       }
//     }
//     else{
//       if((this.state.phone.length >= 10 && this.state.phone.length <=30) && this.state.username && this.state.password) {
//         this.setState({ messageErr: '' });

//         this.submitForm();
//       }
//       else{
//         this.setState({ messageErr: 'Please enter a valid phone number or email.' });
//       }
//     }
//   }
  
//   submitForm = () => {
//     console.log("state,", this.state);
//     var url = 'https://chopchowdev.herokuapp.com/api/user/signup';
//     var url = 'http://localhost:5000/api/user/signup';
//     var payLoad = this.state;
//     delete payLoad.messageErr;
//     delete payLoad.messageSuccess;
//     delete payLoad.showModal;

//     fetch(url, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(payLoad),
//     }).then(response => {
//         if (response.status === 400 || response.status === 404) {
//           this.setState({ messageErr: 'Bad Request , Check username or password ...' });
//         } else if (response.status === 401) {
//           this.setState({ messageErr: 'You are unauthorized' });
//         } else if (response.status >= 500) {
//           this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
//         } else {
//           this.setState({ messageErr: '', isAuthenticated: true, messageSuccess: 'You are signed up! ' });
//           this.handleClose(5000);
//         }
//       })
//   };

//   render() {
//     return (
// <Modal show={this.state.showModal} onHide={this.handleClose} className="modal registerme" backdrop="static">
//   <Modal.Header closeButton>
//     <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
//       <div>Sign Up</div>
//       <span style={{ fontSize: '11pt' }}>Already have an account?  
//       <Link className="link-guest-word" href="/login">Login</Link></span>
//     </Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Container>
//       <Row className="justify-content-md-center">
//         <Col xs lg>
//           <Form className="" onSubmit={this.formSubmit}>
//             <Form.Group>
//                 <Form.Control
//                       type="email"
//                       name="email"
//                       value={this.state.email}
//                       placeholder="Your email"
//                       onChange={this.handleChange}
//                       autoComplete = "username"
//                     />
//                   <Form.Label>Or</Form.Label>
//                 <Form.Control
//                       type="tel"
//                       name="phone_number"
//                      value={this.state.phone_number}
//                       placeholder="Your Phone Number"
//                       onChange={this.handleChange}
//                     />
//                   </Form.Group>
//                   <hr/>
//                   <Form.Group>
//                     <Form.Control
//                       type="text"
//                       name="first_name"
//                       value={this.state.first_name}
//                       placeholder="First Name"
//                       onChange={this.handleChange}
//                       required
//                     />
//                      <Form.Control
//                       type="text"
//                       name="last_name"
//                       value={this.state.last_name}
//                       placeholder="Last Name"
//                       onChange={this.handleChange}
//                       required
//                     />
//                   <Form.Control
//                       type="text"
//                       name="username"
//                       value={this.state.username}
//                       placeholder="Username"
//                       onChange={this.handleChange}
//                       required
//                     />
//                     <Form.Label></Form.Label>
//                     <Form.Control
//                       type="password"
//                       name="password"
//                       value={this.state.password}
//                       placeholder="Create a Password"
//                       onChange={this.handleChange}
//                       autoComplete = "new-password"
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="formHorizontalCheck">
//                     <Form.Label></Form.Label>
//                     <Form.Check onChange={this.handleChange} name="emailNotification" label="Sign Up for Email Notifications" />
//                   </Form.Group>
//                   <p className="msg-success">{this.state.messageSuccess}</p>
//                   <p className="msg-err">{this.state.messageErr}</p>
//                   <ButtonToolbar>
//                     <Button variant="secondary" type="submit" className="login__form-btn">Sign Up</Button>
//                   </ButtonToolbar>
//                   <Link className="" href="/signup">or Sign up as driver</Link>
//                 </Form>
//               </Col>
//             </Row>
//           </Container>
//         </Modal.Body>
//       </Modal>
//     );
//   }

// }

function SignUp(props){
  const [message, setMessageState] = useState(null);
  const [status, setStatusState] = useState(null);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const { username, email, phone_number, first_name, last_name, password } = formState;

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handlePhoneChange(e) {
    setFormState({ ...formState, ['phone_number']: e });
  }

  // function formSubmit(e){
  //   e.preventDefault();
  //   //validate email
  //   if (username !== "" && /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(username) ){
  //     var [account, address] = username.split('@'); 
  //     var domainParts = address.split('.');

  //     if(  username.length < 256 && account.length < 64 && domainParts.some(function (part) {
  //       return part.length < 63;
  //     })){
  //       setStatusState('success')
  //       setMessageState('')

  //         submitForm();
  //     }else{
  //       setStatusState('error')
  //       setMessageState('Please enter a valid email.')
  //     }
  //   }
  //   else{
  //     if((phone_number.length >= 10 && phone_number.length <=30) && username && password) {
  //       setStatusState('')
  //       setMessageState('')

  //       submitForm();
  //     }
  //     else{
  //       setStatusState('success')
  //       setMessageState('Please enter a valid phone number or email.')
  //     }
  //   }
  // }

  function formSubmit(e){
    e.preventDefault();
    props.signup(formState);
    props.toggleLogin()
  }
  
  function submitForm() {
    console.log("state,", this.state);
    var url = 'https://chopchowdev.herokuapp.com/api/user/signup';
    var url = `${base_url}/user/signup`;
    var payLoad = this.state;
    delete payLoad.messageErr;
    delete payLoad.messageSuccess;
    delete payLoad.showModal;

    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    }).then(response => {
        if (response.status === 400 || response.status === 404) {
          this.setState({ messageErr: 'Bad Request , Check username or password ...' });
        } else if (response.status === 401) {
          this.setState({ messageErr: 'You are unauthorized' });
        } else if (response.status >= 500) {
          this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
        } else {
          this.setState({ messageErr: '', isAuthenticated: true, messageSuccess: 'You are signed up! ' });
          this.handleClose(5000);
        }
      })
  };

    return(
      <>
        <div className={styles.login}>
          <div className={styles.login_col_2}>
            <div className={styles.login_top}>
              <div onClick={props.toggleLogin} className={styles.login_cancel_con + " " + styles.show}>
                <Image src={closeIcon} className={styles.login_cancel} />
              </div>
              <Image
                  src={img_logo}
                  alt="logo"
                  className={styles.login_main_logo_img}
                />
            </div>
            <h3>Sign Up</h3>
            <div className={styles.login_form}>
                <div className={styles.login_form_col_2}>
                    <div className={styles.login_form_group}>
                        <label htmlFor="first_name" className={styles.login_form_label}>First Name</label>
                        <input 
                        type="text"
                        name="first_name"
                        value={first_name}
                        placeholder="First Name"
                        onChange={handleChange}
                         className={styles.login_form_input} />
                        {/* {this.props.errors.accountname && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                    </div>
                    <div className={styles.login_form_group}>
                        <label htmlFor="last_name" className={styles.login_form_label}>Last Name</label>
                        <input
                        type="text"
                        name="last_name"
                        value={last_name}
                        placeholder="Last Name"
                        onChange={handleChange}
                         className={styles.login_form_input} />
                        {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                    </div>
                </div>
              <div className={styles.login_form_group}>
                <label htmlFor="username" className={styles.login_form_label}>
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={handleChange}
                  className={styles.login_form_input}
                />
              </div>
              <div className={styles.login_form_group}>
                <label htmlFor="email" className={styles.login_form_label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleChange}
                  className={styles.login_form_input}
                />
              </div>
              <div className={styles.login_form_col_2}>
                  <div className={styles.login_form_group}>
                      <label htmlFor="city" className={styles.login_form_label}>City</label>
                      <input  name="city" type="text" className={styles.login_form_input} />
                      {/* {this.props.errors.city && <div className={styles.errorMsg}>{this.props.errors.accountname}</div>} */}
                  </div>
                  <div className={styles.login_form_group}>
                      <label htmlFor="country" className={styles.login_form_label}>Country</label>
                      <input name="country" type="text" className={styles.login_form_input} />
                      {/* {this.props.errors.lastname && <div className={styles.errorMsg}>{this.props.errors.lastname}</div>} */}
                  </div>
              </div>
              <div className={styles.login_form_group}>
                <label htmlFor="phone_number" className={styles.login_form_label}>
                  Phone Number
                </label>
                {/* <input
                  type="tel"
                  name="phone_number"
                 value={phone_number}
                  placeholder="Your Phone Number"
                  onChange={handleChange}
                  className={styles.login_form_input}
                /> */}
                <PhoneInput
                  inputClass={styles.login_form_input}
                  country={'us'}
                  name="phone_number"
                  value={phone_number}
                  onChange={phone => handlePhoneChange(phone)}
                />
              </div>
              <div className={styles.login_form_group}>
                <label htmlFor="password" className={styles.login_form_label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Create a Password"
                  onChange={handleChange}
                  className={styles.login_form_input}
                />
                <div className={styles.secureEye}>
                  <Image src={closeIcon} />
                  <i className={styles.eye}></i>
              </div>
              </div>

                <div className={styles.signup_form_option}>
                <input
                    className={styles.signup_form_radioInput}
                    type="radio"
                    id="service"
                    name="agreement"
                    value="agreed"
                    />
                    <label
                    htmlFor="service"
                    className={styles.signup_form_radio_button}
                    ></label>
                    <label htmlFor="service" className={styles.signup_form_radio_label}>
                        I accept the Terms & Conditions and Privacy and Cookie Notice
                    </label>
                </div>

                <div className={styles.signup_form_option}>
                <input
                    className={styles.signup_form_radioInput}
                    type="radio"
                    id="service"
                    name="agreement"
                    value="agreed"
                    />
                    <label
                    htmlFor="service"
                    className={styles.signup_form_radio_button}
                    ></label>
                    <label htmlFor="service" className={styles.signup_form_radio_label}>
                        I want to receive Chop Chow Newletters and best deal promotional offers
                    </label>
                </div>
              
            </div>

            {status === 'success' ? 
            <p className="msg-success">{message}</p>:
            <p className="msg-err">{message}</p>}
  
            <button onClick={formSubmit} className={styles.login_button}>Register</button>
  
            <h3 className={styles.login_new}>Already have an account? {props.closeSignUp ? <span onClick={props.closeSignUp}>Sign in here</span> : <Link href='/login'><a>Sign in here</a></Link> }</h3>
            
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
              Get your African Delicacies delievered to your Door
            </h3>
          </div>    
        </div>
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
      signup: (form) => dispatch(userSignUp(form))
    };
  }
  
  export default connect(
    mapStateToProp,
    mapDispatchToProps,
  )(SignUp);