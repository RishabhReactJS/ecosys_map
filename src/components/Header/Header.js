import React from 'react'
import { handelLogout, handelDeleteAll } from '../../utils/firebase'
import './index.css'
import useAuth from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {

  const auth = useAuth();

  const handleSingout = event => {
    event.preventDefault();
    auth.signout();
  }

  return (
    <div className="home-component">
      <header>
        <Link className="home-link" to="/home">Home</Link>
        <span className="home-heading">Sequential Diagram</span>
        <span className="left-container">
          <label className="margin-left">
            Email: <span>{localStorage.getItem('email')}</span>
          </label>
          <button className="margin-left logout-button" onClick={() => handelDeleteAll("steps", "PkhOn8n6nEeYHmR3sM0P")}>
            Delete
          </button>
          {/* if someone start editing the page then a lock will apear on top of page, resembling who changed it. */}
          <label className="margin-left">
            Lock Icon <span>locked by</span>
          </label>
          <button className="margin-left logout-button" onClick={handelLogout}>
            Discard Chanegs
          </button>
          <button className="margin-left logout-button" onClick={handelLogout}>
            Save
          </button>
          <button className="margin-left logout-button" onClick={handleSingout}>
            Logout
          </button>
          {/* We can keep a private edit concept like pega app */}
        </span>
      </header>
      <section className="home-section1">
        {/* <TaxForm customerTax={Tax} updateTax={updateTax} />
        <TaxTable customerTax={Tax} /> */}
      </section>
    </div>
  )
}
