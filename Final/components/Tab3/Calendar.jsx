import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import './Calendar.css';

const Calendar = ({ selectedProfessor, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [availabilityMessage, setAvailabilityMessage] = useState('');

  const professorsData = [
    {
      professorId: '박승민',
      professorName:'박승민',
      availableTimes: {
        Monday: ['오전'],
        Tuesday: ['오후'],
        Wednesday: ['오전'],
        Thursday: ['오후'],
        Friday: ['오전', '오후'],
      },
    },
  ];

  useEffect(() => {
    const professorAvailability = professorsData.find((professor) => professor.professorId === selectedProfessor);

    if (professorAvailability) {
      setAvailableTimes(professorAvailability.availableTimes);
    }
  }, [selectedProfessor]);

  useEffect(() => {
    updateAvailabilityMessage();
  }, [availableTimes, selectedDate]);

  const handleDateChange = (date) => {
    console.log('선택한 날짜:', date);
    setSelectedDate(date);
    onDateSelect(date);
    setAvailabilityMessage(''); // 날짜 선택 시 메시지 초기화
    
  };

  const updateAvailabilityMessage = () => {
    const day = selectedDate.getDay();
    const dayString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];

    if (availableTimes && availableTimes[dayString]) {
      const timesForDay = availableTimes[dayString];
      const isMorningAvailable = timesForDay.includes('오전');
      const isAfternoonAvailable = timesForDay.includes('오후');

      if (isMorningAvailable && isAfternoonAvailable) {
        setAvailabilityMessage('상담 가능한 날짜입니다.');
      } else if (isMorningAvailable) {
        setAvailabilityMessage('오전에 상담 가능합니다.');
      } else if (isAfternoonAvailable) {
        setAvailabilityMessage('오후에 상담 가능합니다.');
      } else {
        setAvailabilityMessage('상담이 불가능한 날짜입니다.');
      }
    } else {
      setAvailabilityMessage('상담이 불가능한 날짜입니다.');
    }
  };

  return (
    <div className='Combine'>
      <DatePicker
        popperPlacement="auto"
        showPopperArrow={false}
        selected={selectedDate || null}
        onChange={(date) => {
          handleDateChange(date);
          onDateSelect(date);
        }}
      filterDate={(date) => {
        const isWeekend = date.getDay() !== 0 && date.getDay() !== 6;
      return isWeekend;
      }}  
        dateFormat="yyyy-MM-dd(eee)"
        locale={ko}
        showDisabledMonthNavigation
        disabledKeyboardNavigation
        isClearable={true}
        monthsShown={2}
        inline
        block
      />
      <div>{availabilityMessage}</div>
    </div>
  );
};

export default Calendar;
