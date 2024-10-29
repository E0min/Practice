import { useRef } from "react";

const CreateTodoList = ({ addTodoItem }) => {
  const inputRef = useRef();

  const handleButtonClick = () => {
    addTodoItem(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="할 일을 입력하세요" />
      <button onClick={handleButtonClick}>할 일 추가</button>
    </div>
  );
};

export default CreateTodoList;
