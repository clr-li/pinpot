import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import Maps from './components/Maps';

function App() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
    }}>
      <div style={{ width: "50vw", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ width: "50vw" }}>
        <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
      </div>
    </div>
  );
}

export default App;
