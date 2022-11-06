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
                    {(props.auth.authUser.user_type !== "driver" || props.auth.authUser.user_type !== "admin") &&
                    <Link href="/dashboard/suggestedmeals">
                        <a>
                            <div className={styles.sidenav_link + " " + (props.path === '/dashboard/suggestedmeals' && styles.active)}>
                                <HotMealIcon style={styles.sidenav_link_icon} />
                                Meal/Product Suggestion
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