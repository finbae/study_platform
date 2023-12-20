import React, { useState, useEffect } from 'react';
import Header from './Header';
import Contents from './Contents';
import Confirm from './Confirm';
import { setPageTitle } from '../../../util';
import './Combine.css';

const Combine = () => {

  useEffect(()=>{
    setPageTitle("예약")
  },[]);

  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleProfessorSelect = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleConfirm = () => {
    // 예약 확인 로직 구현
    console.log(`예약 확인 - 교수: ${selectedProfessor}, 날짜: ${selectedDate}, 시간: ${selectedTime}`);
    // 예약 확인 후 상태 초기화 또는 다른 동작 수행
    setSelectedProfessor('');
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className='Combine'>
      <Header onProfessorSelect={handleProfessorSelect} />
      <Contents
        selectedProfessor={selectedProfessor}
        onDateSelect={handleDateSelect}
        onTimeSelect={handleTimeSelect}
        onCategorySelect={handleCategorySelect}
      />
      <Confirm onConfirm={handleConfirm} summaryData={{ selectedProfessor,selectedCategory ,selectedTime,selectedDate}} />
    </div>
  );
};

export default Combine;
