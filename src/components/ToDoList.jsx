import React, { useState } from "react";
import delete_icon from "../assets/images/svg/delete_icon.svg";
import check_icon from "../assets/images/svg/check_icon.svg";
import green_check_icon from "../assets/images/svg/green_check_icon.svg";
import edit_icon from "../assets/images/png/editing.png";
import { Link } from "react-router-dom";
import CommonButton from "./CommonButton";

const ToDoList = () => {
 const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [originalText, setOriginalText] = useState("");

  const handleAddTodo = () => {
    if (inputData.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: inputData, completed: false },
      ]);
      setInputData("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    // Reset editingIndex if deleting the item being edited
    if (editingIndex === index) {
      setEditingIndex(null);
      setInputData("");
      setOriginalText("");
    }
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    // Check if the item is not completed before allowing editing
    if (!todos[index].completed) {
      setEditingIndex(index);
      setOriginalText(todos[index].text);
      // setInputData(todos[index].text);
    }
  };

  const handleUpdateTodo = () => {
    if (originalText.trim() !== "") {
      setTodos((prevTodos) => {
        return prevTodos.map((todo, index) => {
          if (index === editingIndex) {
            return { ...todo, text: `${originalText}` };
          }
          return todo;
        });
      });
      setEditingIndex(null);
      setInputData("");
      setOriginalText("");
    }
  };




  return (
    <>
         <div className="container"> <Link to='/'> <CommonButton
            linkButton={"Back"}
            className={"mb-4"}
          /></Link></div>
    <div className="min-vh-100 d-flex justify-content-center">
      <div className="container d-flex justify-content-center">
        <div className="todo_box">
          <h1 className="mb-4 pb-1 ff_poppins text-center">Todos</h1>
          <p className="fs_3xsm mb-2">Enter Todo</p>
          <div className="input_box w-100 d-flex justify-content-between align-items-center mb-4">
            <input
              className="border-0 w-100"
              type="text"
              placeholder="Learn html css"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button
              className="ff_poppins fw-semibold add_btn text-white fs-2xsm ms-3"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <div>
            {todos.map((todo, index) => (
              <div
                className="d-flex justify-content-between align-items-center mb-3 input_data_box"
                key={index}
              >
                {editingIndex === index ? (
                  <input
                    className="border-0 w-100"
                    type="text"
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                  />
                ) : (
                  <p
                    className={`fw-normal text_64748B ff_poppins mb-0 todo_max_w ${
                      todo.completed ? "completed text_CBD5E1 lh_100 " : ""
                    }`}
                  >
                    {todo.text}
                  </p>
                )}
                <div className="ms-4 d-flex">
                  <img
                    className="cursor_pointer"
                    src={delete_icon}
                    alt="delete_icon"
                    onClick={() => handleDeleteTodo(index)}
                  />
                  {todo.completed ? (
                    <img
                      className="ms-2 cursor_pointer"
                      src={green_check_icon}
                      alt="green_check_icon"
                      onClick={() => handleToggleComplete(index)}
                    />
                  ) : (
                    <img
                      className="ms-2 cursor_pointer"
                      src={check_icon}
                      alt="check_icon"
                      onClick={() => handleToggleComplete(index)}
                    />
                  )}
                  {editingIndex === index ? (
                    <button
                      className="ms-2 cursor_pointer ff_poppins fw-semibold add_btn text-white fs-2xsm"
                      onClick={handleUpdateTodo}
                    >
                      Update
                    </button>
                  ) : (
                    <>
                      <img
                        title="edit"
                        className="ms-2 cursor_pointer size"
                        src={edit_icon}
                        alt="edit_icon"
                        onClick={() => handleEditTodo(index)}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ToDoList;
