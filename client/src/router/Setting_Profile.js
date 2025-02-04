import React, { useEffect, useState } from 'react';
import './css/Setting_Profile.css';
import { Link, Route, Routes } from 'react-router-dom';
import MyProfile from './MyProfile';
import Setting from './Setting';
import { useDarkMode } from './DarkModeContext';

function Setting_Profile() {
  const { darkMode } = useDarkMode();
  const [openSetting, setOpenSetting] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const openTabSetting = () =>{
    setOpenSetting(true);
    setOpenProfile(false);
  }
  const openTabProfile = () =>{
    setOpenSetting(false);
    setOpenProfile(true);
  }

  useEffect(() => {
    const pathname = window.location.pathname;
    switch (pathname) {
      case '/setting_profile':
        setOpenProfile(true);
        setOpenSetting(false);
        break;
      case '/setting_profile/setting':
        setOpenSetting(true);
        setOpenProfile(false);
      default:
        break;
    }})

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`setting_profile`}>
      <div className={`left_setting_profile ${darkMode ? 'dark_mode':''}`}>
        <Link className={`render_profile ${openProfile ? 'open':''} ${darkMode ? 'dark_mode':''}`} to='/setting_profile' onClick={openTabProfile}>
          <span>Thông tin cá nhân</span>
        </Link>
        <Link className={`render_setting ${openSetting ? 'open':''} ${darkMode ? 'dark_mode':''}`} to='/setting_profile/setting' onClick={openTabSetting}>
          <span>Cài đặt</span>
        </Link>
      </div>

      <div className={`right_setting_profile ${darkMode ? 'dark_mode':''}`}>
        <Routes>
          <Route path='/' element={<MyProfile/>} />
          <Route path='/setting' element={<Setting/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Setting_Profile;