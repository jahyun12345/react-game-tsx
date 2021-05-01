import React, {useContext, useCallback, memo, useMemo} from 'react';
import {CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL} from '../MineSearch';

const getTdStyle = (code:any) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background:'#444'
            }
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background:'white'
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background:'yellow'
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background:'red'
            }
        default:
            return {
                background:'white'
            }
    }
}

const getTdText = (code:any) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return 'X(';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
}

const Td = memo((props:any) => {
    const {rowIndex, cellIndex} = props;
    const {tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch(tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
            case CODE.NORMAL: 
                dispatch({type:OPEN_CELL, row:rowIndex, cell:cellIndex});
                return;
            case CODE.MINE: 
                dispatch({type:CLICK_MINE, row:rowIndex, cell:cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((event:any) => {
        if (halted) {
            return;
        }
        event.preventDefault();
        switch(tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL: 
            case CODE.MINE: 
                dispatch({type:FLAG_CELL, row:rowIndex, cell:cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type:QUESTION_CELL, row:rowIndex, cell:cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type:NORMALIZE_CELL, row:rowIndex, cell:cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    // useContext 사용하면 계속해서 리랜더링 됨
    // useMemo 사용하여 값 caching 되도록
    // method로 분리하여 memo 적용하는 방법도 있음
    return useMemo(() => (
        <td
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            // 우클릭 처리
            onContextMenu={onRightClickTd}
        >
            {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    ), [])
})

export default Td;