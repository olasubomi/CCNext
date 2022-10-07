import React, { Component } from "react";
import Link from "next/link";
import img_logo from "../../../public/assets/CC_Logo_no_bg.png"
import { useEffect } from 'react'


// import img_logo from "../../assets/images/CC_Logo_no_bg.png"
// import './header.css';
import Dropdown from 'react-bootstrap/Dropdown'
import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";
// import axios from '../../util/Api';

//////////////////////////////////////////////////////////////////////
class Header extends Component {
  constructor() {
    super();
    this.state = {
      suggestMealPopOver: false,
      base_index: 0,
      topNav_className: "w3-bar w3-dark-grey w3-green topnav",
      isAuthenticated: false,
      customerId: null,
      username: null,
    };
  }

  //////////////////////////////////////////////////////////////////////
  updateLogInStatus(customerId, username) {
    console.log("updates log in status before");
    this.setState({ isAuthenticated: true });
    this.setState({ customerId: customerId });
    this.setState({ username: username });

    console.log("updates log in status after");
    console.log("customerID is:" + customerId);
  }

  //////////////////////////////////////////////////////////////////////
  CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
      {children}
      &#x25bc;
    </a>
  ));

  //////////////////////////////////////////////////////////////////////
  handleLogout(e) {
    if (e === "6") {
      //clear cookie cache
      // useEffect(() => {
      // You now have access to `window`
      // window.localStorage.setItem("userToken", null);
      // window.localStorage.setItem("userRole", null);
      // }, [])


      // var url = "/api/logout";
      var url = `https://chopchowdev.herokuapp.com/api/logout`;

      fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          response.json().then((res) => {
            console.log("logout response is:");
            console.log(res);
            console.log("should print body");
            console.log(res.data);
            if (res.data === "success") {
              console.log("comes to turn off authentication state");
              this.setState({ isAuthenticated: false });
            }
          });
        })
        .catch((err) => {
          console.log("fails to authenticate app page");
          console.log(err);
        });

      this.setState({ isAuthenticated: false });
      window.location.reload(false);
    }
    else if (e === "4") {
      // this.props.history.push('/SuggestMeal');
    }
  }


  handleDashborad() {
    // this.props.history.push('/admin');
  }


  //////////////////////////////////////////////////////////////////////
  render() {
    // const username = this.props.authUser;
    const isAuthenticated = false;

    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    function myFunction() {
      var x = document.getElementById("mobileNavbar");
      console.log(x);
      if (x.className === "mobileNavbar") {
        x.className += " visible";
      } else {
        x.className = "mobileNavbar";
      }
    }

    var login_on_desktop_navbar;
    var login_on_burger_navbar;

    if (isAuthenticated) {
      login_on_desktop_navbar = (
        <li className="nav-item">
          <Dropdown alignRight>
            <Dropdown.Toggle as={this.CustomToggle} id="dropdown-custom-components">
              {username}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item eventKey="1" onSelect={(ev, obj) => this.handleDashborad()}>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" onSelect={(ev, obj) => this.handleDashborad()}> Dashboard/orders</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" onSelect={(ev, obj) => this.handleDashborad()}>Support</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" onSelect={(ev, obj) => this.handleLogout(ev)}>Suggest Meal</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="5" onSelect={(ev, obj) => this.handleDashborad()}>Switch to driver mode</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="6" onSelect={(ev, obj) => this.handleLogout(ev)}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      );

      login_on_burger_navbar = (
        <li className="nav-item">
          <Dropdown>
            <Dropdown.Toggle className="user-item" as={this.CustomToggle} id="dropdown-custom-components">
              {username}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item eventKey="1" onSelect={(ev, obj) => this.handleDashborad()}>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" onSelect={(ev, obj) => this.handleDashborad()}> Dashboard/orders</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" onSelect={(ev, obj) => this.handleDashborad()}>Support</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4" onSelect={(ev, obj) => this.handleLogout(ev)}>Suggest Meal</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="5" onSelect={(ev, obj) => this.handleDashborad()}>Switch to driver mode</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="6" onSelect={(ev, obj) => this.handleLogout(ev)}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      );

    } else {
      login_on_desktop_navbar = (
        <li className="nav-item">
          <Link href="/login">
            <a className="nav-link px-2">
              Log In / Register
            </a>
          </Link>
        </li>
      );

      login_on_burger_navbar = (
        <li className="nav-item" style={{ padding: "14px 16px" }}>
          <Link href="/login" className="nav-link px-2" style={{ color: "#FFFFFF" }} >Log In / Register</Link>
        </li>
      );
    }

    return (
      <div className="header-wraper">
        <nav
          className="navbar navbar-expand-md fixed-top-sm justify-content-start flex-nowrap navbar-light"
          style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #fd7e14" }}
        >
          {/* Desktop Navbar */}
          <div className="header-panel w-100">
            <div className="header-left ">
              <Link href="/" className="logo_tag navbar-brand ">
                <img src={img_logo} width="60px" alt="" />
              </Link>
              <div className=" form-inline navbar-first" style={{ padding: "14px 16px" }}>
                <div className="input-group " >
                  <input className="form-control " placeholder="Search meal or category" />
                  <span className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" style={{ backgroundColor: "#fd7e14", borderColor: "#fd7e14", }} >
                      <i className="fa fa-search" style={{ color: "#FFFFFF" }}></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <div className="header-right navbar-first">
              <ul className="navbar-nav flex-row">
                <li className="nav-item">
                  <Link href="/grocery" className="nav-link px-3">Grocery List</Link>
                </li>
                <li className="nav-item">
                  <Link href="/SuggestMeal" className="nav-link px-3">Suggest Meal</Link>
                </li>
                {login_on_desktop_navbar}
              </ul>
            </div>
          </div>

          <Link href="#" className="icon navbar-toggle" onClick={() => { console.log("Comes thru here"); myFunction(); }}  >
            <i className="fa fa-bars" style={{ color: "#AAAAAA", right: "1%" }}></i>
          </Link>
        </nav>


        {/* Burger navbar */}
        <div className="mobileNavbar" id="mobileNavbar" style={{ display: "none" }} >
          <div className="mobileNavbar-menu">
            <span className="input-group-append" style={{ marginTop: "23px", marginRight: "15px", justifyContent: "flex-end" }}>
              <Link href="#" className="icon navbar-toggle" onClick={() => { console.log("Comes thru here"); myFunction(); }}  >
                <i className="fa fa-bars" style={{ color: "white", marginLeft: "10px", padding: "10px 17px" }}></i>
              </Link>
            </span>

            <ul className="navbar-nav">
              <li style={{ padding: "5px 16px", borderBottom: "1px solid #FFFFFF" }}>
                <div className='search_bar'>
                  <form >
                    <input className='form-control' placeholder='Search meal or category' style={{ backgroundColor: "#fd7e14", border: "1px solid #FFFFFF", }} />
                    <span className="search_bar__icon">
                      <div className="btn btn-outline-secondary" style={{ backgroundColor: "#FFFFFF", borderColor: "#fd7e14", }}>
                        <i className="fa fa-search " style={{ color: "#fd7e14" }} ></i>
                      </div>
                    </span>
                  </form>
                </div>
              </li>

              {login_on_burger_navbar}
              <li className="nav-item" style={{ padding: "14px 16px" }}>
                <Link href="/grocery" className="nav-link px-2" style={{ color: "#FFFFFF" }}>Grocery List</Link>
              </li>
              <li className="nav-item" style={{ padding: "14px 16px", borderBottom: "1px solid #FFFFFF", }}>
                <Link href="/SuggestMeal" className="nav-link px-2" style={{ color: "#FFFFFF" }}>Suggest Meal</Link>
              </li>
              <li className="nav-item" style={{ padding: "14px 16px" }}>
                <Link href="/v2" className="nav-link px-2" style={{ color: "#FFFFFF" }}>Home</Link>
              </li>
              <li className="nav-item" style={{ padding: "14px 16px" }}>
                <Link href="/products" className="nav-link px-2" style={{ color: "#FFFFFF" }} > Stores </Link>
              </li>
              <li className="nav-item" style={{ padding: "14px 16px" }}>
                <Link href="/products" className="nav-link px-2" style={{ color: "#FFFFFF" }}>Receipes</Link>
              </li>
            </ul>
          </div>
        </div>

        <nav className="navbar navbar-expand-md  navbar-light navbar-second" style={{ backgroundColor: "#EEEEEE" }}>
          <div className="navbar-collapse collapse pt-2 pt-md-0" id="navbar2">
            <ul className="navbar-nav">
              <li className="nav-item active" style={{ marginRight: "50%" }}>
                <Link href="/home" className="nav-link px-2"> Home </Link>
              </li>
              <li className="nav-item" style={{ marginRight: "50%" }}>
                <Link href="/products" className="nav-link px-2"> Stores </Link>
              </li>
              <li className="nav-item" style={{ marginRight: "50%" }}>
                <Link href="/v2" className="nav-link px-2"> Receipes </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}



// export default connect(mapStateToProps, () => ({}))(withRouter(Header));
export default Header;