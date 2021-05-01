import React, {useMemo, memo} from 'react';
import Td from './Td';

const Tr = memo((props:any) =>{
    // rowData:['','','']
    const {rowData, rowIndex, dispatch} = props;
    
    return(
        <tr>
            {rowData.map((td:any, index:any) => (
                <Td key={index} rowIndex={rowIndex} cellIndex={index} cellData={rowData[index]} dispatch={dispatch} />
                // // useMemo : component 자체 기억
                // // rowData[i] 값이 바뀌었을 때만 랜더링 되도록 설정
                // useMemo(() =>
                //     <Td key={index} rowIndex={rowIndex} cellIndex={index} cellData={rowData[index]} dispatch={dispatch} />,
                //     [rowData[index]]
                // )
            ))}
        </tr>
    );
})

export default Tr;