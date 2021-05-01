import React, {useReducer, createContext, useMemo, useEffect} from 'react';
import './MineSearch.css';
import Form from './Sections/Form';
import Table from './Sections/Table';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0 // 0 이상이면 opened 되도록
}

const plantMine = (row:any, cell:any, mine:any) => {
    console.log({row:row, cell:cell, mine:mine});
    // 전체 칸
    const candidate:any = [];
    for (let i = 0; i < row * cell; i++) {
        candidate.push(i);
    }
    // 지뢰가 있는 칸(위치 섞임)
    const shuffle = [];
    while (candidate.length > ((row * cell) - mine)) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    // 2차원 배열 생성 => table 데이터
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData:any = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    // table 데이터에 지뢰 넣음
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log({data:data});
    return data;
}

export const TableContext = createContext({
    tableData:[
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-7, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -7, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -7, -1],
        [-1, -7, -1, -1, -1, -1, -1, -1]
    ],
    halted:true,
    dispatch:({}) => {}
});

const initialState:any = {
    tableData:[],
    data:{
        row:0,
        cell:0,
        mine:0
    },
    timer:0,
    result:'',
    halted:true,
    openedCount:0
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state:any, action:any) => {
    switch (action.type) {
        case START_GAME: 
            return {
                ...state,
                data:{
                    row:action.row, 
                    cell:action.cell, 
                    mine:action.mine
                },
                tableData:plantMine(action.row, action.cell, action.mine),
                halted:false,
                timer:0
            }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            // tableData[row] = [...state.tableData[row]];
            // 모든 칸의 데이터 가져옴
            tableData.forEach((row:any, i:any) => {
                tableData[i] = [...state.tableData[i]];
            })
            const checked:any = [];
            let openedCount:any = 0;
            const checkAround = (row:any, cell:any) => {
                // 이미 열려있는 칸에서 작동되지 않도록 설정
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes([row][cell])) {
                    return;
                }
                // 상하좌우 칸이 아닌 경우 작동되지 않도록 설정
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
                    return;
                }
                // 이미 검사한 칸
                if (checked.includes(row + ',' + cell)) {
                    return;
                // 검사 X => checked에 넣어줌
                } else {
                    checked.push(row + ',' + cell);
                }
                // tableData[row][cell] = CODE.OPENED;
                openedCount += 1;
                // 남은 지뢰 개수 표시
                let around:any = [];
                if (tableData[row - 1]) {
                    around = around.concat(
                        tableData[row - 1][cell - 1], 
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1]
                    );
                }
                around = around.concat(
                    tableData[row][cell - 1], 
                    tableData[row][cell + 1],
                )
                if (tableData[action.row + 1]) {
                    around = around.concat(
                        tableData[row + 1][cell - 1], 
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1]
                    );
                }
                // 좌우칸 없는 경우 필터링 되어서 사라짐
                const count = around.filter((v:any) => 
                    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
                ).length;
                tableData[row][cell] = count;
                // 지뢰 없는 부분 한 번에 열리도록
                // 클릭한 칸이 빈 칸이면 주변 다 체크
                if (count === 0) {
                    const near = [];
                    if (row - 1 > - 1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 > tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    // 좌우칸 없는 경우 필터링 되어서 사라짐
                    near.forEach((n:any) => {
                        if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                } else {

                }
            }
            checkAround(action.row, action.cell);
            let halted = false;
            let result = '';
            // win
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                 halted = true; 
            }
                 result = `${state.timer}s You win!`;
            return {
                ...state,
                tableData,
                openedCount:state.openedCount + openedCount,
                halted,
                result
            }
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted:true
            }
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData
            }
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData
            }
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer:state.timer + 1
            }
        }

        default: return false;
    }
}

export default function MineSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, timer, result, halted} = state;

    const value:any = useMemo(() => (
        {tableData:tableData, halted:halted, dispatch}
    ), [tableData, halted]);

    useEffect(() => {
        let timer:any;
        if (!halted) {
            timer = setInterval(() => {
                dispatch({type:INCREMENT_TIMER});
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        }
    }, [halted])

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
}