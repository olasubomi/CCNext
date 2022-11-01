
import styles from './header.module.css'
import React, { useState } from "react";
import openIcon from "../../../public/assets/icons/eva_menu-open.png"
import Image from 'next/image';
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png"
import closeIcon from "../../../public/assets/icons/eva_menu-close.png"
import Link from 'next/link';
import Sidenav2 from './sidenav2';

 
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
            <Sidenav2 showBottom={true} />
        </div>
    </div>
  )
}

export default SideNav;
