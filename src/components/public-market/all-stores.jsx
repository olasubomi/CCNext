import { useState, useEffect, useRef } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { MealDropDown } from "./dropdown";
import Image from "next/image";
import { BiSolidDownArrow } from "react-icons/bi";
import StorePics from "../../../public/assets/store_pics/store.jpeg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
  const fetchStores = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios(`/stores/getallstores/${page}?limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data.products, "resp");
      const allItems = response.data.data.products;

      const filteredStores = allItems.filter(
        (store) => store.status === "PUBLIC"
      );

      if (filteredStores.length === 0) {
        const lastPageWithItems = page - 1;
        setTotalPages(lastPageWithItems);
      } else {
        setStores(filteredStores);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores(currentPage);
  }, [currentPage]);
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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage - 1);
    }
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    }
  };

  return (
    <div className={styles.storeContainer1}>
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
      <div className={styles.storeImgContainer}>
        <div className={styles.storeFlex}>
          <div className={styles.storediv}>
            <img src="/assets/store_pics/store.jpeg" />
          </div>
          <div className={styles.storeDetails}>
            <h3>Sweet Sensations</h3>
            <p>
              At Sweet Sensations, we're dedicated to crafting irresistible
              treats that tantalize your taste buds and warm your heart. From
              decadent chocolate delights to delicate pastries, each creation is
              made with passion and precision
            </p>
            <p className={styles.storeLocation}>Accra- Ghana</p>
          </div>
        </div>
      </div>
      <div className={styles.stores}>
        {stores
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

      <div className={styles.paginationContainer}>
        <div
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={
            currentPage === 1 ? styles.disableButn : styles.paginationButton2
          }
        >
          <FaAngleLeft
            size={17}
            color={currentPage === 1 ? "#6D6D6D" : "#52575C"}
          />
        </div>
        {[1, 2].map((pageNumber) => (
          <div
            key={pageNumber}
            className={
              currentPage === pageNumber
                ? styles.activepaginationButton
                : styles.paginationButton2
            }
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </div>
        ))}
        <div onClick={handleNextPage} className={styles.paginationButton2}>
          <FaAngleRight size={17} />
        </div>
      </div>
    </div>
  );
};
