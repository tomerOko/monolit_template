import React from "react"

interface IThisCompoenetProps {
    name: string,
    const: number,
}

const myComponent = (props : IThisCompoenetProps) => {
    return(
        <p>{props.name}</p>
    )
}