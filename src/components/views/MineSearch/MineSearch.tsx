import React, {useReducer, createContext, useMemo} from 'react';
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
    dispatch:({}) => {}
});

const initialState:any = {
    tableData:[],
    timer:0,
    result:''
}

export const START_GAME = 'START_GAME';

const reducer = (state:any, action:any) => {
    switch (action.type) {
        case START_GAME: 
        return {
            ...state,
            tableData:plantMine(action.row, action.cell, action.mine)
        }
        default: return false;
    }
}

export default function MineSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, timer, result} = state;

    const value:any = useMemo(() => (
        {tableData:tableData, dispatch}
    ), [tableData]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
}