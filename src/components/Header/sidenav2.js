import {
  DashBoardIcon,
  HotMealIcon,
  InventoryIcon,
  OrderIcon,
  GroceryIcon,
  PowerIcon,
  StoreMgtIcon,
  SupportIcon,
  UserIcon,
} from "../icons";
import Link from "next/link";
import styles from "./header.module.css";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { setOpenLogin, userSignOut } from "../../actions";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth.context";
import icon from '../../../public/assets/fa_shopping-basket.png'
import Image from "next/image";

function SideNav2(props) {
  console.log(props, 'pops');
  const { isOpen, setIsOpen } = useAuth();
  const router = useRouter();

  function toggleLogin() {
    props.setOpenLogin(!props.openLogin);
    setIsOpen(!isOpen);
  }

  function logout() {
    props.logout();
    router.push("/");
  }

  const [user, setUser] = useState({})

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user') || "{}")
    setUser(data)
  }, [])
  return (
    <div className={styles.sidenav_links_con}>
      <div className={styles.sidenav_links}>
        {props.auth.authUser && (
          <React.Fragment>
            <Link href="/dashboard">
              <div
                className={
                  styles.sidenav_link +
                  " " +
                  (props.path === "/dashboard" && styles.active)
                }
              >
                <DashBoardIcon style={styles.sidenav_link_icon} />
                Dashboard
              </div>
            </Link>
            {props.auth.authUser.user_type === "supplier" && (
              <Link href="/dashboard/inventory">
                <div
                  className={
                    styles.sidenav_link +
                    " " +
                    (props.path === "/dashboard/inventory" && styles.active)
                  }
                >
                  <InventoryIcon style={styles.sidenav_link_icon} />
                  Inventory
                </div>
              </Link>
            )}
            <Link href="/dashboard/orders/orders">
              <div
                className={
                  styles.sidenav_link +
                  " " +
                  (props.path === "/dashboard/orders/orders" && styles.active)
                }
              >
                <OrderIcon style={styles.sidenav_link_icon} />
                Order
              </div>
            </Link>
            <Link href="/grocery">
              <div
                className={
                  styles.sidenav_link +
                  " " +
                  (props.path === "/grocery" && styles.active)
                }
              >
                {/* <GroceryIcon style={styles.sidenav_link_icon} /> */}
                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <Image src={icon} />
                Grocery List
                </div>
                
              </div>
            </Link>
            {props.auth.authUser.user_type !== "driver" && (
              <Link href="/dashboard/suggestedmeals">
                <div
                  className={
                    styles.sidenav_link +
                    " " +
                    (props.path === "/dashboard/suggestedmeals" &&
                      styles.active)
                  }
                >
                  <HotMealIcon style={styles.sidenav_link_icon} />
                  {props.auth.authUser.user_type === "admin"
                    ? "Meal Request"
                    : "Meal/Product Suggestion"}
                </div>
              </Link>
            )}
            <Link href="/dashboard/userprofile">
              <div
                className={
                  styles.sidenav_link +
                  " " +
                  (props.path === "/dashboard/userprofile" && styles.active)
                }
              >
                <UserIcon style={styles.sidenav_link_icon} />
                My Profile
              </div>
            </Link>
            <Link href={`/chef/${user?._id}`}>
              <div
                className={
                  styles.sidenav_link +
                  " " +
                  (props.path === "/dashboard/userprofile" && styles.active)
                }
              >
                <UserIcon style={styles.sidenav_link_icon} />
                Public Profile
              </div>
            </Link>
            {props.auth.authUser.user_type === "supplier" && (
              <Link href="/dashboard/management">
                <div
                  className={
                    styles.sidenav_link +
                    " " +
                    (props.path === "/dashboard/management" && styles.active)
                  }
                >
                  <StoreMgtIcon style={styles.sidenav_link_icon} />
                  Store Management
                </div>
              </Link>
            )}
            {props.auth.authUser.user_type === "admin" && (
              <Link href="/dashboard/management">
                <div
                  className={
                    styles.sidenav_link +
                    " " +
                    (props.path === "/dashboard/management" && styles.active)
                  }
                >
                  <StoreMgtIcon style={styles.sidenav_link_icon} />
                  Admin Mgt
                </div>
              </Link>
            )}
            {props.auth.authUser.user_type === "admin" && (
              <Link href="/dashboard/management">
                <div
                  className={
                    styles.sidenav_link +
                    " " +
                    (props.path === "/dashboard/management" && styles.active)
                  }
                >
                  <StoreMgtIcon style={styles.sidenav_link_icon} />
                  Chat
                </div>
              </Link>
            )}
            {props.auth.authUser.user_type !== "admin" && (
              <Link href="/support">
                <div
                  className={
                    styles.sidenav_link +
                    " " +
                    (props.path === "/dashboard/support" && styles.active)
                  }
                >
                  <SupportIcon style={styles.sidenav_link_icon} />
                  Support
                </div>
              </Link>
            )}
          </React.Fragment>
        )}
      </div>
      <div className={styles.side_bottom}>
        {props.showBottom && props.auth.authUser && (
          <div onClick={logout} className={styles.sidenav_link}>
            <PowerIcon style={styles.sidenav_link_icon} />
            <p>Logout</p>
          </div>
        )}
        {props.showBottom && !props.auth.authUser && (
          <div onClick={toggleLogin} className={styles.sidenav_link}>
            <PowerIcon style={styles.sidenav_link_icon} />
            <p>Log In</p>
          </div>
        )}
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(userSignOut()),
    setOpenLogin: (login) => dispatch(setOpenLogin(login)),
  };
}

function mapStateToProp(state) {
  return {
    path: state.Common.path,
    openLogin: state.Auth.openLogin,
    auth: state.Auth,
    showSnack: state.showSnack,
    snackMessage: state.snackMessage,
    snackDuration: state.snackDuration,
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(SideNav2);
