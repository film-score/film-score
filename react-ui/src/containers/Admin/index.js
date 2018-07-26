import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { ScoreTable } from '../../components/ScoreTable'

const bcrypt = require('bcryptjs')

const AddUserForm = () => {
    const hashPass = (password) => {
        const   salt = bcrypt.genSaltSync(10),
                hash = bcrypt.hashSync(password, salt)

        return hash
    }

    const addUser = (e) => {
        e.preventDefault()
        const fields = e.target.elements,
            body = {
                first_name: fields.namedItem('add-user__first_name').value,
                last_name: fields.namedItem('add-user__last_name').value,
                email: fields.namedItem('add-user__email').value,
                password: hashPass(fields.namedItem('add-user__password').value),
            }

        console.log(body)

        fetch('/api/users', {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            }),    
            body: JSON.stringify(body)
        })
            .then(data => data.json())
            .then(data => alert(`User created! ID #${data[0].id}`))
    }

    return (
        <form class="form form-horizontal text-light" id="addUser" onSubmit={addUser.bind(this)}>
            <h2>Add a User</h2>
            <div class="form-row align-items-center">
                <div class="col">
                    <input type="text" class="form-control" id="add-user__first_name" placeholder="First Name" />
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="add-user__last_name" placeholder="Last Name" />
                </div>
                <div class="col">
                    <input type="email" class="form-control" id="add-user__email" placeholder="Email" />
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="add-user__password" placeholder="Password" />
                </div>
                <div class="col">
                    <input type="submit" class="btn btn-info" value="Add" />
                </div>
            </div>
        </form>
    )
}

const DeleteScoreForm = () => {
    return (
        <form class="form form-horizontal text-light">
            <h2>Delete a Score</h2>
            <div class="form-row align-items-center">
                <div class="col-8">
                    <input type="number" class="form-control" id="delete_id" placeholder="ID of Score to Delete" />
                </div>
                <div class="col-4">
                    <input type="submit" class="btn btn-danger" value="Delete" />
                </div>
            </div>
        </form>
    )
}

const DeleteUserForm = () => {
    return (
        <form class="form form-horizontal text-light">
            <h2>Delete a User</h2>
            <div class="form-row align-items-center">
                <div class="col-8">
                    <input type="number" class="form-control" id="delete_id" placeholder="ID of User to Delete" />
                </div>
                <div class="col-4">
                    <input type="submit" class="btn btn-danger" value="Delete" />
                </div>
            </div>
        </form>
    )
}

class UserLookupForm extends Component {
    constructor(props) {
        super(props)

        this.loadUser = this.loadUser.bind(this)

        this.state = {
            user: null
        }
    }

    loadUser = (e) => {
        e.preventDefault()
        let id = e.target.elements['user_id'].value
        fetch(`/api/users/${id}`, {
            credentials: 'include',
            headers: new Headers({
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            })
        })
            .then(res => {
                if (res.status !== 200) {
                    return res
                }

                return res
            })
            .then(data => data.json())
            .then(data => this.setState({user: data}))
    }

    render() {
        return (
            <section class="mb-5">
                <form class="form form-horizontal text-light mb-3" onSubmit={this.loadUser}>
                    <h2>Get a Users' Stats</h2>
                    <div class="form-row align-items-center">
                        <div class="col-8">
                            <input type="number" class="form-control" id="user_id" placeholder="ID of User" />
                        </div>
                        <div class="col-4">
                            <input type="submit" class="btn btn-success" value="Go!" />
                        </div>
                    </div>
                </form>
                {Array.isArray(this.state.user) ? <h3 class='text-light'>{this.state.user[0].first_name} {this.state.user[0].last_name}</h3> : null}
                {Array.isArray(this.state.user) ? <ScoreTable type='users' id={this.state.user[0].id} /> : null}
            </section>
        )
    }
}

export class Admin extends Component {
    handleDelete = (id, row, e) => {
        if (window.confirm('Are you sure you want to delete this score?')) {
            fetch(`/api/scores/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                    'Content-Type': 'application/json'
                }),
            })
                .catch((err) => alert(err))
                .then(() => {
                    let scores = [...this.state.scores]
                    scores.splice(row, 1)
                    this.setState({ scores: scores })
                })
        } else {
            return null
        }
    }

    getUser = (userId) => {
        fetch(`/api/users/${userId}/scores`)
            .catch(err => console.error(err))
            .then(data => data.json())
            .then(data => data.length ? this.setState({ scores: data, ready: true }) : this.setState({ noScores: true, ready: true }))
    }

  render() {
    return (
        <section id="admin" className="body pt-5 visible">
            <Container className="pb-5">
                <h1 class='display-1 text-light'>Admin Tools</h1>
                <hr />
                <UserLookupForm />
                <hr />
                <AddUserForm />
                {/* <hr />
                <DeleteScoreForm />
                <hr />
                <DeleteUserForm /> */}
            </Container>
        </section>
    )
  }
}

export default Admin
