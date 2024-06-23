import styles from "./suggesteddescription.module.css";
import axios from "../../util/Api";
import { CloseFillIcon, FillterIcon } from "../../components/icons";
import { IoMdCloseCircle } from "react-icons/io";

export const SuggestedCategories = ({
  categories,
  status,
  setStatus,
  updateCategory,
  deleteCategory,
}) => {
  return (
    <div className={styles.container}>
      <table
        style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr" }}
      >
        <thead>
          <tr className={styles.th1}>
            <td className={styles.td}>Name</td>
            <td className={styles.td}>
              <p>
                Affliated Object <FillterIcon style={styles.FillterIcon} />
              </p>
            </td>
            <td className={styles.td}>
              <p style={{ cursor: "pointer" }}>
                Status <FillterIcon style={styles.FillterIcon} />
              </p>
            </td>
            <td className={styles.td}>
              <p>
                Date created <FillterIcon style={styles.FillterIcon} />
              </p>
            </td>
            <td className={styles.td}>Action</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((element) => (
            <tr key={element?._id} className={styles.tr1}>
              <td className={styles.td1}>{element?.category_name}</td>
              <td className={styles.td1}>
                <span style={{ textTransform: "uppercase" }}>
                  {element?.affiliated_objects?.slice(0, 1)}
                </span>
                <span style={{ textTransform: "lowercase" }}>
                  {element?.affiliated_objects?.slice(1)}
                </span>
              </td>
              <td className={styles.td1}>
                <span
                  className={
                    (element.status === "Public") | "PUBLIC"
                      ? styles.statusText
                      : (element.status === "Pending") | "PENDING"
                      ? styles.statusText2
                      : (element.status === "Rejected") | "Rejected"
                      ? styles.rejected
                      : styles.statusText2
                  }
                >
                  <p style={{ textTransform: "capitalize" }}>
                    {element?.status}
                  </p>
                </span>
              </td>
              <td className={styles.td1}>
                {new Date(element?.createdAt)?.toLocaleDateString()}
              </td>
              <td className={styles.td1}>
                <select
                  onChange={(e) => {
                    updateCategory(element?._id, { status: e.target.value });
                  }}
                  className={styles.selected}
                >
                  <option selected={element.status === "PUBLIC"} value="Public">
                    Public
                  </option>
                  <option
                    selected={element.status === "REJECTED"}
                    value="Rejected"
                  >
                    Rejected
                  </option>
                  <option
                    selected={element.status === "PENDING"}
                    value="Pending"
                  >
                    Pending
                  </option>
                  <option selected={element.status === "DRAFT"} value="Draft">
                    Draft
                  </option>
                </select>
                <IoMdCloseCircle
                  onClick={() => deleteCategory(element._id)}
                  size={22}
                  style={{ marginLeft: ".8rem", cursor: "pointer" }}
                  color="grey"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
