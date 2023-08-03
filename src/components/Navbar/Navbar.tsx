import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import imgUrl from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../../pages/auth/AuthProvider";

const Navbar: React.FC = ({
    
}) => {
    const { auth, logout } = useAuth(); // Use the auth state and logout function from the context
    
    return (
        <>
            <header>
                <a className={style.logo}>
                    <img className={style.headerimg} src={imgUrl} alt="logo" loading="lazy"/>
                </a>
                <nav className={style.menu}>
                    <ul className={style.nav_links}>
                        <li>
                            <Link to={"/"}>Inicio</Link>
                        </li>
                        <li>
                            <Link to={"/diplomados"}>Oferta Educativa</Link>
                        </li>
                        <li>
                            <Link to={"/testimoniales"}>Testimoniales</Link>
                        </li>
                        <li>
                            <HashLink smooth to="/#validez">
                                Validez
                            </HashLink>
                        </li>
                        <li><a className="" target="_blank" href="https://view.genial.ly/63c80d4587990e0019c64dd5/guide-centro-certificador-de-estudios-especializados">Conócenos</a></li>
                        <li>
                            <Link to={"/blog"}>Blog</Link>
                        </li>
                       
                    </ul>
                </nav>
                <nav className={style.user}>
                    <ul className={style.nav_links}>
                         {auth && 
                        <li className={style.flex}>
                            <i className={"bx bx-log-out"} style={{"color":"white","margin":"10px 0 0 0"}}></i>
                            <Link onClick={() => logout()} to={"/"}>Logout</Link>
                        </li>
                            }
                    </ul>
                </nav>
                <nav className={style.dropdown_menu}>
                    <i className="fa-solid fa-bars" style={{'color':'white'}}></i><input type="checkbox" className={style.dropdown_menu_check}/>
                </nav>
            </header>
        </>
    );
};

export default Navbar;

