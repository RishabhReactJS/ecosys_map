// Yo this is Saurabh's Branch

import React from 'react';
import './App.css';
// import fire from './utils/firebase';
import Login from './components/login/login';
// import LoginOld from './components/login/loginOld';
import Home from './components/Home/Home';
import Dashboard from './Dashboard';
// import { authlistner } from "./utils/firebase";
import {
  Routes,
  Route,
} from 'react-router-dom';
// import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './utils/auth';

const App = () => {

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   console.log('in useEffect >>>');
  //   authlistner()
  //     .then(res => setUser(res))
  //     .catch(err => setUser())
  // });


  return <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={
        <RequireAuth>
          <Home />
        </RequireAuth>} />
      {/* <Route path="/dashboard" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>} /> */}
      <Route path="/dashboard/:flowId" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </AuthProvider>;


  // return <div>{user ? <Dashboard /> : <Login />}</div>;
};

export default App;