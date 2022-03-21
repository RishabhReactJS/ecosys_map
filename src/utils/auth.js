import React, {useEffect} from 'react';
import useAuth from '../context/AuthContext';
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
  } from "react-router-dom";

  export function AuthStatus() {
    let auth = useAuth();
    let navigate = useNavigate();
  
    if (!auth.userId) {
      return <p>You are not logged in.</p>;
    }
  
    return (
      <p>
        Welcome {auth.userId}!{" "}
        <button
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
        >
          Sign out
        </button>
      </p>
    );
  }
  
  export function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.userId) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return children;
  }