import React, {useEffect, useState} from 'react';

export default function Gugudan() {
    // var input:any;
    const inputRef:any = React.useRef(null);

    useEffect(() => {
        // document.querySelector('input')?.focus();
        // input.focus();
        inputRef.current.focus();
    }, []);

    const [first, setFirst] = useState(Math.floor(Math.random() * 9));
    const [second, setSecond] = useState(Math.floor(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const onChangeValue = (event:any) => {
        setValue(event.target.value);
    }

    const onSubmitResult = (event:any) => {
        event.preventDefault();
        // document.querySelector('input')?.focus();
        // input.focus();
        inputRef.current.focus();

        if (parseInt(value) === (first * second)) {
            setResult('=' + value + ' : Correct!');
            setFirst(Math.floor(Math.random() * 9));
            setSecond(Math.floor(Math.random() * 9));
            setValue('');
        } else if (parseInt(value) !== (first * second)) {
            setResult('=' + value + ' : Uncorrect!');
            setValue('');
        }
    }


    return (
        <div style={{display:'flex', flexDirection:'column', fontSize:'1.5rem'}}>
            {first} x {second} ?
            <form onSubmit={onSubmitResult}>
                <input 
                    type="number" 
                    value={value} 
                    onChange={onChangeValue} 
                    // ref={(c) => input = c}
                    ref={inputRef}
                />
                <button 
                    type="submit" 
                    onClick={onSubmitResult}
                >
                    input
                </button>
            </form>
            {result}
        </div>
    );
}