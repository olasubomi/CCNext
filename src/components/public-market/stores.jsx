import { useState, useEffect, useRef } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { MealDropDown } from "./dropdown";
import stored from "../../../public/assets/store_pics/no-image-store.png";
import Image from "next/image";
import { Element } from "react-scroll";

export const Stores = () => {
  const [stores, setStores] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [selected, SetSelected] = useState(null);
  const [loadMore, setLoadMore] = useState(5);
  const ref = useRef();

  const [selectedStore, setSelectedStore] = useState({
    items: [],
    supplier: {},
  });
  const handleLoadMore = () => {
    setLoadMore(loadMore + 5);
  };

  const fetchOneStore = async (id) => {
    try {
      const response = await axios(`/stores/getstore/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data, "one store");
      setSelectedStore(response.data.data);
      setIsShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await axios(`/stores/getallstores/1?limit=25`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data.products, "resp");
      setStores(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStores();
  }, []);
  console.log(stores, "stores");
  useEffect(() => {
    // Get the hash value from the URL
    const hash = window.location.hash;

    // Use the hash value as the target ID for scrolling
    const targetId = hash ? hash.substring(1) : "store";

    // Scroll to the target section
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className={styles.storeContainer}>
      <Element id="store" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Stores
      </Element>
      <div className={styles.stores}>
        {stores
          .slice(0, loadMore)
          .filter((elem) => elem.status === "PUBLIC")
          .map((store, id) => {
            return (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div key={id} className={`${styles.cardWrapper}`}>
                    <div
                      className={styles.card}
                      onClick={() => {
                        fetchOneStore(store._id);
                        SetSelected(id);
                      }}
                    >
                      {
                        <div>
                          <Image
                            src={
                              store?.profile_picture
                                ? store?.profile_picture
                                : "/assets/store_pics/no-image-store.png"
                            }
                            className={styles.storeImg}
                            width={200}
                            height={200}
                            objectFit="cover"
                            objectPosition="center"
                          />
                          <p className={styles.name}>{store?.store_name}</p>
                          <p
                            className={styles.storeName}
                            style={{ marginTop: ".4rem" }}
                          >
                            {store?.supplier_address
                              ? store?.supplier_address?.city +
                                " - " +
                                store?.supplier_address?.country
                              : ""}
                          </p>
                        </div>
                      }
                    </div>
                  </div>
                 
                  {isShow && selected === id && (
                    <MealDropDown
                      setIsShow={setIsShow}
                      selectedStore={selectedStore}
                      id={selectedStore?.supplier?._id}
                    />
                  )}
                </div>
              </>
            );
          })}
      </div>

      <p className={styles.view} onClick={() => handleLoadMore()}>
        View More
      </p>
      <div className={styles.border} />
    </div>
  );
};
