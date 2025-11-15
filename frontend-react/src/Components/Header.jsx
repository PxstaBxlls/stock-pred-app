import React from 'react'
import Button from './Button.jsx'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className = 'navbar container pt-3 pb-3 align-items-start'>
            <Link className = 'navbar-brand text-light' to="/">Stock Prediction Portal</Link>
            <div>
                <Button text="Login" class='btn-outline-info' functionality = '/login'/>
                &nbsp;
                <Button text="Register" class = "btn-info" functionality = '/register'/>
            </div>
        
        </nav>
    )
}

export default Header