import React from "react"
import { Navbar, Nav, NavbarBrand, NavItem } from "reactstrap"
import { Link } from "@reach/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const logout = () => {
    localStorage.removeItem('jwt')
    document.location = "/"
}

const NavLink = props => (
    <NavItem
        {...props}
    >
        <Link
            {...props}
            getProps={({ isCurrent }) => {
                return {
                    className: isCurrent ? "nav-link active" : "nav-link"
                }
            }}
        >
            <FontAwesomeIcon icon={props.icon} className="mr-1" />
            {props.label}
        </Link>
    </NavItem>
)

const Navigation = (props) => {
    return <Navbar color="dark" dark expand="lg" className="fixed-top">
                
                <NavbarBrand href="/">
                    <img src="./logo.svg" alt="Film Score" width="150px"/>
                </NavbarBrand>
                
                <Nav navbar className="mr-auto">
                    <NavLink to="/" icon="list" label="Dashboard" />
                    <NavLink to="/new-score" icon="star" label="New Score" />
                </Nav>
                
            <div className="navbar-text">{props.currentUser.first_name + " " + props.currentUser.last_name}</div>
                <button onClick={logout} className="btn btn-outline-danger ml-3">Logout</button>
            </Navbar>
}

export default Navigation