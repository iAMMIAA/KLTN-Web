import React, { useState } from 'react';
import './css/Setting.css';
import { faCircleHalfStroke, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useDarkMode } from './DarkModeContext';

function Setting() {
  const { darkMode, setDarkMode } = useDarkMode();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openStateEdit, setOpenStateEdit] = useState(false);
  const [updateFormProfile, setUpdateFormProfile] = useState({
    fullName: 'Le Phuong Thao',
    email: '21522608@gm.uit.edu.vn',
    school: 'UIT university',
    phonenumber: '0335739591',
    career: 'Student',
    gender: 'Female',
    country: 'Vietnam',
    city: 'Binh Dinh Province',
    areaCode: '0256'
  });
  
  const openDarkMode = () => {
    if(darkMode==false) setDarkMode(true);
    else setDarkMode(false);
  }
  const handleLanguageClick = () => {
    console.log('Clicked Chuyển đổi ngôn ngữ');
  };

  const handleDeleteAccountClick = () => {
    console.log('Clicked Xóa tài khoản');
    setShowConfirmation(true);
  };

  const handleConfirmDelete = (event) => {
    console.log('Confirmed account deletion');
    event.preventDefault();
    axios.delete(`http://localhost:3001/deleteAccount`, { data: { useremail: updateFormProfile.email } })
          .then(response => {
            console.log('Response: ', response.data);
            setOpenStateEdit(false);
          })
          .catch(error => {
            console.error('Loi cmnr: ', error);
          });
  };

  const handleCancelDelete = () => {
    console.log('Cancelled account deletion');
    setShowConfirmation(false);
  };
  return (
    <div className={`setting ${darkMode ? 'dark_mode' : ''}`}>
      <div className={`setting_theme`}>
        <span>Cài đặt trang web</span>
      </div>
      <div className={`setting_container`}>
        <div className="setting-switch">
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={openDarkMode} />
            <span className="slider"></span>
          </label>
          <span><FontAwesomeIcon icon={faCircleHalfStroke}/> Giao diện</span>
        </div>
        <div>
          <button onClick={handleLanguageClick} className="setting-button">
            <FontAwesomeIcon icon={faLanguage}/> Chuyển đổi ngôn ngữ
          </button>
        </div>
        <div>
          <button onClick={handleDeleteAccountClick} className="setting-button" style={{color: 'red'}}>
            Xóa tài khoản
          </button>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-container">
          <p>Bạn có chắc chắn muốn xóa tài khoản?</p>
          <button onClick={handleConfirmDelete}>OK</button>
          <button onClick={handleCancelDelete}>Hủy</button>
        </div>
      )}
      <div className='my_profile_btn_edit'>
        <button>Lưu</button>
      </div>
    </div>
  );
}

export default Setting;
