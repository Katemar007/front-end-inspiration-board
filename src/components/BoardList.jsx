import BoardTile from "./BoardTile";
function BoardList({ boards, selectedBoard, onBoardSelect }) {
  const pastelColors = ["#ffd1dc", "#ffe4b5", "#d1f7c4", "#cce5ff", "#fce1ff"];
  return (
    <div>
      <h2>Boards</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}> 
        {boards.map((board, index) => (
          <BoardTile
            key={board.id}
            board={board}
            onSelect={onBoardSelect}
            isSelected={selectedBoard?.id === board.id}
            color={pastelColors[index % pastelColors.length]}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardList;