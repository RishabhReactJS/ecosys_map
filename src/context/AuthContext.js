import React, { useEffect } from 'react';
import { handleSingup, handleLogin, handelLogout } from '../utils/firebase';

const AuthContextType = {
  userId: '',
  userEmail: '',
  signin: (payload, callback) => { },
  signout: (callback) => { }
}

let AuthContext = React.createContext(AuthContextType.userId);

export function AuthProvider({ children }) {
  let [userId, setUserId] = React.useState(localStorage.userId || null);
  const [userEmail, setuserEmail] = React.useState(localStorage.email || null)
  
  let signin = (payload, callback) => {
    handleLogin(payload)
      .then(res => {
        setUserId(res.uid);
        setuserEmail(res.email);
        callback();
      }).catch(err => {
        console.log(err)
      })
  };

  let signout = (callback) => {
    handelLogout();
    localStorage.clear();
    setUserId(null);
    setuserEmail(null);
  };

  let value = { userId, userEmail, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return React.useContext(AuthContext);
}