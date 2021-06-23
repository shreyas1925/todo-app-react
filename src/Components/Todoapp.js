import React, { useState, useEffect } from "react";
import todo from "../images/shopping_cart.jpg";
import "../App.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

//   to set data from localstorage

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  // here i am getting just strings values

  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todoapp = () => {
  const [data, setdata] = useState("");

  const [items, setItems] = useState(getLocalItems());

  const [togglesubmit, setTogglesubmit] = useState(true);

  const [edit, setEdit] = useState(null);

  const addItem = () => {
    if (!data) {
      window.alert("Please fill the data");
    } else if (data && !togglesubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === edit) {
            return { ...elem, name: data };
          }
          return elem;
        })
      );

      setTogglesubmit(true);
      setdata("");
      setEdit(null);
    } else {
      // we are here updating our code

      const allInputdata = { id: new Date().getTime().toString(), name: data };
      setItems([...items, allInputdata]);
      setdata("");
    }
  };

  // delete the items
  const deleteItem = (index) => {
    console.log(index);
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateditems);
  };

  // update we have done edit item

  const editItem = (id) => {
    const newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setTogglesubmit(false);
    setdata(newEditItem.name);
    setEdit(id);
  };

  // remove all
  const removeAll = () => {
    setItems([]);
  };

  // add data or saving data to localStorage
  //   lists is my own key name
  // inorder pass only string using json

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <i class="fas fa-shopping-cart shopping"></i>

          <figure>
            {/* <img src={todo} alt="todologo" className="img-fluid" /> */}
            <figcaption>Add Your Shopping List Here 😁</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder=" Add products here"
              value={data}
              onChange={(e) => setdata(e.target.value)}
            />
            {togglesubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit add-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn ">
                    <i
                      className="far fa-edit test-class"
                      title="Edit Item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                  </div>
                  <div className="todo-btn">
                    <i
                      className="far fa-trash-alt test-class2"
                      title="Delete Item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* clear all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todoapp;
