
import { useEffect, useState } from 'react';
import './App.css'
import Title from './components/Title';
import Table from './components/Table';
import ScoreBoard from './components/ScoreBoard';

function App() {

  // States
  const [deck, setDeck] = useState(null)
  const [tableCards, setTableCards] = useState(null);
  const [guessed, setGuessed] = useState(null)
  const [best, setBest] = useState(0)
  const [reset, setReset] = useState(false)
  const [level, setLevel] = useState(1)
  
  // == Fisher-Yates shuffle algorithm == : makes [i] and [j] swap places in the array 
  const shuffle = (original) => { 
    let array = [...original]
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  // == Fetch Deck ==
useEffect(() => {
  // eslint-disable-next-line no-unused-vars
  let ignore = false;
  async function getNewDeck() {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const deck = await response.json()
    setDeck(deck.deck_id)
  }
  getNewDeck();
  return () => {
    ignore = true;
  };
}, [reset]);


// == Draw 8 cards from the Deck ==
useEffect(() => {
  // eslint-disable-next-line no-unused-vars
  let ignore = false;
  async function drawCards() {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=8`);
    const table = await response.json()
    setTableCards(table.cards)
  }
  if(deck) drawCards();
  return () => {
    ignore = true;
  }
}, [deck, level]);

// == OnClick -> sends the targeted card to addGuess, triggers the deck to get mixed and give new 8 cards out of the deck
function handleClick(e) {
  e.preventDefault()
  let guess = e.target.id
  let shuffledCards = shuffle(tableCards)
  let gameStatus = gameOver(guess)
  gameStatus ? endGame(gameStatus) : addGuess(guess)
  levelUp() ? setLevel(level + 1) : setTableCards(shuffledCards)
}

// == Gets the guess from handleClick, check if its already in guessed if not it gets added by pushing guess to copy and adds it to setGuessed 
  const addGuess = (guess) => {
    let copy = !guessed ? [] : [...guessed]
    copy.push(guess)
    setGuessed(copy)
  }

  // == Checks if the length of guessed plus 1 is evenly divided by 8
  const levelUp = () => {
    return guessed && (guessed.length + 1) % 8 === 0
  }

  // == If guessed includes guess it will return lost, if its the length of 51 it will return  won otherwite nothing
  const gameOver = (guess) => {
    if (guessed && guessed.includes(guess)) return "lost";
    if (guessed && guessed.length === 51) return "won";
    return null;
  }

  // if return gives  "won" setbest sets to 52. Otherwise if  guessed length is longer than best update best with  guessed length. 
  function handleBestScore(status) {
    if (status == "won") {
      setBest(52)
    } else {
      if (guessed.length > best) setBest(guessed.length);
    }
  }

  // 
  function endGame(status) {
    handleBestScore(status)
    resetGame()
    alert(status == "won" ? "Congrats! You won!" : "Oops! You already clicked that one. You lose!")
  }

  function resetGame() {
    setReset(!reset);
    setGuessed(null);
    setTableCards(null);
    setLevel(1);
  }

  if (tableCards)
  return (
    <>
      <Title />
      <Table cards={tableCards} onClick={handleClick}/>
      <ScoreBoard current={guessed ? guessed.length : 0} best={best}/>
    </>
  )
}

export default App
