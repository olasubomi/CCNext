import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./PasswordField.module.css";

/**
 * Shared controlled password input for login, signup and account settings.
 * The parent owns the value; visibility is local to each field.
 * onChange receives the original event, including name and id.
 */
export default function PasswordField({
  id,
  name,
  value,
  onChange,
  onBlur,
  className = "",
  placeholder,
  autoComplete = "current-password",
  required,
  minLength,
  maxLength,
  disabled,
  visibilityLabel = "password",
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.wrapper}>
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        className={`${className} ${styles.input}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
      <button
        type="button"
        className={styles.secureEye}
        aria-label={visible ? `Hide ${visibilityLabel}` : `Show ${visibilityLabel}`}
        aria-pressed={visible}
        aria-controls={id}
        disabled={disabled}
        onClick={() => setVisible((previous) => !previous)}
      >
        {visible ? <VisibilityOff /> : <Visibility />}
      </button>
    </div>
  );
}
