import React, { Component } from 'react'
import { Router, Redirect } from '@reach/router'

import NavBar from './components/Navbar'
import Footer from './components/Footer/index'
import UserDashboard from './containers/UserDashboard'
import NewScore from './containers/NewScore'
import Login from './containers/Login'
import Admin from './containers/Admin'

import './app.css'
import 'bootstrap/dist/css/bootstrap.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faList, faTrash, faCogs } from '@fortawesome/free-solid-svg-icons'

library.add(faStar)
library.add(faList)
library.add(faTrash)
library.add(faCogs)

const userIsAuthenticated = () => {
  return localStorage.getItem('jwt') ? true : false
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userLoaded: false,
      currentUser: {},
    }
  }

  componentDidMount = () => {
    if (userIsAuthenticated()) {
      fetch('/api/users', {
        credentials: 'include',
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        })
      })
        .catch((error) => {
          console.error(error)
        })
        .then((resp) => resp.json())
        .then((data) => {
          fetch(`/api/users/${data.id}`, {
            credentials: 'include',
            headers: new Headers({
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
              'Content-Type': 'application/json'
            })
          })
            .catch((error) => {
              console.error(error)
            })
            .then((resp) => resp.json())
            .then((data) => {
              data = data[0]

              this.setState({
                userLoaded: true,
                currentUser: {
                  id: data.id,
                  first_name: data.first_name,
                  last_name: data.last_name,
                  email: data.email,
                  account_type: data.account_type,
                }
              })
            })
        })
    }
  }

  render() {
    if(!userIsAuthenticated()) {
      return <Redirect to='/login' noThrow />
    } else {
      if (!this.state.userLoaded) {
        return <div id="loading"><img src='./logo.svg' /></div>
      }

      return <main id="home" className="mt-5">
        <NavBar currentUser={this.state.currentUser} />
          <Router>
            <UserDashboard path='/' currentUser={this.state.currentUser} />
            <NewScore path='/new-score' />
            <Admin path='/admin' />
          </Router>
        <Footer />
      </main>
    }
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Login path='/login' loggedIn={userIsAuthenticated()} />
        <Home path='/*' />
      </Router>
    )
  }
}

export default App
