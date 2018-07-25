import React, { Component } from 'react'
import ScoreFormHeader from '../ScoreFormHeader'
import ScoreFormPage from '../ScoreFormPage'
import ScoreCalculator from './calculate.js'
import { Redirect } from '@reach/router'
import fields from './config'

export class ScoreForm extends Component {
    constructor(props) {
      super(props)

        this.changePage = {
            next: this.changePage.bind(this, 'INC'),
            prev: this.changePage.bind(this, 'DEC'),
        }
        
        this.state = {
            currentPage: 1,
            submittingForm: false
        }
    }
    
    changePage(direction, e) {
        e.preventDefault()
        document.querySelector('section.body').scrollTop = 0
        if (direction === 'INC') {
            this.setState({ currentPage: this.state.currentPage + 1 })
        } else if (direction === 'DEC') {
            this.setState({ currentPage: this.state.currentPage - 1 })
        }
    }

    formPages = (props) => {
        return props.fields.map((category, i) => {
            return <ScoreFormPage
                title={category.title}
                subcategories={category.subcategories}
                desc={category.desc}
                scale={category.scale}
                pageNum={i + 1}
                totalPages={props.fields.length}
                key={i}
                changePage={this.changePage}
                active={this.state.currentPage === i + 1 ? 'active' : ''}
                submittingForm={this.state.submittingForm}
            />
        })
    }

    submitNewScore = (e) => {
        e.preventDefault()

        const score = new ScoreCalculator().getScores(e.target)

        this.setState({ submittingForm: true })

        fetch('/api/scores', {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                film_id: this.props.film.id,
                user_id: 46,
                composite_score: score.composite,
                story_score: score.categories[0][1],
                performance_score: score.categories[1][1],
                visuals_score: score.categories[2][1],
                audio_score: score.categories[3][1],
                construction_score: score.categories[4][1]
            })
        })
            .then(this.setState({ submittingForm: true }))
            .then(data => data.json())
            .then(data => {
                this.setState({ submittingForm: false })
                this.props.scoreSubmitted(data[0])
            })
        
    }

  render() {
      const { film } = this.props

    return (
        <form id="newScore__form" className="text-light" onSubmit={this.submitNewScore}>
            <ScoreFormHeader title={film.title} />
            {this.formPages(fields)}
        </form>
    )
  }
}

export default ScoreForm
