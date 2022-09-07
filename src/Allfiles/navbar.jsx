import {  NavLink } from "react-router-dom";
import Styles  from "./Navbar.module.css"

export const Navbar=()=>{

    return(
        <nav className={Styles.maindiv}>

          <ul>
            <li> <NavLink to="/">Home</NavLink> </li>
            <li> <NavLink to="/allnotes">AllNotes</NavLink> </li>
          </ul>

        </nav>
    )
}