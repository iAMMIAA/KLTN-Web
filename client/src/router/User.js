// import React, {useState} from 'react';
// import './css/User.css'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faCommentMedical, faBell, faSearch, faGear, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
// import { Link, Route, Routes } from 'react-router-dom';
// // import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
// import picTFBOYS from './pictures/tfboys.jpg'
// import Home from './Home';
// import Exchange from './Exchange';
// import LookUp from './LookUp';
// import Setting from './Setting';
// import Paper1 from './paper/paper1';

// function User() {
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const toggleSidebar = () => {
//     setIsSidebarCollapsed (!isSidebarCollapsed);
//   }

//   return (
//     // <Router>
//       <div className='body'>
//           <div className="container">
//             <div className={`layout_left ${isSidebarCollapsed ? 'active' : ''}`}>
//           {/* <div className='layout_left'> */}
//                 <div className="left_first">
//                   <div className="header_menu"></div>
//                   <div className="list_menu">
//                       <ul>
//                         <li><Link to='/home'>
//                           <FontAwesomeIcon icon={faHome} className='icon_left'/>
//                           </Link></li>
//                         <li><Link to='/exchange'>
//                           <FontAwesomeIcon icon={faCommentMedical} className='icon_left' /></Link></li>
//                         <li><Link to='/lookup'>
//                           <FontAwesomeIcon icon={faSearch} className='icon_left'/></Link></li>
//                         <li><Link to='/setting'>
//                           <FontAwesomeIcon icon={faGear} className='icon_left'/></Link></li>
//                       </ul>
//                   </div>
//                   <div className='logout'>
//                     <Link to='/' className='link_logout'>
//                       <FontAwesomeIcon icon={faRightFromBracket} className='icon_logout'/>
//                     </Link>
//                   </div>
//                 </div>

//                 {/* {!isSidebarCollapsed && ( */}
//                 <div className={`left_container ${isSidebarCollapsed ? 'active': ''}`}>
//                 {/* <div className="left_container"> */}
//                   <div className="header_menu"><span>MedicalWeb.</span>
//                   </div>
//                   <div className="list_menu">
//                       <ul>
//                         <li><Link className='text_left' to='/home'><span>HOME</span></Link></li>
//                         <li><Link className='text_left' to='/exchange'><span>EXCHANGE</span></Link></li>
//                         <li><Link className='text_left' to='/lookup'><span>LOOK UP</span></Link></li>
//                         <li><Link className='text_left' to='/setting'><span>SETTING</span></Link></li>
//                       </ul>
//                   </div>
//                   <div className='logout'>
//                     <Link to='/' className='link_logout'>
//                       <span className='text_logout'>LOGOUT</span>
//                     </Link>
//                     {/* <button onClick={toggleSidebar}>Toggle Sidebar</button> */}
//                   </div>
//                 </div>
//               {/* )} */}
//               </div>
//               <div className={`layout_main ${isSidebarCollapsed ? 'active': ''}`}>
//               {/* <div className="layout-main"> */}
//                   <div className="main_container">
//                     <div className="main_one">
//                         <div className="one_find">
//                         <form className="search_form" action="/search" method="GET">
//                             <FontAwesomeIcon icon={faSearch} style={{ color: 'rgb(70, 90, 110)' }} />
//                             <label htmlFor="searchInput"></label>
//                             <input className="search_input" type="text" id="searchInput" name="q" placeholder="Tìm kiếm" />
//                         </form>
//                         </div>
//                         <div className="one_notification">
//                           <FontAwesomeIcon icon={faBell}/>
//                         </div>
//                         <div className="one_username">
//                         <div className="one_username_container">
//                             <span>Le Phuong Thao</span>
//                             <img src={picTFBOYS} alt="" />
//                         </div>
//                         </div>
//                     </div>
//                     <div className='main_router'>
//                       <Routes>
//                         <Route path="/home" element={<Home/>}></Route>
//                         <Route path='/exchange' element={<Exchange/>}></Route>
//                         <Route path='/lookup' element={<LookUp/>}></Route>
//                         <Route path='/setting' element={<Setting/>}></Route>
//                         <Route path='/paper1' element={<Paper1/>}></Route>
//                       </Routes>
//                     </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//     // </Router>
//   );
// }

// export default User;
