import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, Table } from 'reactstrap'
import { Redirect, Link } from '@reach/router';

export class componentName extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         finished: false
      }
    }
    
  render() {

    return (
        !this.state.finished ? <Modal isOpen={this.props.modalState} toggle={this.props.modalToggle} backdrop="static" contentClassName="bg-secondary text-light" className="modal-dialog-centered" id="newScoreModal" tabindex="-1" role="dialog" aria-labelledby="newScoreModalTitle" aria-hidden="true">
                <ModalBody>
                    <div className="display-5">Score Results</div>
                    <h2 className="display-5 mb-3">{this.props.film.title}</h2>

                    <div className="mb-5 text-center">
                        <span className="display-1">{this.props.results.composite_score}</span><small className='display-4 text-dark'>/10</small>
                        <div className="small text-uppercase font-weight-bold">Composite Score</div>
                    </div>

                    <Table dark size="md">
                        <tr><th>Story</th><td>{this.props.results.story_score}</td></tr>
                        <tr><th>Performance</th><td>{this.props.results.performance_score}</td></tr>
                        <tr><th>Visuals</th><td>{this.props.results.visuals_score}</td></tr>
                        <tr><th>Audio</th><td>{this.props.results.audio_score}</td></tr>
                        <tr><th>Construction</th><td>{this.props.results.construction_score}</td></tr>
                    </Table>
                </ModalBody>
                <ModalFooter className="border-dark">
                    <Link className="btn btn-outline-light" to="/new-score">Score Another Film</Link>
                    <Link className="btn btn-info" to="/">I'm Done</Link>
                </ModalFooter>
        </Modal> : <Redirect to={this.state.redirect} noThrow />
    )
  }
}

export default componentName
