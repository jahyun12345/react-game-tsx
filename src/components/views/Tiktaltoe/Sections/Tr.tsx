import React from 'react';
import Td from './Td';

const Tr = (props:any) =>{
    // rowData:['','','']
    const {rowData, rowIndex, dispatch} = props;
    
    return(
        <tr>
            {rowData.map((td:any, index:any) => (<Td key={index} rowIndex={rowIndex} cellIndex={index} cellData={rowData[index]} dispatch={dispatch} />))}
        </tr>
    );
}

export default Tr;