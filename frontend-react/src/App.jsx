import { useState } from 'react'
import "./assets/css/style.css";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Main from "./Components/Main.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx';
import AuthProvider from './AuthProvider.jsx';
import Dashboard from './Components/dashboard/Dashboard.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

function App() {

    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
                        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
                        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App
