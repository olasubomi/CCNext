import React from "react";
// import "./AdminPanel.scss";
import { Container, Col, Row } from "react-bootstrap";
import img_oil from "../../assets/images/ola_ola_palm_oil.jpg";
import img_logo from "../../assets/images/logo2.png";
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { connect } from 'react-redux';
import { withRouter } from "next/router";
// import axios from '../../util/Api';

//////////////////////////////////////////////////////////////////////
class AdminPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  //////////////////////////////////////////////////////////////////////
  handleOnClickItems = (item, userRole) => {
    if (item === "suggest" && userRole === "admin") {
      this.props.history.push("/ViewSuggestedMeals")
      // return (window.location.href = "/ViewSuggestedMeals");
    } else {
      this.setState({ open: true });
    }
  }

  //////////////////////////////////////////////////////////////////////
  handleClose = () => { this.setState({ open: false }); };

  //////////////////////////////////////////////////////////////////////
  render() {
    if (typeof window !== 'undefined') {

      const userRole = window.localStorage.getItem("userRole");
      console.log("yyy:", userRole);
      return (
        <Container className="admin-page">
          <Row>
            <Col md={12} className="admin-title-region">
              <div className="admin-title"><div style={{ width: "100%" }}>Admin Dashboard</div></div>
            </Col>

            <Col md={4} className="admin-item-panel">
              <div className="item-card">
                <div className="admin-item-title"><div style={{ width: "100%" }}>INVENTORY</div></div>
                <img src={img_oil} className="admin-item-img" alt="" />
              </div>
            </Col>
            <Col md={4} className="admin-item-panel">
              <div className="item-card">
                <div className="admin-item-title"><div style={{ width: "100%" }}>ORDERS</div></div>
                <img src={img_oil} className="admin-item-img" alt="" />
              </div>
            </Col>
            <Col md={4} className="admin-item-panel">
              <div className="item-card" id="suggest_admin" onClick={() => this.handleOnClickItems("suggest", userRole)}>
                <div className="admin-item-title"><div style={{ width: "100%" }}>MEAL SUGGESTIONS/SUPPORT</div></div>
                <img src={img_logo} className="admin-item-img" alt="" />
              </div>
            </Col>
          </Row>
          <Row className="admin-items-section">
          </Row>


          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title">Informtation</DialogTitle>
            <DialogContent>
              <DialogContentText>Only admin user can open</DialogContentText>
            </DialogContent>
          </Dialog>
        </Container>

      );
    }
  }
}
const mapStateToProps = ({ auth, commonData }) => {
  const { authUser, role, customer_id } = auth;
  const { status } = commonData;
  return { authUser, role, customer_id, status }
};

export default connect(mapStateToProps, () => ({}))(withRouter(AdminPanel));