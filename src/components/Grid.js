import React, { useState, useMemo } from 'react';
import GridStyle from '../styles/GridStyle';
import TextInput from './TextInput';
import algorithm from '../algorithm'

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
    const [disableAll, setDisableAll] = useState(false)
    const [ gridSize, setSize ] = useState({ col: 12, row: 33 })
    const [ mode, setMode ] = useState(null) // can either be "obstacle" or "destination"

    const [ renderGrid, setGrid ] = useState(false);
    const isGridDetermined = (!gridSize.col || !gridSize.row);
    const grid = useMemo(() => CreateGridUnits(gridSize.col, gridSize.row), [gridSize.col, gridSize.row]);

    const [destinations, setDestinations] = useState({ start: null, end: null, selectedBoth: false }) // start and end indexes to run the algorithm against
    const [openCells, setOpened] = useState(CreateGridUnits(gridSize.col, gridSize.row, true));
    const [closedCells, setClosed] = useState([]);

    const [path, setPath] = useState([]); // path the algorithm takes

   const handleClick = (colIdx, rowIdx) => {
        if(!mode) {
            window.alert('Select either "Create Obstacle" or "Set Destination" to proceed!')
            return;
        }

        if (path.length > 0) setPath([]);

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

    const getCellState = (colIdx, rowIdx, field) => {
        if (path[field] && path[field].length > 0) {
            let index = 0;
            
            const res = path[field].find((n, i) => {
                if (n[0] === colIdx && n[1] === rowIdx) index = i;
                return n[0] === colIdx && n[1] === rowIdx;
            });

            return { index, res };
        }

        return { index: null, res: false };
    };

    const getCellStyle = (colIdx, rowIdx, isSelection) => {
        const { start, end } = destinations;
        if (end && colIdx === end[0] && rowIdx === end[1]) return { ...cell, backgroundColor: 'cadetblue' };
        if (start && colIdx === start[0] && rowIdx === start[1]) return { ...cell, backgroundColor: 'darkblue' };

        if (!isSelection && getCellState(colIdx, rowIdx, 'route').res) return { ...cell, backgroundColor: 'green' };

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
                    <TextInput disabled={disableAll} label="Enter Columns" value={gridSize.col} setter={setSize} hidRender={() => setGrid(false)} isCol />
                    <TextInput disabled={disableAll} label="Enter Rows" value={gridSize.row} setter={setSize} hidRender={() => setGrid(false)} />
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    {!renderGrid && <button style={buttonStyle(renderGrid)} disabled={disableAll || isGridDetermined} onClick={() => setGrid(true)}>OK</button>}
                    {renderGrid && <button disabled={disableAll} style={paintBtns(mode === 'obstacle')} onClick={() => setMode('obstacle')}>Create Obstacle</button>}
                    {renderGrid && <button disabled={disableAll} style={paintBtns(mode === 'destination')} onClick={() => setMode('destination')}>Set Destination</button>}
                    {renderGrid && <button disabled={disableAll || canRunAlgorithm} style={runBtn(canRunAlgorithm)} onClick={() => {
                        setDisableAll(true);
                        setPath([]);
                        algorithm(destinations, openCells, setPath);
                        setDisableAll(false);
                    }}>Find The Shortest Route</button>}
                </div>
            </div>
            { renderGrid &&
                <div style={gridContainer}>
                    {
                        grid.map((row, colIdx) =>
                            <div key={colIdx} style={rows}>
                                { row.map((_, rowIdx) =>
                                    {
                                        const { res, index } = getCellState(colIdx, rowIdx, 'selection')
                                        const { start, end } = destinations;
                                        const backgroundColor = (start && rowIdx === start[1]) || (end && rowIdx === end[1]) ? undefined : 'purple';
                                        
                                        return (
                                            <div style={getCellStyle(colIdx, rowIdx, res)} onClick={() => handleClick(colIdx, rowIdx)} key={rowIdx}>
                                                { res &&
                                                    <div style={{ display:'flex', flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor, marginTop: 1 }}>
                                                        <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: 'white' }}>{index + 1}</p>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        )
                    }
                </div>
            }
        </div >
    )
};

export default Grid;