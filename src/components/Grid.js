import React, { useState } from 'react';
import GridStyle from '../styles/GridStyle';
import TextInput from './TextInput';

const { container, rows, unit } = GridStyle;

const CreateGridUnits = (col, row) => {
    const units = [];
    for (let i = 0; i < col; i++) {
        units[i] = [];
        for (let k = 0; k < row; k++) {
            units[i].push(<div style={unit} />)
        };
    }

    return units;
};

const Grid = props => {
    const { col, row } = props;
    const [gridOptions, setOptions] = useState({ col: 0, row: 0 })
    const grid = CreateGridUnits(col, row);

    return (
        (!col || !row) ?
        (
            <div style={{ display: 'flex', flex: 1 }}>
                <TextInput label="Enter Width" value={gridOptions.col} setter={setOptions}/>
                <TextInput label="Enter Width" value={gridOptions.col} setter={setOptions} />
            </div>
        ) :
        (
            <div style={container}>
                {
                    grid.map(row =>
                        <div style={rows}>
                            {row.map(item => item)}
                        </div>
                    )
                }
            </div >
        )
    )
};

export default Grid;