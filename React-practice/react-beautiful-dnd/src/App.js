import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // @hello-pangea/dnd로 변경

// 항목 데이터
const initialItems = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' },
  { id: 'item-4', content: 'Item 4' },
];

const App = () => {
  const [items, setItems] = useState(initialItems);

  // 드래그 종료 시 호출되는 함수
  const onDragEnd = (result) => {
    const { destination, source } = result;

    // 드롭 위치가 없으면 종료
    if (!destination) return;

    // 같은 위치로 드래그하면 종료
    if (destination.index === source.index) return;

    // 항목을 재배치
    const newItems = Array.from(items);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);

    setItems(newItems); // 상태 업데이트
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              minHeight: '200px',
              backgroundColor: '#f9f9f9',
              position: 'relative', // 추가: 드래그 영역을 확실히 지정
            }}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      padding: '10px',
                      margin: '5px 0',
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      position: 'relative', // 추가: 드래그 아이템을 위치를 상대적으로 지정
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder} {/* 드래그 할 때 영역을 확보해준다 */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
