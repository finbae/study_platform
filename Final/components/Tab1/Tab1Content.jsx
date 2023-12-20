// import React from 'react';
// import { createGlobalStyle } from 'styled-components';
// import TodoTemplate from './TodoTemplate';
// import TodoHead from './TodoHead';
// import TodoList from './TodoList';
// import TodoCreate from './TodoCreate';
// import { TodoProvider } from './TodoContext';

// const GlobalStyle = createGlobalStyle`
//   body {
//     background: #e9ecef;
//   }
// `;

// const Tab1Content = () => {
//   return (
//     <TodoProvider>
//       <GlobalStyle />
//       <TodoTemplate>
//         <TodoHead />
//         <TodoList />
//         <TodoCreate />
//       </TodoTemplate>
//     </TodoProvider>
//   );
// };

// export default Tab1Content;



import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './TodoTemplate';
import TodoHead from './TodoHead';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import { TodoProvider } from './TodoContext';
import { setPageTitle } from '../../../util';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

const Tab1Content = () => {

  useEffect(()=>{
    setPageTitle("Todolist")
  },[]);
  
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
};

export default Tab1Content;
