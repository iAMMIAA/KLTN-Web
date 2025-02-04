import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/LogIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';

function LogIn({closeLogIn, openSignUp, onSubmit}){
    const [formData, setFormData] = useState({
        username: '',
        userpassword: ''
    });

    const setInput = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleLogIn = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return(
        <div className='login'>
            <div className='form_login'>
                <div className="close_login_form" style={{alignItems: "flex-end"}}>
                    <FontAwesomeIcon onClick={closeLogIn} icon={faClose} style={{ color: 'rgb(70, 90, 110)', fontSize: '20px' }} />
                </div>
                <form onSubmit={handleLogIn}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Username</label>
                        <input onChange={setInput} placeholder='Enter Email' name='username' className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type="password" onChange={setInput} placeholder='Enter Password' name='userpassword' className='form-control rounded-0'/> 
                    </div>
                    <button type="submit" className='btn btn-success w-100'>
                        <strong>Log in</strong>
                    </button>
                    <p></p>
                    <Link onClick={openSignUp} className='btn btn-default border w-100 text-decoration-none'>Create Account</Link>
                </form>
            </div>            
        </div>
       
    );
}

export default LogIn
