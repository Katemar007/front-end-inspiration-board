import './CardTile.css';
import { useMemo } from 'react';

const CardTile = ({ message, likesCount, onDelete, onLike }) => { // add id in later
  const colorClass = useMemo(() => {
    const colors = ['green', 'pink', 'yellow', 'blue'];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }, []);

  return (
    <div className={`card-tile ${colorClass}`}>
      <p className="message-box">{message}</p>
      <div className="footer">
        <div className="grid-box">{likesCount}</div>
        <button className="grid-box" onClick={onLike}>+1</button>
        <button className="grid-box" onClick={onDelete}>delete</button>
      </div>
    </div>
  )
}

export default CardTile;