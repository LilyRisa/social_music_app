import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Home, Login, Profile,NotFound, Category } from './Pages';
import React, {useState, useEffect} from 'react';
import {AxiosClient} from './Helper';

const checkToken = async (token) =>{
    return AxiosClient.get(`/check`)
}

function App() {
    const [token, setToken] = useState();
    // let navigate = useNavigate();
    useEffect(()=>{
        setToken(JSON.parse(localStorage.getItem('auth')));
    },[])
    
    useEffect(()=>{
        localStorage.setItem('auth',JSON.stringify(token));
    },[token])

    if(!token) {
        return <Login setToken={setToken} />
      }

  return (
      <div className="App">
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" exact element={<Home/>} />
              <Route path="/profile" element={!token ? <Profile/> : <Login setToken={setToken} />} />
              <Route path="/category/:id" element={<Category/>} />
              <Route path="/login" element={<Login/>} />
              <Route element={<NotFound/>}/>
          </Routes>
      </div>
  );
}

export default App;
