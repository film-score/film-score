import React, { PureComponent } from 'react'
import ScoreFormField from '../ScoreFormField'
import ScoreFormFooter from '../ScoreFormFooter'

export class ScoreFormPage extends PureComponent {
    constructor(props) {
        super(props)

        this.slug = props.title.replace(/\s+/g, '-').toLowerCase()
    }

    formFields = (subcategories) => {
        return subcategories.map((subcategory, i) => {
            return <ScoreFormField
                title={subcategory.title}
                desc={subcategory.description}
                scale={subcategory.scale}
            />
        })
    }

    render() {
        return (
            <fieldset className={"form-page mb-5 " + this.props.active} id={this.slug} data-category-scale={this.props.scale}>
                <h2 className="mb-3 pb-2 border-bottom border-secondary d-flex">{this.props.title} <small className="ml-auto">{this.props.pageNum}/{this.props.totalPages}</small></h2>

                <section className="pl-3 pr-3">
                    {this.formFields(this.props.subcategories)}
                </section >

                <ScoreFormFooter {...this.props} />
            </fieldset >
        )
    }
}

export default ScoreFormPage
