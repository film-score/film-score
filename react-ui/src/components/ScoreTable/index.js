import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';

export class ScoreTable extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
        //  scores: null
      }
    }
    
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

    componentDidMount() {
        if (!['users', 'films'].indexOf(this.props.type) === -1) { return }

        fetch(`/api/${this.props.type}/${this.props.id}/scores`, {
            credentials: 'include',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            }),
        })
            .then(data => data.json())
            .then(data => this.setState({scores: data}))
            .then(data => console.log(this.state.scores))
    }

    render() {
        if(this.state.scores) {
            return (
                <Table className="text-light" dark striped>
                <thead>
                    <tr>
                            {this.props.type === 'users' ?
                                <td>Film Title</td> :
                                <td>User</td>}
                        <td>Composite Score</td>
                        <td>Score Date</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(this.state.scores) ? this.state.scores.map((v, i) => {
                        return (
                            <tr>
                                {this.props.type === 'users' ? 
                                    <td>{v.film_info[0].title}</td> :
                                    <td>{v.user_id}</td>}
                                <td>{v.composite_score} / 10</td>
                                <td>{new Date(v.score_date).toDateString()}</td>
                                <td><button className='btn btn-sm btn-outline-danger' onClick={this.handleDelete.bind(this, v.id, i)}><FontAwesomeIcon icon='trash' /></button></td>
                            </tr>
                        )
                    }) : null}
                </tbody>
                </Table>
            )
        } else {
            return <div>Loading...</div>
        }
    }
}

export default ScoreTable
