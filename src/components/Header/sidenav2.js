import { DashBoardIcon, HotMealIcon, InventoryIcon, OrderIcon, PowerIcon, StoreMgtIcon, SupportIcon, UserIcon } from '../icons';
import Link from 'next/link';
import styles from './header.module.css'
import { connect } from "react-redux";
import React from 'react';
import { setOpenLogin, userSignOut } from '../../actions';
import { useRouter } from 'next/router';

function SideNav2(props){
    console.log(props)
    const router = useRouter()

    function toggleLogin (){
        props.setOpenLogin(!props.openLogin)
    }

    function logout(){
        props.logout()
        router.push('/')
    }


    return(
        <div className={styles.sidenav_links_con}>
            <div className={styles.sidenav_links}>
                {props.auth.authUser &&
                <React.Fragment>
                    <Link href="/dashboard">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard' && styles.active)}>
                                <DashBoardIcon style={styles.sidenav_link_icon} />
                                Dashboard
                            </div>
                        </a>
                    </Link>
                    {props.auth.authUser.user_type === "supplier" && 
                    <Link href="/dashboard/inventory">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/inventory' && styles.active)}>
                                <InventoryIcon style={styles.sidenav_link_icon} />
                                Inventory
                            </div>
                        </a>
                    </Link>
                    }
                    <Link href="/dashboard/orders/orders">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/orders/orders' && styles.active)}>
                                <OrderIcon style={styles.sidenav_link_icon} />
                                Order
                            </div>
                        </a>
                    </Link>
                    {(props.auth.authUser.user_type !== "driver") &&
                    <Link href="/dashboard/suggestedmeals">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/suggestedmeals' && styles.active)}>
                                <HotMealIcon style={styles.sidenav_link_icon} />
                                {props.auth.authUser.user_type === "admin" ? 'Meal Request': 'Meal/Product Suggestion'}
                            </div>
                        </a>
                    </Link>
                    }
                    <Link href="/dashboard/userprofile">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/userprofile' && styles.active)}>
                                <UserIcon style={styles.sidenav_link_icon} />
                                My Profile
                            </div>
                        </a>
                    </Link>
                    {props.auth.authUser.user_type === "supplier" &&
                    <Link href="/dashboard/management">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/management' && styles.active)}>
                                <StoreMgtIcon style={styles.sidenav_link_icon} />
                                Store Management
                            </div>
                        </a>
                    </Link>
                    }
                    {props.auth.authUser.user_type === "admin" &&
                    <Link href="/dashboard/management">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/management' && styles.active)}>
                                <StoreMgtIcon style={styles.sidenav_link_icon} />
                                Admin Mgt
                            </div>
                        </a>
                    </Link>
                    }
                    {props.auth.authUser.user_type === "admin" &&
                    <Link href="/dashboard/management">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/management' && styles.active)}>
                                <StoreMgtIcon style={styles.sidenav_link_icon} />
                                Chat
                            </div>
                        </a>
                    </Link>
                    }
                    {props.auth.authUser.user_type !== "admin" &&
                    <Link href="/support">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/support' && styles.active)}>
                                <SupportIcon style={styles.sidenav_link_icon} />
                                Support
                            </div>
                        </a>
                    </Link>
                    }
                </React.Fragment>
                }
            </div>
            <div className={styles.side_bottom}>
                {props.showBottom && props.auth.authUser &&
                <div onClick={logout} className={styles.sidenav_link}>
                    <PowerIcon style={styles.sidenav_link_icon} />
                        <p>Logout</p>
                </div>}
                {props.showBottom && !props.auth.authUser &&
                <div onClick={toggleLogin} className={styles.sidenav_link}>
                    <PowerIcon style={styles.sidenav_link_icon} />
                        <p>Log In</p>
                </div>}
            </div>
        </div>
    )
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
        snackDuration:state.snackDuration
    };
  }
  
  export default connect(
    mapStateToProp,
    mapDispatchToProps,
  )(SideNav2);