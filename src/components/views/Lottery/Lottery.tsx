import React from 'react';
import Ball from './Sections/Ball';

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

interface lotteryProps {
}

interface lotteryState {
    winNumbers:any,
    winBalls:any,
    bonus:any,
    redo:any
}

export default class Lottery extends React.Component<lotteryProps, lotteryState> {
    state:lotteryState = {
        winNumbers:getWinNumbers(),
        winBalls:[],
        bonus:null,
        redo:false
    }

    timeouts:any = [];

    componentDidMount() {
        const {winNumbers} = this.state;
        for (let i = 0; i < (this.state.winNumbers.length - 1); i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls:[...prevState.winBalls, winNumbers[i]]
                    }
                })
            // 1st : 1s / 2nd : 2s / 3rd : 3s...
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({bonus:winNumbers[6], redo:true});
        }, 7000);
    }

    componentWillUnmount() {
        // timeouts 배열 값 전부 지울 수 있도록
        this.timeouts.forEach((v:any) => {
            clearTimeout(v);
        })
    }

    onClickRedo = () => {
        console.log('click')
    }

    render() {
        const {winNumbers, winBalls, bonus, redo} = this.state;
        return(
            <React.Fragment>
                <div>Win Number</div>
                <div id="result">
                    {winBalls.map((v:any) => <Ball key={v} number={v} />)}
                </div>
                <div>Bonus Number</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>One More!</button>}
            </React.Fragment>
        );
    }
}