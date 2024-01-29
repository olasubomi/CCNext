import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./transferToInventory.module.css";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import axios from "../../util/Api";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import { AiFillInfoCircle } from "react-icons/ai";

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

export default function TransferToInventory(props) {
  const [restockOption, setRestockOption] = useState();
  const [restockTime, setRestockTime] = useState("1 day");
  const [message, setMessage] = useState({
    response: "",
    success: false,
  });
  const [show, setShow] = useState(false);
  const [currency, setCurrency] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [formState, setFormState] = useState({
    prepackagedMeal: false,
    ingredientsAvailable: [],
    estimated_preparation_time: 0,
    item_type: "Meal",
    in_stock: true,
  });

  const { ingredientsAvailable, item_type, in_stock } = formState;
  console.log(props, "pp");
  // useEffect(() => {
  //   console.log( props.meal.ingredeints_in_item, 'propsss');
  //   if (props.meal.item_type === "Meal" && props.meal.ingredeints_in_item) {
  //     const ingredientsAvailable = props.meal.ingredeints_in_item;

  //     const newIngredients = ingredientsAvailable?.map((ingredient) => ({
  //       name: ingredient.item_name,
  //       quantity: ingredient.quantity,
  //       set_price: "",
  //       product_available: true,
  //     }));

  //     console.log(newIngredients, 'new');

  //     setFormState((prevState) => ({
  //       ...prevState,
  //       ingredientsAvailable: newIngredients,
  //       item_type: props.type,
  //     }));
  //   }
  // }, [props.meal.item_type, props.meal.ingredeints_in_item]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "meal_type") {
      if (value === "packaged") {
        setFormState({
          ...formState,
          [name]: value,
          ["prepackagedMeal"]: true,
        });
      } else {
        setFormState({
          ...formState,
          [name]: value,
          ["prepackagedMeal"]: false,
        });
      }
    } else {
      setFormState({ ...formState, [name]: value });
    }

    console.log(formState);
  }

  // useEffect(() => {
  //   if (props?.ingredeints_in_item) {
  //     setFormState({
  //       ...formState,
  //       ingredientsAvailable: props.ingredeints_in_item,
  //     });
  //   }
  // }, [props?.ingredeints_in_item]);

  function handleInStockChange(value) {
    setFormState({ ...formState, in_stock: value });
  }

  function handleIngredientChange(e, id, key) {
    const { value } = e.target;
    console.log(e, id, key);
    let ingredientsAvailable = formState.ingredientsAvailable;
    ingredientsAvailable[id][key] = value;
    console.log(ingredientsAvailable);
    setFormState({
      ...formState,
      ["ingredientsAvailable"]: ingredientsAvailable,
    });
  }

  function handleIngredientAvailabilityChange(value, id, key) {
    console.log(value);
    let ingredientsAvailable = formState.ingredientsAvailable;
    ingredientsAvailable[id][key] = value;
    setFormState({
      ...formState,
      ["ingredientsAvailable"]: ingredientsAvailable,
    });
  }

  function sendToInventory() {
    let fields = formState;

    delete fields.meal_type;
    fields["item"] = props.meal._id;
    // fields["storeId"] = "63783f54088dda05688af4df";
    fields.ingredients = formState.ingredientsAvailable;
    delete formState.ingredientsAvailable;
    fields.user = JSON.parse(localStorage.getItem("user"))?._id ?? "";
    axios
      .post("/inventory/create-inventory", fields)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          // this.setState({ booleanOfDisplayOfDialogBoxConfirmation: true });
          console.log(response);
          console.log("Display Item submitted successfully");
          props.setTransferToInventoryState(false);
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 3000);
          setMessage({
            response:
              "Your request has been sent to the administrator; you will be notified when it is approved or rejected. It might take up to 2-3 hours, so please be patient.",
            success: true,
          });
          // window.location.href = "/SuggestMeal"
        } else {
          setMessage("Something wrong happened");
        }
      })
      .catch((error) => {
        props.setTransferToInventoryState(false);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
        setMessage({
          response:
            "Your request cannot be completed as Item is already in Inventory",
          success: false,
        });
        console.log(error);
      });
  }

  function handleRestockTimeChange(type) {
    setRestockTime(type);
    toggleRestockTimeOption();
  }

  function toggleRestockTimeOption() {
    setRestockOption(!restockOption);
  }
  console.log(props, "ty");

  useEffect(() => {
    if (
      Array.isArray(props?.meal?.ingredeints_in_item) &&
      props?.meal?.ingredeints_in_item?.length
    ) {
      const resp = props?.meal?.ingredeints_in_item?.map((element) => {
        return {
          item_name: element.item_name,
          item_quantity: element.item_quantity,
          set_price: "",
          product_available: true,
        };
      });
      setFormState({ ...formState, ingredientsAvailable: resp });
    }
  }, [props]);
  const [allStores, setAllStores] = useState([]);
  const getSelectedStoreCurrencySymbol = () => {
    const selectedStoreObj = allStores.find(
      (store) => store._id === formState.storeId
    );

    return selectedStoreObj?.currency?.symbol || "$"; // Default to '$' if not found
  };
  const fetchOneUserStore = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))?._id;
      const response = await axios(`/stores/user/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data, "one store");
      setAllStores(response.data.data);
      setCurrency(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOneUserStore();
  }, []);
  console.log(formState.ingredientsAvailable, "avail");
  return (
    <>
      {show && (
        <div className={styles.transToIn_container}>
          <div className={styles.success}>
            <div className={styles.top}>
              {message.success ? (
                <Image
                  width={60}
                  height={60}
                  src="/assets/icons/sent.png"
                  objectFit="cover"
                  objectPosition="center"
                />
              ) : (
                <Image
                  width={60}
                  height={60}
                  src="/assets/icons/not-sent.png"
                  objectFit="cover"
                  objectPosition="center"
                />
              )}
              <h4>{message.success ? "Sent" : "Not Sent"}</h4>
              <p>{message.response}</p>
            </div>
            {message.success && (
              <div>
                <div className={styles.bor} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AiFillInfoCircle color="#6D6D6D" />
                  <p style={{ marginLeft: ".3rem" }}>
                    It might take up to 2-3 hours, so please be patient.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {props.transferToInventory && (
        <div className={styles.transToIn_container}>
          <div className={styles.transToIn}>
            <div className={styles.transToIn_top}>
              <h2>Transfer {" " + item_type + " "} to Inventory</h2>

              <div onClick={props.toggleTransferToInventory}>
                <CancelIcon className={styles.transToIn_cancel_con} />
              </div>
            </div>

            <div className={styles.transToIn_details_con}>
              <div
                style={{
                  flexDirection: "column",
                  display: "flex",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <label htmlFor="mySelect" style={{ paddingBottom: "1rem" }}>
                  Which store are you sending from?
                </label>
                <select
                  style={{
                    width: "25%",
                    height: "34px",
                    border: "1px solid #E6E6E6",
                    outline: "none",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      ["storeId"]: e.target.value,
                    });
                    setSelectedStore(e.target.value);
                  }}
                  name="storeId"
                  value={formState.storeId}
                >
                  {allStores?.map((elem) => (
                    <option key={elem?._id} value={elem?._id}>
                      {elem?.store_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.transToIn_meal_types}>
                <p>Choose Meal Type</p>
                {props?.meal?.item_type === "Meal" ? (
                  <div className={styles.transToIn_meal_type}>
                    <div className={styles.transToIn_meal_type_option}>
                      <input
                        onChange={handleChange}
                        className={styles.transToIn_meal_type_radioInput}
                        type="radio"
                        id="non packaged"
                        name="meal_type"
                        value="non packaged"
                      />
                      <label
                        htmlFor="non packaged"
                        className={styles.transToIn_meal_type_radio_button}
                      ></label>
                      <label
                        htmlFor="non packaged"
                        className={styles.transToIn_meal_type_radioLabel}
                      >
                        Non-prepackaged meal
                      </label>
                      <label
                        htmlFor="non packaged"
                        className={styles.transToIn_meal_type_radioLabel2}
                      >
                        Includes all the ingredients needed in preparation of
                        this meal
                      </label>
                    </div>
                    <div className={styles.transToIn_meal_type_option}>
                      <input
                        className={styles.transToIn_meal_type_radioInput}
                        type="radio"
                        onChange={handleChange}
                        id="packaged"
                        name="meal_type"
                        value="packaged"
                      />
                      <label
                        htmlFor="packaged"
                        className={styles.transToIn_meal_type_radio_button}
                      ></label>
                      <label
                        htmlFor="packaged"
                        className={styles.transToIn_meal_type_radioLabel}
                      >
                        Prepackaged Meal
                      </label>
                      <label
                        htmlFor="packaged"
                        className={styles.transToIn_meal_type_radioLabel2}
                      >
                        Meal without the ingredients
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className={styles.transToIn_meal_type}>
                    <div className={styles.transToIn_meal_type_option}>
                      <input
                        onChange={handleChange}
                        className={styles.transToIn_meal_type_radioInput}
                        type="radio"
                        id="Product"
                        name="item_type"
                        value="Product"
                      />
                      <label
                        htmlFor="Product"
                        className={styles.transToIn_meal_type_radio_button}
                      ></label>
                      <label
                        htmlFor="Product"
                        className={styles.transToIn_meal_type_radioLabel}
                      >
                        Product
                      </label>
      
                    </div>
                    <div className={styles.transToIn_meal_type_option}>
                      <input
                        className={styles.transToIn_meal_type_radioInput}
                        type="radio"
                        onChange={handleChange}
                        id="Kitchen Utensils"
                        name="item_type"
                        value="Kitchen Utensils"
                      />
                      <label
                        htmlFor="Kitchen Utensils"
                        className={styles.transToIn_meal_type_radio_button}
                      ></label>
                      <label
                        htmlFor="Kitchen Utensils"
                        className={styles.transToIn_meal_type_radioLabel}
                      >
                        Kitchen Utensils
                      </label>
                      
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.transToIn_details_col2}>
                <div>
                  <h3>Set {" " + item_type + " "} Price</h3>
                  <div>
                    <p>Enter {" " + item_type + " "} Price</p>
                    <h4>{getSelectedStoreCurrencySymbol()}</h4>

                    <input onChange={handleChange} name="meal_price" />
                  </div>
                </div>
                <div>
                  <h3>Set Estimated preparation time</h3>
                  <div>
                    <p>Set time for pickup</p>
                    <input
                      onChange={handleChange}
                      name="estimated_preparation_time"
                      type="number"
                    />
                    <h4>Minutes</h4>
                  </div>
                </div>
              </div>

              <div className={styles.transToIn_details_col3}>
                <div>
                  <h3>Are the ingredients available in your store</h3>
                  <AntSwitch
                    checked={in_stock}
                    onChange={(_, checked) => handleInStockChange(checked)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                </div>
                <div>
                  <h3>Out of Stock? How long before restock</h3>
                  <div className={styles.select_container}>
                    <div
                      onClick={toggleRestockTimeOption}
                      className={styles.select_box}
                    >
                      <p>{restockTime}</p>
                      <ArrowDropDownIcon className={styles.select_box_icon} />
                    </div>
                    {restockOption && (
                      <div className={styles.select_options}>
                        <p onClick={() => handleRestockTimeChange("1 day")}>
                          1 day
                        </p>
                        <p onClick={() => handleRestockTimeChange("2 days")}>
                          2 days
                        </p>
                        <p onClick={() => handleRestockTimeChange("3 days")}>
                          3 days
                        </p>
                        <p
                          onClick={() =>
                            handleRestockTimeChange("About 1 week")
                          }
                        >
                          About 1 week
                        </p>
                        <p onClick={() => handleRestockTimeChange("2 Weeks")}>
                          2 Weeks
                        </p>
                        <p
                          onClick={() =>
                            handleRestockTimeChange("About 1 month")
                          }
                        >
                          About 1 month
                        </p>
                        <p onClick={() => handleRestockTimeChange("2 months")}>
                          2 months
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {props?.meal?.item_type === "Meal" && (
                <>
                  {formState.meal_type === "non packaged" && (
                    <div className={styles.transToIn_details_col4}>
                      <p>Set ingredient prices and availability</p>
                      <table className={styles.request_table} style={{height: '2px'}}>
                        <thead>
                          <div
                            className={styles.request_tr1}
                            style={{ backgroundColor: "transparent" }}
                          >
                            <th className={styles.request_th}>Items</th>
                            <th
                              className={
                                styles.request_th + " " + styles.hideData
                              }
                            >
                              Quantity
                            </th>
                            <th className={styles.request_th}>Set Price</th>
                            <th className={styles.request_th}>
                              Product Available
                            </th>
                          </div>
                        </thead>
                        <tbody className={styles.tbody}>
                          {formState.ingredientsAvailable?.map(
                            (ingredient, index) => {
                              return (
                                <div
                                  className={
                                    styles.refId + " " + styles.request_tr
                                  }
                                >
                                  <div className={styles.request_td}>
                                    {ingredient.item_name}
                                  </div>
                                  <div
                                    className={
                                      styles.request_td + " " + styles.hideData
                                    }
                                  >
                                    <input
                                      value={
                                        formState.ingredientsAvailable[index]
                                          ?.item_quantity
                                      }
                                      onChange={(e) =>
                                        handleIngredientChange(
                                          e,
                                          index,
                                          "item_quantity"
                                        )
                                      }
                                      name="meal_price"
                                    />
                                  </div>
                                  <div className={styles.request_td}>
                                    {getSelectedStoreCurrencySymbol()}
                                    <input
                                      value={
                                        formState.ingredientsAvailable[index]
                                          ?.set_price
                                      }
                                      onChange={(e) =>
                                        handleIngredientChange(
                                          e,
                                          index,
                                          "set_price"
                                        )
                                      }
                                      name="meal_price"
                                    />
                                  </div>
                                  <div className={styles.request_td}>
                                    <AntSwitch
                                      checked={
                                        formState.ingredientsAvailable[index]
                                          ?.product_available
                                      }
                                      onChange={(e) =>
                                        handleIngredientAvailabilityChange(
                                          !ingredient.product_available,
                                          index,
                                          "product_available"
                                        )
                                      }
                                      inputProps={{
                                        "aria-label": "ant design",
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className={styles.transToIn_footer}>
              <button
                className={styles.transToIn_footer_button}
                onClick={props.toggleTransferToInventory}
              >
                Cancel
              </button>
              <button
                onClick={sendToInventory}
                className={styles.transToIn_footer_button2}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
