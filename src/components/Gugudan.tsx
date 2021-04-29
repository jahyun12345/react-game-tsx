import React, {useState} from 'react';

export default function Gugudan() {
    const [first, setFirst] = useState(Math.floor(Math.random() * 9));
    const [second, setSecond] = useState(Math.floor(Math.random() * 9));
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    const submitResult = (event:any) => {
        event.preventDefault();
        if (parseInt(value) === (first * second)) {
            setInputValue(value);
            setResult('Correct!');
            setFirst(Math.floor(Math.random() * 9));
            setSecond(Math.floor(Math.random() * 9));
            setValue('');
        } else if (parseInt(value) !== (first * second)) {
            setInputValue(value);
            setResult('Uncorrect!');
            setValue('');
        }
    }

    return (
        <div style={{display:'flex', flexDirection:'column', fontSize:'1.5rem'}}>
            {first} x {second} ?
            <form onSubmit={(e) => submitResult(e)}>
                <input 
                    type="number" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                />
                <button 
                    type="submit" 
                    onClick={(e) => submitResult(e)}
                >
                    input
                </button>
            </form>
            <div style={{display:'flex'}}>
                {inputValue !== '' && <span style={{paddingRight:'5px'}}>= {inputValue} : </span>} {result}
            </div>
        </div>
    );
}