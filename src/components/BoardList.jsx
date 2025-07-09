import BoardTile from "./BoardTile";

// This is the structure that the readings/examples for TaskListAPI-frontend follow:
// Can delete this later! I wanted to ask what the difference was between the two
// ways of writing.

// const BoardList = ({ boards, selectedBoard, onBoardSelect }) => {
//   const getBoardListJSX = () => {
//     return boards.map((board) => {
//       return (
//         <BoardTile
//           key={board.board_id}
//           board={board}
//           onSelect={onBoardSelect}
//           isSelected={selectedBoard?.board_id === board.board_id}
//         ></BoardTile>
//       );
//     });
//   };

//   return (
//     <section className="board-list">{getBoardListJSX()}</section>
//   )
// }

function BoardList({ boards, selectedBoard, onBoardSelect }) {
  // console.log('Boards');
  // console.log(boards);
  return (
    <div>
      <h2>Boards</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}> 
        {boards.map((board) => (
          <BoardTile
            key={board.id}
            board={board}
            onSelect={onBoardSelect}
            isSelected={selectedBoard?.board_id === board.board_id}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardList;