// TodoItem.js
import React from 'react';
import { useTodoDispatch } from './TodoContext';
import { MdDone, MdDelete } from 'react-icons/md';
import './TodoItem.css';

function TodoItem({ id, done, text, createdDate }) {
  const dispatch = useTodoDispatch();

  const onToggle = () => {
    dispatch({
      type: 'TOGGLE',
      id,
    });
  };

  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  };

  return (
    <div className="TodoItemBlock">
      <div className={`CheckCircle ${done ? 'done' : ''}`} onClick={onToggle}>
      {done && <MdDone />}
        
      </div>
      <div className={`Text ${done ? 'done' : ''}`}>{text}</div>
      <div className="Remove" onClick={onRemove}>
        <MdDelete />
      </div>
    </div>
  );
}

export default React.memo(TodoItem);
