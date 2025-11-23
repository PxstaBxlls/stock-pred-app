import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


const Register = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [Error,setError] = useState('')
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);
    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userdata = {
            username,email,password
        };
        console.log(userdata);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userdata);
            console.log('Response data => ',response.data);
            console.log('Flow Succesful');
            setError({});
            setSuccess(true);
        }catch(error){
            setError(error.response.data)
            console.log('Registration Error', error.response.data);
        }finally{
            setLoading(false);
        }
    };
    return (
        <>
            <div className='container'>
                <div className = 'row justify-content-center'>
                    <div className =  'col-md-6 bg-light-dark p-5 rounded'>
                        <h3 className='text-light text-center'> Create an Account </h3>
                        <form onSubmit = {handleRegistration}>
                            <div className='mb-3'>
                                <input type = 'text' className = 'form-control mb-3' placeholder='Enter Username' value = {username} onChange={(e) => {setUsername(e.target.value)}}/>
                                <small>{Error.username && <div className='text-danger'>{Error.username}</div>}</small>
                            </div>
                            <div className='mb-3'>
                                <input type = 'email' className = 'form-control mb-3' placeholder='Enter Email Address' value = {email} onChange={(e) => {setEmail(e.target.value)}}/>
                                <small>{Error.email && <div className='text-danger'>{Error.email}</div>}</small>
                            </div>
                            <div className = 'mb-3'>
                                <input type = 'password' className = 'form-control mb-4' placeholder='Enter Password' value = {password} onChange={(e) => {setPassword(e.target.value)}}/>
                                <small>{Error.password && <div className='text-danger'>{Error.password}</div>}</small>
                            </div>
                            {success && <div className='alert alert-success'> Registration Complete </div>}
                            {loading ? (
                                <button type = 'submit' className = 'btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/> Please Wait.... </button>
                            ) : (
                                <button type = 'submit' className = 'btn btn-info d-block mx-auto'> Register </button>
                            )}
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register