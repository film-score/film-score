import React from 'react'

const LoaderIcon = (props) => {
    if (props.location === 'button') {
        return (
          <div className='loader'>
            <div className='loader-bar'></div>
            <div className='loader-bar'></div>
            <div className='loader-bar'></div>
          </div>
        )
    }
}

export default LoaderIcon
