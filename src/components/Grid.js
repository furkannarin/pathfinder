import React, { useState, useMemo } from 'react';
import GridStyle from '../styles/GridStyle';
import TextInput from './TextInput';

const { container, rows, cell, gridContainer, runBtn, inputContainers, buttonStyle, paintBtns } = GridStyle;

const CreateGridUnits = (col, row, returnIndices = false) => {
    if (col === 0 || row === 0) return []; // this could not happen but safety first :)

    const units = [];
    for (let i = 0; i < col; i++) {
        units[i] = [];
        for (let k = 0; k < row; k++) {
            if (returnIndices) {
                units[i][k] = k;
                continue;
            };

            units[i].push(<div/>)
        };
    }

    return units;
};

const Grid = () => {
    const [ gridSize, setSize ] = useState({ col: 12, row: 33 })
    const [ mode, setMode ] = useState(null) // can either be "obstacle" or "destination"

    const [ renderGrid, setGrid ] = useState(false);
    const isGridDetermined = (!gridSize.col || !gridSize.row);
    const grid = useMemo(() => CreateGridUnits(gridSize.col, gridSize.row), [gridSize.col, gridSize.row]);

    const [destinations, setDestinations] = useState({ start: null, end: null, selectedBoth: false }) // start and end indexes to run the algorithm against
    const [openCells, setOpened] = useState(CreateGridUnits(gridSize.col, gridSize.row, true));
    const [closedCells, setClosed] = useState([]);

   const handleClick = (colIdx, rowIdx) => {
        if(!mode) {
            window.alert('Select either "Create Obstacle" or "Set Destination" to proceed!')
            return;
        }

        if (mode === 'obstacle') {
            if ((destinations.start && destinations.start.join('') === `${colIdx}${rowIdx}`) || (destinations.end && destinations.end.join('') === `${colIdx}${rowIdx}`)) {
                window.alert('Clicked on destination cells in obstacle mode.')
                return;
            }

            const isAlreadyClosed = closedCells.find(c => c[0] === colIdx && c[1] === rowIdx);
            if (isAlreadyClosed) {
                setClosed(closedCells.filter(c => !(c[0] === colIdx && c[1] === rowIdx)));
                openCells[colIdx] = [...openCells[colIdx], rowIdx];
                setOpened(openCells);
                return;
            }
            
            setClosed(p => [...p, [colIdx, rowIdx] ]);
            openCells[colIdx] = openCells[colIdx].filter(c => c !== rowIdx);
            setOpened(openCells);
        } else {
            if (destinations.selectedBoth) return setDestinations({ start: [colIdx, rowIdx], end: null, selectedBoth: false });
            if (!destinations.start) return setDestinations(p => ({ ...p, start: [ colIdx, rowIdx ]}));
            if (!destinations.end) return setDestinations(p => ({ ...p, end: [colIdx, rowIdx], selectedBoth: true }));
        }
    };

    const getCellStyle = (colIdx, rowIdx) => {
        if (destinations.start && destinations.start.join('') === `${colIdx}${rowIdx}`) return { ...cell, backgroundColor: 'darkblue' };
        if (destinations.end && destinations.end.join('') === `${colIdx}${rowIdx}`) return { ...cell, backgroundColor: 'cadetblue' };

        if (closedCells.length > 0) {
            const isClosed = closedCells.find(c => c[0] === colIdx && c[1] === rowIdx);
            if (isClosed) return { ...cell, backgroundColor: 'red' };
            return cell;
        }
        return cell;
    }

    const canRunAlgorithm = !(destinations.start && destinations.end);

    return (
        <div style={container}>
            <div style={inputContainers}>
                <div style={{ display: 'flex', flex: 1, flexDirection: renderGrid ? 'row' : 'column' }}>
                    <TextInput label="Enter Columns" value={gridSize.col} setter={setSize} hidRender={() => setGrid(false)} isCol />
                    <TextInput label="Enter Rows" value={gridSize.row} setter={setSize} hidRender={() => setGrid(false)} />
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    {!renderGrid && <button style={buttonStyle(renderGrid)} disabled={isGridDetermined} onClick={() => setGrid(true)}>OK</button>}
                    {renderGrid && <button style={paintBtns(mode === 'obstacle')} onClick={() => setMode('obstacle')}>Create Obstacle</button>}
                    {renderGrid && <button style={paintBtns(mode === 'destination')} onClick={() => setMode('destination')}>Set Destination</button>}
                    {renderGrid && <button disabled={canRunAlgorithm} style={runBtn(canRunAlgorithm)} onClick={() => { }}>Find The Shortest Route</button>}
                </div>
            </div>
            { renderGrid &&
                <div style={gridContainer}>
                    {
                        grid.map((row, colIdx) =>
                            <div key={colIdx} style={rows}>
                                {row.map((item, rowIdx) => <div style={getCellStyle(colIdx, rowIdx)} onClick={() => handleClick(colIdx, rowIdx)} key={rowIdx}>{item}</div>)}
                            </div>
                        )
                    }
                </div>
            }
        </div >
    )
};

export default Grid;