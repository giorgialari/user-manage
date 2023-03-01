import React, { useEffect, useState } from 'react';
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [Token, setToken] = useState ('')
    const [IsEmpty, setIsEmpty] = useState(false)

    const navigate = useNavigate();
    const onChangeToken=(e) => {
     setToken(e.target.value)
     setIsEmpty(e.target.value === '');
     }
    const postToken = () => {
        localStorage.setItem('Token', Token)
        navigate('/users')
    }

    return (
        <div>
            <div className="mb-3 login-container">
                <label className="form-label">Token</label>
                <input 
                type="text" 
                className="form-control" 
                onChange={onChangeToken} />
                <button 
                className='mt-3 btn btn-success' 
                type='submit'
                onClick={postToken}
                disabled={IsEmpty}
                >Login</button>
            </div>
        </div>
    )
}

export default Login