import { useRouter } from "next/router";
import Head from "next/head";
import Sidenav2 from "../../src/components/Header/sidenav2";
import Header from "../../src/components/Header/Header";
import SideNav from "../../src/components/Header/sidenav";
import styles from "../../src/components/dashboard/management.module.css";
import {
  container,
  col2,
  left,
  empty,
  center,
} from "../../src/components/dashboard/dashboard.module.css";
import { useState, useEffect, useCallback } from "react";
import axios from "../../src/util/Api";

const List = [
  {
    name: "Store Information",
    id: 1,
  },
  {
    name: "Meals/Products",
    id: 2,
  },
  {
    name: "Payment method",
    id: 3,
  },
  {
    name: "Set Hours",
    id: 4,
  },
  {
    name: "Sub Admins",
    id: 5,
  },
  {
    name: "Drivers",
    id: 6,
  },
];
const Management = () => {
  const router = useRouter();
  const { id, storeId } = router.query;
  const [active, setActive] = useState(1);
  const [user, setUser] = useState({});

  const [formState, setFormState] = useState({
    store_name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    address: "",
    intro: "",
    profile_picture: {},
    background_picture: {},
    phone_number: "",
    store_owner: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user" || "{}"));
    setUser(user);
    handleGetStore();
  }, [storeId]);

  const handleActive = (id) => {
    setActive(id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  function uploadImage(picture) {
    if (picture === "profile") {
      const input = document.createElement("input");
      input.accept = "image/*,video/mp4,video/x-m4v,video/*";
      input.id = "profileImage";
      input.name = "profileImage";
      input.type = "file";
      input.onchange = (ev) => onUpdateImage(ev, picture);
      input.hidden = true;
      input.click();
    } else {
      const input = document.createElement("input");
      input.accept = "image/*,video/mp4,video/x-m4v,video/*";
      input.id = "backgroundImage";
      input.name = "backgroundImage";
      input.type = "file";
      input.onchange = (ev) => onUpdateImage(ev, picture);
      input.hidden = true;
      input.click();
    }
  }

  function onUpdateImage(event, picture) {
    if (event.target.files[0] === undefined) return;
    var allowedImageExtensions = /(\.jpg|\.jpeg|\.png|\.)$/i;

    if (allowedImageExtensions.exec(event.target.files[0].name)) {
      if (picture === "profile") {
        setFormState({
          ...formState,
          ["profile_picture"]: event.target.files[0],
          ["profile_picture_name"]: event.target.files[0].name,
          ["profile_picture_data"]: URL.createObjectURL(event.target.files[0]),
        });
        var image = document.getElementById("profile_picture");
        image.style.display = "block";
        image.src = URL.createObjectURL(event.target.files[0]);
      } else {
        setFormState({
          ...formState,
          ["background_picture"]: event.target.files[0],
          ["background_picture_name"]: event.target.files[0].name,
          ["background_picture_data"]: URL.createObjectURL(
            event.target.files[0]
          ),
        });
        var image = document.getElementById("background_picture");
        image.style.display = "block";
        image.src = URL.createObjectURL(event.target.files[0]);
      }
    } else {
      alert("Invalid image type");
    }
  }

  const handleGetStore = useCallback(async () => {
    if (storeId) {
      try {
        const response = await axios.get(`/stores/getstore/${storeId}`);
        console.log("store", response.data.data);
        const store = response?.data?.data?.supplier;
        setFormState({
          store_name: store?.store_name,
          email: store?.email,
          city: store?.supplier_address?.city,
          state: store?.supplier_address?.state,
          zip: store?.supplier_address?.zip_code,
          country: store?.supplier_address?.country,
          address: store?.supplier_address?.address,
          phone_number: store?.phone_number,
          store_owner: store?.store_owner,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [storeId]);

  const handleClaimStore = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const form = new FormData();
      for (let element in formState) {
        if (formState[element]) {
          form.append(element, formState[element]);
        }
      }
      form.append("store_owner", user?._id);
      const response = await axios.put(`/stores/updatestore/${storeId}`, form);
      console.log(response.data.data, "response");
    } catch (e) {}
  };

  console.log(formState, 'fff')
  return (
    <div className={container + " " + col2}>
      <Head>
        <title>Chop Chow Management</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Header />
      <SideNav />
      <div className={left}>
        <Sidenav2 showBottom={false} />
      </div>
      <div className={empty}></div>
      <div className={center}>
        <div className={styles.flex}>
          <div className={styles.summary}>
            <h5 style={{ paddingBottom: "1rem" }}>Summary</h5>
            <div className={styles.summaryCard}>
              {List.map((elem) => (
                <div
                  key={elem.id}
                  onClick={() => handleActive(elem.id)}
                  className={styles.active}
                >
                  <div
                    className={
                      active === elem.id ? styles.border : styles.noborder
                    }
                  ></div>
                  <h6
                    className={
                      active === elem.id ? styles.activeText : styles.name
                    }
                  >
                    {elem.name}
                  </h6>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.store}>
            {active === 1 && (
              <>
                <div className={styles.flextitle}>
                  <h5>Store Information</h5>
                  {!Boolean(formState.store_owner) && (
                    <button onClick={handleClaimStore}>Claim this Store</button>
                  )}
                </div>
                <div className={styles.storeInfo}>
                  <div>
                    <h5>Upload Store Profile Picture</h5>
                    <div onClick={() => uploadImage("profile")} className={styles.bgimg}>
                      <img
                        id="profile_picture"
                        width="100%"
                        alt="profile"
                        style={{ display: "none" }}
                      />
                      {/* <p>choose image</p> */}
                    </div>
                  </div>
                  <div>
                    <h5>Upload Background Image</h5>
                    <div onClick={() => uploadImage("background")} className={styles.bgimg}>
                      <img
                        id="background_picture"
                        width="100%"
                        alt="profile"
                        style={{ display: "none" }}
                      />
                      {/* <p>choose image</p> */}
                    </div>
                  </div>
                  <div className={styles.contact}>
                    <p>Contact Information</p>
                    <div className={styles.column}>
                      <label>Store Name</label>
                      <input
                        onChange={handleChange}
                        value={formState.store_name}
                        type="text"
                        name="store_name"
                      />
                    </div>
                    <div className={styles.column}>
                      <label>Email Address</label>
                      <input
                        onChange={handleChange}
                        value={formState.email}
                        type="text"
                        name="email"
                      />
                    </div>
                    <div className={styles.column}>
                      <label>Phone Number</label>
                      <input
                        onChange={handleChange}
                        value={formState.phone_number}
                        type="text"
                        name="phone_number"
                      />
                    </div>
                    <div className={styles.columnflex}>
                      <div className={styles.column}>
                        <label>City</label>
                        <input
                          onChange={handleChange}
                          value={formState.city}
                          type="text"
                          name="city"
                        />
                      </div>
                      <div className={styles.column}>
                        <label>State</label>
                        <input
                          onChange={handleChange}
                          value={formState.state}
                          type="text"
                          name="state"
                        />
                      </div>
                    </div>
                    <div className={styles.columnflex}>
                      <div className={styles.column}>
                        <label>Zip Code</label>
                        <input
                          onChange={handleChange}
                          value={formState.zip}
                          type="text"
                          name="zip"
                        />
                      </div>
                      <div className={styles.column}>
                        <label>Country</label>
                        <input
                          onChange={handleChange}
                          value={formState.zip}
                          type="text"
                          name="zip"
                        />
                      </div>
                    </div>
                    <div className={styles.column}>
                      <label>Address</label>
                      <input
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="address"
                      />
                    </div>
                  </div>
                  <div className={styles.borderBottom} />
                  <div className={styles.contact}>
                    <p>Pickup Address</p>
                    <div className={styles.column}>
                      <label>Address</label>
                      <input
                        value={formState.address}
                        type="text"
                        name="address"
                      />
                    </div>
                  </div>
                  <div className={styles.contact}>
                    <p>Introduce your store to customers</p>
                    <div className={styles.column}>
                      <label>Intro</label>
                      <textarea
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="address"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
