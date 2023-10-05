import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Img1 from '../../Assets/677-6776934_food-lion-logo-png.png';

function Header() {

    const navbar = [
        { name: "Home" }, { name: "About" }, { name: "Product" }, { name: "Company" }, { name: "Contact" }
    ]

    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!localStorage.getItem("auth")) navigate("/");
    },[logout])

    const handleLogout = (() => {
        localStorage.removeItem("auth")
        setLogout(true)
    })

    return (
        <>
            <div className='header_container'>
                <div className="logo">
                    <img src={Img1} alt="logo" />
                </div>
                <div className="nav">
                    <ul>
                        {
                            navbar.map((item, i) => (
                                <Link key={i} to={'/' + item.name}><li>{item.name}</li></Link>
                            ))
                        }
                    </ul>
                </div>
                <div className='head_btn'>
                    <button onClick={handleLogout}>LogOut</button>
                </div>
            </div>
        </>
    )
}

export default Header;