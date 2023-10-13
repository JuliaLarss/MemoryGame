import PropTypes from 'prop-types';

function ScoreBoard({current, best}) {
  return (
    <div className='score'>
        <div><b>Score:</b> {current}</div>
        <div><b>Best:</b> {best}</div>
    </div>
  )
}

ScoreBoard.propTypes= {
    current:PropTypes.number,
    best:PropTypes.number
}

export default ScoreBoard