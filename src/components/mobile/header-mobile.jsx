import Link from "next/link";
import React, { useEffect, useState } from "react";
import { animateScroll as scroll, scrollSpy, Events } from "react-scroll";
import styles from "../../components/Header/header.module.css";
import { useRouter } from "next/router";

export const MobileHeader = () => {
  const [activeLink, setActiveLink] = useState(0);
  const router = useRouter();

  const handleSetActive = (id, path) => {
    console.log("Navigating to:", path); // Debug log
    setActiveLink(id);
    router.push(path);
  };
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const menuItems = [
    { name: "Marketplace", path: "/publicMarket" },
    { name: "Chef", path: "/chef" },
    { name: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div>
      <div className={visible ? styles.navbar2 : styles.navbar_down_2}>
        <div className={styles.navbar_main_container}>
          <div className={styles.navbar_main}>
            <ul className={styles.navbar_main_links}>
              <li className={styles.navbar_main_link}>
                <Link
                  activeClass="active"
                  href="/publicMarket/#store"
                  onSetActive={handleSetActive}
                  onClick={() =>
                    scroll.scrollTo(0, { smooth: true, duration: 100 })
                  }
                >
                  Stores
                </Link>
              </li>
              <li className={styles.navbar_main_link}>
                {/* <Link href="/publicMarket/#meal">Meals</Link> */}
                <Link
                  activeClass="active"
                  href="/publicMarket/#meal"
                  onClick={() =>
                    scroll.scrollTo(1100, { smooth: true, duration: 100 })
                  }
                >
                  Meals
                </Link>
              </li>
              <li className={styles.navbar_main_link}>
                {/* <Link href="/publicMarket/#products">Products</Link> */}
                <Link
                  activeClass="active"
                  href="/publicMarket/#product"
                  onClick={() =>
                    scroll.scrollTo(2900, { smooth: true, duration: 100 })
                  }
                >
                  Products
                </Link>
              </li>
              <li className={styles.navbar_main_link}>
                {/* <Link href="/publicMarket/#utensils">Utensils</Link> */}
                <Link
                  activeClass="active"
                  href="/publicMarket/#utensils"
                  onClick={() =>
                    scroll.scrollTo(4600, { smooth: true, duration: 100 })
                  }
                >
                  Utensils
                </Link>
              </li>
            </ul>

            <div className={styles.navbar_main_grocery}>
              <Link href="/grocery">Grocery Lists</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
