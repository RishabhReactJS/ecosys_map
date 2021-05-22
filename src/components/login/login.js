import React, { Component } from 'react';
import fire from '../../utils/firebase';
import {handleSingup, handleLogin} from '../../utils/firebase';
import './login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handelChenge = this.handelChenge.bind(this);
  }

  handelChenge = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
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
  render() {
    return (
      <div className="login-component">
        <form className="login-form" onChange={this.handelChenge}>
          {/* <label className="input-container">
            Enter Email */}
          <input
            placeholder="EmailID"
            className="input-box"
            type="email"
            name="email"
            value={this.state.email}
          />
          {/* </label> */}
          {/* <label className="input-container">
            Enter password */}
          <input
            placeholder="password"
            className="input-box"
            type="password"
            name="password"
            value={this.state.password}
          />
          {/* </label> */}
          <button className="login-button" onClick={event => handleLogin(event, this.state.email, this.state.password)}>
            Login
          </button>
          <button className="login-button" onClick={event => handleSingup(event, this.state.email, this.state.password)}>
            Singup
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
