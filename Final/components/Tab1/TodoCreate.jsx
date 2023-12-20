// TodoCreate.js
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from './TodoContext';
import './TodoCreate.css';

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    nextId.current += 1;
    setOpen(false);
    setValue('');
  };

  return (
    <>
      {open && (
        <div className="InsertFormPositioner">
          <form className="InsertForm" onSubmit={onSubmit}>
            <input
              className="Input"
              autoFocus
              onChange={onChange}
              value={value}
              placeholder="할 일을 입력 후, Enter 를 누르세요"
            />
          </form>
        </div>
      )}
      <button className={`CircleButton ${open ? 'open' : ''}`} onClick={onToggle}>
        <MdAdd />
      </button>
    </>
  );
}

export default React.memo(TodoCreate);
