import React, {useContext} from 'react';
import {ModalContext} from "../context/modal/modalContext";
import {Link} from "react-router-dom";
import {Navbar as BNavbar} from 'react-bootstrap'
import {AuthContext} from "../context/auth/authContext";


export  const Navbar = ({isAuth, userId}) => {
    const {logout} = useContext(AuthContext)
    const logo = 'my blog'
    let links
    const {showModal} = useContext(ModalContext)

    if (isAuth) {
        links = [
            <Link to='/posts' className="nav-link navs">Home</Link>,
            <Link to='/create' className="nav-link navs">Create</Link>,
            <Link to={`/user/${userId}`} className="nav-link navs">Settings</Link>,
            <strong
                className="nav-link navs"
                onClick={() => {
                    showModal('confirm', 'You want to logout?', logout)
                }}
            >Log out</strong>,
        ]
    } else {
        links = [
                <span className="nav-link navs" onClick={() => showModal('registration', 'Registration')} >Registration</span>,
                <span className="nav-link navs" onClick={() => showModal('login', 'Login')}>Login</span>
        ]
    }

    return (
        <BNavbar collapseOnSelect expand="lg" className="dark" variant="dark">
            <BNavbar.Brand href="#home">{logo.toUpperCase()}</BNavbar.Brand>
            <BNavbar.Toggle aria-controls="responsive-navbar-nav" />
            <BNavbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <ul className="navbar-nav">
                    {links.map( (link, index) => {
                        return <li className="nav-item" key={index}>{link}</li>
                    })}
               </ul>
            </BNavbar.Collapse>
        </BNavbar>
    )
}
