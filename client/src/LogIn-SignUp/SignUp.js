import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './css/SignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


function SignUp({openLogIn, closeSignUp, onSubmit}) {
    const [formSignUp, setFormSignUp] = useState({
        username: '',
        useremail: '',
        userpassword: '',
        confirm_password:''
    });
    const handleInput = (event) => {
        const{name, value} = event.target;
        setFormSignUp({ ...formSignUp, [name]: value });
    }

    const handleSignUp = (e) => {
        e.preventDefault(); 

        // Kiểm tra xem tất cả các trường có được điền đầy đủ không
        const { username, useremail, userpassword, confirm_password } = formSignUp;
        if (!username || !useremail || !userpassword || !confirm_password) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp nhau không
        if (userpassword !== confirm_password) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }
        onSubmit(formSignUp);
    }

    return (
        <div className="signup">
            <div className='form_signup'>
                <div className="close_sign_form" style={{alignItems: "flex-end"}}>
                    <FontAwesomeIcon onClick = {closeSignUp} icon={faClose} style={{ color: 'rgb(70, 90, 110)', fontSize: '20px' }} />
                </div>
                <form onSubmit={handleSignUp}>
                    <div className='mb-3'>
                        <label htmlFor='username'>Username</label>
                        <input onChange={handleInput} placeholder='Username' name="username" className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input onChange={handleInput} placeholder='Email' name="useremail" className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='pass'>Password</label>
                        <input onChange={handleInput} placeholder='Password' name="userpassword" className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='confirm_password'> Confirm Password</label>
                        <input type="password" onChange={handleInput} placeholder='Confirm password' name="confirm_password" className='form-control rounded-0' />
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Sign up</strong></button>
                    <p></p>
                    <Link onClick={openLogIn} className='btn btn-default border w-100 text-decoration-none'>Sign in</Link>
                </form>
            </div>            
        </div>
        
    );
}

export default SignUp;