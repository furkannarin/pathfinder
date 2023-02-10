import React from 'react';
import Grid from './components/Grid';

const App = () => {
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <h1 style={{ alignSelf: 'center' }}>A* Pathfinding Algorithm Simulator</h1>
      <Grid/>
    </div>
  );
}

export default App;
