import React from 'react'
import LoaderIcon from '../LoaderIcon'

const ScoreFormFooter = (props) => {
    let leftButton = "", rightButton = ""

    if (props.pageNum !== 1) {
        leftButton = <button className="back-button btn btn-outline-secondary" onClick={props.changePage.prev}><i className="fa fa-chevron-left"></i> Back</button>
    }

    if (props.pageNum !== props.totalPages) {
        rightButton = <button className="next-button ml-auto btn btn-info" onClick={props.changePage.next}>Next <i className="fa fa-chevron-right"></i></button>
    } else {
        const submitValue = props.submittingForm ? <LoaderIcon location='button' /> : 'Check Your Film Score!'
        rightButton = <button className="next-button ml-auto btn btn-success"><i className="fa fa-check"></i> {submitValue}</button>
    }

    return (
        <section className="page-footer d-flex py-5 border-top border-secondary">
            {leftButton}
            {rightButton}
        </section>
    )
}

export default ScoreFormFooter
