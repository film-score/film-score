import React from 'react'

const RangeInput = (props) => {
    let checkboxes = []

    for (let i = 1; i <= 10; i++) {
        let slug = props.slug + '_' + i

        checkboxes.push(<div className="d-flex flex-column text-center" key={slug}>
            <input className="mb-2" type="radio" name={props.slug} id={slug} value={i} />
            <label className="text-secondary" htmlFor={slug}>{i}</label>
        </div>)
    }

    return <div className="d-flex justify-content-between">{checkboxes}</div>
}

const ScoreFormField = (props) => {
    const slug = props.title.replace(/[\s+\/]/g, '-').toLowerCase()
    
    return (
        <div className="form-group mb-5" id={slug} data-subcategory-scale={props.scale} key={slug}>
            <h6 className="small text-secondary">{props.title}</h6>
            <p>{props.desc}</p>
            <RangeInput slug={slug} />
        </div>
    )
}

export default ScoreFormField
