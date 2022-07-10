import React from "react";
import styles from "./style.module.css";

export default function Header() {
  const setDir = () => {
    let prvDir = localStorage.getItem("dir") || "ltr";

    if (prvDir === "ltr") {
      localStorage.setItem("dir", "rtl");
    } else {
      localStorage.setItem("dir", "ltr");
    }

    window.location.reload();
  };
  return (
    <div className={styles.Header}>
      <h1 onClick={setDir}>Cohen Fam</h1>
    </div>
  );
}
