import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardList from './components/BoardList';
import './App.css'

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;


function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const fakeBoards = [
    { board_id: 1, title: "Travel", owner: "Danielle" },
    { board_id: 2, title: " Workspace", owner: "Tamika" },
    { board_id: 3, title: "Recipes", owner: "Kate" },
    { board_id: 4, title: "Design", owner: "Solhee" },
  ];

  useEffect(() => {
    console.log("Fetching from:", `${BASE_URL}/boards`);
    axios.get(`${BASE_URL}/boards`)
      .then((response) => {
        console.log("Response:", response.data);
        setBoardsData(response.data); // If this works, switch to this in UI
      })
      .catch((error) => {
        console.error("Error fetching boards:", error);
      });
  }, []);

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };


  
 

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <BoardList
        boards={boardsData.length > 0 ? boardsData : fakeBoards}
        selectedBoard={selectedBoard}
        onBoardSelect={handleBoardSelect}
        
      />
    </div>
  );
}

export default App;