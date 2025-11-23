import React from 'react'
import Button from './Button.jsx'
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider.jsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { isloggedin, setIsLoggedin } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedin(false);
        console.log('Logged Out');
        navigate('/login');
    };
    return (
        <nav className='navbar container pt-3 pb-3 align-items-start'>
            <Link className='navbar-brand text-light' to="/">Stock Prediction Portal</Link>
            <div>
                {isloggedin ? (
                    <>
                        <Button text="Dashboard" class='btn-outline-info' functionality='/dashboard' />
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Button text="Login" class='btn-outline-info' functionality='/login' />
                        &nbsp;
                        <Button text="Register" class="btn-info" functionality='/register' />
                    </>
                )}
            </div>

        </nav>
    )
}

export default Header