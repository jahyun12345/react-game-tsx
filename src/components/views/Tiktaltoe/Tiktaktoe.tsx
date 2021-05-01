import React, {useReducer, useCallback} from 'react';
import './Tiktaktoe.css';
import Table from './Sections/Table';

// useState로 정의하는 state 값들 정의
const initialState:any = {
    winner:'',
    turn:'O',
    tableData:[
        ['','',''],
        ['','',''],
        ['','','']
    ]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

// state 어떻게 바꿀지 정의
const reducer = (state:any, action:any) => {
    switch (action.type) {
        case SET_WINNER:
            // ...state : 객체값 복사하여 새로운 객체 생성
            // state 값을 직접 바꾸지 않고 복사한 값을 수정하여 저장
            return {
                ...state,
                winner: action.winner,
            }
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            // immer : 가독성 해결 library 사용 가능
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
    }

}

// useReducer : 하나의 state와 setState로 통일 가능
export default function Tiktaktoe() {
    // dispatch 통해 state 값 update
    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback(() => {
        dispatch({type:SET_WINNER, winner:'O'});
    }, []);

    return(
        <React.Fragment>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner} win!</div>}
        </React.Fragment>
    );
}

// interface TiktaktoProps {
// }

// interface TiktaktoState {

// }

// export default class Tiktaktoe extends React.Component<TiktaktoProps, TiktaktoState> {
//     render() {
//         return (
//             <React.Fragment>
//                 <Table />
//                 {winner && <div>{winner} win!</div>}
//             </React.Fragment>
//         );
//     }
// }