import React from 'react';
import Tr from './Tr';

const Table = (props:any) =>{
    // tableData:[['','',''],['','',''],['','','']]
    const {onClick, tableData} = props;

    return(
        <table onClick={onClick}>
            <tbody>
                {tableData.map((tr:any, index:any) => (<Tr key={index} rowData={tableData[index]} />))}
            </tbody>
        </table>
    );
}

export default Table;