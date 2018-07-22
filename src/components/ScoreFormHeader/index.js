import React from 'react'

const ScoreFormHeader = (props) => {
  return (
      <legend class="mb-5">
          <h1 className="display-5 text-secondary">New Score</h1>
          <h2 className="display-2">{props.title}</h2>
      </legend>
  )
}

export default ScoreFormHeader
