import React from 'react';
import Td from './Td';

const Tr = (props:any) =>{
    // rowData:['','','']
    const {rowData} = props;
    
    return(
        <tr>
            {rowData.map((td:any, index:any) => (<Td key={index} />))}
        </tr>
    );
}

export default Tr;