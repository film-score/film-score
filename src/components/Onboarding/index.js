import React from 'react'
import { Link } from '../../../node_modules/@reach/router'
import { Modal, ModalBody, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Onboarding = (props) => {
  return (
      <Modal isOpen={true} backdrop='static' centered size='lg' id='onboard'>
        <ModalBody className="p-5">
            <Row className="d-flex align-items-center">
            <Col>
                <h1 className='display-3 mb-2'>Welcome to <strong>Film Score</strong>.</h1>
                <p className='mb-5'>Hey there, {props.user.first_name}. Thanks for joining us! Looks like you haven't scored any films yet, so why not get started?</p>
                <Link to='/new-score' className='btn btn-danger btn-lg'><FontAwesomeIcon icon="star" className="mr-3"/>Score Your First Film Now!</Link> 
            </Col>
            <Col>
                <img src='./onboarding.svg' class='img-fluid' />
            </Col>
        </Row>
        </ModalBody>
    </Modal>
  )
}

export default Onboarding
