import React, {useState} from 'react';
import Try from './Sections/Try';

// 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
    const candidate = [];
    for (let i = 1; i < 10; i++) {
        candidate.push(i);
    }
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

export default function NumberBaseball() {
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState(Array());

    const onChangeValue = (event:any) => {
        setValue(event.target.value);
    }
    
    const onSubmitResult = (event:any) => {
        event.preventDefault();
        // 다 맞음
        if (value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries:any) => { return [...prevTries, {try:value, result:'홈런!'}]});
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        // 틀림
        } else {
            const answerArray = value.split('').map((value:any) => parseInt(value));
            let strike = 0;
            let ball = 0;
            // 다 틀림
            if (tries.length >= 10) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            // 아직 기회 있음
            } else {
                for (let i = 0; i <4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike++;
                    } else if (answer.includes(answerArray[i])) {
                        ball++;
                    }
                }
                setTries((prevTries:any) => { return [...prevTries, {try:value, result:`${strike} 스트라이크, ${ball} 볼입니다.`}]});
            }
        }
    }

    return (
        <div style={{display:'flex', flexDirection:'column', fontSize:'1.5rem'}}>
            <h1>{result}</h1>
            <form onSubmit={onSubmitResult}>
                <input maxLength={4} value={value} onChange={onChangeValue}/>
                <button type="submit" onClick={onSubmitResult}>input</button>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((item:any, index:any) => (
                    <Try key={index} tryInfo={item} index={index} />                        
                ))}
            </ul>
        </div>
    );
}

// interface NumberBaseballProps {
// }

// interface NumberBaseballState {
//     value:any,
//     result:any,
//     answer:any,
//     tries:any
// }


// class NumberBaseballClass extends React.Component<NumberBaseballProps, NumberBaseballState> {
//     state:NumberBaseballState = {
//         value:'',
//         result:'',
//         answer:getNumbers(),
//         tries:[]
//     }

//     onChangeValue = (event:any) => {
//         this.setState({value:event.target.value});
//     }
    
//     onSubmitResult = (event:any) => {
//         event.preventDefault();
//         // 다 맞음
//         if (this.state.value === this.state.answer.join('')) {
//             this.setState((prevState:any) => {
//                 result:'홈런!',
//                 tries:[...this.prevState.tries, {try:this.state.value, result:'홈런!'}]
//             });
//             alert('게임을 다시 시작합니다!');
//             this.setState({
//                 value:'',
//                 answer:getNumbers(),
//                 tries:[]
//             });
//         // 틀림
//         } else {
//             const answerArray = this.state.value.split('').map((value:any) => parseInt(value));
//             let strike = 0;
//             let ball = 0;
//             // 다 틀림
//             if (this.state.tries.length >= 10) {
//                 this.setState({
//                     result:`10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`
//                 });
//                 alert('게임을 다시 시작합니다!');
//                 this.setState({
//                     value:'',
//                     answer:getNumbers(),
//                     tries:[]
//                 });
//             // 아직 기회 있음
//             } else {
//                 for (let i = 0; i <4; i++) {
//                     if (answerArray[i] === this.state.answer[i]) {
//                         strike++;
//                     } else if (this.state.answer.includes(answerArray[i])) {
//                         ball++;
//                     }
//                 }
//                 this.setState((prevState:any) =>{
//                     tries:[...this.prevState.tries, {try:this.state.value, result:`${strike} 스트라이크, ${ball} 볼입니다.`}]
//                 });
//             }
//         }
//     }

//     render() {
//         return (
//             <div style={{display:'flex', flexDirection:'column', fontSize:'1.5rem'}}>
//                 <h1>{this.state.result}</h1>
//                 <form onSubmit={this.onSubmitResult}>
//                     <input maxLength={4} value={this.state.value} onChange={this.onChangeValue}/>
//                     <button type="submit" onClick={this.onSubmitResult}>input</button>
//                 </form>
//                 <div>시도 : {this.state.tries.length}</div>
//                 <ul>
//                     {this.state.tries.map((item:any, index:any) => (
//                         <Try key={index} tryInfo={item} index={index} />                        
//                     ))}
//                 </ul>
//             </div>
//         );
//     }
// }