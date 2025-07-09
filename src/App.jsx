import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import BoardForm from './components/BoardForm';
import CardForm from './components/CardForm';
import { HashRouter, Route, Routes, Link } from "react-router-dom";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showBoardForm, setShowBoardForm] = useState(true)
  const [cardData, setCardsData] = useState([]);
  
  // getting all boards on load
  useEffect(() => {
    axios.get(`${URL}/boards`)
      .then((response) => {
        setBoardsData(response.data);
        // console.log(response.data); // delete this later
        console.log(Array.isArray(response.data)); // should be true
      })
      .catch((error) => {
        console.error("Error fetching boards:", error)
      });
  }, []);

  // listing Cards for selected Board
  useEffect(() => {
    if (!selectedBoard) return;

    axios.get(`${URL}/boards/${selectedBoard.id}/cards`)
      .then((response) => {
        setCardsData(response.data);
        console.log("Cards fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, [selectedBoard]);

  // adding new board
  const addNewBoard = (newBoard) => {
    axios.post(`${URL}/boards`, newBoard)
      .then((response) => {
        console.log(response.data);
        setBoardsData(prevBoards => [...prevBoards, response.data.board]);
        setSelectedBoard(response.data.board)
      })

      .catch((error) => {
        console.error("Error creating board:", error);
      });
  };
  const toggleBoardForm = () => {
    setShowBoardForm(prev => !prev);
  };

  // add new Card
  const addNewCard = (cardData) => {
    if (!selectedBoard) return;

    axios.post(`${URL}/boards/${selectedBoard.id}/cards`, cardData)
      .then((response) => {
        const newCard = response.data.card;
        setCardsData(prevCards => [...prevCards, newCard]);
        console.log("Card created:", response.data.card);
      })
      .catch((error) => {
        console.error("Error creating card:", error);
      });
  };

  /*const fakeBoards = [
    { board_id: 1, title: "Travel", owner: "Danielle" },
    { board_id: 2, title: " Workspace", owner: "Tamika" },
    { board_id: 3, title: "Recipes", owner: "Kate" },
    { board_id: 4, title: "Design", owner: "Solhee" },
  ];*/
  const fakeCards = [
    {id: 1, message: "A", likesCount: 0},
    {id: 2, message: "B", likesCount: 0},
    {id: 3, message: "C", likesCount: 0},
    {id: 4, message: "D", likesCount: 0},
    {id: 5, message: "E", likesCount: 0},
    {id: 6, message: "F", likesCount: 0},
    {id: 7, message: "G", likesCount: 0}
  ]

  // const [cardData, setCardData] = useState([]); 
  // // Need to get info from db based on which board is selected.
  // // use that information to get initial cardData
  return (
    <div className="App">
      <h1>Inspiration Board</h1>

      {/* Board toggle button */}
      <div className="board-form-container">
        {showBoardForm && (
          <BoardForm onBoardSubmit={addNewBoard} />
        )}      
        <button id="toggle-board-form" onClick={toggleBoardForm}>
          {showBoardForm ? "Hide Board form" : "Show Board form"}
        </button>
      </div>
      {/* Render or Hide the form */}

      <BoardList
        boards={boardsData}
        selectedBoard={selectedBoard}
        onBoardSelect={setSelectedBoard}
      />
      {/* <CardList
        cards={fakeCards}
      ></CardList> */}
      {selectedBoard && selectedBoard.id && (
        <>
          <h2>Cards for "{selectedBoard.title}"</h2>
          <CardList cards={cardData} />
          <div className="card-form-container">
            <CardForm postNewCard={addNewCard} selectedBoard={selectedBoard} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;