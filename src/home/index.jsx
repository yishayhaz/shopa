import React, { useState, useEffect } from "react";
import Form from "../form";
import BottomNavbar from "./parts/BottomNavbar";
import Header from "../Header";
import TodoItem from "./parts/TodoItem";
import styles from "./style.module.css";
import { useQuery } from "react-query";
import { GET, DELETE } from "../API";

const colors = ["danger", "medium", "success", "lightblue", "purple", "pink"];

export default function HomePage() {
  const [formStatus, setFormStatus] = useState("closed");
  const [completed, setCompleted] = useState([]);
  const [checkboxToClear, setCheckboxToClear] = useState(false);
  const [filterIndex, setFilterIndex] = useState(colors.length);

  const toggleForm = () =>
    setFormStatus((formState) => (formState === "closed" ? "open" : "closed"));

  const getShoppingList = () =>
    GET("/shopping-list").then((res) => res.data.list);

  const shoppingList = useQuery("shopping-list", getShoppingList);

  const getFilteredList = (list = [], index) =>
    [...list].filter((item) => {
      if (index === colors.length) return item;
      if (item.priority === index) return item;
      return null;
    });

  const handleCheck = (e) => {
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

  const handleCheckAll = () => {
    if (!completed.length) {
      setCompleted(
        getFilteredList(shoppingList.data.items, filterIndex).map(
          (item) => item.id
        )
      );
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

  const handleSetFilter = (action = 1, newFilterIndex) => {
    newFilterIndex = newFilterIndex ?? filterIndex;

    if (action === 1) {
      if (newFilterIndex < colors.length) {
        newFilterIndex++;
      } else newFilterIndex = 0;
    } else if (action === -1) {
      if (newFilterIndex > 0) {
        newFilterIndex--;
      } else newFilterIndex = colors.length;
    }

    if (
      newFilterIndex === colors.length ||
      getFilteredList(shoppingList.data.items, newFilterIndex).length
    ) {
      return setFilterIndex(newFilterIndex);
    } else {
      return handleSetFilter(action, newFilterIndex);
    }
  };

  return (
    <div dir={localStorage.getItem("dir") || "ltr"}>
      <Header />
      <div className={styles.Container}>
        {shoppingList.data?.items?.length
          ? getFilteredList(shoppingList.data.items, filterIndex).map(
              (item, index) => (
                <TodoItem
                  key={index}
                  checked={completed.includes(item.id)}
                  onChange={handleCheck}
                  status={colors[item.priority]}
                  id={item.id}
                >
                  {item.name}
                </TodoItem>
              )
            )
          : "No items"}
      </div>
      <Form
        status={formStatus}
        close={toggleForm}
        refetchItems={shoppingList.refetch}
        defaultColorIndex={filterIndex}
      />
      <BottomNavbar
        openForm={() => setFormStatus("open")}
        handleCheckAll={handleCheckAll}
        checked={checkboxToClear}
        onDelete={handleDelete}
        SortColor={colors[filterIndex] || "gay"}
        setFilter={handleSetFilter}
      />
    </div>
  );
}
