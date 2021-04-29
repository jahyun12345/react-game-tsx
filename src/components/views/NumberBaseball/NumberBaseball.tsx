import React from 'react';
import Try from './Sections/Try';

interface NumberBaseballProps {

}

interface NumberBaseballState {
    value:any,
    result:any,
    answer:any,
    tries:[]
}

// 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {

}

export default class NumberBaseball extends React.Component<NumberBaseballProps, NumberBaseballState> {
    state:NumberBaseballState = {
        value:'',
        result:'',
        answer:getNumbers(),
        tries:[]
    }

    onChangeValue = (event:any) => {
        this.setState({value:event.target.value});
    }
    
    onSubmitResult = (event:any) => {
        event.preventDefault();
    }

    

    render() {
        return (
            <div style={{display:'flex', flexDirection:'column', fontSize:'1.5rem'}}>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitResult}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeValue}/>
                    <button type="submit" onClick={this.onSubmitResult}>input</button>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((item, index) => (
                        <Try key={index} />                        
                    ))}
                </ul>
            </div>
        );
    }
}