import React from 'react';
import './style.css';
import { Form, Button, Container, Modal, Row, Col, ButtonToolbar } from 'react-bootstrap';
// import { setTimeout } from 'timers';

export default class ResetPassword extends React.Component {
  state = {
    password1: '',
    password2: '',
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
      this.props.history.push('/grocery');
    // }, delay || 0);
  };

  formSubmit = (e) => {
    e.preventDefault();
    if((this.state.password1 || this.state.password2)) {
      this.submitForm();
    } else {
      this.setState({ messageErr: 'Please enter correct data.' });
    }
  };

  submitForm = () => {
    let token = this.props.location.search.replace('?', '').split('=')[1];
    let formData = Object.assign({}, this.state, {token})
    fetch('/api/resetpass', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(response => {
        if (response.status === 400 || response.status === 404) {
          this.setState({ messageErr: 'Bad Request , Check username or email ... !!' });
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

let isItReset = this.props.location.search.replace('?', '').split('=');
if(isItReset.length > 1) {
  isItReset = isItReset[1];
  return (
    <Modal show={this.state.showModal} onHide={this.handleClose} className="modal resetpassword" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          <div>Reset Password</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg>
              <Form className="" onSubmit={this.formSubmit}>
              <Form.Group>
              <Form.Control type="hidden" name="token" value={isItReset} />
                <Form.Control
                          type="password"
                          name="password1"
                          value={this.state.password1}
                          placeholder="New Password"
                          onChange={this.handleChange}
                        />
                    
                      </Form.Group>
                      <Form.Label></Form.Label>
                      <Form.Group>
                      <Form.Control
                          type="password"
                          name="password2"
                          value={this.state.password2}
                          placeholder="Retype Password"
                          onChange={this.handleChange}
                        />
                        <Form.Label></Form.Label>
                        
                      </Form.Group>
                      
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
        );
} else {
  return (
    <Modal show={this.state.showModal} onHide={this.handleClose} className="modal resetpassword" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          <div>Something wrong with yout token please try again.</div>
        </Modal.Title>
      </Modal.Header>
      
          </Modal>
        )
  
}


  }

}
