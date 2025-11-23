import React, { useEffect } from 'react'
import axios from 'axios';
import axiosInstance from '../axiosinstance';


const Dashboard = () => {
    const accessToken = localStorage.getItem('access_token')
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected_views/');
                console.log('Success', response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchProtectedData();
    }, []);

    return (
        <div className='text-light'>Dashboard</div>
    );
};

export default Dashboard;