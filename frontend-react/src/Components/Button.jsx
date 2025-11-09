import React from 'react'

const Button = (props) => {
    return (
        <>
            <a className ={`btn ${props.class}`}>{props.text}</a>
        </>
    )
}

export default Button