import React, { useState } from "react";
import axios from "axios";

export default function CreateTodo(props) {
  const { addTodo } = props;

  const [newTodo, setNewTodo] = useState({
    name: "",
    due: "",
    details: "",
    id: 0,
  });

  const fSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/todos", {
        name: newTodo.name,
        due: newTodo.due,
        details: newTodo.details,
      })
      .then((res) => {
        setNewTodo({ ...newTodo, id: res.data.id });
      });

    addTodo(newTodo);
  };

  return (
    <form className="card p-3" onSubmit={fSubmit}>
      <h3 className="text-primary text-center">Create New Todo</h3>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name of Todo
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={newTodo.name}
          onChange={(e) => {
            setNewTodo({ ...newTodo, name: e.target.value });
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="due" className="form-label">
          Due Date
        </label>
        <input
          type="text"
          className="form-control"
          id="due"
          value={newTodo.due}
          onChange={(e) => {
            setNewTodo({ ...newTodo, due: e.target.value });
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="details" className="form-label">
          Details
        </label>
        <textarea
          className="form-control"
          id="details"
          rows="3"
          value={newTodo.details}
          onChange={(e) => {
            setNewTodo({ ...newTodo, details: e.target.value });
          }}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
}
