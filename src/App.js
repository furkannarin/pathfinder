import React from 'react';
import Grid from './components/Grid';

const App = () => {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <h1>A* Pathfinding Algorithm Simulator</h1>
      <Grid col={5} row={5} />
    </div>
  );
}

export default App;
