import {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "./api/apiSlice";
import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const { data } = useGetTodosQuery();
  const [todo, setTodo] = useState("");
  // isedit
  const [newedit, setnewedit] = useState("");
  // edit
  const [edit, setedit] = useState("");

  const [addTodo] = usePostTodoMutation();
  const [DeleteTodo] = useDeleteTodoMutation();
  const [UpdateTodo] = useUpdateTodoMutation();

  const handlesubmit = (e) => {
    if (todo !== "") {
      e.preventDefault();
      addTodo({ userId: 1, title: todo, completed: false });
      setTodo("");
    }
  };

  const handlesave = (e) => {
    if (newedit !== "") {
      e.preventDefault();
      UpdateTodo({ userId: 1, id: edit.id, title: newedit, completed: false });
      setnewedit("");
      setedit("");
    }
  };

  return (
    <div className="App">
      <div className="addform">
        {/* add */}
        <input
          type="text"
          value={edit ? (newedit ? newedit : edit.title) : todo}
          onChange={
            edit
              ? (e) => setnewedit(e.target.value)
              : (e) => setTodo(e.target.value)
          }
          placeholder={edit ? "update..." : "add..."}
        ></input>
        <button
          className={edit ? "Editbtn" : "submitbtn"}
          onClick={edit ? handlesave : handlesubmit}
        >
          {edit ? "save" : "add"}
        </button>
      </div>

      <header className="App-header">
        {data?.map((todo) => (
          <div key={todo.id}>
            <div className={todo.completed ? "box2" : "box"}>
              <div className="title">
                <h3>{todo.id}</h3>
                <h3>{todo.title}</h3>
              </div>
              <div className="btn">
                <button
                  onClick={() => DeleteTodo({ id: todo.id })}
                  className="delete"
                >
                  Delete
                </button>
                <button onClick={() => setedit(todo)} className="Edit">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
