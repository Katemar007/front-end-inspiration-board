import { useState } from 'react';
import './Form.css';

function BoardForm({ onBoardSubmit }) {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !owner.trim()) {
      setError('Both Title and Owner are required');
      return;
    }

    const newBoard = {
      board_id: Date.now(), 
      title,
      owner,
    };
    onBoardSubmit(newBoard);
    setTitle('');
    setOwner('');
    setError('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create a New Board</h2>
      <label>
        Title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g, Travel"
          className={error && !title.trim() ? 'error-input' : ''}
        />
      </label>
      <label>
        Owner:
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="e.g., Name"
          className={error && !owner.trim() ? 'error-input' : ''}
        />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default BoardForm;
