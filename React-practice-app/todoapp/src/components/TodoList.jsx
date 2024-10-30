import React, { useState } from "react";

const TodoList = ({ todoList, onDeleteTodo, onUpdateTodo, onToggleEdit }) => {
  const [editContent, setEditContent] = useState("");

  const handleEditChange = (event) => {
    setEditContent(event.target.value);
  };

  const handleSaveUpdate = (index) => {
    onUpdateTodo(index, editContent); // Update todo item content
    setEditContent(""); // Reset edit content input
  };

  return (
    <div>
      {Array.isArray(todoList) &&
        todoList.map((item, index) => (
          <div key={index}>
            {item.isEditing ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={handleEditChange}
                  placeholder={item.content}
                />
                <button onClick={() => handleSaveUpdate(index)}>저장</button>
              </>
            ) : (
              <>
                {item.content}
                <button onClick={() => onToggleEdit(index)}>수정하기</button>
                <button onClick={() => onDeleteTodo(index)}>삭제하기</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default TodoList;
