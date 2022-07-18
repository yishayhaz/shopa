import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.css";
import { FiTrash2 } from "react-icons/fi";
import { POST } from "../API";

export default function Form(props) {
  const { status, close, refetchItems, defaultColorIndex } = props;

  const [tag, setTag] = useState(1);
  const [text, setText] = useState("");
  const InputRef = useRef();

  const colors = ["danger", "medium", "success", "lightblue", "purple", "pink"];

  useEffect(() => {
    setTag(colors[defaultColorIndex] ? defaultColorIndex : 1);
  }, [defaultColorIndex]);

  useEffect(() => {
    InputRef.current.focus();
  }, [status]);

  const submitForm = (shouldClose = true) => {
    if (!text) return;

    const doc = {
      priority: tag,
      name: text,
      amount: 69420,
      unit: "easter egg",
    };

    PostDoc(doc);

    setText("");

    if (shouldClose) {
      close();
    }
  };

  const PostDoc = async (doc) => {
    try {
      await POST("/shopping-list/item", doc);
    } catch {
    } finally {
      refetchItems();
    }
  };

  const HandleKeyDown = (e) => {
    if (e.code === "Enter") {
      submitForm(false);
    }
  };

  return (
    <div className={`${styles.Form} ${styles[status]}`}>
      <div>
        <input
          type="text"
          placeholder="Buy this..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={HandleKeyDown}
          ref={InputRef}
        />
        <div className={styles.Tags}>
          {colors.map((color, index) => (
            <span
              className={`${color} ${tag === index ? "active" : ""}`}
              onClick={() => setTag(index)}
              key={index}
            ></span>
          ))}
        </div>
        <div className={styles.Btns}>
          <button onClick={close}>
            <FiTrash2 />
          </button>
          <button onClick={submitForm}>Add</button>
        </div>
      </div>
    </div>
  );
}
