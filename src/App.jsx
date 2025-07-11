import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import BoardForm from './components/BoardForm';
import CardForm from './components/CardForm';
import CardSortDropdown from './components/CardSortDropdown';

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
      const sortedCards = response.data
        .map(card => ({
          card_id : card.card_id,
          message: card.message,
          likes_count: card.likes_count,
          board_id: card.board_id
        }))
        .sort((a, b) => a.card_id - b.card_id);
      return sortedCards;
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
const AddCardLikeApi = (board_id, card_id) => {
  return axios.put(`${URL}/boards/${board_id}/cards/${card_id}/like`).catch((error) => {
    console.log(error);
  });
};

function App() {
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showBoardForm, setShowBoardForm] = useState(true);
  const [showCardForm, setShowCardForm] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [sortedCards, setSortedCards] = useState([]);
  const [sortOption, setSortOption] = useState("card_id"); // default sort by ID

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
  const toggleCardForm = () => {
    setShowCardForm(prev => !prev);
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

  // to sort the cards based on dropdown option
  useEffect(() => {
    const sorted = [...cardData]; // never sort state directly!
    switch (sortOption) {
    case "likes":
      sorted.sort((a, b) => b.likes_count - a.likes_count);
      break;
    case "alpha":
      sorted.sort((a, b) => a.message.localeCompare(b.message));
      break;
    case "card_id":
    default:
      sorted.sort((a, b) => a.card_id - b.card_id);
      break;
    }
    setSortedCards(sorted);
  }, [cardData, sortOption]);

  return (
    <div className="App">
      <h1>Inspiration Board</h1>
      <div className="forms-section">
        {/* Board toggle button */}
        <div className="form-container">
          {showBoardForm && (
            <BoardForm onBoardSubmit={addNewBoard} />
          )}      
          <button id="toggle-form" onClick={toggleBoardForm}>
            {showBoardForm ? "Hide Board form" : "Show Board form"}
          </button>
        </div>
        {/* Render or Hide the form */}
        <div className="form-container">
          {showCardForm && (
            <CardForm 
              postNewCard={addNewCard} 
              selectedBoard={selectedBoard}>
            </CardForm>
          )}
          <button id="toggle-form" onClick={toggleCardForm}>
            {showCardForm ? "Hide card form" : "Show card form"}
          </button>
        </div>
      </div>

      <div className="board-list-box">
        <h2>Boards</h2>
        <BoardList
          boards={boardsData}
          selectedBoard={selectedBoard}
          onBoardSelect={setSelectedBoard}
        />
      </div>
      {selectedBoard && selectedBoard.id && (
        <>
          <div className="selected-board-info">
            <h2>Selected Board: {selectedBoard.title}</h2>
            <p>Owner: {selectedBoard.owner}</p>
          </div>
          <h2>Cards for "{selectedBoard.title}"</h2>
          <CardSortDropdown 
            selectedOption={sortOption} 
            onChange={setSortOption} 
          ></CardSortDropdown>
          <CardList
            cards={sortedCards}
            onDeleteCard={deleteCard}
            onAddLike={addLikeToCard}
          ></CardList>
        </>
      )}
    </div>
  );
}

export default App;