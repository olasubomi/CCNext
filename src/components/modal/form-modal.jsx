import React from "react";
import styles from "./form-modal.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import GooglePlacesAutocomplete from "../dashboard/googleplacesautocomplete";
import { useState } from "react";
import { SuccessModal } from "../suggest-store/success-modal";
import axios from "../../util/Api";

export const FormModal = ({ setOpenModal, setOpenSuccessModal, _id }) => {
  function uploadImage() {
    const input = document.createElement("input");
    input.accept = ".pdf,.docx,.doc";
    input.type = "file";
    input.onchange = (ev) => {
      setFormState({
        ...formState,
        business_ownership_proof: ev.target.files[0],
        file_name: ev.target.files[0]?.name,
      });
    };
    input.hidden = true;
    input.click();
  }
  const [formState, setFormState] = useState({
    business_name: "",
    business_address: "",
    business_reg_number: "",
    business_ownership_proof: "",
    file_name: "",
  });

  const handleCliamStore = async () => {
    try {
      const form = new FormData();
      delete formState.file_name;
      for (let ele in formState) {
        form.append(ele, formState[ele]);
      }
      const response = await axios.patch(`/stores/claimstore/${_id}`, form);
      console.log(response.data);
      setOpenModal(false);
      setOpenSuccessModal(true);
    } catch (e) {
      console.log(e);
      setOpenModal(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
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
              onChange={handleChange}
              value={formState.store_name}
              placeholder="Enter your business name"
              type="text"
              name="business_name"
            />
          </div>
          <div className={styles.column}>
            <label>Business Registration Number</label>
            <input
              onChange={handleChange}
              placeholder="Enter your business registration number"
              value={formState.store_name}
              type="text"
              name="business_reg_number"
            />
          </div>
          <div className={styles.column}>
            <label>Store Address </label>
            <GooglePlacesAutocomplete
              defaultInputValue={formState.business_address}
              handleValueChange={(address) => {
                setFormState({
                  ...formState,
                  business_address: address,
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
              onClick={() => uploadImage()}
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
            {formState.file_name}
            <button
              className={styles.submit}
              onClick={() => {
                handleCliamStore();
              }}
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
