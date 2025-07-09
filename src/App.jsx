import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import BoardForm from './components/BoardForm';
import CardForm from './components/CardForm';
import { HashRouter, Route, Routes, Link } from "react-router-dom";

const URL = import.meta.env.VITE_APP_BACKEND_URL;

// post new card
const postCardApi = (boardId, newCardData)=> {
  return axios.post(`${URL}/boards/${boardId}/cards`,newCardData)
    .then(response => {
      console.log("Card creation response: ", response.data);
      const card = response.data.card;
      if (!card) {
        console.error("No card created in response!");
        return null;
      }
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
      console.log(response.data)
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
// const AddCardLikeApi = (card_id) => {
//   return axios.put(`${URL}/cards/${card_id}/like`).catch((error) => {
//     console.log(error);
//   });
// };
const AddCardLikeApi = (board_id, card_id) => {
  return axios
    .put(`${URL}/boards/${board_id}/cards/${card_id}/like`)
    .then(response => {
      console.log("Like response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showBoardForm, setShowBoardForm] = useState(true);
  const [cardData, setCardData] = useState([]);

  // getting all boards on load
  useEffect(() => {
    axios.get(`${URL}/boards`)
      .then((response) => {
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching boards:", error)
      });
  }, []);

  // initial load cards for each selected board:
  useEffect(() => {
    if (selectedBoard) {
      getAllCardsApi(selectedBoard.id)
        .then(cards => {
          setCardData(cards);
        });
    }
  }, [selectedBoard]);

  // adding new board
  const addNewBoard = (newBoard) => {
    axios.post(`${URL}/boards`, newBoard)
      .then((response) => {
        setBoardsData(prevBoards => [...prevBoards, response.data.board]);
      })
      .catch((error) => {
        console.error("Error creating board:", error);
      });
  };
  const toggleBoardForm = () => {
    setShowBoardForm(prev => !prev);
  };
  // add card to the selected board
  const addNewCard = (newCardData) => {
    postCardApi(selectedBoard.id, newCardData)
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
    if (!selectedBoard) return;

    AddCardLikeApi(selectedBoard.id, cardId)
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
      {selectedBoard && selectedBoard.id && (
        <>
          <h2>Cards for "{selectedBoard.title}"</h2>
          <CardList
            cards={cardData}
            onDeleteCard={deleteCard}
            onAddLike={addLikeToCard}
          ></CardList>
          <div className="card-form-container">
            <CardForm postNewCard={addNewCard} selectedBoard={selectedBoard} />
          </div>
        </>
      )}
      {/* <h2>Cards</h2>
      <CardList
        cards={cardData}
        onDeleteCard={deleteCard}
        onAddCard={addNewCard}
        onAddLike={addLikeToCard}
      ></CardList> */}
    </div>
  );
}

export default App;