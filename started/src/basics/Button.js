import React from 'react';

export function Button(props) {
    const click = () => props.action(props.increment)

    return (
        <button onClick={click}>
            +{props.increment}
        </button>
    )
}