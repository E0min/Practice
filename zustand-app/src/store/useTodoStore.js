import { create } from 'zustand';

let id = 0;
function getId() {
    return id++;
}

export const useTodoStore = create((set) => ({
    todos: [],
    addTodo: (text) => set((state) => ({
        todos: [
            ...state.todos,
            {
                id: getId(),
                text: text, // text 값 할당
                isCompleted: false,
            },
        ],
    })),
    deleteTodo: (todoId) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== todoId),
    })),
    completeTodo: (todoId) => set((state) => ({
        todos: state.todos.map((todo) => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    isCompleted: true,
                };
            }
            return todo;
        }),
    })),
}));
