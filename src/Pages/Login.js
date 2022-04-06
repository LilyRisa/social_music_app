import React, { useState, useLocation } from 'react';
import {AxiosClient} from '../Helper';

const loginUser = async ({username, password}) => {
    return AxiosClient.post('/login', {email:username, password:password })
}

export default function Login({setToken}) {


    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e =>{
        e.preventDefault();
        const {data} = await loginUser({
            username,
            password
        });
        setToken(data);
    }
  return(
    <div className='loading d-flex flex-wrap justify-content-center align-items-center p-4 bg-gradient-green'>
        <div className='col-12 text-center'>
            <h1>Login account</h1>
        </div>
        <form className='col-12 col-lg-6' onSubmit={handleSubmit}>
        <div className='form-group'>
            <label>
                <p>Email</p>
            </label>
                <input type="text" className='form-control' onChange={e => setUserName(e.target.value)}/>
            
        </div>
        <div className='form-group mb-4'>
        <label>
            <p>Password</p>
        </label>
            <input type="password" className='form-control' onChange={e => setPassword(e.target.value)}/>
        
        </div>
        <div className='form-group'>
            <button type="submit" className='form-control'>Submit</button>
        </div>
        </form>
    </div>
  )
}