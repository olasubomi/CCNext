import Link from "next/link";
import React, { useEffect, useState } from "react";
import { animateScroll as scroll, scrollSpy, Events } from "react-scroll";
import styles from "../../components/Header/header.module.css";
export const MobileHeader = () => {
  useEffect(() => {
    Events.scrollEvent.register("begin", (to, element) => {
      console.log("begin", to, element);
    });

    Events.scrollEvent.register("end", (to, element) => {
      console.log("end", to, element);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const scrollToWithOffset = () => {
    const offset = 100;
    scroll.scrollTo("meal", {
      duration: 1000,
      delay: 0,
      smooth: true,
      offset: offset,
    });
  };

  const scrollMore = () => {
    scroll.scrollMore(100);
  };

  const handleSetActive = (to) => {
    console.log(to);
  };
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <div>
      <div className={visible ? styles.navbar2 : ''}>
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
