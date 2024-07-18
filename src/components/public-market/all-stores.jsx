import { useState, useEffect, useRef } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { MealDropDown } from "./dropdown";
import stored from "../../../public/assets/store_pics/no-image-store.png";
import Image from "next/image";
import { Element } from "react-scroll";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft } from "react-icons/fa6";

export const AllStores = () => {
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const [activeLetter, setActiveLetter] = useState(null);

  const handleActiveLetter = (id) => {
    setActiveLetter(id);
  };
  const [stores, setStores] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [selected, SetSelected] = useState(null);
  const [storeInfo, setStoreInfo] = useState({
    id: 0,
    name: "",
    image: "",
    description: "",
    address: "",
    rating: 0,
  });
  const ref = useRef();

  const [selectedStore, setSelectedStore] = useState({
    items: [],
    supplier: {},
  });

  const fetchOneStore = async (storeId) => {
    try {
      const response = await axios(
        `/inventory/get-store-inventory/${storeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data, "one storey");
      setSelectedStore(response.data.data);
      setIsShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(stores, "one store");
  const fetchStores = async () => {
    try {
      const response = await axios(`/stores/getallstores/1?limit=2000`, {
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
  console.log(selectedStore, "storess");
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
      <div className={styles.marketplace}>
        <h1>Stores</h1>
      </div>
      <div className={styles.topcontainer}>
        <p className={styles.marketplaceText}>
          Unlock global flavors with ease! Our app makes cooking international
          dishes a breeze, guiding you with expert tips and step-by-step
          instructions.
        </p>
        <div className={styles.flexItems}>
          <div className={styles.filter}>
            <p>Filter by: Distance</p>
            <BiSolidDownArrow color="rgba(109, 109, 109, 0.5)" size={15} />
          </div>
          <div className={styles.filter}>
            <p>Sort: Name A-Z</p>
            <BiSolidDownArrow color="rgba(109, 109, 109, 0.5)" size={15} />
          </div>
        </div>
      </div>
      <div className={styles.alphabetContainer}>
        {alphabets.map((elem, index) => (
          <span
            onClick={() => handleActiveLetter(index)}
            className={
              activeLetter === index ? styles.activespan : styles.inactivespan
            }
          >
            <p
              className={
                activeLetter === index
                  ? styles.activeLetter
                  : styles.inactiveletter
              }
            >
              {elem}
            </p>
          </span>
        ))}
      </div>
      <div className={styles.stores}>
        {stores
          .filter((elem) => elem.status === "PUBLIC")
          .map((store, id) => {
            return (
              <>
                <div>
                  <div key={id} className={styles.cardWrapper}>
                    <div
                      className={styles.card}
                      onClick={() => {
                        fetchOneStore(store._id);
                        SetSelected(id);
                        setStoreInfo({
                          id: store._id,
                          name: store?.store_name,
                          image: store?.profile_picture,
                          description: store?.description,
                          address:
                            store?.supplier_address?.address +
                            ", " +
                            store?.supplier_address?.city +
                            " - " +
                            store?.supplier_address?.country,
                          rating: store?.average_rating,
                        });
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
                      storeInfo={storeInfo}
                      setIsShow={setIsShow}
                      selectedStore={selectedStore}
                      id={storeInfo?.id}
                    />
                  )}
                </div>
              </>
            );
          })}
      </div>

      <div className={styles.paginationContainer}></div>
    </div>
  );
};
