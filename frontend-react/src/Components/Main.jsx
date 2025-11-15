import React from 'react'
import Button from './Button.jsx'


const Main = () => {
    return (
        <>
            <div className='container'>
                <div className='pd-5 text-center bg-light-dark rounded'>
                    <h1 className='text-light'> Stock Prediction Portal</h1>
                    <p className='text-light lead'>Stock Prediction Portal is an AI-powered web application built with a Django REST backend, a React frontend, and a TensorFlow machine learning model. It learns from historical market data to analyze and predict future stock trends, offering users interactive visualizations and data-driven insights into stock behavior over time.</p>
                    <Button text="Login" class="btn-outline-info" />
                </div>
            </div>
        </ >
    )
}

export default Main