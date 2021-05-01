import React, {useState, useCallback, useContext} from 'react';
import {TableContext, START_GAME} from '../MineSearch';

const Form = (props:any) =>{
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const {dispatch} = useContext(TableContext);

    // 불필요한 랜더링 방지 위해 useCallback 설정
    const onChangeRow = useCallback((event:any) => {
        setRow(event.target.value)
    }, []);

    const onChangeCell = useCallback((event:any) => {
        setCell(event.target.value)
    }, []);

    const onChangeMine = useCallback((event:any) => {
        setMine(event.target.value)
    }, []);

    const onClickBtn = useCallback(() => {
        dispatch({type:START_GAME, row, cell, mine});
    }, [row, cell, mine]);

    return(
        <div>
            <input type="number" placeholder="row" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="cell" value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="mine" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>Start</button>
        </div>
    );
}

export default Form;