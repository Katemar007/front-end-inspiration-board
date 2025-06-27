import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import BoardForm from './components/BoardForm';
import { HashRouter, Route, Routes, Link } from "react-router-dom";

const URL = import.meta.env.VITE_API_BACKEND_URL;

// post new card
const postCardApi = (boardId, newCardData)=> {
  return axios.post(`${URL}/boards/${boardId}/cards`,newCardData)
    .then(response => {
      const card = response.data.card;
      return {
        card_id : card.card_id,
        message: card.message,
        likes_count: card.likes_count,
        board_id: card.board_id
      };
    })
    .catch(error=>{
      console.log(error);
    });
};
// GET all cards
const getAllCardsApi = (boardId) => {
  return axios
    .get(`${URL}/boards/${boardId}/cards`)
    .then((response) => {
      return response.data.map(card => ({
        card_id : card.card_id,
        message: card.message,
        likes_count: card.likes_count,
        board_id: card.board_id
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};
// delete card
const deleteCardApi = (card_id) => {
  return axios.delete(`${URL}/cards/${card_id}`).catch((error) => {
    console.log(error);
  });
};
// change like count
const AddCardLikeApi = (card_id) => {
  return axios.put(`${URL}/cards/${card_id}/like`).catch((error) => {
    console.log(error);
  });
};


function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  // // Need to get info from db based on which board is selected.
  // // use that information to get initial cardData
  const [cardData, setCardData] = useState([]);
  // getting all boards on load
  useEffect(() => {
    axios.get(`${URL}/boards`)
      .then((response) => {
        setBoardsData(response.data);
        console.log(response.data); // delete this later
        console.log(Array.isArray(response.data)); // should be true
      })
      .catch((error) => {
        console.error("Error fetching boards:", error)
      });
  }, []);

  // initial load cards for each selected board:
  useEffect(() => {
    if (selectedBoard) {
      getAllCardsApi(selectedBoard.board_id)
        .then(cards => {
          setCardData(cards);
        });
    }
  }, [selectedBoard]);

  // adding new board
  const addNewBoard = (newBoard) => {
    axios.post(`${URL}/boards`, newBoard)
      .then((response) => {
        console.log(response.data);
        setBoardsData(prevBoards => [...prevBoards, response.data.board]);
      })
      .catch((error) => {
        console.error("Error creating board:", error);
      });
  };

  // add card to the selected board
  const addNewCard = (newCardData) => {
    postCardApi(selectedBoard.board_id, newCardData)
      .then(newCard => {
        setCardData(prevCards => [...prevCards, newCard]);
      });
  };
  // Delete a card and change the state
  const deleteCard = (cardId) => {
    deleteCardApi(cardId)
      .then(() => {
        setCardData(prevCards => prevCards.filter(card => card.card_id !== cardId));
      });
  };

  // Add 1 to like of a card
  const addLikeToCard = (cardId) => {
    AddCardLikeApi(cardId)
      .then(() => {
        setCardData(prevCards => 
          prevCards.map(card => 
            card.card_id === cardId 
              ? {...card, likes_count: card.likes_count + 1}
              : card
          )
        );
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

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <BoardForm onBoardSubmit={addNewBoard} />
      <BoardList
        boards={boardsData}
        selectedBoard={selectedBoard}
        onBoardSelect={setSelectedBoard}
      />
      <CardList
        cards={cardData}
        onDeleteCard={deleteCard}
        onAddCard={addNewCard}
        onAddLike={addLikeToCard}
      ></CardList>
    </div>
  );
}

export default App;