import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  // State for managing the list of todos
  const [todoList, setTodoList] = useState([]);

  // Handler to add a new todo item
  const handleAddTodo = (content) => {
    setTodoList([...todoList, { content, isEditing: false }]);
  };

  // Handler to delete a todo item by index
  const handleDeleteTodo = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  // Handler to update the content of a todo item
  const handleUpdateTodo = (index, newContent) => {
    const updatedList = [...todoList];
    updatedList[index] = {
      ...updatedList[index],
      content: newContent,
      isEditing: false,
    };
    setTodoList(updatedList);
  };

  // Handler to toggle the edit mode for a todo item
  const handleToggleEdit = (index) => {
    setTodoList(
      todoList.map((item, i) =>
        i === index ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  return (
    <>
      <Header /> {/* Display current date */}
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoList
        todoList={todoList}
        onDeleteTodo={handleDeleteTodo}
        onUpdateTodo={handleUpdateTodo}
        onToggleEdit={handleToggleEdit}
      />
    </>
  );
}

export default App;
