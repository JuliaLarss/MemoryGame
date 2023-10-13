import PropTypes from 'prop-types';
import Card from "./Card"


function Table({cards, onClick}) {
  return (
    <div className="table">
      {cards.map((card) => (
        <Card key={card.code} id={card.code} image={card.image} onClick={onClick}/>
      ))}
    </div>
  )
}

Table.propTypes = {
    cards: PropTypes.array,
    onClick: PropTypes.func,
  }
export default Table