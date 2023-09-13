import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png";
import styles from "./header.module.css";

import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";

import openIcon from "../../../public/assets/icons/eva_menu-open.png";
import messageIcon from "../../../public/assets/icons/message.png";
import orderIcon from "../../../public/assets/icons/orderIcon.png";
import verifiedIcon from "../../../public/assets/icons/verified.png";
import cancelredIcon from "../../../public/assets/icons/cancelred.png";
import Image from "next/image";
import {
  ArrowDownIcon,
  ArrowLeftFillIcon,
  BasketIcon,
  CartIcon,
  DashBoardIcon,
  HomeIcon,
  NotificationIcon,
  Order2Icon,
  UserIcon,
} from "../icons";
import { Auth } from "../auth";
import { connect } from "react-redux";
import { getPath } from "../../actions/Common";
import { useRouter } from "next/router";
import { userSignOut, verifyToken, setOpenLogin } from "../../actions";
import { SimpleSnackbar } from "../../common";
import { triggerAlert } from "../../actions/";
import CartContext from "../../../pages/store/cart-context";


function Header(props) {
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const [customerId, setCustomerIdState] = useState(null);
  const [username, setUsernameState] = useState(null);
  const [showNotif, setshowNotifState] = useState(true);

  const [openLogin, setOpenLoginState] = useState(false);
  const router = useRouter();

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // useEffect(() => {
  //   props.getPath(router.pathname);
  //   let token = localStorage.getItem("x-auth-token");
  //   let time = localStorage.getItem("in");
  //   if (token !== null && time !== null) {
  //     const msInMinute = 60 * 1000;
  //     let min = Math.abs(Date.now() - time) / msInMinute;
  //     if (min > 30) {
  //       localStorage.removeItem("x-auth-token");
  //       localStorage.removeItem("in");
  //       localStorage.removeItem("user");
  //     } else {
  //       let user = JSON.parse(localStorage.getItem("user"));
  //       props.verifyToken(user, token);
  //     }
  //   } else {
  //     localStorage.removeItem("x-auth-token");
  //     localStorage.removeItem("in");
  //     localStorage.removeItem("user");
  //   }
  // }, []);

  function updateLogInStatus(customerId, username) {
    console.log("updates log in status before");
    setIsAuthenticatedState(true);
    setCustomerIdState(customerId);
    setUsernameState(username);


    setIsAuthenticatedState(true);
    setCustomerIdState(customerId);
    setUsernameState(username);
  }

  //////////////////////////////////////////////////////////////////////
  // CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  //   <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
  //     {children}
  //     &#x25bc;
  //   </a>
  // ));
  //////////////////////////////////////////////////////////////////////
  function handleLogout(e) {
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
              setIsAuthenticatedState(false);
            }
          });
        })
        .catch((err) => {
          console.log("fails to authenticate app page");
          console.log(err);
        });

      setIsAuthenticatedState(false);
      window.location.reload(false);
    } else if (e === "4") {
      // this.props.history.push('/SuggestMeal');
    }
  }

  function handleDashborad() {
    // this.props.history.push('/admin');
  }

  function toggleNotification(e) {
    document.getElementById("notification").style.display = "grid";
    document.addEventListener("click", (e) => {
      if (document.getElementById("notification")) {
        if (
          e.target.id !== "notImg" &&
          e.target.id !== "notNo" &&
          e.target.id !== "noticon" &&
          e.target.id !== "notText"
        )
          document.getElementById("notification").style.display = "none";
      }
    });
  }

  function toggleUserDetails(e) {
    document.getElementById("userdetails").style.display = "grid";
    document.addEventListener("click", (e) => {
      if (document.getElementById("userdetails")) {
        if (
          e.target.id !== "userImg" &&
          e.target.id !== "usericon" &&
          e.target.id !== "userName"
        )
          document.getElementById("userdetails").style.display = "none";
      }
    });

    window.event.returnValue = false;
  }

  function toggleLogin() {
    setOpenLoginState(!openLogin);

  }

  function logout() {
    props.logout();
    router.push("/");
  }

  return (
    <>
      <div className={styles.navbar}>
        <div className="alert">
          {/* {props.message.length > 0 &&
            <div className="alert-success">
              {props.message}
            </div>}
          {props.error.length > 0 &&
            <div className="alert-danger">
              {props.error}
            </div>} */}
        </div>
        <div className={styles.navbar_top_container}>
          <div className={styles.navbar_top}>
            <Link href="/">
              <a className={styles.navbar_top_logo_img}>
                <Image src={img_logo} alt="logo" />
              </a>
            </Link>
            <div className={styles.navbar_top_details}>
              {!props.auth.isAuthenticated && props.auth.authUser === null ? (
                // <Link href='/login'>
                // <a className={styles.navbar_user_loginbtn}>
                <div
                  onClick={toggleLogin}
                  className={styles.navbar_user_loginbtn}
                >
                  Log In/Register
                </div>
              ) : (
                // </a>[//\\][//\\][Aa1]
                // </Link>
                <div className={styles.navbar_user_info}>
                  <img
                    id="userImg"
                    onClick={(e) => toggleUserDetails(e)}
                    src="/assets/icons/user.png"
                    alt="User"
                    className={styles.navbar_user_img}
                  />
                  <h2
                    id="userName"
                    onClick={(e) => toggleUserDetails(e)}
                    className={styles.navbar_user_name}
                  >
                    {props.auth.authUser.username}
                  </h2>
                  <ArrowDownIcon
                    id="usericon"
                    onClick={(e) => toggleUserDetails(e)}
                    style={styles.navbar_user_icon}
                  />
                  <div id="userdetails" className={styles.navbar_user_signedin}>
                    <Link href="/dashboard">
                      <a>
                        <div
                          className={
                            styles.navbar_user_signedin_link +
                            " " +
                            styles.black
                          }
                        >
                          <DashBoardIcon style={styles.navbar_main_link_icon} />
                          <h3>Dashboard</h3>
                        </div>
                      </a>
                    </Link>
                    <Link href="/dashboard/userprofile">
                      <a>
                        <div
                          className={
                            styles.navbar_user_signedin_link +
                            " " +
                            styles.black
                          }
                        >
                          {/* <Image src={openIcon} alt="profile" /> */}
                          <UserIcon style={styles.navbar_main_link_icon} />
                          <h3>Profile</h3>
                        </div>
                      </a>
                    </Link>
                    <div className={styles.navbar_user_signedin_logout}>
                      <div>
                        <div
                          onClick={logout}
                          className={
                            styles.navbar_user_signedin_link +
                            " " +
                            styles.white
                          }
                        >
                          <ArrowLeftFillIcon
                            style={styles.navbar_main_link_icon2}
                          />
                          <h3>Logout</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button className={styles.navbar_user_upgradebtn}>Upgrage</button>
              <div className={styles.navbar_top_details_col}>
                <div id="noticon" onClick={(e) => toggleNotification(e)}>
                  <NotificationIcon
                    id="notImg"
                    style={styles.navbar_top_details_col_icon}
                  />
                  <span
                    id="notNo"
                    style={{ background: "#04D505" }}
                    className={styles.numberofitems}
                  >
                    3
                  </span>
                </div>
                <h5 id="notText" onClick={(e) => toggleNotification(e)}>
                  Notification
                </h5>
                <div id="notification" className={styles.summaries_min}>
                  <div className={styles.summary_min}>
                    <div className={styles.summary_min_head}>
                      <h3 className={styles.summary_min_h3}>Notification</h3>
                    </div>
                    <div className={styles.summary_min_notifications}>
                      <div className={styles.summary_notification}>
                        <Image
                          src={orderIcon}
                          alt="order"
                          className={styles.summary_notification_Img}
                        />
                        <div className={styles.summary_notification_Details}>
                          <h3 className={styles.summary_notification_desc}>
                            hhh
                          </h3>
                          <p className={styles.summary_notification_link}>
                            View Order
                          </p>
                          <p className={styles.summary_notification_time}>
                            2 sec
                          </p>

                        </div>
                      </div>
                      {/* </> */}

                      <button className={styles.navbar_user_upgradebtn}>Upgrage</button>
                      <div className={styles.navbar_top_details_col}>
                        <div id="noticon" onClick={(e) => toggleNotification(e)}>
                          <NotificationIcon
                            id="notImg"
                            style={styles.navbar_top_details_col_icon}
                          />
                          <span
                            id="notNo"
                            style={{ background: "#04D505" }}
                            className={styles.numberofitems}
                          >
                            3
                          </span>
                        </div>
                        <h5 id="notText" onClick={(e) => toggleNotification(e)}>
                          Notification
                        </h5>
                        <div id="notification" className={styles.summaries_min}>
                          <div className={styles.summary_min}>
                            <div className={styles.summary_min_head}>
                              <h3 className={styles.summary_min_h3}>Notification</h3>
                            </div>
                            <div className={styles.summary_min_notifications}>
                              <div className={styles.summary_notification}>
                                <Image
                                  src={orderIcon}
                                  alt="order"
                                  className={styles.summary_notification_Img}
                                />
                                <div className={styles.summary_notification_Details}>
                                  <h3 className={styles.summary_notification_desc}>
                                    hhh
                                  </h3>
                                  <p className={styles.summary_notification_link}>
                                    View Order
                                  </p>
                                  <p className={styles.summary_notification_time}>
                                    2 sec
                                  </p>
                                </div>
                              </div>
                              <div className={styles.summary_notification}>
                                <Image
                                  src={messageIcon}
                                  alt="notification"
                                  className={styles.summary_notification_Img}
                                />
                                <div className={styles.summary_notification_Details}>
                                  <h3 className={styles.summary_notification_desc}>
                                    Suggested meal : Baking with Flour approved
                                  </h3>
                                  <p className={styles.summary_notification_time}>
                                    2 sec
                                  </p>
                                </div>
                              </div>

                              <div className={styles.summary_notification}>
                                <Image
                                  src={verifiedIcon}
                                  alt="notification"
                                  className={styles.summary_notification_Img}
                                />
                                <div className={styles.summary_notification_Details}>
                                  <h3 className={styles.summary_notification_desc}>
                                    Suggested meal : Baking with Flour approved
                                  </h3>
                                  <p className={styles.summary_notification_link}>
                                    Track Order
                                  </p>
                                  <p className={styles.summary_notification_time}>
                                    2 sec
                                  </p>
                                </div>
                              </div>

                              <div className={styles.summary_notification}>
                                <Image
                                  src={verifiedIcon}
                                  alt="notification"
                                  className={styles.summary_notification_Img}
                                />
                                <div className={styles.summary_notification_Details}>
                                  <h3 className={styles.summary_notification_desc}>
                                    Suggested meal : Baking with Flour approved
                                  </h3>
                                  <p className={styles.summary_notification_link}>
                                    View Inventory
                                  </p>
                                  <p className={styles.summary_notification_time}>
                                    2 sec
                                  </p>
                                </div>
                              </div>

                              <div className={styles.summary_notification}>
                                <Image
                                  src={cancelredIcon}
                                  alt="notification"
                                  className={styles.summary_notification_Img}
                                />
                                <div className={styles.summary_notification_Details}>
                                  <h3 className={styles.summary_notification_desc}>
                                    Suggested meal : Gbegiri rejected
                                  </h3>
                                  <p className={styles.summary_notification_link}>
                                    View
                                  </p>
                                  <p className={styles.summary_notification_time}>
                                    2 sec
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={styles.navbar_top_details_col + " " + styles.hide}
                      >
                        <CartIcon
                          style={styles.navbar_top_details_col_icon}
                          cartOpen={props.openCart}
                        />
                        <div>
                          <a>
                            <h5 onClick={props.openCart}>Cart</h5>
                          </a>
                          <span
                            style={{ background: "#F47900" }}
                            className={styles.numberofitems}
                            onClick={props.openCart}
                          >
                            {numberOfCartItems}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.navbar_down}>
                <div
                  className={
                    styles.navbar_down_col +
                    " " +
                    (props.path === "/" && styles.activeLinkDown)
                  }
                >
                  <Link href="/">
                    <a>
                      <HomeIcon style={styles.navbar_down_col_icon} />
                      <p>Home</p>
                    </a>
                  </Link>
                </div>
                <div
                  className={
                    styles.navbar_down_col +
                    " " +
                    (props.path === "/dashboard/orders/orders" && styles.activeLinkDown)
                  }
                >
                  <Link href="/dashboard/orders/orders">
                    <a>
                      <Order2Icon style={styles.navbar_down_col_icon} />
                      <p>Order</p>
                    </a>
                  </Link>
                </div>
                <div
                  className={
                    styles.navbar_down_col +
                    " " +
                    (props.path === "/grocery-list" && styles.activeLinkDown)
                  }
                >
                  <Link href="/grocerylist">
                    <a>
                      <BasketIcon style={styles.navbar_down_col_icon} />
                      <p>Grocery List</p>
                    </a>
                  </Link>
                </div>
                <div
                  className={
                    styles.navbar_down_col +
                    " " +
                    (props.path === "/cart" && styles.activeLinkDown)
                  }
                >
                  <Link href="/cart">
                    <a>
                      <CartIcon style={styles.navbar_down_col_icon} />
                      <p>Cart</p>
                    </a>
                  </Link>

                </div>
                {props.openLogin &&
                  <Auth toggleLogin={toggleLogin} />}
                {openLogin && <Auth toggleLogin={toggleLogin} />}
              </div>
              {openLogin && <Auth toggleLogin={toggleLogin} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {

    getPath: path => dispatch(getPath(path)),
    setOpenLogin: login => dispatch(setOpenLogin(login)),

    logout: () => dispatch(userSignOut()),
    verifyToken: (user, token) => dispatch(verifyToken(user, token)),
    resetSnack: (showSnack, snackMessage) =>
      dispatch(triggerAlert({ snackMessage, showSnack })),
  };
}

function mapStateToProp(state) {
  return {
    path: state.Common.path,
    auth: state.Auth,
    openLogin: state.Auth.openLogin,
    error: state.Common.error,
    message: state.Common.message,
    showSnack: state?.Common?.showSnack,
    snackMessage: state?.Common?.snackMessage,
    snackDuration: state?.Common?.snackDuration,
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Header);

export function Header2() {
  return (
    <div className={styles.navbar2}>
      <div className={styles.navbar_main_container}>
        <div className={styles.navbar_main}>
          <ul className={styles.navbar_main_links}>
            <li className={styles.navbar_main_link}>
              <p>Store</p>
            </li>
            <li className={styles.navbar_main_link}>
              <p>Meals</p>
            </li>
            <li className={styles.navbar_main_link}>
              <p>Product</p>
            </li>
            <li className={styles.navbar_main_link}>
              <p>Kitchen Utensils</p>
            </li>
          </ul>

          <div className={styles.navbar_main_grocery}>
            <Link href="/grocery">Grocery Lists</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
