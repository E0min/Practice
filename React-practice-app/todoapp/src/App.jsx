import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CreateTodoList from "./components/CreateTodoList";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodoItem = (content) => {
    setTodoList([...todoList, { content, isEditing: false }]);
  };

  const deleteTodoItem = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const updateTodoItem = (index, newContent) => {
    const updatedList = [...todoList];
    updatedList[index] = {
      ...updatedList[index],
      content: newContent,
      isEditing: false,
    };
    setTodoList(updatedList);
  };

  const toggleEditMode = (index) => {
    setTodoList(
      todoList.map((item, i) =>
        i === index ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  return (
    <>
      <Header /> {/* 현재 날짜와 시간을 표시 */}
      <CreateTodoList addTodoItem={addTodoItem} />
      <TodoList
        list={todoList}
        deleteTodoItem={deleteTodoItem}
        updateTodoItem={updateTodoItem}
        toggleEditMode={toggleEditMode}
      />
    </>
  );
}

export default App;
