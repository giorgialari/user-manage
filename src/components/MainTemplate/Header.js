import React from 'react'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        <Link className="nav-link" aria-current="page" to="/users">Users</Link>
                        <Link className="nav-link" aria-current="page" to="/adduser">AddUser</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header