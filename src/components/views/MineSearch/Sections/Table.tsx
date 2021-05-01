import React, {useContext, memo} from 'react';
import Tr from './Tr';
import {TableContext} from '../MineSearch';

const Table = memo(() =>{
    const {tableData} = useContext(TableContext);

    return(
        <table>
            <tbody>
                {tableData.map((tr:any, index:any) => (
                    <Tr key={index} rowIndex={index} />
                ))}
            </tbody>
        </table>
    );
})

export default Table;