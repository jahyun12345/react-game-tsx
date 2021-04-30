import React, {useEffect, useState} from 'react';
import './RSP.css';

// *class component life-cycle*
// constructor => render => ref => componentDidMount =>
// (setState/props 바뀔 때 : shouldComponentUpdate => render => componentDidUpdate)
// 부모가 나를 없앴을 때 : componentWillUnmount => 소멸

const rspCoords:any = {
    rock:'0',
    scissor:'-142px',
    paper:'-284px'
}

const scores:any = {
    rock:-1,
    scissor:0,
    paper:1
}

const computerChoice = (imgCoord:any) => {
    let computerValue = '';
    if (Object.entries(rspCoords) !== undefined) {
        Object.entries(rspCoords).find(function(v) {
            if ((v !== undefined) && (v[1] === imgCoord)) {
                computerValue = v[0];
            }
        })
    }
    return computerValue;
}

// 랜더링 될 때 계속해서 다시 실행 됨
export default function RSP() {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    // 이미지 좌표
    const [imgCoord, setImgCoord] = useState('0');
    const interval:any = React.useRef(null);

    // componentDidMount && componentDidUpdate와 비슷한 역할
    // [] : componentDidMount
    // [xxx] : componentDidUpdate
    // state 값마다 다른 effect 원하는 경우 있기 때문에 여러번 사용 가능
    useEffect(() => {
        interval.current = setInterval(changeHand, 100);
        // componentWillUnmount 역할
        return () => {
            clearInterval(interval.current);
        }
        // [] 내의 변수 값이 바뀔 때마다 실행
    }, [imgCoord]);

    const onClickBtn = (input:any) => {
        // 가위바위보 멈춰서 점수 계산할 수 있도록
        clearInterval(interval.current);
        const myScore = scores[input];
        const cpuScore = scores[computerChoice(imgCoord)];
        const scoreResult = myScore - cpuScore;
        // 비김
        if (scoreResult === 0) {
            setResult('Try Again!');
        // 이김
        } else if ([-1, 2].includes(scoreResult)) {
            setResult('You Win!');
            setScore((prevScore:any) => {
                return prevScore + 1;
            })
        // 짐
        } else {
            setResult('You Lose!');
            setScore((prevScore:any) => {
                return prevScore - 1;
            })
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100)
        }, 500)
    }

    const changeHand = () => {
        if (imgCoord === rspCoords.rock) {
            setImgCoord(rspCoords.scissor);
        } else if (imgCoord === rspCoords.scissor) {
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper) {
            setImgCoord(rspCoords.rock);
        }
    }

    return (
        <React.Fragment>
            <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={() => onClickBtn('rock')}>Rock</button>
                <button id="scissor" className="btn" onClick={() => onClickBtn('scissor')}>Scissor</button>
                <button id="paper" className="btn" onClick={() => onClickBtn('paper')}>Paper</button>
            </div>
            <div>{result}</div>
            <div>Current Score : {score}</div>
        </React.Fragment>
    );
}

// interface RSPProps {
// }

// interface RSPState {
//     result:any,
//     score:any,
//     imgCoord:any
// }

// export default class RSP extends React.Component<RSPProps, RSPState> {
//     state:RSPState = {
//         result:'',
//         score:0,
//         imgCoord:'0'
//     }

//     interval:any;

//     // 첫 랜더 실행 후 실행(리랜더링 이후 실행 X)
//     // 비동기 요청
//     componentDidMount() {
//         this.interval = setInterval(this.changeHand, 100)
//     }

//     changeHand = () => {
//         const {imgCoord} = this.state;
//         if (imgCoord === rspCoords.rock) {
//             this.setState({
//                 imgCoord:rspCoords.scissor
//             })
//         } else if (imgCoord === rspCoords.scissor) {
//             this.setState({
//                 imgCoord:rspCoords.paper
//             })
//         } else if (imgCoord === rspCoords.paper) {
//             this.setState({
//                 imgCoord:rspCoords.rock
//             })
//         }
//     }

//     // 리랜더링 이후 실행
//     componentDidUpdate() {
//     }

//     // 컴퍼넌트 제거되기 직전
//     // 비동기 요청 정리
//     componentWillUnmount() {
//         clearInterval(this.interval);
//     }
    
//     onClickBtn = (input:any) => {
//         const {imgCoord} = this.state;
//         // 가위바위보 멈춰서 점수 계산할 수 있도록
//         clearInterval(this.interval);
//         const myScore = scores[input];
//         const cpuScore = scores[computerChoice(imgCoord)];
//         const scoreResult = myScore - cpuScore;
//         // 비김
//         if (scoreResult === 0) {
//             this.setState({result:'Try Again!'});
//         // 이김
//         } else if ([-1, 2].includes(scoreResult)) {
//             this.setState((prevState:any) => {
//                 return {
//                     result:'You Win!',
//                     score:prevState.score + 1
//                 }});
//         // 짐
//         } else {
//             this.setState((prevState:any) => {
//                 return {
//                     result:'You Lose!',
//                     score:prevState.score - 1
//                 }});        
//         }
//         setTimeout(() => {
//             this.interval = setInterval(this.changeHand, 100)
//         }, 500)
//     }

//     render() {
//         const {result, score, imgCoord} = this.state;
//         return(
//         <React.Fragment>
//             <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
//             <div>
//                 <button id="rock" className="btn" onClick={() => this.onClickBtn('rock')}>Rock</button>
//                 <button id="scissor" className="btn" onClick={() => this.onClickBtn('scissor')}>Scissor</button>
//                 <button id="paper" className="btn" onClick={() => this.onClickBtn('paper')}>Paper</button>
//             </div>
//             <div>{result}</div>
//             <div>Current Score : {score}</div>
//         </React.Fragment>
//         );
//     }
// }