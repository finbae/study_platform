import React from 'react';
import TodoItem from './TodoItem';
import { useTodoState } from './TodoContext';
import './TodoList.css';

function TodoList() {
  const todos = useTodoState();
  return (
    <div className="TodoListBlock">
      {todos.map((todo) => (
        <TodoItem id={todo.id} 
                  text={todo.text} 
                  done={todo.done}  
                  key={todo.id} />
      ))}
    </div>
  );
}

export default TodoList;
