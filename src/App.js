import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home, Login, Profile,NotFound, Category} from './Pages';
import React from 'react';

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" exact element={<Home/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/category/:id" element={<Category/>} />
              <Route element={<NotFound/>}/>
          </Routes>
      </div>
  );
}

export default App;
