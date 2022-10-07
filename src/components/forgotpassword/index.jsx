import React from 'react';
import './style.css';
import { Form, Button, Container, Modal, Row, Col, ButtonToolbar } from 'react-bootstrap';
// import { setTimeout } from 'timers';

export default class ResetPassword extends React.Component {
  state = {
    email: '',
    username: '',
    messageErr: false,
    messageSuccess: false,
    showModal: true,
  };


  handleChange = (e) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    this.setState({ [name]: value });
  }


  handleClose = (delay) => {
    // setTimeout(() => {
      this.props.history.push('/');
    // }, delay || 0);
  };

  formSubmit = (e) => {
    e.preventDefault();
    if((this.state.email || this.state.username)) {
      this.submitForm();
    } else {
      this.setState({ messageErr: 'Please enter correct data.' });
    }
  };

  submitForm = () => {
    fetch('https://chopchowdev.herokuapp.com/api/forgotpass', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(response => {
      console.log(response)
        if (response.status === 400 || response.status === 404) {
          this.setState({ messageErr: 'Bad Request , Your username or email does not exist.' });
        } else if (response.status === 401) {
          this.setState({ messageErr: 'you are UnAuthorized' });
        } else if (response.status >= 500) {
          this.setState({ messageErr: 'Sorry , Internal Server ERROR' })
        } else {
          this.setState({ messageErr: '', isAuthenticated: true, messageSuccess: 'Please check your inbox for more details! ' });
          this.handleClose(5000);
        }
      })
  };

  render() {

  return (
    <Modal show={this.state.showModal} onHide={this.handleClose} className="modal resetpassword" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          <div>Forgot Password</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg>
              <Form className="" onSubmit={this.formSubmit}>
                <Form.Group>
                    <Form.Control
                          type="text"
                          name="email"
                          value={this.state.email}
                          placeholder="Your email"
                          onChange={this.handleChange}
                        />
                      <Form.Label>Or</Form.Label>
                    
                      </Form.Group>
                      
                      <Form.Group>
                      <Form.Control
                          type="text"
                          name="username"
                          value={this.state.username}
                          placeholder="Username"
                          onChange={this.handleChange}
                        />
                        <Form.Label></Form.Label>
                        
                      </Form.Group>
                      <Form.Label>We will sent you a link to reset your password.</Form.Label>

                      <p className="msg-success">{this.state.messageSuccess}</p>
                      <p className="msg-err">{this.state.messageErr}</p>
                      <ButtonToolbar>
                        <Button variant="secondary" type="submit" className="login__form-btn">Reset</Button>
                      </ButtonToolbar>
                      
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        )
  }

}
