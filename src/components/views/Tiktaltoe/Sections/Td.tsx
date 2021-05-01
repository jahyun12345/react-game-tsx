import React, {useCallback, memo} from 'react';
import {CLICK_CELL} from '../Tiktaktoe';

const Td = memo((props:any) => {
    // rowIndex:몇 번째 줄인지
    // cellIndex:몇 번째 칸인지
    const {rowIndex, cellIndex, cellData, dispatch} = props;

    const onClickTd = useCallback(() => {
        // cellData 값이 있으면 함수 실행되지 않도록 설정
        if (cellData) {
            return;
        }
        console.log({rowIndex:rowIndex, cellIndex:cellIndex});
        // state 값 설정 : 비동기
        dispatch({type:CLICK_CELL, row:rowIndex, cell:cellIndex});
    }, [cellData]);

    return(
        <td onClick={onClickTd}>{cellData}</td>
    );
})

export default Td;