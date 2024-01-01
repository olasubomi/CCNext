import React from "react";
import styles from "./form-modal.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import GooglePlacesAutocomplete from "../dashboard/googleplacesautocomplete";
import { useState } from "react";
import { SuccessModal } from "../suggest-store/success-modal";

export const FormModal = ({ setOpenModal, setOpenSuccessModal }) => {
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
  const [formState, setFormState] = useState({
    store_name: "",
    email: "",
    phone: "",
    intro: "",
    profile_picture: {},
    background_picture: {},
    phone_number: "",
    store_owner: "",
    supplier_address: {
      city: "",
      state: "",
      zip_code: "",
      country: "",
      address: "",
    },
  });
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.flex}>
          <h3>Claim this Store</h3>
          <div onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle size={30} color="#FFF" />
          </div>
        </div>
        <div className={styles.pad}>
          <p>Fill this form below to claim this store</p>
          <div className={styles.column}>
            <label>Business Name</label>
            <input
              //   onChange={handleChange}
              value={formState.store_name}
              placeholder="Enter your business name"
              type="text"
              name="store_name"
            />
          </div>
          <div className={styles.column}>
            <label>Business Registration Number</label>
            <input
              //   onChange={handleChange}
              placeholder="Enter your business registration number"
              value={formState.store_name}
              type="text"
              name="store_name"
            />
          </div>
          <div className={styles.column}>
            <label>Store Address </label>
            <GooglePlacesAutocomplete
              defaultInputValue={formState.supplier_address.address}
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
                  supplier_address: {
                    address,
                    place_id,
                    lat,
                    lng,
                    zip_code,
                    country,
                    state,
                    city,
                  },
                });
              }}
            />
          </div>
          <div className={styles.column}>
            <h6>Upload Ownership Proof</h6>
            <label>
              Upload a document that proves your ownership (e.g Business License
              or Certificate)
            </label>
            <div
              onClick={() => uploadImage("background")}
              className={styles.bgimg}
              style={{ position: "relative" }}
            >
              {" "}
              <img
                id="background_picture"
                width="100%"
                alt="profile"
                style={{
                  display: "none",
                  position: "relative",
                  zIndex: 10,
                }}
              />
              <p
                style={{
                  position: "absolute",
                  zIndex: 5,
                }}
              >
                +
              </p>
            </div>
            <button className={styles.submit} onClick={() => {
              setOpenModal(false)
              setOpenSuccessModal(true)
            }}>Submit Form</button>
          </div>
        </div>
      </div>
    </div>
  );
};
