import Head from "next/head";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import Header, { Header2 } from "../../src/components/Header/Header";
import GoBack from "../../src/components/CommonComponents/goBack";
import styles from "../../src/components/suggest-store/suggest-store.module.css";
import { useRouter } from "next/router";
import { MdStoreMallDirectory } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { SuccessModal } from "../../src/components/suggest-store/success-modal";
import GooglePlacesAutocomplete from "../../src/components/dashboard/googleplacesautocomplete";
import axios from "../../src/util/Api";

const SuggestStore = () => {
  const [index, setIndex] = useState(1);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [details, setDetails] = useState({
    title: "",
    isStoreOwner: null,
    storeType: null,
  });
  const [formState, setFormState] = useState({
    store_name: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    address: "",
    lng: "",
    lat: "",
    place_id: "",
  });

  useEffect(() => {
    if (router.query?.name) {
      setDetails({
        ...details,
        title: router.query.name,
      });
    }
  }, [router]);

  const handleNext = useCallback(() => {
    if (details?.storeType === "detailed") {
      router.push(`/dashboard/createstore?storename=${details.title}`);
    } else {
      if (index === 4) {
        handleCreate()
      } else {
        setIndex((prev) => prev + 1);
      }
    }
  }, [details, index]);
  const handlePrevious = useCallback(() => {
    if (index !== 1) {
      setIndex((prev) => prev - 1);
      console.log("back");
    } else {
      router.push("/publicMarket");
    }
  }, [details, index]);


  const handleCreate = async () => {
    const payload = {...formState, store_name: details.title}
    axios.post('/stores/createstore', payload).then(response => {
      if (response.status >= 200 && response.status < 300) {
        setShow(true);
      }
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chop Chow Grocery</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Header />
      <Header2 />
      <div className={styles.top}>
        <GoBack />
      </div>
      <div className={styles.pageTitle}>
        <div className={styles.store}>
          <MdStoreMallDirectory />
        </div>
        <p>Suggest Store</p>
      </div>
      <div className={styles.questionContainer}>
        <div className={styles.flex}>
          <IoIosPlay color="#F47900" size={20} />
          <p>Step {index}/4</p>
          {/* First Question */}
        </div>
        <div>
          {index === 1 && (
            <>
              <p className={styles.question}>
                Are you the store owner({details.title})
              </p>
              <div className={styles.flex} style={{ paddingTop: "3rem" }}>
                <div className={styles.radio}>
                  <div className={styles.radioDiv}>
                    <input
                      onChange={() =>
                        setDetails({
                          ...details,
                          isStoreOwner: true,
                        })
                      }
                      type="radio"
                      value="yes"
                      name="radio"
                    />
                  </div>
                  <label className={styles.label}>Yes</label>
                </div>
                <div className={styles.radio}>
                  <div className={styles.radioDiv}>
                    <input
                      onChange={() =>
                        setDetails({
                          ...details,
                          isStoreOwner: false,
                        })
                      }
                      type="radio"
                      name="radio"
                      value="no"
                    />
                  </div>
                  <label className={styles.label}>No</label>
                </div>
              </div>
            </>
          )}
          {index === 2 && (
            <>
              {details.isStoreOwner || !details.isStoreOwner ? (
                <>
                  <p className={styles.question}>
                    Would you prefer a quick or detailed setup
                  </p>
                  <div className={styles.flex} style={{ paddingTop: "3rem" }}>
                    <div className={styles.radio}>
                      <div className={styles.radioDiv}>
                        <input
                          onChange={() =>
                            setDetails({
                              ...details,
                              storeType: "quick",
                            })
                          }
                          type="radio"
                          name="radio"
                          value="quick"
                        />
                      </div>
                      <label className={styles.label}>Quick setup</label>
                    </div>
                    <div className={styles.radio}>
                      <div className={styles.radioDiv}>
                        <input
                          onChange={() =>
                            setDetails({
                              ...details,
                              storeType: "detailed",
                            })
                          }
                          type="radio"
                          value="detailed"
                          name="radio"
                        />
                      </div>
                      <label className={styles.label}>Detailed setup</label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
          {index === 3 && (
            <>
              {details.isStoreOwner ? (
                <div className={styles.fragment}>
                  <p className={styles.question}>Store Name</p>
                  <input
                    onChange={() =>
                      setDetails({
                        ...details,
                        isStoreOwner: true,
                      })
                    }
                    value={details.title}
                    type="text"
                    name="text"
                    placeholder="Enter store name"
                  />
                </div>
              ) : (
                <></>
              )}
            </>
          )}
          {index === 4 && (
            <>
              {details.isStoreOwner ? (
                <div className={styles.fragment}>
                  <p className={styles.question}>Store address</p>
                  {/* <input
                    onChange={() =>
                      setDetails({
                        ...details,
                        isStoreOwner: true,
                      })
                    }
                    type="text"
                    name="text"
                    placeholder="Enter store Address"
                  /> */}
                  <div>
                    <GooglePlacesAutocomplete
                      handleValueChange={(
                        address,
                        place_id,
                        lat,
                        lng,
                        zip_code,
                        country,
                        state,
                        city
                      ) => {
                        setFormState({
                          ...formState,
                          address,
                          place_id,
                          lat,
                          lng,
                          zip_code,
                          country,
                          state,
                          city,
                        });
                      }}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
          <div className={styles.btns}>
            <button className={styles.outlineBtn} onClick={handlePrevious}>
              {index === 1 ? "Close" : "Back"}
            </button>
            <button className={styles.btn} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
      {show && <SuccessModal />}
    </div>
  );
};
export default SuggestStore;
