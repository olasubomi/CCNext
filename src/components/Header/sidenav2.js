import { DashBoardIcon, HotMealIcon, InventoryIcon, OrderIcon, PowerIcon, StoreMgtIcon, SupportIcon, UserIcon } from '../icons';
import Link from 'next/link';
import styles from './header.module.css'
import { connect } from "react-redux";
import React from 'react';

function SideNav2(props){
    console.log(props)

    return(
        <div className={styles.sidenav_links_con}>
            <div className={styles.sidenav_links}>
                {props.auth.authUser &&
                <React.Fragment>
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard' && styles.active)}>
                        <DashBoardIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard">
                            <a>Dashboard</a>
                        </Link>
                    </div>
                    {props.auth.authUser.user_type === "supplier" && 
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/inventory' && styles.active)}>
                        <InventoryIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard/inventory">
                            <a>Inventory</a>
                        </Link>
                    </div>
                    }
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/orders/orders' && styles.active)}>
                        <OrderIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard/orders/orders">
                            <a>Order</a>
                        </Link>
                    </div>
                    {(props.auth.authUser.user_type !== "driver" || props.auth.authUser.user_type !== "admin") &&
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/suggestedmeals' && styles.active)}>
                        <HotMealIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard/suggestedmeals">
                            <a>Meal/Product Suggestion</a>
                        </Link>
                    </div>
                    }
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/userprofile' && styles.active)}>
                        <UserIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard/userprofile">
                            <a>My Profile</a>
                        </Link>
                    </div>
                    {props.auth.authUser.user_type === "supplier" &&
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/management' && styles.active)}>
                        <StoreMgtIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard/management">
                            <a>Store Management</a>
                        </Link>
                    </div>
                    }
                    {props.auth.authUser.user_type === "admin" &&
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/management' && styles.active)}>
                        <StoreMgtIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard/management">
                            <a>Admin Mgt</a>
                        </Link>
                    </div>
                    }
                    {props.auth.authUser.user_type === "admin" &&
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/management' && styles.active)}>
                        <StoreMgtIcon style={styles.sidenav_link_icon} />
                        <Link href="/dashboard/management">
                            <a>Chat</a>
                        </Link>
                    </div>
                    }
                    {props.auth.authUser.user_type !== "admin" &&
                    <div className={styles.sidenav_link + " " + (props.path === '/dashboard/support' && styles.active)}>
                        <SupportIcon style={styles.sidenav_link_icon} />
                        <Link href="/support">
                            <a>Support</a>
                        </Link>
                    </div>
                    }
                </React.Fragment>
                }
            </div>
            <div className={styles.side_bottom}>
                {props.showBottom &&
                <div className={styles.sidenav_link}>
                    <PowerIcon style={styles.sidenav_link_icon} />
                    <Link href="/">
                        <a >Logout</a>
                    </Link>
                </div>}
            </div>
        </div>
    )
}
  
  function mapStateToProp(state) {
    return {
      path: state.Common.path,
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(SideNav2);