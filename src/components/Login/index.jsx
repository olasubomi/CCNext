import React from "react";
import "./style.css";
import { Form, Button, Container, Modal, Row, Col } from "react-bootstrap";
// import Axios from "axios";
import { connect } from 'react-redux';
import { userSignIn } from '../../actions';
import { withRouter } from "react-router-dom";

///////////////////////////////////////////////////////////////////////////////////
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      messageErr: false,
      messageSuccess: false,
      dialogue_open_flag: true
    };
  }

///////////////////////////////////////////////////////////////////////////////////
  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

///////////////////////////////////////////////////////////////////////////////////
  handleClose = () => this.setState({dialogue_open_flag: false});

  componentWillReceiveProps(nextProps){
    const { openFlag } = nextProps;
    this.setState({dialogue_open_flag: openFlag});

    if (nextProps.authUser && nextProps.customer_id) {
        this.props.history.push('/grocery');
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  render() {
    const { email, password} = this.state;    
    return (      
      <Container>
            <Modal show={this.state.dialogue_open_flag} onHide={this.handleClose} className="text-center custom-card1" backdrop="static" size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title className="text-center" >Log In to View your Grocery List</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={5}>
                    <Button className="fb-btn mb-3 px-3 py-2">Login In with Facebook</Button>
                    <Button className="google-btn px-3 py-2">Login In with Google</Button>
                  </Col>
                  <Col md={1} className="or">or</Col>
                  <Col md={6} className="d-block right-panel">
                    <Form>
                      <Form.Control 
                        type="text" name="email" value={email} placeholder="Your Email or Username" 
                        onChange={this.handleChange}
                        className="login__form__input1" autoComplete="username"
                      />
                      <Form.Control 
                        type="password" name="password"
                        value={password} placeholder="Your password"
                        onChange={this.handleChange}
                        className="login__form__input" autoComplete="current-password"
                        />
                      <Form.Label className="lbl_text text-left" column md={12}><a className="forget" href="/forgotpass">Forgot Password?</a></Form.Label>
                      <Button variant="primary" className="mb-1 float-left login-button" 
                        onClick={(ev) => {
                            ev.preventDefault();
                            this.props.userSignIn({ email: this.state.email, password: this.state.password });
                        }}>Login</Button>

                      <Form.Label className="lbl_text mt-4 text-right pb-0" column md={12}>
                        Don't have an account? <a className="signup" href="/signup">Sign Up</a>
                      </Form.Label>
                      <Form.Label className="lbl_text text-right pt-0" column md={12}>
                        or <a className="continue" href="/v2">continue as guest</a>
                      </Form.Label>
                    </Form>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>        
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, commonData }) => {
  const { authUser, role, customer_id } = auth;
  const {status }  = commonData;
  return { authUser, role, customer_id, status }
};

const mapDispatchToProps = { userSignIn };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
