import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import Validation from "./SignupValidation";
import Axios from 'axios';
import './css/SignUp.css'
import LogIn from "./LogIn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';


function SignUp({openLogIn, closeSignUp}) {
    const [values, setValues] = useState({
        
        username: '',
        email: '',
        pass: '',
        confirm_pass:'',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
       
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(Object.keys(errors).length===0){
        try {
            const res = await Axios.post('http://localhost:3001/signup', values);
            if (res.data.message === 'Data inserted successfully') {
                setIsSubmitted(true);
            }
        } catch (error) {
            console.log(error);
        }
        }
    }
    if (isSubmitted) {
        return <Navigate to="/app" />;
    }
    return (
        <div className="signup">
            <div className='form_signup'>
                <div className="close_sign_form" style={{alignItems: "flex-end"}}>
                    <FontAwesomeIcon onClick = {closeSignUp} icon={faClose} style={{ color: 'rgb(70, 90, 110)', fontSize: '20px' }} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='username'>Full name</label>
                        <input type='text' placeholder='Enter fullname' name="username"
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter email' name="email"
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='pass'>Password</label>
                        <input type='password' placeholder='Enter password' name="pass"
                            onChange={handleInput} className='form-control rounded-0' />
                    {errors.pass && <span className='text-danger'>{errors.pass}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='confirm_pass'> Confirm Password</label>
                        <input type='password' placeholder='Enter password' name="confirm_pass"
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.pass && <span className='text-danger'>{errors.pass}</span>}
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