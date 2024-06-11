import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../components/Header/header.module.css";

export const MobileHeader = () => {
  const [activeLink, setActiveLink] = useState(2);

  const handleSetActive = (id, path) => {
    setActiveLink(id);
    router.push(path);
  };

  const menuItems = [
    { name: "Marketplace", path: "/publicMarket" },
    { name: "Chef", path: "/chef" },
    { name: "Blog", path: "/blog" },
  ];
  return (
    <div>
      <div className={styles.navbar2}>
        <div className={styles.navbar_main_container}>
          <div className={styles.navbar_main}>
            <ul className={styles.navbar_main_links}>
              {menuItems?.map((elem, id) => (
                <li
                  className={styles.navbar_main_link}
                  key={id}
                  onClick={() => handleSetActive(id, elem.path)}
                >
                  <p
                    className={
                      activeLink === id
                        ? styles.activelink
                        : styles.inactivelink
                    }
                  >
                    {elem.name}
                  </p>
                </li>
              ))}
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
