import React from "react";
import styles from "./style.module.css";
import { BsPlusLg } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";

export default function BottomNavbar({
  openForm,
  handleAll,
  checked,
  onDelete,
}) {
  return (
    <div className={styles.Navbar}>
      <div>
        <button
          onClick={onDelete}
          className={checked ? styles.show : styles.hide}
        >
          <FiTrash2 />
        </button>
        <button onClick={openForm}>
          <BsPlusLg />
        </button>
        <input type="checkbox" checked={checked} onChange={handleAll} />
      </div>
    </div>
  );
}
