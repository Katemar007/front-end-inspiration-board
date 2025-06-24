import BoardTile from "./BoardTile";

function BoardList({ boards, selectedBoard, onBoardSelect }) {
  return (
    <div>
      <h2>Boards</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {boards.map((board) => (
          <BoardTile
            key={board.board_id}
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