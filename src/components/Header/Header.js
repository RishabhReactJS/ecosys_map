import React from 'react'
import {handelLogout} from '../../utils/firebase'
import './index.css'

export default function Header() {
    return (
                <div className="home-component">
      <header>
        <span className="home-heading">Sequential Diagram</span>
        <span className="left-container">
          <label className="margin-left">
            Email: <span>{localStorage.getItem('email')}</span>
          </label>
          <button className="margin-left logout-button" onClick={handelLogout}>
            Logout
          </button>
        </span>
      </header>
      <section className="home-section1">
        {/* <TaxForm customerTax={Tax} updateTax={updateTax} />
        <TaxTable customerTax={Tax} /> */}
      </section>
    </div>
    )
}
