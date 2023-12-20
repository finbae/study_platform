import React from 'react';
import { useTodoState } from './TodoContext';
import './TodoHead.css';

function TodoHead() {
  const today = new Date();

  const dateString = today.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dayName = today.toLocaleString('ko-KR', { weekday: 'long' });
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);

  return (
    <div className="TodoHeadBlock">
      <h2>{dateString}</h2>
      <h2>{dayName}</h2>
      <div className="TasksLeft"> 
      <h2>할 일 {undoneTasks.length}개</h2>

      </div>
    </div>
  );
}

export default TodoHead;
