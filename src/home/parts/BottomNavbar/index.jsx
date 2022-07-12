import React from "react";
import styles from "./style.module.css";
import { BsPlusLg } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { FaSort } from "react-icons/fa";

export default function BottomNavbar(props) {
  const { openForm, handleCheckAll, checked, onDelete, SortColor, setFilter } =
    props;
  return (
    <div className={styles.Navbar}>
      <div>
        {checked ? (
          <button onClick={onDelete} className={styles.Trash}>
            <FiTrash2 />
          </button>
        ) : (
          <button
            className={`${styles.Sort} ${SortColor}`}
            onClick={() => setFilter()}
          >
            <FaSort />
          </button>
        )}
        <button onClick={openForm}>
          <BsPlusLg />
        </button>
        <input type="checkbox" checked={checked} onChange={handleCheckAll} />
      </div>
    </div>
  );
}
