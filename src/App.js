import React, { Component, useState, useEffect } from 'react';
import './App.css';
import fire from './utils/firebase';
import Login from './components/login/login';
import Dashboard from './Dashboard';
import { authlistner } from "./utils/firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('in useEffect >>>');
    authlistner()
    .then(res => setUser(res))
    .catch(err => setUser())
  }, []);


  return <div>{user ? <Dashboard /> : <Login />}</div>;
};

export default App;