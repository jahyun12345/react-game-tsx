import React, {useContext, memo} from 'react';
import Td from './Td';
import {TableContext} from '../MineSearch';

const Tr = memo((props:any) =>{
    const {rowIndex} = props;
    const {tableData} = useContext(TableContext);
    
    return(
        <tr>
            {tableData[0] && tableData.map((td:any, index:any) => (
                <Td key={index} rowIndex={rowIndex} cellIndex={index} />
            ))}
        </tr>
    );
})

export default Tr;