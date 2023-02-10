import React, { useState } from 'react';
import GridStyle from '../styles/GridStyle';
import TextInput from './TextInput';

const { container, rows, unit, gridContainer, inputContainers, buttonStyle } = GridStyle;

const CreateGridUnits = (col, row) => {
    if(col === 0 || row === 0) return [];

    const units = [];
    for (let i = 0; i < col; i++) {
        units[i] = [];
        for (let k = 0; k < row; k++) {
            units[i].push(<div style={unit} />)
        };
    }

    return units;
};

const Grid = () => {
    const [ gridOptions, setOptions ] = useState({ col: 0, row: 0 })
    const [ renderGrid, setGrid ] = useState(false);
    const isGridDetermined = (!gridOptions.col || !gridOptions.row);
    const grid = CreateGridUnits(gridOptions.col, gridOptions.row);

    return (
        <div style={container}>
            <div style={inputContainers(renderGrid)}>
                <TextInput label="Enter Columns" value={gridOptions.col} setter={setOptions} hidRender={() => setGrid(false)} isCol />
                <TextInput label="Enter Rows" value={gridOptions.row} setter={setOptions} hidRender={() => setGrid(false)} />
                { !renderGrid && <button style={buttonStyle(renderGrid)} disabled={isGridDetermined} onClick={() => setGrid(true)}>OK</button> }
            </div>
            { renderGrid &&
                <div style={gridContainer}>
                    { 
                        grid.map((row, i) =>
                            <div key={i} style={rows}>
                                {row.map((item, idx) => <div key={idx}>{item}</div>)}
                            </div>
                        )
                    }
                </div>
            }
        </div >
    )
};

export default Grid;