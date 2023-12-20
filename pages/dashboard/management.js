import { useRouter } from "next/router";
import Head from "next/head";
import Sidenav2 from "../../src/components/Header/sidenav2";
import Header from "../../src/components/Header/Header";
import SideNav from "../../src/components/Header/sidenav";
import styles from "../../src/components/dashboard/management.module.css";
import profileStyles from "../../src/components/dashboard/profile.module.css";
import { Button, TextField } from "@mui/material";
import {
  container,
  col2,
  left,
  empty,
  center,
} from "../../src/components/dashboard/dashboard.module.css";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "../../src/util/Api";
import { GoTriangleUp } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

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
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 27,
  padding: 0,
  borderRadius: 15,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#ffffff",
      },
      "& > .MuiSwitch-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#949494" : "#04D505",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 26.22,
    height: 23,
    borderRadius: 11,
    backgroundColor: theme.palette.mode === "dark" ? "#04D505" : "#949494",
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    width: 58,
    height: 27,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },
}));
const Management = () => {
  const router = useRouter();
  const { id, storeId } = router.query;
  const [active, setActive] = useState(1);
  const [user, setUser] = useState({});
  const [showCategory, setShowCategory] = useState(false);
  const ref = useRef();
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [store, setStore] = useState([]);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const [times, setTimes] = useState({
    sunday: {
      from: "2018-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      open: true,
    },
    monday: {
      from: "2018-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      open: true,
    },
    tuesday: {
      from: "2018-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      open: true,
    },
    wednesday: {
      from: "2018-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      open: true,
    },
    thursday: {
      from: "2018-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      open: true,
    },
    friday: {
      from: "2018-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      open: true,
    },
    saturday: {
      from: "2018-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      open: true,
    },
  });
  function handleTime(time, day, when) {
    // times[day][when] = time;
    setTimes({ ...times, [day]: { ...times[day], [when]: time } });
  }

  function handleDayAvailabiltyChange(value, day, when) {
    setTimes({ ...times, [day]: { ...times[day], [when]: value } });
  }

  const filteredItem = () => {
    return items.filter((elem) => elem.item_type === "Meal");
  };
  const filteredProduct = () => {
    return items.filter((elem) => elem.item_type === "Product");
  };
  const filteredUtensils = () => {
    return items.filter((elem) => elem.item_type === "Utensils");
  };
  console.log(filteredItem(), "fil");

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
  const getItem = async (name) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")?._id;
      const response = await axios.get(`/items/users/${user}`);
      const resp = response.data.data.map((element) => {
        return {
          label: element.item_name,
          value: element._id,
          image: element?.itemImage0,
          price: element?.item_price ? `$${element?.item_price}` : "No Price",
          store: element?.store_available?.store_name || "No store",
          item_type: element?.item_type,
        };
      });
      setItems(resp);
      console.log(response.data.data, "resp");
    } catch (error) {
      console.log(error);
    }
    return name;
  };
  console.log(items, "item");

  const getStore = async (name) => {
    try {
      const response = await axios.get(`/stores/store/${name}`);
      const resp = response.data.data.supplier.map((element) => {
        return {
          label: element.store_name,
          value: element._id,
        };
      });
      setStore(resp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const path = router.asPath.split("#");
    if (Array.isArray(path) && path.length === 2) {
      const doc = document.querySelector(`#${path[1]}`);
      if (doc) {
        doc.scrollIntoView();
      }
    }
  }, []);
  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setShow(false);
        }
      },
      true
    );
  }, []);
  useEffect(() => {
    getItem();
  }, []);
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
  const [categories, setCategories] = useState([
    {
      label: "All categories",
      value: true,
    },
    {
      label: "Stores",
      value: true,
    },
    {
      label: "Meals",
      value: true,
    },
    {
      label: "Products",
      value: true,
    },
    {
      label: "Kitchen Utensils",
      value: true,
    },
  ]);
  console.log(formState, "fff");
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
                    <div
                      onClick={() => uploadImage("profile")}
                      className={styles.bgimg}
                    >
                      <img
                        id="profile_picture"
                        width="100%"
                        alt="profile"
                        style={{ display: "block" }}
                      />
                      {/* <p>choose image</p> */}
                    </div>
                  </div>
                  <div>
                    <h5>Upload Background Image</h5>
                    <div
                      onClick={() => uploadImage("background")}
                      className={styles.bgimg}
                    >
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
            {active === 2 && (
              <div>
                <div className={styles.flexend}>
                  <p>Filter</p>
                  <div>
                    <div
                      className={styles.searchbox}
                      onClick={() => setShowCategory(!showCategory)}
                    >
                      {categories[0].value &&
                      categories.some((ele) => !ele.value)
                        ? "All categories"
                        : categories.find((ele) => ele.value).label}
                      <GoTriangleUp
                        className={
                          !showCategory ? styles.rotate : styles.nonrotate
                        }
                        size={15}
                      />
                    </div>
                    {showCategory && (
                      <div className={styles.categories}>
                        {categories.map((option) => (
                          <p
                            onClick={() => {
                              let arr = [];
                              if (option.label === "All categories") {
                                arr = categories.map((ele) => {
                                  return {
                                    ...ele,
                                    value: true,
                                  };
                                });
                              } else {
                                arr = categories.map((ele) => {
                                  if (ele.label === option.label) {
                                    return {
                                      ...ele,
                                      value: true,
                                    };
                                  } else {
                                    return {
                                      ...ele,
                                      value: false,
                                    };
                                  }
                                });
                              }

                              setCategories(arr);
                            }}
                            key={option?.label}
                          >
                            {option?.label}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.suggestbtn}>
                    <p>+ New Suggestion</p>
                  </div>
                </div>
                <div ref={ref} className={styles.searchflex}>
                  <div className={styles.search}>
                    <input
                      placeholder="Search"
                      autoComplete="off"
                      onFocus={() => setShow(true)}
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                        getItem(e.target.value);
                        getStore(e.target.value);
                      }}
                      type="text"
                      name="search"
                    />
                    {show && (
                      <div className={styles.searchDropdown}>
                        <>
                          <>
                            {categories.find((ele) => ele.label === "Stores")
                              ?.value && (
                              <>
                                <h4 className={styles.storeTitle}>
                                  Stores ({store.length})
                                </h4>
                                <div className={styles.bord} />
                                <div className={styles.list}>
                                  {store.length === 0 ? (
                                    Boolean(value) ? (
                                      <div className={styles.result}>
                                        <p>No Result Found</p>
                                        <button
                                          onClick={() =>
                                            router.push(
                                              `/suggest-store/${value}`
                                            )
                                          }
                                        >
                                          Suggest Store
                                        </button>
                                      </div>
                                    ) : null
                                  ) : (
                                    store.slice(0, 4).map((stores) => (
                                      <p
                                        key={stores.value}
                                        onClick={() => {
                                          setOneStore({
                                            visible: true,
                                            id: stores.value,
                                          });
                                          setValue(stores.label);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {stores.label}
                                      </p>
                                    ))
                                  )}
                                </div>
                              </>
                            )}
                          </>
                        </>
                        <>
                          {categories.find((ele) => ele.label === "Meals")
                            ?.value && (
                            <>
                              <h4 className={styles.storeTitle}>
                                Meals ({filteredItem().length})
                              </h4>
                              <div className={styles.bord} />
                              <div className={styles.list}>
                                {filteredItem().length === 0 ? (
                                  Boolean(value) ? (
                                    <div className={styles.result}>
                                      <p>No Result Found</p>
                                      <button
                                        onClick={() =>
                                          router.push("/suggestmeal")
                                        }
                                      >
                                        Suggest Meal
                                      </button>
                                    </div>
                                  ) : null
                                ) : (
                                  filteredItem()
                                    ?.slice(0, 4)
                                    .map((elem) => (
                                      <p
                                        key={elem.value}
                                        onClick={() => {
                                          setOneStore({
                                            visible: false,
                                            id: "",
                                          });
                                          setValue(elem.label);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {elem.label}
                                      </p>
                                    ))
                                )}
                              </div>
                            </>
                          )}
                        </>

                        <>
                          {categories.find((ele) => ele.label === "Products")
                            ?.value && (
                            <>
                              <h4 className={styles.storeTitle}>
                                Products ({filteredProduct().length})
                              </h4>
                              <div className={styles.bord} />
                              <div className={styles.list}>
                                {filteredProduct().length === 0 ? (
                                  Boolean(value) ? (
                                    <div className={styles.result}>
                                      <p>No Result Found</p>
                                      <button
                                        onClick={() =>
                                          router.push("/suggestmeal")
                                        }
                                      >
                                        Suggest Product
                                      </button>
                                    </div>
                                  ) : null
                                ) : (
                                  filteredProduct()
                                    ?.slice(0, 4)
                                    .map((elem) => (
                                      <p
                                        key={elem.value}
                                        onClick={() => {
                                          setOneStore({
                                            visible: false,
                                            id: "",
                                          });
                                          setValue(elem.label);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {elem.label}
                                      </p>
                                    ))
                                )}
                              </div>
                            </>
                          )}
                        </>

                        <>
                          {categories.find(
                            (ele) => ele.label === "Kitchen Utensils"
                          )?.value && (
                            <>
                              <h4 className={styles.storeTitle}>
                                Kitchen Utensils ({filteredUtensils().length})
                              </h4>
                              <div className={styles.bord} />
                              <div className={styles.list}>
                                {filteredUtensils().length === 0 ? (
                                  Boolean(value) ? (
                                    <div className={styles.result}>
                                      <p>No Result Found</p>
                                      <button
                                        onClick={() =>
                                          router.push("/suggestmeal")
                                        }
                                      >
                                        Suggest Utensil
                                      </button>
                                    </div>
                                  ) : null
                                ) : (
                                  filteredUtensils()
                                    ?.slice(0, 4)
                                    .map((elem) => (
                                      <p
                                        key={elem.value}
                                        onClick={() => {
                                          setOneStore({
                                            visible: false,
                                            id: "",
                                          });
                                          setValue(elem.label);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {elem.label}
                                      </p>
                                    ))
                                )}
                              </div>
                            </>
                          )}
                        </>
                      </div>
                    )}
                  </div>
                  <button
                    className={styles.searchbtn}
                    onClick={() => {
                      if (oneStore.visible) {
                        router.push(`/store/${oneStore.id}`);
                      } else {
                        items.item_type === "Meal"
                          ? router.push(`/meal/${value}`)
                          : items.item_type === "Product"
                          ? router.push(`/product/${value}`)
                          : router.push(`/product/${value}`);
                      }
                    }}
                  >
                    Search
                  </button>
                </div>
                <div className={styles.flex}>
                  <p>Meal</p>
                  <p className={styles.red}>Remove selection(s)</p>
                </div>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <th>Name</th>
                    <th>Price</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </thead>
                  <tbody style={{ width: "100%" }}>
                    {filteredItem()?.map((ele) => (
                      <tr className={styles.tr}>
                        <td style={{ display: "flex", alignItems: "center" }}>
                          <input type="checkbox" />
                          <Image
                            src={ele.image}
                            width={40}
                            height={40}
                            objectFit="contain"
                            objectPosition="center"
                            style={{ marginLeft: "1rem" }}
                          />
                          <p className={styles.label}>{ele?.label}</p>
                        </td>
                        <td>
                          <p>{ele?.price}</p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <IoIosCloseCircle color="#949494" size={20} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.top}>
                  <div className={styles.flex}>
                    <p>Product</p>
                    <p className={styles.red}>Remove selection(s)</p>
                  </div>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <th>Name</th>
                      <th>Price</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </thead>
                    <tbody style={{ width: "100%" }}>
                      {filteredProduct()?.map((ele) => (
                        <tr className={styles.tr}>
                          <td style={{ display: "flex", alignItems: "center" }}>
                            <input type="checkbox" />
                            <Image
                              src={ele.image}
                              width={40}
                              height={40}
                              objectFit="contain"
                              objectPosition="center"
                              style={{ marginLeft: "1rem" }}
                            />
                            <p className={styles.label}>{ele?.label}</p>
                          </td>
                          <td>
                            <p>{ele?.price}</p>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <IoIosCloseCircle color="#949494" size={20} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <div className={styles.top}>
                  <div className={styles.flex}>
                    <p>Utensil</p>
                    <p className={styles.red}>Remove selection(s)</p>
                  </div>
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <th>Name</th>
                      <th>Price</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </thead>
                    <tbody style={{ width: "100%" }}>
                      {filteredUtensils()?.map((ele) => (
                        <tr className={styles.tr}>
                          <td style={{ display: "flex" }}>
                            <input type="checkbox" />
                            <p className={styles.label}>{ele?.label}</p>
                          </td>
                          <td>
                            <p>{ele?.price}</p>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <IoIosCloseCircle color="#949494" size={20} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> */}
              </div>
            )}
            {active === 3 && (
              <div>
                <h5>Payment</h5>
                <div className={styles.payment}>
                  <div className={styles.cards}>
                    <div className={styles.card}>
                      <BsFillCreditCard2BackFill />
                      <p>Cards</p>
                    </div>
                    <div className={styles.paypal}>
                      <img src="/assets/logos/paypal.png" />
                    </div>
                    <div className={styles.paypal}>
                      <img
                        src="/assets/logos/sezzle.png"
                        className={styles.sezzle}
                      />
                    </div>
                  </div>
                  <div>
                    <p>Choose card type</p>
                  </div>
                </div>
              </div>
            )}
            {active === 4 && (
              <div>
                <h5>Work hours</h5>
                <div>
                  <h5>Set Working Hours</h5>
                  <p>
                    Configure the standard hours of operation for this store
                  </p>
                  <div className={styles.payment}>
                    <div className={profileStyles.profile_workinghour_days}>
                      {days.map((day) => {
                        return (
                          <div
                            className={profileStyles.profile_workinghour_day}
                          >
                            <h3>{day}</h3>
                            <div
                              className={
                                profileStyles.profile_workinghour_switch
                              }
                            >
                              <AntSwitch
                                checked={times[day]["open"]}
                                onChange={() =>
                                  handleDayAvailabiltyChange(
                                    !times[day]["open"],
                                    day,
                                    "open"
                                  )
                                }
                                inputProps={{ "aria-label": "ant design" }}
                              />
                              {times[day]["open"] ? "Open" : "Closed"}
                            </div>
                            <div
                              className={profileStyles.profile_workinghour_date}
                            >
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  value={times[day]["from"]}
                                  onChange={(time) =>
                                    handleTime(time, day, "from")
                                  }
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </LocalizationProvider>
                            </div>
                            <h4>To</h4>
                            <div
                              className={profileStyles.profile_workinghour_date}
                            >
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  value={times[day]["to"]}
                                  onChange={(time) =>
                                    handleTime(time, day, "to")
                                  }
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {active === 5 && (
              <div>
                <div className={styles.flex}>
                  <h5>Sub Admins</h5>
                  <div className={styles.suggestbtn}>
                    <p>+ Add Sub Admin</p>
                  </div>
                </div>
                <div className={styles.subadmin}>
                  <div className={styles.flexstart}>
                    <div className={styles.user}>
                      <img src="/assets/icons/girl.jpg" />
                    </div>
                    <div style={{ marginLeft: "1.5rem" }}>
                      <h5 className={styles.admin_name}>Rachel Anterta</h5>
                      <p className={styles.role}>Sub Admin</p>
                    </div>
                  </div>
                  <div className={styles.center}>
                    <IoIosCloseCircle color="#949494" size={20} />
                    <p className={styles.remove}>Remove User</p>
                  </div>
                </div>
                <p className={styles.add}>Add New Sub Admin</p>
                <div className={styles.payment}>
                  <div className={styles.contact}>
                    <p>Contact Information</p>

                    <div className={styles.columnflex}>
                      <div className={styles.column}>
                        <label>First Name</label>
                        <input
                          onChange={handleChange}
                          value={formState.city}
                          type="text"
                          name="first_name"
                        />
                      </div>
                      <div className={styles.column}>
                        <label>Last Name</label>
                        <input
                          onChange={handleChange}
                          value={formState.state}
                          type="text"
                          name="Last Name"
                        />
                      </div>
                    </div>
                    <div className={styles.column}>
                      <label>Email Address</label>
                      <input
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="email"
                      />
                    </div>
                    <div className={styles.column}>
                      <label>Phone Number</label>
                      <input
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="number"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.flexend}>
                  <button className={styles.button}> Send Link</button>
                </div>
              </div>
            )}
            {active === 6 && (
              <div>
                <div className={styles.flex}>
                  <h5>Drivers</h5>
                  <div className={styles.suggestbtn}>
                    <p>+ Add Driver</p>
                  </div>
                </div>
                <div className={styles.subadmin}>
                  <div className={styles.flexstart}>
                    <div className={styles.user}>
                      <img src="/assets/icons/girl.jpg" />
                    </div>
                    <div style={{ marginLeft: "1.3rem" }}>
                      <h5 className={styles.admin_name}>Rachel Anterta</h5>
                      <p className={styles.car}>Hyundai Elantra - Black</p>
                      <div className={styles.flexstart} style={{marginTop: '1rem'}}>
                        <FaPhoneAlt color="#F47900" />
                        <p className={styles.number}>(406) 555-0120</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.center}>
                    <IoIosCloseCircle color="#949494" size={20} />
                    <p className={styles.remove}>Remove User</p>
                  </div>
                </div>
                <p className={styles.add}>Add New Driver</p>
                <div className={styles.payment}>
                  <div className={styles.contact}>
                    <p>Contact Information</p>

                    <div className={styles.columnflex}>
                      <div className={styles.column}>
                        <label>First Name</label>
                        <input
                          onChange={handleChange}
                          value={formState.city}
                          type="text"
                          name="first_name"
                        />
                      </div>
                      <div className={styles.column}>
                        <label>Last Name</label>
                        <input
                          onChange={handleChange}
                          value={formState.state}
                          type="text"
                          name="Last Name"
                        />
                      </div>
                    </div>
                    <div className={styles.column}>
                      <label>Email Address</label>
                      <input
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="email"
                      />
                    </div>
                    <div className={styles.column}>
                      <label>Phone Number</label>
                      <input
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="number"
                      />
                    </div>
                  </div>
                  <div className={styles.contact}>
                    <p className={styles.title}>Car Details</p>
                    <div className={styles.column}>
                      <label>Car Name</label>
                      <input
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="email"
                      />
                    </div>

                    <div className={styles.columnflex2}>
                      <div className={styles.column}>
                        <label>VIN</label>
                        <input
                          onChange={handleChange}
                          value={formState.city}
                          type="text"
                          name="first_name"
                        />
                      </div>
                      <div className={styles.column}>
                        <label>Color</label>
                        <input
                          onChange={handleChange}
                          value={formState.state}
                          type="text"
                          name="Last Name"
                        />
                      </div>
                    </div>
                    <div className={styles.column}>
                      <label>Plate Number</label>
                      <input
                        onChange={handleChange}
                        value={formState.address}
                        type="text"
                        name="number"
                      />
                    </div>
                    <div className={styles.flexend}>
                      <button className={styles.button2}> Add Driver</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
