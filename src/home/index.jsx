import React, { useState, useEffect } from "react";
import Form from "../form";
import BottomNavbar from "./parts/BottomNavbar";
import Header from "./parts/Header";
import TodoItem from "./parts/TodoItem";
import styles from "./style.module.css";
import { useQuery } from "react-query";
import { GET, DELETE } from "../API";

const colors = ["danger", "medium", "success", "lightblue", "purple", "pink"];

export default function HomePage() {
  const [List, setList] = useState([]);
  const [formStatus, setFormStatus] = useState("closed");
  const [completed, setCompleted] = useState([]);
  const [checkboxToClear, setCheckboxToClear] = useState(false);
  const [filterIndex, setFilter] = useState(colors.length);

  const closeForm = () => setFormStatus("closed");

  const getShoppingList = () =>
    GET("/shopping-list").then((res) => res.data.list);

  const shoppingList = useQuery("shopping-list", getShoppingList);

  const filterList = (list) =>
    [...list].filter((item) => {
      if (filterIndex === colors.length) return item;
      if (item.priority === filterIndex) return item;
      return null;
    });

  const handleChange = (e) => {
    const { checked, id } = e.target;

    if (checked && !completed.includes(id)) {
      setCompleted((prev) => [...prev, id]);
      setCheckboxToClear(true);
    } else if (!checked && completed.includes(id)) {
      setCompleted((prev) => prev.filter((item) => item !== id));

      if (completed.length === 1) {
        setCheckboxToClear(false);
      }
    }
  };

  const handleAll = () => {
    if (!completed.length) {
      setCompleted(shoppingList.data.items.map((item) => item.id));
      setCheckboxToClear(true);
    } else {
      setCompleted([]);
      setCheckboxToClear(false);
    }
  };

  const handleDelete = async () => {
    if (!completed.length) return;

    try {
      await DELETE("/shopping-list/item", {
        items_ids: completed,
      });
    } catch {
    } finally {
      shoppingList.refetch();
      setCheckboxToClear(false);
    }
  };

  const onSort = () => {
    if (filterIndex < colors.length) {
      setFilter(filterIndex + 1);
    } else setFilter(0);

    setCompleted([]);
  };

  return (
    <div dir={localStorage.getItem("dir") || "ltr"}>
      <Header />
      <div className={styles.Container}>
        {shoppingList.data?.items?.length
          ? filterList(shoppingList.data.items).map((item, index) => (
              <TodoItem
                key={index}
                checked={completed.includes(item.id)}
                onChange={handleChange}
                status={colors[item.priority]}
                id={item.id}
              >
                {item.name}
              </TodoItem>
            ))
          : "No items"}
      </div>
      <Form
        status={formStatus}
        close={closeForm}
        refetchItems={shoppingList.refetch}
      />
      <BottomNavbar
        openForm={() => setFormStatus("open")}
        handleAll={handleAll}
        checked={checkboxToClear}
        onDelete={handleDelete}
        SortColor={colors[filterIndex] || "gay"}
        onSort={onSort}
      />
    </div>
  );
}
