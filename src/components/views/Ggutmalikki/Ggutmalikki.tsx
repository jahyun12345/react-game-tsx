import React, {useEffect, useState} from 'react';

export default function Ggutmalikki() {
    const inputRef:any = React.useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const [word, setWord] = useState('꿀단지');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const onChangeValue = (event:any) => {
        setValue(event.currentTarget.value);
    }

    const onSubmitResult = (event:any) => {
        event.preventDefault();
        if (word[(word.length - 1)] === value[0]) {
            setResult('Good!');
            setWord(value);
            setValue('');
        } else if (word[(word.length - 1)] !== value[0]) {
            setResult('Try Again!');
            setValue('');
        }
        inputRef.current.focus();
    }

    return (
        <div style={{display:'flex', flexDirection:'column', fontSize:'1.5rem'}}>
            {word}
            <form onSubmit={onSubmitResult}>
                <input ref={inputRef} value={value} onChange={onChangeValue} />
                <button type="submit" onClick={onSubmitResult}>input</button>
            </form>
            {result}
        </div>
    );
}