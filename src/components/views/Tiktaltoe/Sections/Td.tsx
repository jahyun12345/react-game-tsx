import React, {useCallback} from 'react';
import {CLICK_CELL, CHANGE_TURN} from '../Tiktaktoe';

const Td = (props:any) =>{
    // rowIndex:몇 번째 줄인지
    // cellIndex:몇 번째 칸인지
    const {rowIndex, cellIndex, cellData, dispatch} = props;

    const onClickTd = useCallback(() => {
        console.log({rowIndex:rowIndex, cellIndex:cellIndex});
        dispatch({type:CLICK_CELL, row:rowIndex, cell:cellIndex});
        dispatch({type:CHANGE_TURN});
    }, []);

    return(
        <td onClick={onClickTd}>{cellData}</td>
    );
}

export default Td;