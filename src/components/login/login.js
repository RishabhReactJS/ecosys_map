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

  let from = location.state?.from?.pathname || "/dashboard";

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
    auth.signin({ email, password }, () => {
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
      <div className="login-component">
        <form className="login-form" onChange={handelChenge}>
          {/* <label className="input-container">
            Enter Email */}
          <input
            placeholder="EmailID"
            className="input-box"
            type="email"
            name="email"
            value={email}
          />
          {/* </label> */}
          {/* <label className="input-container">
            Enter password */}
          <input
            placeholder="password"
            className="input-box"
            type="password"
            name="password"
            value={password}
          />
          {/* </label> */}
          <button className="login-button" onClick={event => handleLogin(event)}>
            Login
          </button>
          <button className="login-button" onClick={event => handleSingup(event)}>
            Singup
          </button>
        </form>
      </div>
    );
  }
  return <Navigate to="/dashboard" replace state={{ path: location.pathname }} />
}
