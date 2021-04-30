import React, {memo} from 'react';
import '../Lottery.css';

// props 받아와 출력만 하는 component
// class : pureComponent로 생성(불필요한 랜더링 줄이도록)
// hooks 사용할 필요 없이 일반 함수 컴퍼넌트로 생성
// memo = pureComponent
const Ball = memo((props:any) => {
    const {number} = props;

    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }

    return (
        <div className="ball" style={{background}}>
            {number}
        </div>
    );
})

export default Ball;