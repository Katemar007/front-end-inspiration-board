import { useState } from 'react';
import './BoardForm.css';

function BoardForm({ onBoardSubmit }) {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && owner.trim()) {
      const newBoard = {
        board_id: Date.now(), 
        title,
        owner,
      };
      onBoardSubmit(newBoard);
      setTitle('');
      setOwner('');
    }
  };

  return (
    <form className="board-form" onSubmit={handleSubmit}>
      <h2>Create a New Board</h2>
      <label>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g, Travel"
        />
      </label>
      <label>
        Owner:
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="e.g., Name"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BoardForm;
