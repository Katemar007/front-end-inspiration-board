import BoardList from './components/BoardList';
import './App.css'
import { useState } from 'react';

function App() {
  const fakeBoards = [
    { board_id: 1, title: "Travel", owner: "Danielle" },
    { board_id: 2, title: " Workspace", owner: "Tamika" },
    { board_id: 3, title: "Recipes", owner: "Kate" },
    { board_id: 4, title: "Design", owner: "Solhee" },
  ];

  const [selectedBoard, setSelectedBoard] = useState(null);
 

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <BoardList
        boards={fakeBoards}
        selectedBoard={selectedBoard}
        onBoardSelect={(board) => {
          console.log("Selected:", board);
          setSelectedBoard(board);
        }}
      />
    </div>
  );
}

export default App;