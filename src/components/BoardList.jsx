import BoardTile from "./BoardTile";
function BoardList({ boards, selectedBoard, onBoardSelect }) {
  return (
    <div>
      <h2>Boards</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}> 
        {boards.map((board) => (
          <BoardTile
            key={board.id}
            board={board}
            onSelect={onBoardSelect}
            isSelected={selectedBoard?.id === board.id}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardList;