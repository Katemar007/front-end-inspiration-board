import './CardTile.css';

const CardTile = ({ message, likesCount, onDelete, onLike }) => { // add id in later
  return (
    <div className="card-tile">
      <p className="message-box">{message}</p>
      <p className="footer grid-box">{likesCount}</p>
      <button className="footer grid-box" onClick={onLike}>+1</button>
      <button className="footer grid-box" onClick={onDelete}>delete</button>
    </div>
  )
}

export default CardTile;