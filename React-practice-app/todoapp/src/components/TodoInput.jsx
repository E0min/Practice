import { useRef } from "react";

const TodoInput = ({ onAddTodo }) => {
  const inputRef = useRef();

  const handleButtonClick = () => {
    onAddTodo(inputRef.current.value);
    inputRef.current.value = ""; // Clear input after adding
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="할 일을 입력하세요" />
      <button onClick={handleButtonClick}>할 일 추가</button>
    </div>
  );
};

export default TodoInput;
