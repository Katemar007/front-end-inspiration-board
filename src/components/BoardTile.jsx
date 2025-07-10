import './BoardTile.css';

function BoardTile({ board, onSelect, isSelected, color }) {
  const handleClick = () => {
    onSelect(board);
  };

  return (
    <div
      onClick={handleClick}
      className={`board-tile ${isSelected ? 'selected' : ''}`}
      style={{ backgroundColor: color }}
    >
      <h3>{board.title}</h3>
      <p>Owner: {board.owner}</p>
    </div>
  );
}

export default BoardTile;