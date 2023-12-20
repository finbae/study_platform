import React, { useState } from 'react';
import './Header.css';

const Header = ({ onProfessorSelect }) => {
  const [selectedProfessor, setSelectedProfessor] = useState('proA');
  

  const handleProfessorClick = (professor) => {
  onProfessorSelect(professor);
    setSelectedProfessor(professor);
  };

  const professors = [
    {
      id: "박승민",
      name: "박승민",
      "email": "ibo11419909@gmail.com",
      availableTimes: {
        "Monday": ["오전"],
        "Tuesday": ["오후"],
        "Wednesday": ["오전"],
        "Thursday": ["오후"],
        "Friday": ["오전", "오후"]
      }
    },
    { id: 'proB', name: '김요한' ,
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
    { id: 'proC', name: '고관표' ,
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
    { id: 'proD' ,name:'최봉준',
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
    { id: 'proE' ,name:'문미경',
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
    { id: 'proF' ,name:'김선용',
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
    { id: 'proG' ,name:'김동현',
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
    { id: 'proO' ,name:'조대수',
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
    { id: 'proR' ,name:'최유정',
    "email": "ibo11419909@gmail.com",
    availableTimes: {
      "Monday": ["오전"],
      "Tuesday": ["오후"],
      "Wednesday": ["오전"],
      "Thursday": ["오후"],
      "Friday": ["오전", "오후"]
    }},
  ];

  return (
    <header className="header">
      <div className="title-name">

      </div>
      <nav className="list-navigation">
        <h2>교수님</h2>
        <ul className="professorList">
          {professors.map((professor) => (
            <li key={professor.id}>
              <a
                href=""
                className={`${professor.id} ${selectedProfessor === professor.name ? 'pick' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleProfessorClick(professor.name);
                }}
              >
                {professor.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
