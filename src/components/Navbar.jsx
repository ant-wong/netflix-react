import React, { Component } from 'react'

export default function Navbar() {

  function helloFunc() {
    console.log("HELLO");
  }

  return(
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.netflix.com/">NETFLIX TOOL</a>
        </div>
      </nav>
    </div>
  )
}