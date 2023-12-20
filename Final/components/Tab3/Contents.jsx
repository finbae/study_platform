import React, { useState } from 'react';
import Calendar from './Calendar';
import './Contents.css';

const Contents = ({ selectedProfessor, onDateSelect, onTimeSelect, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [etcEnabled, setEtcEnabled] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    if (category === 'select04') {
      setEtcEnabled(!etcEnabled);
      if (!etcEnabled) {
        setEmail('');
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // 상태를 다른 용도로 활용하거나 상위 컴포넌트로 전달할 수 있음
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="section">
      <div className="content">
        <div className="consult-con">
          <h2>상담내용</h2>
          <ul className="consult-list">
            <li>
              <a className={`진로 ${selectedCategory === '진로' ? 'show' : ''}`} onClick={() => handleCategoryClick('진로')}>
                진로
              </a>
            </li>
            <li>
              <a className={`학업 ${selectedCategory === '학업' ? 'show' : ''}`} onClick={() => handleCategoryClick('학업')}>
                학업
              </a>
            </li>
            <li>
              <a className={`개인사유 ${selectedCategory === '개인사유' ? 'show' : ''}`} onClick={() => handleCategoryClick('개인사유')}>
                개인사유
              </a>
            </li>
            <li>
              <a className={`기타 ${selectedCategory === '기타' ? 'show' : ''}`} onClick={() => handleCategoryClick('기타')}>
                기타
                <input className="select05" type="text" disabled={!etcEnabled} placeholder="기타를 선택하고 입력해주세요." value={email} onChange={handleEmailChange} />
              </a>
              
            </li>
          </ul>
        </div>
        <div className="select-day">
          <h2>상담 날짜 및 시간</h2>
          <p>오전은 10시부터 12시, 오후는 2시부터 4시까지 상담시간입니다.</p>
          <div>
            <Calendar selectedProfessor={selectedProfessor} onDateSelect={handleDateSelect} />
          </div>
          {selectedTime && (
            <div className="selected-time">

              <p>선택한 시간: {selectedTime}</p>
            </div>
          )}
          <div className="select-con">
            <div className="time">
              <button onClick={() => handleTimeSelect('오전')}>오전</button>
              <button onClick={() => handleTimeSelect('오후')}>오후</button>
            </div>
            <div className="emailForm">
              <h2>이메일 입력  </h2>
              <input className="emailCon" type="email" placeholder="상담 확정 메일을 받을 주소를 입력해주세요." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents;
