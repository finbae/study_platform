import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { saveAs } from 'file-saver';
import './DrawingMemoApp.css';
import { MdAdd } from 'react-icons/md';
import { FaPen } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";

function DrawingMemoApp() {
  // const [memos, setMemos] = useState([]);
  // const [currentMemo, setCurrentMemo] = useState({ title: '', content: '' });
  // const [editingIndex, setEditingIndex] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const initialMemos = JSON.parse(localStorage.getItem('memos')) || [];
  const [memos, setMemos] = useState(initialMemos);
  const [currentMemo, setCurrentMemo] = useState({ title: '', content: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect를 사용하여 memos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);


  const saveMemoAsTxtFile = (index) => {
    const memo = memos[index];
    const memoContent = `제목: ${memo.title}\n내용: ${memo.content}`;
    const blob = new Blob([memoContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `memo_${index + 1}.txt`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addMemo = () => {
    setMemos([...memos, currentMemo]);
    closeModal();
    setCurrentMemo({ title: '', content: '' }); // 새 메모를 추가한 후 입력 필드 초기화
  };

  const updateMemo = (index) => {
    setEditingIndex(index);
    setCurrentMemo(memos[index]);
    openModal();
  };

  const saveUpdatedMemo = () => {
    const updatedMemos = [...memos];
    updatedMemos[editingIndex] = currentMemo;
    setMemos(updatedMemos);
    setEditingIndex(null);
    closeModal();
  };

  const deleteMemo = (index) => {
    const updatedMemos = [...memos];
    updatedMemos.splice(index, 1);
    setMemos(updatedMemos);
  };

  return (
    <div>
      <button className='plus' onClick={openModal}><MdAdd /></button>
      <div className='list'>
      <ul>
        {memos.map((memo, index) => (
          <li key={index}>
            <div className='Memobox'>
              <div className="memo">              
              <h2>{memo.title}</h2>
              <p>{memo.content}</p></div>
              
              <div className="buttonBox">
              <button className='revise' title='수정' onClick={() => updateMemo(index)}><FaPen size="35"/></button>
              <button className='delete' title='삭제' onClick={() => deleteMemo(index)}><RiDeleteBin5Fill /></button>
              <button className='save' title='파일로 저장' onClick={() => saveMemoAsTxtFile(index)}><MdOutlineFileDownload size="50"/></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
      

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="conmemo">
          <h2 className='title'>MEMO</h2>
        <input 
          type="text"
          placeholder="제목"
          value={currentMemo.title}
          onChange={(e) => setCurrentMemo({ ...currentMemo, title: e.target.value })}
        />
        <textarea
          placeholder="내용"
          value={currentMemo.content}
          onChange={(e) => setCurrentMemo({ ...currentMemo, content: e.target.value })}
        />
        {editingIndex === null ? (
          <button onClick={addMemo}><MdAdd /></button>
        ) : (
          <button onClick={saveUpdatedMemo}><FaPen /></button>
        )}</div>
        
      </Modal>
    </div>
  );
}

export default DrawingMemoApp;


