import React, { useState } from 'react';
// import fire from '../../utils/firebase';
// import {handleSingup, handleLogin} from '../../utils/firebase';
import './login.css'
import {
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import useAuth from '../../context/AuthContext';

export default function Login() {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')


  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/home";

  const handelChenge = event => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === 'email')
      setemail(value);
    else if (name === 'password')
      setpassword(value);
  };

  //   handleSingup = event => {
  //     event.preventDefault();
  //     fire
  //       .auth()
  //       .createUserWithEmailAndPassword(this.state.email, this.state.password)
  //       .then(res => console.log(res))
  //       .catch(er => console.l);
  //   };

  //   handleLogin = event => {
  //     event.preventDefault();
  //     fire
  //       .auth()
  //       .signInWithEmailAndPassword(this.state.email, this.state.password)
  //       .then(res => {
  //         localStorage.clear();
  //         localStorage.setItem('email', res.user.email);
  //       })
  //       .catch(err => {
  //         alert(err);
  //       });
  //   };

  const handleSingup = event => {
    event.preventDefault();
    auth.signup({ email, password }, () => {
      navigate(from, { replace: true });
    });
  }

  const handleLogin = event => {
    event.preventDefault();
    auth.signin({ email, password }, () => {
      navigate(from, { replace: true });
    });
  }

  if (!auth.userId) {
    return (
      <div className="page">
        <div className="login-component">
          <h1 className="title is-3">Login/Signup</h1>
          <form className="login-form" onChange={handelChenge}>
            <div className="login-inputs">
              <input
                placeholder="enter email id"
                className="email-input input"
                type="email"
                name="email"
                value={email}
              />
              <input
                placeholder="password"
                className="password-input input"
                type="password"
                name="password"
                value={password}
              />
            </div>
            <div className="login-buttons">
              <button className="login button is-light" onClick={event => handleLogin(event)}>
                Login
              </button>
              <button className="signup button is-light" onClick={event => handleSingup(event)}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

    );
  }
  return <Navigate to="/home" replace state={{ path: location.pathname }} />
}
