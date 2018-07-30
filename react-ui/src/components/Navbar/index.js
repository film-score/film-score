import React from "react"
import { Navbar, Nav, NavbarBrand, NavItem, Collapse, NavbarToggler } from "reactstrap"
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

class Navigation extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)

        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return <Navbar color="dark" dark expand="md" className="fixed-top">
                    
                    <NavbarBrand href="/">
                        <img src="./logo.svg" alt="Film Score" width="150px"/>
                    </NavbarBrand>
    
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        
                        <Nav navbar className="mr-auto">
                            <NavLink to="/" icon="list" label="Dashboard" />
                            <NavLink to="/new-score" icon="star" label="New Score" />
                            {this.props.currentUser.account_type === 'admin' ? <NavLink to="/admin" icon="cogs" label="Admin" /> : null}
                        </Nav>
    
                        <hr class="hidden-sm-up" />
                        <div className="d-flex justify-content-between">
                            <div className="navbar-text">{this.props.currentUser.first_name + " " + this.props.currentUser.last_name}</div>
                            <button onClick={logout} className="btn btn-outline-danger ml-3">Logout</button>
                        </div>
    
                    </Collapse>
                    
                </Navbar>
    }
}

export default Navigation