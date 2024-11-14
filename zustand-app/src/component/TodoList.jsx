import React, { useState } from "react";
import { useTodoStore } from "../store/useTodoStore"; // 커스텀 훅 파일 위치에 따라 경로 수정 필요

export default function TodoList() {
  const [todoValue, setTodoValue] = useState("");
  const { todos, addTodo, deleteTodo, completeTodo } = useTodoStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todoValue);
    setTodoValue("");
  };

  return (
    <div>
      <h3>Todo App</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo"
          name="newTodo"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.text}{" "}
            </span>
            {!todo.isCompleted && (
              <button onClick={() => completeTodo(todo.id)}>v</button>
            )}
            <button onClick={() => deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
