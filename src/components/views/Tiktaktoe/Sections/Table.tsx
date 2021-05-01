import React, {memo} from 'react';
import Tr from './Tr';

const Table = memo((props:any) =>{
    // tableData:[['','',''],['','',''],['','','']]
    const {onClick, tableData, dispatch} = props;

    return(
        <table>
            <tbody>
                {tableData.map((tr:any, index:any) => (<Tr key={index} rowData={tableData[index]} rowIndex={index} dispatch={dispatch} />))}
            </tbody>
        </table>
    );
})

export default Table;