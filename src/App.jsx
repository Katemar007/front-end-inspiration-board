import BoardList from './components/BoardList';
import CardList from './components/CardList';
import './App.css'
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";

const fakeBoards = [
  { board_id: 1, title: "Travel", owner: "Danielle" },
  { board_id: 2, title: " Workspace", owner: "Tamika" },
  { board_id: 3, title: "Recipes", owner: "Kate" },
  { board_id: 4, title: "Design", owner: "Solhee" },
];
const fakeCards = { // Adjusted right now to have board Id association.
  1: [
    { id: 1, message: "A", likesCount: 0 },
    { id: 2, message: "B", likesCount: 0 }
  ],
  2: [{ id: 3, message: "C", likesCount: 0 }],
  3: [
    { id: 4, message: "D", likesCount: 0 },
    { id: 5, message: "E", likesCount: 0 }
  ],
  4: [
    { id: 6, message: "F", likesCount: 0 },
    { id: 7, message: "G", likesCount: 0 }
  ]
};
  
// const [cardData, setCardData] = useState([]); 
// // Need to get info from db based on which board is selected.
// // use that information to get initial cardData

// <gh pages link>/
const BoardsPage = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <h1>Inspiration Board</h1>
      <BoardList
        boards={fakeBoards}
        selectedBoard={selectedBoard}
        onBoardSelect={(board) => {
          console.log("Selected:", board);
          setSelectedBoard(board);
          navigate(`/boards/${board.board_id}`);
        }}
      />
    </>
  );
};

// cards page
// <gh pages link>/boards/boardId
const CardsPage = () => {
  // make sure to adjust this later to use API lookup
  const { boardId } = useParams(); // gets board ID from the URL since we navigated
  const board = fakeBoards.find(b => b.board_id.toString() === boardId); // to get name
  const cards = fakeCards[boardId] || [];

  return (
    <div>
      <h1>Cards for {board.title} board</h1>
      <CardList cards={cards} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/boards/:boardId" element={<CardsPage />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <h1>Inspiration Board</h1>
    //   <BoardList
    //     boards={fakeBoards}
    //     selectedBoard={selectedBoard}
    //     onBoardSelect={(board) => {
    //       console.log("Selected:", board);
    //       setSelectedBoard(board);
    //     }}
    //   />
    //   <CardList
    //     cards={fakeCards}
    //   ></CardList>
    // </div>
  );
}

export default App;