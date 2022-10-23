
import styles from './header.module.css'
import React, { useState } from "react";
import openIcon from "../../../public/assets/icons/eva_menu-open.png"
import Image from 'next/image';
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png"
import closeIcon from "../../../public/assets/icons/eva_menu-close.png"
import Link from 'next/link';
import { DashBoardIcon, HotMealIcon, InventoryIcon, OrderIcon, PowerIcon, StoreMgtIcon, SupportIcon, UserIcon } from '../icons';

 
function SideNav(){

    function openSidenav(e){
        document.getElementById('mySidenav').style.display = 'grid';
        document.addEventListener('click', (e) => {
          if(document.getElementById('mySidenav')){
            if(e.target.id !== 'openIcon' && 
              e.target.id !== 'openbutton' &&
              e.target.id !== 'side_top'
            )
            document.getElementById('mySidenav').style.display = 'none';
          }
        })
    
        window.event.returnValue = false
    }

  return(
    <div className={styles.navbar_side}>
        <div
        id="openbutton"
        className={styles.openbtn}
        aria-label="Toggle Sidebar"
        >
        <Image onClick={openSidenav} id='openIcon' src={openIcon} alt='open nav' />
        </div>
        <div id="mySidenav" className={styles.sidenav}>
            <div id='side_top' className={styles.sidenav_top}>
                <div className={styles.sidenav_top_row_1}>
                <Image src={closeIcon} alt="close nav" />
                <Link href="/">
                <a className={styles.social_link}>
                    <Image src={img_logo} alt="logo" className={styles.sidenav_logo} />
                </a>
                </Link>
                </div>
                <div className={styles.sidenav_top_row_2}>
                    <Image src={img_logo} alt="logo" className={styles.sidenav_top_row_2_img} />
                    <div>
                        <h3>James Henderson</h3>
                        <p>supplier</p>
                    </div>
                </div>
            </div>
            <SideNav2 />
        </div>
    </div>
  )
}

export default SideNav;

export function SideNav2(){

    return(
        <div className={styles.sidenav_links_con}>
            <div className={styles.sidenav_links}>
                <div className={styles.sidenav_link}>
                    <DashBoardIcon style={styles.sidenav_link_icon} />
                    <Link href="/dashboard">
                        <a>Dashboard</a>
                    </Link>
                </div>
                <div className={styles.sidenav_link + " " + styles.active}>
                    <InventoryIcon style={styles.sidenav_link_icon} />
                    <Link href="/dashboard/inventory">
                        <a>Inventory</a>
                    </Link>
                </div>
                <div className={styles.sidenav_link}>
                    <OrderIcon style={styles.sidenav_link_icon} />
                    <Link href="/dashboard/orders/orders">
                        <a>Order</a>
                    </Link>
                </div>
                <div className={styles.sidenav_link}>
                    <HotMealIcon style={styles.sidenav_link_icon} />
                    <Link href="/dashboard/suggestedmeals">
                        <a>Meal/Product Suggestion</a>
                    </Link>
                </div>
                <div className={styles.sidenav_link}>
                    <UserIcon style={styles.sidenav_link_icon} />
                    <Link href="/dashboard/userprofile">
                        <a>My Profile</a>
                    </Link>
                </div>
                <div className={styles.sidenav_link}>
                    <StoreMgtIcon style={styles.sidenav_link_icon} />
                    <Link href="/dashboard/userprofile">
                        <a>Store Management</a>
                    </Link>
                </div>
                <div className={styles.sidenav_link}>
                    <SupportIcon style={styles.sidenav_link_icon} />
                    <Link href="/support">
                        <a>Support</a>
                    </Link>
                </div>
            </div>
            <div className={styles.side_bottom}>
                <div className={styles.sidenav_link}>
                    <PowerIcon style={styles.sidenav_link_icon} />
                    <Link href="/">
                        <a >Logout</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
