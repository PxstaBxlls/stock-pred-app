import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [error,setError] = useState('');
    const {isloggedin,setIsLoggedin} = useContext(AuthContext);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userdata = {username,password};
        console.log("User data = > ",userdata);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userdata);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token',response.data.refresh);
            console.log('Login Succesfull');
            setIsLoggedin(true);
            navigate('/');
        } catch(error) {
            console.error("Invalid Creds")
            setError('Invalid Credentials..Try again');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6 bg-light-dark p-5 rounded'>
                        <h3 className='text-light text-center'> Login to our Portal </h3>
                        <form onSubmit={handleLogin}>
                            <div className='mb-3'>
                                <input type='text' className='form-control mb-3' placeholder='Enter Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                                
                            </div>
                            <div className='mb-3'>
                                <input type='password' className='form-control mb-4' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                
                            </div>
                            {error && <div className = 'text-danger'>{error}</div>}
                            {loading ? (
                                <button type='submit' className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin /> Loggin In.... </button>
                            ) : (
                                <button type='submit' className='btn btn-info d-block mx-auto'> Login </button>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;