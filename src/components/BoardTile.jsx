function BoardTile({ board, onSelect, isSelected }) {
  const handleClick = () => {
    onSelect(board);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: isSelected ? '2px solid blue' : '1px solid gray',
        padding: '10px',
        margin: '10px',
        backgroundColor: 'white',
        cursor: 'pointer',
      }}
    >
      <h3>{board.title}</h3>
      <p>Owner: {board.owner}</p>
    </div>
  );
}

export default BoardTile;