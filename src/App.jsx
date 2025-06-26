import BoardList from './components/BoardList';
import CardList from './components/CardList';
import './App.css'
import { useState } from 'react';
import { HashRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  const fakeBoards = [
    { board_id: 1, title: "Travel", owner: "Danielle" },
    { board_id: 2, title: " Workspace", owner: "Tamika" },
    { board_id: 3, title: "Recipes", owner: "Kate" },
    { board_id: 4, title: "Design", owner: "Solhee" },
  ];
  const fakeCards = [
    {id: 1, message: "A", likesCount: 0},
    {id: 2, message: "B", likesCount: 0},
    {id: 3, message: "C", likesCount: 0},
    {id: 4, message: "D", likesCount: 0},
    {id: 5, message: "E", likesCount: 0},
    {id: 6, message: "F", likesCount: 0},
    {id: 7, message: "G", likesCount: 0}
  ]
  const [selectedBoard, setSelectedBoard] = useState(null);
  // const [cardData, setCardData] = useState([]); 
  // // Need to get info from db based on which board is selected.
  // // use that information to get initial cardData
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
      <CardList
        cards={fakeCards}
      ></CardList>
    </div>
  );
}

export default App;