import React from 'react';
import { Container } from 'reactstrap'
import Jumbotron from '../../components/DashboardJumbotron'
import Table from '../../components/DashboardTable'
import Onboarding from '../../components/Onboarding'

class UserDashboard extends React.Component {
    constructor(props) {
        super(props)

        this.props = props

        this.state = {
            scores: [],
            ready: false,
            noScores: false
        } 
    }

    componentDidMount() {
        fetch(`http://localhost:8080/users/${this.props.currentUser.id}/scores`)
        .then(data => data.json())
        .then(data => data.length ? this.setState({ scores: data, ready: true }) : this.setState({ noScores: true, ready: true }))
    }

    render() {
        let visible = this.state.ready ? "visible" : ""

        return (
            <section id="dashboard" className={"body pt-5 " + visible}>
                {!this.state.noScores ?
                <Container className="pb-5">
                    <Jumbotron currentUser={{ ...this.props.currentUser, filmsScored: this.state.scores.length }} />
                     <Table rows={this.state.scores}/>
                </Container>
                :
                <Onboarding user={this.props.currentUser} />}
            </section>
        )
    }
}

export default UserDashboard