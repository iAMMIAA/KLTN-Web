// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import Validation from './LoginValidation';
// import Axios from 'axios';
// import './css/LogIn.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose} from '@fortawesome/free-solid-svg-icons';

// function LogIn({closeLogIn, openSignUp}){
//     const [errors, setErrors] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const [values, setValues] = useState({
//         email: '',
//         password: '',
//     });

//     const handleInput = (event) => {
//         setValues({ ...values, [event.target.name]: event.target.value });
//     };
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setErrors(Validation(values));
//         try {
//             const res = await Axios.post('http://localhost:3001/login', values);
//             if (res.data.message === 'Success') {
//                 setIsSubmitted(true);
//                 localStorage.setItem('token', res.data.token);
//             } else {
//                 alert("No user exists!");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//         setIsSubmitted(true)
//     };
//     if (isSubmitted) {
//         return <Navigate to="/" />;
//     }

//     return(
//         <div className='login'>
//             <div className='form_login'>
//                 <div className="close_login_form" style={{alignItems: "flex-end"}}>
//                     <FontAwesomeIcon onClick={closeLogIn} icon={faClose} style={{ color: 'rgb(70, 90, 110)', fontSize: '20px' }} />
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             type='email'
//                             placeholder='Enter Email'
//                             name='email'
//                             onChange={handleInput}
//                             className='form-control rounded-0'
//                         />
//                     {errors.email && <span className='text-danger'>{errors.email}</span>} 
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='password'>Password</label>
//                         <input
//                             type='password'
//                             placeholder='Enter Password'
//                             name='password'
//                             onChange={handleInput}
//                             className='form-control rounded-0'
//                         /> 
//                         {errors.password && <span className='text-danger'>{errors.password}</span>}          
//                     </div>
//                     <button type='submit' className='btn btn-success w-100'><strong>Log in</strong></button>
//                     <p></p>
//                     <Link onClick={openSignUp} className='btn btn-default border w-100 text-decoration-none'>Create Account</Link>
//                 </form>
//             </div>            
//         </div>
       
//     );
// }

// export default LogIn