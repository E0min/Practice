import React, { useState } from "react";

const TodoList = ({ list, deleteTodoItem, updateTodoItem, toggleEditMode }) => {
  const [editContent, setEditContent] = useState("");

  const handleEditChange = (event) => {
    setEditContent(event.target.value);
  };

  const saveUpdate = (index) => {
    updateTodoItem(index, editContent);
    setEditContent("");
  };

  return (
    <div>
      {Array.isArray(list) &&
        list.map((item, index) => (
          <div key={index}>
            {item.isEditing ? (
              <>
                <input
                  type="text"
                  value={editContent}
                  onChange={handleEditChange}
                  placeholder={item.content}
                />
                <button onClick={() => saveUpdate(index)}>저장</button>
              </>
            ) : (
              <>
                {item.content}
                <button onClick={() => toggleEditMode(index)}>수정하기</button>
                <button onClick={() => deleteTodoItem(index)}>삭제하기</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default TodoList;
