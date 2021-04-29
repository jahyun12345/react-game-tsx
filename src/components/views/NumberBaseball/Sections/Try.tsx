import React from 'react';

interface TryProps {
    value:any,
    index:any
}

export default function Try(props:TryProps) {
    return (
        <li>
            <b>{props.value}</b> - {props.index}
        </li>
    );
}