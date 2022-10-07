import React from 'react';
import './style.css';
import { Form, Button, Container, Modal, Row, Col, ButtonToolbar } from 'react-bootstrap';

import { Link } from 'next/link';
// import { setTimeout } from 'timers';

export default class SignUp extends React.Component {
  state = {
    email: '',
    phone: '',
    username: '',
    password: '',
    messageErr: false,
    messageSuccess: false,
    showModal: true,
    emailNotification: false
  };


  handleChange = (e) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    name === "emailNotification" ? this.setState({emailNotification: e.currentTarget.checked}) : this.setState({ [name]: value });

  }


  handleClose = (delay) => {
    // setTimeout(() => {
      this.props.history.push('/grocery');
    // }, delay, || 0);
  };

  formSubmit = (e) => {
    e.preventDefault();
    //validate email
    let email = this.state.email;
    if (email !== "" && /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email) ){
      var [account, address] = email.split('@'); 
      var domainParts = address.split('.');

      if(  email.length < 256 && account.length < 64 && domainParts.some(function (part) {
        return part.length < 63;
      })){
        this.setState({ messageErr: '' });

          this.submitForm();
      }else{
        this.setState({ messageErr: 'Please enter a valid email.' });
      }
    }
    else{
      if((this.state.phone.length >= 10 && this.state.phone.length <=30) && this.state.username && this.state.password) {
        this.setState({ messageErr: '' });

        this.submitForm();
      }
      else{
        this.setState({ messageErr: 'Please enter a valid phone number or email.' });
      }
    }
  }
  
  submitForm = () => {
    console.log("state,", this.state);
    var url = 'https://chopchowdev.herokuapp.com/api/signupuser';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state),
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

  render() {
    return (
<Modal show={this.state.showModal} onHide={this.handleClose} className="modal registerme" backdrop="static">
  <Modal.Header closeButton>
    <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
      <div>Sign Up</div>
      <span style={{ fontSize: '11pt' }}>Already have an account?  
      <Link className="link-guest-word" href="/login">Login</Link></span>
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg>
          <Form className="" onSubmit={this.formSubmit}>
            <Form.Group>
                <Form.Control
                      type="email"
                      name="email"
                      value={this.state.email}
                      placeholder="Your email"
                      onChange={this.handleChange}
                      autoComplete = "username"
                    />
                  <Form.Label>Or</Form.Label>
                <Form.Control
                      type="tel"
                      name="phone"
                      value={this.state.phone}
                      placeholder="Your Phone Number"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <hr/>
                  <Form.Group>
                  <Form.Control
                      type="text"
                      name="username"
                      value={this.state.username}
                      placeholder="Username"
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={this.state.password}
                      placeholder="Create a Password"
                      onChange={this.handleChange}
                      autoComplete = "new-password"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formHorizontalCheck">
                    <Form.Label></Form.Label>
                    <Form.Check onChange={this.handleChange} name="emailNotification" label="Sign Up for Email Notifications" />
                  </Form.Group>
                  <p className="msg-success">{this.state.messageSuccess}</p>
                  <p className="msg-err">{this.state.messageErr}</p>
                  <ButtonToolbar>
                    <Button variant="secondary" type="submit" className="login__form-btn">Sign Up</Button>
                  </ButtonToolbar>
                  <Link className="" href="/signup">or Sign up as driver</Link>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }

}
