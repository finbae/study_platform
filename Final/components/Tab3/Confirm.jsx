import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Confirm.css"

const Confirm = ({ onConfirm, summaryData:{selectedProfessor, selectedCategory, selectedTime, selectedDate} }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // 이메일 전송 로직
    const templateParams = {
      to_name:  selectedProfessor,  
      from_name:"수신자 이름",  
      message: `상담내용: ${selectedCategory}\n예약일시: ${selectedDate}\n시간대: ${selectedTime}`,
    };
    console.log(templateParams); 
    emailjs.send("ibo11419", "template_8wovaqf",templateParams, "-c4rHm3InglwajEan").then(
      
      (result) => {
        alert("성공적으로 이메일이 전송되었습니다.");

      },
      (error) => {
        console.log(error.text);
        alert("이메일이 전송이 실패되었습니다.");
      }
    );
  };

  return (
    <div className="check">
      <form ref={form} onSubmit={sendEmail}>
        <h2>발신</h2>
        <h3>교수: {selectedProfessor}</h3>
        <h3>내용: {selectedCategory}</h3>
        <h3>날짜: {selectedDate ? selectedDate.toDateString() : ''}</h3>
        <h3>시간대: {selectedTime}</h3>
        <div className="check_col">
        <button type="submit" onClick={sendEmail}>
          확인
        </button>
        </div>
      </form>
    </div>
  );
};

export default Confirm;
