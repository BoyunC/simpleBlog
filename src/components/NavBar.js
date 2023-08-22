import {
    Link, NavLink
  } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-success bg-success">
          <Link className="navbar-brand mx-4 text-light fw-bold" to="/">HOME</Link>
          <ul className="navbar-nav ">
            <li className="nav-item active fw-bold">
              <NavLink activeClassName="active" className="nav-link" activeStyle={{color: "white"}} to="/blogs" >BLOGS</NavLink>
            </li>
            <li className="nav-item active fw-bold">
              <NavLink activeClassName="active" className="nav-link" activeStyle={{color: "white"}}  to="/admin" >ADMIN</NavLink>
            </li>
          </ul>
      </nav>
    );
}

export default NavBar;

