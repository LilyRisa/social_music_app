import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Home, Login, Profile,NotFound, Category, Upload } from './Pages';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {AxiosClient} from './Helper';


const checkToken = async () =>{
    return AxiosClient.get(`/check`)
}

const refreshToken = async () =>{
    const {data} = await AxiosClient.post(`/refresh`)
    localStorage.setItem('auth',JSON.stringify(data));
}


function App() {
    const [token, setToken] = useState();
    const [expires, setExpires] = useState(3600000);
    // let navigate = useNavigate();
    useLayoutEffect( ()=>{
        (async () =>{
            let resp = await checkToken()
            if(!resp.data.status){
                setToken(null)
            }else{
                setToken(JSON.parse(localStorage.getItem('auth')))
            }
        })()
        setTimeout(()=>{
            refreshToken()
        },expires)
        
    },[JSON.stringify(token)])

    if(!token) {
        return <Login setToken={setToken} setExpires={setExpires} />
      }

  return (
      <div className="App">
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" exact element={<Home/>} />
              <Route path="/profile" element={token ? <Profile/> : <Login setToken={setToken} />} />
              <Route path="/upload" element={token ? <Upload/> : <Login setToken={setToken} />} />
              <Route path="/category/:id" element={<Category/>} />
              <Route path="/login" element={<Login/>} />
              <Route element={<NotFound/>}/>
          </Routes>
      </div>
  );
}

export default App;
