import React, {useEffect, useReducer, useCallback} from 'react';
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
    ],
    recentCell:Array(-1, -1)
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

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
                tableData,
                recentCell:[action.row, action.cell]
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn:'O',
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell:Array(-1, -1)
            }
        }
        default: return state;
    }
}

// useReducer : 하나의 state와 setState로 통일 가능
export default function Tiktaktoe() {
    // dispatch 통해 state 값 update
    const [state, dispatch] = useReducer(reducer, initialState);
    const {winner, turn, tableData, recentCell} = state;
    // 비동기 처리 위해 설정
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        // 가로
        if ((tableData[row][0] === turn) && (tableData[row][1] === turn) && (tableData[row][2] === turn)) {
            win = true;
        }
        // 세로
        if ((tableData[0][cell] === turn) && (tableData[1][cell] === turn) && (tableData[2][cell] === turn)) {
            win = true;
        }
        // 대각선
        if ((tableData[0][0] === turn) && (tableData[1][1] === turn) && (tableData[2][2] === turn)) {
            win = true;
        }
        if ((tableData[0][2] === turn) && (tableData[1][1] === turn) && (tableData[2][0] === turn)) {
            win = true;
        }
        if (win) {
            dispatch({type:SET_WINNER, winner:turn});   
            dispatch({type:RESET_GAME});     
        } else {
            // all => true : 칸이 다 참 / false : 칸이 다 안 참 
            // all = true : 무승부
            let all = true;
            // 무승부 검사
            tableData.forEach((row:any) => {
                row.forEach((cell:any) => {
                    if (!cell) {
                        all = false;
                    }
                });
            }); 
            if (all) {
                dispatch({type:RESET_GAME});     
            } else {
                // td에서 비동기로 실행되어 버그 발생하므로 winner 없을 때 실행되도록 설정
                dispatch({type:CHANGE_TURN});
            }
        }
    }, [tableData])

    const onClickTable = useCallback(() => {
        dispatch({type:SET_WINNER, winner:'O'});
    }, []);

    return(
        <React.Fragment>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner} win!</div>}
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