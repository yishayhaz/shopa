import React from "react";
import styles from "./style.module.css";

/**
 * @param childreb {string} - is the title
 * @param status enum[success, danger, medium]
 * @param checked {boolean}
 * @param onChange {function}
 * @returns jsx
 */

export default function TodoItem(props) {
  return (
    <label
      className={styles.Todo}
      data-checked={String(props.checked)}
      htmlFor={props.id}
    >
      <h3>{props.children || ""}</h3>
      <span className={props.status || "success"}></span>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        id={props.id}
      />
    </label>
  );
}
