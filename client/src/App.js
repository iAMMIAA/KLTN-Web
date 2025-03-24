import { faCapsules, faPenNib, faCircle, faBars, faForward, faBackward, faHome, faCommentMedical, faBell, faSearch, faGear, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import picRound from './router/pictures/round.png';
import username from './router/pictures/user.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './LogIn-SignUp/SignUp';
import LogIn from './LogIn-SignUp/LogIn';
import Setting_Profile from './router/Setting_Profile';
import Exchange from './router/Exchange';
import LookUp from './router/LookUp';
import Home from './router/Home';
import Detection from './router/Detection';
import SeeNotification from './router/SeeNotification';
import WritePaper from './router/WritePaper';
import WriteInfoDrug from './router/WriteInfoDrug';
import NoUser from './router/NoUser';
import Paper from './router/paper/paper2';
import logo from './logo/icon1.png'
import Setting from './router/Setting';
import axios from 'axios';
import './css/App.css'; 
import {Avatar} from "@mui/material";
import { useDarkMode } from './router/DarkModeContext';

const BASE_URL = process.env.URL_CONNECT_SERVER;

function App() {
  const { darkMode } = useDarkMode(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [fixPositionScroll, setFixPositionScroll] = useState();
  const [fullName, setFullName] = useState('Username');
  const [userName, setUserName] = useState('');
  const [admin, setAdmin] = useState(false);
  const [haveNotif, setHaveNotif] = useState(false);
  const [listNotif, setListNotif] = useState([]);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenHome, setIsOpenHome] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isOpenExchange, setIsOpenExchange] = useState(false);
  const [isOpenDetection, setIsOpenDetection] = useState(false);
  const [isOpenLookUp, setIsOpenLookUp] = useState(false);
  const [isOpenWritePaper, setIsOpenWritePaper] = useState(false);
  const [isOpenWriteInfoDrug, setIsOpenWriteInfoDrug] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [noShowLogIn, setShowLogIn] = useState(false);
  const [noShowSignUp, setShowSignUp] = useState(false);
  const [openSeeNotification, setOpenSeeNotification] = useState(false);
  const [dataSeeNotification, setDataSeeNotification] = useState([]);
  const [idCmt, setIdCmt] = useState('');

  const openSection = (section) => {
    setIsOpenHome(section === 'home');
    setIsOpenExchange(section === 'exchange');
    setIsOpenDetection(section === 'detection');
    setIsOpenLookUp(section === 'lookup');
    setIsOpenSetting(section === 'setting');
    setIsOpenWritePaper(section === 'writePaper');
    setIsOpenWriteInfoDrug(section === 'writeInfoDrug');
  };

  const handleFixPositionScroll = () => {
    setFixPositionScroll(window.scrollY > 0);
  };

  const toggleState = (stateSetter, currentState) => {
    stateSetter(!currentState);
  };

  const openNotification = () => toggleState(setIsOpenNotification, isOpenNotification);
  const openDropDown = () => toggleState(setIsOpenDropDown, isOpenDropDown);
  const openLeftIconMove = () => toggleState(setIsSidebarCollapsed, isSidebarCollapsed);
  const openMenuByBar = () => toggleState(setIsOpenMenu, isOpenMenu);

  useEffect(() => {
    const pathname = window.location.pathname;
    switch (pathname) {
      case '/':
        openSection('home');
        break;
      case '/exchange':
        openSection('exchange');
        break;
      case '/detect':
        openSection('detection');
        break;
      case '/lookup':
        openSection('lookup');
        break;
      case '/setting_profile':
        openSection('setting');
        break;
      case '/write_paper':
        openSection('writePaper');
        break;
      case '/write_info_drug':
        openSection('writeInfoDrug');
        break;
      default:
        break;
    }

    window.addEventListener('scroll', handleFixPositionScroll);

    return () => {
      window.removeEventListener('scroll', handleFixPositionScroll);
    };
  }, []);

  const setShowLogInForm = () => {
    setShowLogIn(true);
    setShowSignUp(false);
  }
  const setShowSignUpForm = () => {
    setShowSignUp(true);
    setShowLogIn(false);
  }
  const logIn = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, formData);
        const { message, token, idUser, adminUser } = response.data;

        if (message === 'Success' && token) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', token);
            localStorage.setItem('idUser', idUser);
            alert('Đăng nhập thành công');
            window.location.href = 'http://localhost:3000';
            axios.defaults.headers.common.Authorization = `${token}`;
        } else {
            alert('Đăng nhập thất bại!');
            window.location.href = 'http://localhost:3000';
        }
    } catch (error) {
        alert('Đăng nhập thất bại!');
        window.location.href = 'http://localhost:3000';
        console.error("Error while fetching result: ", error);
    }
  };
  const requestSignUp = async (formSignUp) => {
    try{
        const response = await axios.post(`${BASE_URL}/signup`, formSignUp)
        const { message } = response.data;
        
        if(message === 'Success') {
            alert("Đăng ký thành công! Vui lòng đăng nhập lại.");
            setShowSignUp(false);
            window.location.href = 'http://localhost:3000';
        } else if(message === 'Existed') {
            alert('Tên người dùng hoặc email đã tồn tại!');
            window.location.href = 'http://localhost:3000';
        }
    } catch (error) {
      alert('Tên người dùng hoặc email đã tồn tại!');
      window.location.href = 'http://localhost:3000';
    }
  };
  const logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
    // Tải lại trang
    window.location.href = 'http://localhost:3000/';
  }
  const see_notication = (id) => {
    axios.get(`${BASE_URL}/see_notication/${id}`)
        .then(response => {
          const data = response.data;
          setDataSeeNotification(data);
        })
        .catch(error => {console.error("There was an error fetching the notification data!", error);});
    setIsOpenNotification(false)
    setOpenSeeNotification(true);
    setIdCmt(id);
  }
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);

      axios.get(`${BASE_URL}/user/${localStorage.getItem('idUser')}`)
      .then(response => {
        const infoUser = response.data;
        setUserName(infoUser.username);
        setFullName(infoUser.fullName);
        if(infoUser.adminUser === 1) setAdmin(true);
      })
      .catch(error => {console.error('error: ', error);})

      axios.get(`${BASE_URL}/notification/${localStorage.getItem('idUser')}`)
      .then(response => {
        const notif = response.data;
        if(notif.length > 0) {
          setListNotif(notif);
          setHaveNotif(true);
        } else {
          setListNotif('');
          setHaveNotif(false);
        }
      })
      .catch(error => {console.error('error: ', error);})
    }
  }, []);

  return (
    <div className={`drug_web ${darkMode ? 'dark_mode':''}`}>
      {noShowLogIn && (<LogIn onSubmit={logIn} closeLogIn={()=>setShowLogIn(false)} openSignUp={setShowSignUpForm}/>)}
      {noShowSignUp && (<SignUp onSubmit={requestSignUp} closeSignUp={()=>setShowSignUp(false)} openLogIn={setShowLogInForm}/>)}
      {openSeeNotification && (<SeeNotification idCmt={idCmt} data={dataSeeNotification} closeSeeNotification={() => setOpenSeeNotification(false)}/>)}
      <div className="container_web">
          <div className={`layout_left ${isSidebarCollapsed ? 'active' : ''}`}>
            <div className={`left_first ${isSidebarCollapsed ? 'active' : ''} ${isOpenMenu ? 'open_by_bar':''}`}>
              <div className="header_menu">
                <div className='logo_web'>
                  <img src={logo}></img>
                </div>
              </div>
              <div className="list_menu">
                  <ul>
                    <li><Link to='/' onClick={() => openSection('home')}>
                      <FontAwesomeIcon icon={faHome} className='icon_left'/></Link></li>
                    <li><Link to='/exchange' onClick={() => openSection('exchange')}>
                      <FontAwesomeIcon icon={faCommentMedical} className='icon_left'/></Link></li>
                    <li><Link to='/detect' onClick={() => openSection('detection')}>
                      <FontAwesomeIcon icon={faCapsules} className='icon_left'/></Link></li>
                    <li><Link to='/lookup' onClick={() => openSection('lookup')}>
                      <FontAwesomeIcon icon={faSearch} className='icon_left'/></Link></li>
                    <li><Link to='/setting_profile' onClick={() => openSection('setting')}>
                      <FontAwesomeIcon icon={faGear} className='icon_left'/></Link></li>
                      
                    {admin && (
                      <div className='admin'>
                        <li><Link to='/write_paper' onClick={() => openSection('writePaper')}>
                          <FontAwesomeIcon icon={faPenNib} className='icon_left'/></Link>
                        </li>
                        <li><Link to='/write_info_drug' onClick={() => openSection('writeInfoDrug')}>
                          <FontAwesomeIcon icon={faPenNib} className='icon_left'/></Link>
                        </li>
                      </div>
                    )}  
                    
                  </ul>
              </div>
              <div className='logout'>
                <Link onClick={logOut} className='link_logout'>
                  <FontAwesomeIcon icon={faRightFromBracket} className='icon_logout'/>
                </Link>
              </div>
            </div>
            <div className={`left_container ${isSidebarCollapsed ? 'active': ''} ${isOpenMenu ? 'open_by_bar':''}`}>
              <div className="header_menu">
                <FontAwesomeIcon className={`icon_bars2 ${isOpenMenu ? 'open_by_bar':''}`} icon={faBars} onClick={openMenuByBar}/>
                <span>SM.DrugBank</span>
              </div>
              <div className="list_menu">
                  <ul>
                    <li className={`itemMenu ${isOpenHome ? 'active' : ''} ${darkMode ? 'dark_mode':''}`}>
                      <Link className='text_left' to='/' onClick={() => openSection('home')}><span>TRANG CHỦ</span></Link>
                    </li>
                    <li className={`itemMenu ${isOpenExchange ? 'active' : ''} ${darkMode ? 'dark_mode':''}`}>
                      <Link className='text_left' to='/exchange' onClick={() => openSection('exchange')}><span>DIỄN ĐÀN</span></Link>
                    </li>
                    <li className={`itemMenu ${isOpenDetection? 'active' : ''} ${darkMode ? 'dark_mode':''}`}>
                      <Link className='text_left' to='/detect' onClick={() => openSection('detection')}><span>DETECTION</span></Link>
                    </li>
                    <li className={`itemMenu ${isOpenLookUp ? 'active' : ''} ${darkMode ? 'dark_mode':''}`}>
                      <Link className='text_left' to='/lookup' onClick={() => openSection('lookup')}><span>TRA CỨU</span></Link>
                    </li>
                    <li className={`itemMenu ${isOpenSetting ? 'active' : ''} ${darkMode ? 'dark_mode':''}` }>
                      <Link className='text_left' to='/setting_profile' onClick={() => openSection('setting')}><span>CÀI ĐẶT</span></Link>
                    </li>
                    
                    {admin && (
                      <div className='admin'>
                        <li className={`itemMenu ${isOpenWritePaper ? 'active' : ''} ${darkMode ? 'dark_mode':''}` }>
                          <Link className='text_left' to='/write_paper' onClick={() => openSection('writePaper')}><span>VIẾT BÀI</span></Link>
                        </li>
                        <li className={`itemMenu ${isOpenWriteInfoDrug ? 'active' : ''} ${darkMode ? 'dark_mode':''}` }>
                          <Link className='text_left' to='/write_info_drug' onClick={() => openSection('writeInfoDrug')}><span>UPDATE DRUG</span></Link>
                        </li>
                      </div>
                    )} 
                  </ul>
              </div>
              <div className='logout'>
                <Link onClick={logOut} className='link_logout'>
                  <span className='text_logout'>THOÁT</span>
                </Link>
              </div>
            </div>
            <div className={`left_icon_move ${isOpenMenu ? 'open_by_bar':''}`}>
              {isSidebarCollapsed ? (
                <FontAwesomeIcon className='left_icon' onClick={openLeftIconMove} icon={faForward}/>
              ) : (
                <FontAwesomeIcon className='left_icon' onClick={openLeftIconMove} icon={faBackward}/>
              )}
            </div>
          </div>

          <div className={`layout_main ${isSidebarCollapsed ? 'active': ''}`}>
              <div className="main_container">
                <div className={`main_one ${fixPositionScroll ? 'fixed_main_one':''} ${isSidebarCollapsed ? 'active': ''} ${darkMode ? 'dark_mode':''}`}>
                  <div className='main_one_container'>
                      <div className={`one_menu ${isOpenMenu ? 'open_by_bar':''}`}>
                          <FontAwesomeIcon className={`icon_bars ${isOpenMenu ? 'open_by_bar':''}`} icon={faBars} onClick={openMenuByBar}/>
                      </div>
                      <div className="one_find">
                      </div>
                      <div className="one_notification">
                        <div className={`round_icon_notification ${darkMode ? 'dark_mode':''}`} icon={faBell} onClick={openNotification}>
                          <FontAwesomeIcon className={`icon_notification`} icon={faBell} />
                          <FontAwesomeIcon className={`icon_circle ${haveNotif ? 'show':''}`} icon={faCircle} />
                        </div>
                        {isLoggedIn && isOpenNotification && (
                          <div className={`form_notification ${(fixPositionScroll) ? 'fix_menu':''} ${darkMode ? 'dark_mode':''}`}>
                            {listNotif.length == 0 ? (
                              <div className='notif_one_user'>
                                <img src={picRound}></img>
                                <div className='notifi_infomation'>
                                  <h5 className={`notif_userName_1 ${darkMode ? 'dark_mode':''}`}>No User</h5>
                                  <p className={`notif_userName_2 ${darkMode ? 'dark_mode':''}`}>Không có thông báo!</p>
                                </div>
                              </div>
                            ):( 
                              listNotif.map(post => (
                                <div className='notif_one_user' key={post.id} onClick={() => see_notication(post.id)}>
                                  <img src={picRound}></img>
                                  <div className='notifi_infomation'>
                                    <h5 className='notif_userName_1'>{post.username}</h5>
                                    <p className='notif_userName_2'>{post.contentComment}</p>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                      {isLoggedIn ? (
                      <div className="one_username">
                        <div className="one_username_container">
                          <div className={`one_noname ${darkMode ? 'dark_mode':''}`} onClick={openDropDown}>
                            <span className='name'><span>{fullName || 'Họ và tên'}</span></span>
                            <div className='one_avatar'>
                              <Avatar className='one_avatar_1' alt={userName || ''} src={userName || ''}></Avatar>
                              {/* <img className='one_avatar_1' src={picTFBOYS} alt="" /> */}
                            </div>
                          </div>
                          {isOpenDropDown && (
                          <div className='one_dropDown'>
                            <Link className='one_link_dropdown' to="/setting_profile" style={{textAlign: 'center'}}>Thông tin cá nhân</Link>
                            <Link className='one_link_dropdown' to="/setting_profile/setting" >Cài đặt</Link>
                            <Link onClick={logOut} className='one_link_dropdown'>Thoát</Link>
                          </div>
                          )}
                        </div>
                      </div>
                      ) : (
                        <div className="one_username">
                          <div className="one_username_container">
                            <div className='one_noname' onClick={openDropDown}>
                              <span className='name'><span>UserName</span></span>
                              <div className='one_avatar'>
                                <img className='one_avatar_1' src={username} alt="" />
                              </div>
                            </div>
                            {isOpenDropDown && (
                            <div className='one_dropDown'>
                              <Link className='one_link_dropdown' onClick={setShowLogInForm} >Log In</Link>
                              <Link className='one_link_dropdown' onClick={setShowSignUpForm}>Sign Up</Link>
                            </div>
                          )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <div className={fixPositionScroll ? 'fixed_main_router':'main_router'}>
                  {isLoggedIn ? (
                    <Routes>
                      <Route path="/" exact element={<Home isSidebarCollapsed={isSidebarCollapsed}/>}></Route>
                      <Route path='/exchange' element={<Exchange/>}></Route>
                      <Route path='/detect' element={<Detection/>}></Route>
                      <Route path='/lookup' element={<LookUp/>}></Route>
                      <Route path='/paper2/:id' element={<Paper/>}></Route>
                      <Route path='/setting_profile/*' element={<Setting_Profile/>}></Route>
                      <Route path="/setting" element={<Setting/>} />
                      <Route path="/write_paper" element={<WritePaper/>} />
                      <Route path="/write_info_drug" element={<WriteInfoDrug/>} />
                    </Routes>
                  ) : (
                    <Routes>
                      <Route path="/" exact element={<Home/>}></Route>
                      <Route path='/paper2/:id' element={<Paper/>}></Route>
                      <Route path='/exchange' element={<NoUser/>}></Route>
                      <Route path='/lookup' element={<NoUser/>}></Route>
                      <Route path='/paper2/:id' element={<NoUser/>}></Route>
                      <Route path='/setting_profile/*' element={<NoUser/>}></Route>
                      <Route path="/setting" element={<NoUser/>} />
                    </Routes>
                  )}
                </div>

                <div className='footer_web_site'>
                  <div className='footer_header'>
                    <img src={logo}></img>
                    <h2 style={{marginLeft: '10px'}}>.DrugBank</h2>
                  </div>
                  <p><strong>Made by SUNSIK & IAMMIA</strong></p>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;