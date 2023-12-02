import { useRouter } from 'next/router';
import React, { useState } from 'react';
//import './style.css';
import {  Button, Container, Modal, Row, Col, ButtonToolbar } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../actions';
import Login from '../Login';
// import { setTimeout } from 'timers';

function VerifyEmail() {
//   state = {
//     messageErr: false,
//     messageSuccess: false,
//     showModal: true,
//   };

  

//   handleChange = (e) => {
//     let name = e.currentTarget.name;
//     let value = e.currentTarget.value;
//     this.setState({ [name]: value });
//   }


  

//   formSubmit = (e) => {
//     e.preventDefault();
//     if((this.state.password1 || this.state.password2)) {
//       this.submitForm();
//     } else {
//       this.setState({ messageErr: 'Please enter correct data.' });
//     }
//   };
// const [messageErr, setMessageErr] = useState(false);
// const [ messageSuccess, setMessageSuccess] = useState(false);
const [ showModal, setShowModal] = useState(true);
const [ loginLoading, setLoginLoading] = useState(false);
const isverified = useSelector(state => state.Auth.isVerified);
const isauthenticated = useSelector(state => state.Auth.isAuthenticated);


const router = useRouter();
const dispatch = useDispatch()

  const handleClose = () => {
    // setTimeout(() => {
      setShowModal(false)
      router.push('/signup');
      
    // }, delay || 0);
  };
  const submitForm = () => {
    const {userid, token} = router.query;
    console.log("useeffect query", router.query)
    setLoginLoading(true);
    dispatch(verifyEmail(userid, token))
    //props.verifyEmail(userid, token);

  // let token = this.props.location.search.replace('?', '').split('=')[1];
//     let formData = Object.assign({}, this.state, {token})
//     fetch('/api/resetpass', {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     }).then(response => {
//         if (response.status === 400 || response.status === 404) {
//           this.setState({ messageErr: 'Bad Request , Check username or email ... !!' });
//         } else if (response.status === 401) {
//           this.setState({ messageErr: 'you are UnAuthorized' });
//         } else if (response.status >= 500) {
//           this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
//         } else {
//           this.setState({ messageErr: '', isAuthenticated: true, messageSuccess: 'Please check your inbox for more details! ' });
//           this.handleClose(5000);
//         }
//       })
  };


  // Check this out 
  const {userid, token} = router.query;
  console.log("useeffect query", router.query)
if(userid && token ) {
  return (
    <Modal show={showModal} onHide={handleClose} className="modal resetpassword" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          <div>Verify Your Email Address</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg>
                {/* <p className="msg-success">{messageSuccess}</p>
                <p className="msg-err">{messageErr}</p> */}
                <p> In order to start using chopchow account, you need to confirm your email address </p>
                <ButtonToolbar>
                <Button variant="secondary" type="submit"  onClick={submitForm} className="login__form-btn">{loginLoading ? (
                <Loader thickness={5} size={30} color="secondary" />
              ) : (
                "Verify email address"
              )}</Button>
                </ButtonToolbar>        
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {
        isverified && isauthenticated && <Login/>
      }
    </Modal>
   
);
} else {
  return (
    <Modal show={showModal} onHide={handleClose} className="modal resetpassword" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          <div>Something wrong with your token please try signin again.</div>
        </Modal.Title>
      </Modal.Header>
      
          </Modal>
        )
  
}


}
// function mapStateToProp(state) {
//   return {
//     auth: state.Auth,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     verifyEmail: (userid, token) => 
//   };
// }

export default VerifyEmail;
