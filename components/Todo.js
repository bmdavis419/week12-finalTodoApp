import React, { useState } from "react";

export default function Todo(props) {
	const { todo, idx, removeTodo, updateTodo } = props;
	const [update, setUpdate] = useState(false);
	const [updatedTodo, setUpdatedTodo] = useState({ ...todo });

	const updateEvent = (e) => {
		e.preventDefault();

		if (!update) {
			setUpdate(true);
		} else {
			// update the todo in DB
			setUpdate(false);
			updateTodo(updatedTodo, idx);
		}
	};

	return (
		<div className="card my-2">
			<div className="card-body">
				<h5 className="card-title">{todo.name}</h5>
				<h6 className="card-subtitle mb-2 text-muted">{todo.due}</h6>
				<p className="card-text">{todo.details}</p>
				<form className={`${!update && "d-none"}`}>
					<h3 className="text-primary text-center">Update Todo</h3>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Name of Todo
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							value={updatedTodo.name}
							onChange={(e) => {
								setUpdatedTodo({ ...updatedTodo, name: e.target.value });
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
							value={updatedTodo.due}
							onChange={(e) => {
								setUpdatedTodo({ ...updatedTodo, due: e.target.value });
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
							value={updatedTodo.details}
							onChange={(e) => {
								setUpdatedTodo({ ...updatedTodo, details: e.target.value });
							}}
						></textarea>
					</div>
				</form>
				<button className="btn btn-info" onClick={updateEvent}>
					Update
				</button>
				<button
					className="btn btn-success"
					onClick={() => {
						removeTodo(idx);
					}}
				>
					Complete
				</button>
			</div>
		</div>
	);
}
