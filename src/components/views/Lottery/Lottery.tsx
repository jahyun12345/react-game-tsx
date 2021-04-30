import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Ball from './Sections/Ball';

// useMemo : 함수 리턴 값 기억
// useCallback : 함수 자체 기억 => useEffect처럼 변화값 설정 필요
// useCallback : 자식 component에 props로 함수 전달할 때 사용 필요

// state 사용하지 않는 method 편리 위해 분리
function getWinNumbers() {
    console.log('getWinNumbers called');
    const candidate = [];
    for (let i = 1; i <= 45; i++) {
        candidate.push(i);
    }
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[(shuffle.length - 1)];
    const winNumbers = shuffle.slice(0,6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

export default function Lottery() {
    // state 값이 바뀌어도 함수 리턴 값을 기억하고 있기 때문에 한 번만 실행
    const lotteryNumbers = useMemo(() => getWinNumbers(),  []);
    type WinNumbers = any;
    const [winNumbers, setWinNumbers] = useState<WinNumbers>(lotteryNumbers);
    const [winBalls, setWinBalls] = useState(Array());
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts:any = React.useRef([]);

    useEffect(() => {
        runTimeouts();
        return () => {
            timeouts.current.forEach((v:any) => {
                clearTimeout(v);
            })
        }
    }, [timeouts.current])

    const runTimeouts = () => {
        for (let i = 0; i < (winNumbers.length - 1); i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls:any) => [...prevWinBalls, winNumbers[i]]);
            // 1st : 1s / 2nd : 2s / 3rd : 3s...
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    }

    const onClickRedo = () => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }

    return(
        <React.Fragment>
            <div>Win Number</div>
            <div id="result">
                {winBalls.map((v:any) => <Ball key={v} number={v} />)}
            </div>
            <div>Bonus Number</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>One More!</button>}
        </React.Fragment>
    );
}

// interface lotteryProps {
// }

// interface lotteryState {
//     winNumbers:any,
//     winBalls:any,
//     bonus:any,
//     redo:any
// }

// export default class Lottery extends React.Component<lotteryProps, lotteryState> {
//     state:lotteryState = {
//         winNumbers:getWinNumbers(),
//         winBalls:[],
//         bonus:null,
//         redo:false
//     }

//     timeouts:any = [];

//     runTimeouts = () => {
//         const {winNumbers} = this.state;
//         for (let i = 0; i < (this.state.winNumbers.length - 1); i++) {
//             this.timeouts[i] = setTimeout(() => {
//                 this.setState((prevState) => {
//                     return {
//                         winBalls:[...prevState.winBalls, winNumbers[i]]
//                     }
//                 })
//             // 1st : 1s / 2nd : 2s / 3rd : 3s...
//             }, (i + 1) * 1000);
//         }
//         this.timeouts[6] = setTimeout(() => {
//             this.setState({bonus:winNumbers[6], redo:true});
//         }, 7000);
//     }

//     componentDidMount() {
//         this.runTimeouts();
//     }

//     componentDidUpdate(prevProps:any, prevState:any) {
//         // if condition 설정 필요
//         if (this.state.winBalls.length === 0) {
//             this.runTimeouts();
//         }
//     }

//     componentWillUnmount() {
//         // timeouts 배열 값 전부 지울 수 있도록
//         this.timeouts.forEach((v:any) => {
//             clearTimeout(v);
//         })
//     }

//     onClickRedo = () => {
//         this.setState({
//             winNumbers:getWinNumbers(),
//             winBalls:[],
//             bonus:null,
//             redo:false
//         })
//         this.timeouts = [];
//     }

//     render() {
//         const {winNumbers, winBalls, bonus, redo} = this.state;
//         return(
//             <React.Fragment>
//                 <div>Win Number</div>
//                 <div id="result">
//                     {winBalls.map((v:any) => <Ball key={v} number={v} />)}
//                 </div>
//                 <div>Bonus Number</div>
//                 {bonus && <Ball number={bonus} />}
//                 {redo && <button onClick={this.onClickRedo}>One More!</button>}
//             </React.Fragment>
//         );
//     }
// }