import Todo from "../components/Todo";
import CreateTodo from "../components/CreateTodo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => setTodos([...todos, todo]);

  const { user, error, isLoading } = useUser();

  const removeTodo = (idx) => {
    let curTodos = todos;
    let removed = curTodos.splice(idx, 1);
    setTodos([...curTodos]);

    // send to DB
    axios.delete(`/api/todos/delete/${removed[0].id}`).then((res) => {
      alert("Deleted Todo");
    });
  };

  const updateTodo = (newContent, idx) => {
    let curTodos = todos;
    curTodos.splice(idx, 1, newContent);
    setTodos([...curTodos]);

    // send to DB
    axios
      .post(`/api/todos/update/${newContent.id}`, {
        name: newContent.name,
        due: newContent.due,
        details: newContent.details,
      })
      .then((res) => {
        alert("Updated Todo");
      });
  };

  useEffect(() => {
    if (user) {
      axios.get("/api/todos").then((res) => {
        let idx = 0;
        let items = [];
        while (idx in res.data) {
          items.push(res.data[idx]);
          idx++;
        }
        items.sort((a, b) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
        setTodos([...items]);
      });
    }
  }, [user]);

  if (error) return <div>error</div>;
  if (isLoading) return <div>Loading...</div>;
  if (user) {
    return (
      <div>
        <h1 className="text-primary text-center">Final Todo App</h1>
        <div className="container">
          {todos.map((todo, idx) => {
            return (
              <Todo
                todo={todo}
                idx={idx}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                key={idx}
              />
            );
          })}
          <CreateTodo addTodo={addTodo} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-primary">Please Login</h1>
        <Link href="/api/auth/login">
          <a className="btn btn-primary">login</a>
        </Link>
      </div>
    );
  }
}
