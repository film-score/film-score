import React from 'react'
import { Redirect } from '@reach/router'
import { Button, Form, Label, Input, Alert } from 'reactstrap'

const MessageBanner = (props) => {
    if (props.message) {
        return <Alert color={props.message.color}>{props.message.text}</Alert>
    }

    return null
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.state = { messages: null, loggedIn: props.loggedIn}
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        this.setState({...this.state, messages: null})
        console.log(this.state)

        const fields = new FormData(e.target)
        let email = fields.get('email')
        let password = fields.get('password')

        fetch('http://localhost:8080/users/auth', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    localStorage.setItem('jwt', data.token)
                })
                this.setState({ ...this.state, loggedIn: true })
            } else if (res.status === 401) {
                console.log(res)
                this.setState(() => {
                    return {
                        messages: {
                            color: "danger",
                            text: "Couldn't log in. Check your username and password."
                        }
                    }
                })
            } else {
                this.setState(() => {
                    return {
                        messages: {
                            color: "info",
                            text: res.status
                        }
                    }
                })
            }
            })
    }

    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to="/" noThrow />
        } else {
            return (
                <main id="login">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 + 'vh' }}>
                        <Form onSubmit={this.handleFormSubmit} className="form-signin text-center text-light" style={{width: 350+'px'}}>
                            <img className="mb-4" src="./logo.svg" alt="Film Score logo" width="250" />
                            <MessageBanner message={this.state.messages} />
                            <Label for="inputEmail" className="sr-only">Email address</Label>
                            <Input type="email" name="email" className="form-control" placeholder="Email address" required="" autoFocus="" style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                            <Label for="inputPassword" className="sr-only">Password</Label>
                            <Input type="password" name="password" className="form-control mb-3" placeholder="Password" required="" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}/>
                            {/* <div className="checkbox mb-3">
                                <Label>
                                    <Input type="checkbox" value="remember-me" /> Remember me
                                </Label>
                            </div> */}
                            <Button color="secondary" block size="lg" type="submit">Sign in</Button>
                            <p className="mt-5 mb-3 text-muted">©2018</p>
                        </Form>
                    </div>
                </main>
            )
        }
    }
}

export default LoginForm