import React, { useReducer, useRef, useCallback } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}
 
export type Todo = {
  id: number;
  text: string;
  checked: boolean;
}
type Todos = Todo[];
type TodoAction = 
{ type: 'INSERT'; payload: Todo; } 
| { type: 'REMOVE'; payload: number;}
| { type: 'TOGGLE'; payload: number;}

function todoReducer(todos: Todos, action: TodoAction) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.payload);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.payload);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  // 고윳값으로 사용될 id
  const nextId = useRef(4);
  const onInsert = useCallback( (text: string) => {
    const todo: Todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', payload: todo });
    nextId.current += 1;
  }, []);
  const onRemove = useCallback( (id: number) => {
    dispatch({ type: 'REMOVE', payload: id });
  }, []);
  const onToggle = useCallback( (id: number) => {
    dispatch({ type: 'TOGGLE', payload: id });
  }, []);
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
