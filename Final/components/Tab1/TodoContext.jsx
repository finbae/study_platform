// import React, { createContext, useReducer, useContext, useRef } from 'react';

// const TodoStateContext = createContext(null);
// const TodoDispatchContext = createContext(null);
// const TodoNextIdContext = createContext(null);

// function todoReducer(state, action) {
//   switch (action.type) {
//     case 'CREATE':
//       return state.concat(action.todo);
//     case 'TOGGLE':
//       return state.map(todo =>
//         todo.id === action.id ? { ...todo, done: !todo.done } : todo
//       );
//     case 'REMOVE':
//       return state.filter(todo => todo.id !== action.id);
//     default:
//       return state;
//   }
// }

// const initialTodos = [];

// export function TodoProvider({ children }) {
//   const [state, dispatch] = useReducer(todoReducer, initialTodos);
//   const nextId = useRef(0);

//   return (
//     <TodoStateContext.Provider value={state}>
//       <TodoDispatchContext.Provider value={dispatch}>
//         <TodoNextIdContext.Provider value={nextId}>
//           {children}
//         </TodoNextIdContext.Provider>
//       </TodoDispatchContext.Provider>
//     </TodoStateContext.Provider>
//   );
// }

// export function useTodoState() {
//   return useContext(TodoStateContext);
// }

// export function useTodoDispatch() {
//   return useContext(TodoDispatchContext);
// }

// export function useTodoNextId() {
//   return useContext(TodoNextIdContext);
// }


import React, { createContext, useReducer, useContext, useRef, useEffect } from 'react';

const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);
const TodoNextIdContext = createContext(null);

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

const initialTodos = [];

export function TodoProvider({ children, tabId }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos, (initial) => {
    const storedState = localStorage.getItem(`todos_${tabId}`);
    return storedState ? JSON.parse(storedState) : initial;
  });
  const nextId = useRef(0);

  useEffect(() => {
    localStorage.setItem(`todos_${tabId}`, JSON.stringify(state));
  }, [tabId, state]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
