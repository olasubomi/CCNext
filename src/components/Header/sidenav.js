import styles from "./header.module.css";
import React, { useState, useEffect, useRef } from "react";
import openIcon from "../../../public/assets/icons/eva_menu-open.png";
import Image from "next/image";
import img_logo from "../../../public/assets/logos/CC_Logo_no_bg.png";
import closeIcon from "../../../public/assets/icons/eva_menu-close.png";
import Link from "next/link";
import Sidenav2 from "./sidenav2";
import { connect, useSelector } from "react-redux";
import { UserIcon } from "../icons";

function SideNav(props) {
  const [open, setOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const root = useRef(null);
  useEffect(() => setAvatarFailed(false), [props?.auth?.authUser?.profile_picture]);
  useEffect(() => {
    if (!open) return;
    const outside = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    const escape = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  const selectedUserType = useSelector((state) => state.userType.selectedUserType);

  return (
    <div className={styles.navbar_side} ref={root}>
      <button type="button" id="openbutton" className={styles.openbtn}
        aria-label={open ? "Close sidebar" : "Open sidebar"} aria-expanded={open}
        aria-controls="mySidenav" onClick={() => setOpen(v => !v)}>
        <Image id="openIcon" src={openIcon} alt="" />
      </button>
      <div id="mySidenav" className={styles.sidenav} style={{ display: open ? "grid" : "none" }}
        onClick={(e) => { if (e.target.closest("a")) setOpen(false); }}>
        <div id="side_top" className={styles.sidenav_top}>
          <div className={styles.sidenav_top_row_1}>
            <button type="button" aria-label="Close sidebar" onClick={() => setOpen(false)} style={{ border: 0, background: "transparent" }}>
              <Image src={closeIcon} alt="" />
            </button>
            <div>
              <Link href="/" className={styles.social_link}>
                <Image
                  src={img_logo}
                  alt="logo"
                  className={styles.sidenav_logo}
                />
              </Link>
            </div>
          </div>

          <div className={styles.sidenav_top_row_2}>
            {props?.auth?.authUser?.profile_picture && !avatarFailed ? (
              <Image
                width={100}
                height={100}
                src={props?.auth?.authUser?.profile_picture}
                onError={() => setAvatarFailed(true)}
                alt={props?.auth?.authUser?.first_name}
                className={styles.sidenav_top_row_2_img}
              />
            ) : (
              <div className={styles.sidenav_top_row_2_img}>
                <UserIcon />
              </div>
            )}
            <div>
              {props?.auth?.authUser?.first_name &&
                <h3>
                {props?.auth?.authUser?.first_name +
                  " " +
                  props?.auth?.authUser?.last_name}
              </h3>
              }
              <p className={styles.sidenav_top_row_2_text}>
                {selectedUserType}
              </p>
            </div>
          </div>
        </div>
        <Sidenav2 showBottom={true} />
      </div>
    </div>
  );
}



// export default SideNav;

function mapStateToProp(state) {
  return {
    path: state.Common.path,
    auth: state.Auth,
  };
}

export default connect(mapStateToProp)(SideNav);
