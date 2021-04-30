import React, {useState} from 'react';
import './RSP.css';

// class component life-cycle
// constructor => render => ref => componentDidMount =>
// (setState/props 바뀔 때 : shouldComponentUpdate => render => componentDidUpdate)
// 부모가 나를 없앴을 때 : componentWillUnmount => 소멸

interface RSPProps {
}

interface RSPState {
    result:any,
    score:any,
    imgCoord:any
}

const rspCoords = {
    rock:'0',
    scissor:'-142px',
    paper:'-284px'
}

const scores = {
    rock:1,
    scissor:0,
    paper:-1
}

export default class RSP extends React.Component<RSPProps, RSPState> {
    state:RSPState = {
        result:'',
        score:0,
        imgCoord:'0'
    }

    interval:any;

    // 첫 랜더 실행 후 실행(리랜더링 이후 실행 X)
    // 비동기 요청
    componentDidMount() {
        this.interval = setInterval(() => {
            const {imgCoord} = this.state;
            if (imgCoord == rspCoords.rock) {
                this.setState({
                    imgCoord:rspCoords.scissor
                })
            } else if (imgCoord == rspCoords.scissor) {
                this.setState({
                    imgCoord:rspCoords.paper
                })
            } else if (imgCoord == rspCoords.paper) {
                this.setState({
                    imgCoord:rspCoords.rock
                })
            }
        }, 1000)
    }

    // 리랜더링 이후 실행
    componentDidUpdate() {
    }

    // 컴퍼넌트 제거되기 직전
    // 비동기 요청 정리
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    onClickBtn = (input:any) => {
        console.log(input);
    }

    render() {
        const {result, score, imgCoord} = this.state;
        return(
        <React.Fragment>
            <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
            <div>
                <button id="rock" className="btn" onClick={() => this.onClickBtn('rock')}>Rock</button>
                <button id="scissor" className="btn" onClick={() => this.onClickBtn('scissor')}>Scissor</button>
                <button id="paper" className="btn" onClick={() => this.onClickBtn('paper')}>Paper</button>
            </div>
            <div>{result}</div>
            <div>Current Score : {score}</div>
        </React.Fragment>
        );
    }
}

// export default function RSP() {
//     const [result, setResult] = useState('');
//     const [score, setScore] = useState(0);
//     // 이미지 좌표
//     const [imgCoord, setImgCoord] = useState(0);

//     const onClickBtn = (input:any) => {
//         console.log(input);
//     }

//     return (
//         <React.Fragment>
//             <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
//             <div>
//                 <button id="rock" className="btn" onClick={() => onClickBtn('rock')}>Rock</button>
//                 <button id="scissor" className="btn" onClick={() => onClickBtn('scissor')}>Scissor</button>
//                 <button id="paper" className="btn" onClick={() => onClickBtn('paper')}>Paper</button>
//             </div>
//             <div>{result}</div>
//             <div>Current Score : {score}</div>
//         </React.Fragment>
//     );
// }