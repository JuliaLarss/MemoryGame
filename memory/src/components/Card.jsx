import PropTypes from 'prop-types';

function Card({image, onClick, id}) {
  const style = {backgroundImage:`url(${image})`};

  return (
    <button id={id} onClick={onClick} style={style} className='card'></button>
  )
}
Card.propTypes={
  image:PropTypes.string,
  onClick:PropTypes.func,
  id:PropTypes.string
}
export default Card