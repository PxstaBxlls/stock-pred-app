import { useState } from 'react'
import "./assets/css/style.css";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Main from "./Components/Main.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';

function App() {

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
