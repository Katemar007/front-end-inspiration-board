import './BoardTile.css';

function BoardTile({ board, onSelect, isSelected }) {
  const handleClick = () => {
    onSelect(board);
  };

  return (
    <div
      onClick={handleClick}
      className={`board-tile ${isSelected ? 'selected' : ''}`}
    >
      <h3>{board.title}</h3>
      <p>Owner: {board.owner}</p>
    </div>
  );
}

export default BoardTile;