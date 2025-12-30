import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosinstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Dashboard = () => {
    const [Ticker,setTicker] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [plot, setPlot] = useState();
    const [ma100, setMa100] = useState();
    const [ma200, setMa200] = useState();
    const [final_pred, setFinal_pred] = useState();
    const [mse, setMse] = useState();
    const [rmse, setRmse] = useState();
    const [r2, setR2] = useState();


    const accessToken = localStorage.getItem('access_token')

    const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/predict/', { ticker: Ticker });
            console.log(response.data);
            if (response.data.error) {
                setError(response.data.error);
            }
            const plotURL = `${backendRoot}${response.data.plot_img}`;
            // console.log('Plot URL:', plotURL);
            const ma100url = `${backendRoot}${response.data.plot_100_dma}`;
            const ma200url = `${backendRoot}${response.data.plot_200_dma}`;
            const final_prediction = `${backendRoot}${response.data.plot_prediction}`; 
            const mse = response.data.mse;
            const rmse = response.data.rmse;
            const r2 = response.data.r2;
            setPlot(plotURL);
            setMa100(ma100url);
            setMa200(ma200url);
            setFinal_pred(final_prediction);
            setMse(mse);
            setRmse(rmse);
            setR2(r2);

        } catch (error) {
            console.error('Error at the API Endpoint', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 mx-auto'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className='form-control' placeholder='StockTicker' 
                        onChange = {(e) => setTicker(e.target.value)}
                        />
                        <small>{error && <div className='text-danger'>{error}</div>}</small>
                        <button type='submit' className='btn btn-info mt-3'>
                        {loading ? (
                            <span><FontAwesomeIcon icon={faSpinner} spin />Please Wait..</span>
                        ) : (
                            'See Prediction'
                        )}</button>
                    </form>
                </div>

                {/*Print prediction plots*/}
                {final_pred && (
                    <div className='prediction mt-5'>
                    <div className='p-5'>
                        {plot && (
                            <img src={plot} style={{maxWidth: '100%'}}/>
                        )}
                    </div>
                    <div className='p-3'>
                        {ma100 && (
                            <img src={ma100} style={{maxWidth: '100%'}}/>
                        )}
                    </div>
                    <div className='p-3'>
                        {ma200 && (
                            <img src={ma200} style={{maxWidth: '100%'}}/>
                        )}
                    </div>
                    <div className='p-3'>
                        {final_pred && (
                            <img src={final_pred} style={{maxWidth: '100%'}}/>
                        )}
                    </div>

                    <div className="text-light p-3">
                        <h4>Model Evaluation Metrics</h4>
                        <p>Mean Squared Error (MSE) : {mse}</p>
                        <p>Root Mean Squared Error (RMSE) : {rmse}</p>
                        <p>R-squared (R2) : {r2}</p>
                    </div>

                </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;