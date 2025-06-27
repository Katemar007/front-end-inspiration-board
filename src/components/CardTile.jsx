import './CardTile.css';

const CardTile = ({ id, message, likesCount }) => { // add id in later
  return (
    <div className="card-tile">
      <p className="message-box">{message}</p>
      <p className="footer grid-box">{likesCount}</p>
      <button className="footer grid-box">+1</button>
      <button className="footer grid-box">delete</button>
    </div>
  )
}

export default CardTile;