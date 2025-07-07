import CardTile from './CardTile.jsx'
import './CardList.css'

const CardList = ({ cards, onDeleteCard, onAddLike }) => {
  const getCardListJSX = () => {
    return cards.map((card) => {
      return (
        <CardTile
          key={card.card_id}
          id={card.card_id}
          message={card.message}
          likesCount={card.likes_count}
          onDelete={() => onDeleteCard(card.card_id)}
          onLike={() => onAddLike(card.card_id)}
        ></CardTile>
      );
    });
  };

  return (
    <section className="card-list">{getCardListJSX()}</section>
  )
};

export default CardList;