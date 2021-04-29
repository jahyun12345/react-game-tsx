import React from 'react';

interface TryProps {
    tryInfo:any,
    index:any
}

export default function Try(props:TryProps) {
    return (
        <li>
            <div>{props.tryInfo.try}</div>
            <div>{props.tryInfo.result}</div>
        </li>
    );
}