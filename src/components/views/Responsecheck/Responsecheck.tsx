import React, {useState} from 'react';
import './Responsecheck.css';

interface ResponsecheckProps {
}

interface ResponsecheckState {
    state:any,
    message:any,
    result:any
}

export default class Responsecheck extends React.Component<ResponsecheckProps, ResponsecheckState> {
    state:ResponsecheckState = {
        state:'waiting',
        message:'Click to Start!',
        result:[]
    }

    timeout:any;
    startTime:any;
    endTime:any;

    onClickScreen = () => {
        const { state, message, result} = this.state;
        if (state === 'waiting') {
            this.setState({
                state:'ready',
                message:'Click when it\'s Green!'
            })
            this.timeout = window.setTimeout(() => {
                this.setState({
                    state:'now',
                    message:'Click Now'
                })
                this.startTime = new Date();
                // 2~3초 랜덤
            }, (Math.floor(Math.random() * 1000) + 2000));
            console.log({timeout_1:this.timeout});
        } else if (state === 'ready') {
            console.log({timeout_2:this.timeout});
            window.clearTimeout(this.timeout);
            this.setState({
                state:'waiting',
                message:'Too fast! Click when it\'s Green!'
            })
        } else if (state === 'now') {
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state:'waiting',
                    message:'Click to Start!',
                    result:[...prevState.result, (this.endTime - this.startTime)]
                }
            })
        }
    }

    onReset = () => {
        this.setState({result:[]});
    }

    renderAverage = () => {
        const { result } = this.state;
        return (
            result.length > 0 &&
            <React.Fragment>
                <div>Average-Time : {result.reduce((a:any, c:any) => a + c) / result.length}ms</div>
                <button onClick={this.onReset}>reset</button>
            </React.Fragment>
        );
    }
    
    render() {
        return (
        <React.Fragment>
            <div
                id="screen"
                className={this.state.state}
                onClick={this.onClickScreen}
            >
                {this.state.message}
            </div>
            {this.renderAverage()}
        </React.Fragment>
        );
    }
}

// export default function Responsecheck() {
//     const [state, setState] = useState('waiting');
//     const [message, setMessage] = useState('Click to Start!');
//     const [result, setResult] = useState(Array());

//     let timeout = 0;

//     const onClickScreen = () => {
//         if (state === 'waiting') {
//             setState('ready');
//             setMessage('Click when it\'s Green!');
//             timeout = window.setTimeout(() => {
//                 setState('now');
//                 setMessage('Click Now!');
//                 // 2~3초 랜덤
//             }, (Math.floor(Math.random() * 1000) + 2000));
//             console.log({timeout_1:timeout});
//         } else if (state === 'ready') {
//             console.log({timeout_2:timeout})
//             // window.clearTimeout(timeout);
//             setState('waiting');
//             setMessage('Too fast! Click when it\'s Green!');
//         } else if (state === 'now') {
//             setState('waiting');
//             setMessage('Click to Start!');
//             setResult([]);
//         }
//     }

//     const renderAverage = () => {
//         return (
//             result.length > 0 &&
//             <div>Average Time : {result.reduce((a:any, c:any) => a + c) / result.length}ms</div>
//         );
//     }

//     return (
//         <React.Fragment>
//         <div
//             id="screen"
//             className={state}
//             onClick={onClickScreen}
//         >
//             {message}
//         </div>
//         {renderAverage()}
//         </React.Fragment>
//     );
// }