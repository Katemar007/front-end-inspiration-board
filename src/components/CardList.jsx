import CardTile from './CardTile.jsx'
import './CardList.css'

const CardList = ({ cards }) => {
  const getCardListJSX = () => {
    return cards.map((card) => {
      return (
        <CardTile
          key={card.id}
          id={card.id}
          message={card.message}
          likesCount={card.likesCount}
        ></CardTile>
      );
    });
  };

  return (
    <section className="card-list">{getCardListJSX()}</section>
  )
};

export default CardList;