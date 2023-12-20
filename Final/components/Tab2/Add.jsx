import React, { useEffect } from 'react';import DrawingMemoApp from './DrawingMemoApp';
import AudioRecord from './AudioRecord';
import './Add.css';
import { setPageTitle } from '../../../util';


const Tab2Content = () => {

  useEffect(()=>{
    setPageTitle("메모장")
  },[]);

  return (
    <div className='Memopage'>
      <AudioRecord></AudioRecord>
      <DrawingMemoApp></DrawingMemoApp>
    </div>
  );
};

export default Tab2Content;


