import React, { useRef, useState } from 'react';
import '../style.css';

export default function HomePage() {
  const diceOneRef = useRef(null);
  const [diceOne, setDiceOne] = useState(1);

  const rollDice = () => {
    const newDiceOne = Math.floor(Math.random() * 6) + 1;
    setDiceOne(newDiceOne);

    if (diceOneRef.current) {
      diceOneRef.current.className = `dice dice-one show-${newDiceOne}`;
    }
  };

  return (
    <div className="homepage">
      <div className="game">
        <div className="container">
          <div id="dice1" ref={diceOneRef} className={`dice dice-one show-${diceOne}`}>
            <div className="side one"><div className="dot one-1"></div></div>
            <div className="side two"><div className="dot two-1"></div><div className="dot two-2"></div></div>
            <div className="side three"><div className="dot three-1"></div><div className="dot three-2"></div><div className="dot three-3"></div></div>
            <div className="side four"><div className="dot four-1"></div><div className="dot four-2"></div><div className="dot four-3"></div><div className="dot four-4"></div></div>
            <div className="side five"><div className="dot five-1"></div><div className="dot five-2"></div><div className="dot five-3"></div><div className="dot five-4"></div><div className="dot five-5"></div></div>
            <div className="side six"><div className="dot six-1"></div><div className="dot six-2"></div><div className="dot six-3"></div><div className="dot six-4"></div><div className="dot six-5"></div><div className="dot six-6"></div></div>
          </div>
        </div>
      </div>

      <button 
        id="roll"
        className="roll-dice-btn" 
        onClick={rollDice}
        style={{ marginTop: '10px', padding: '10px 20px 10px 20px', fontSize: '18px' }}
      >
        Roll Dice
      </button>
    </div>
  );
}
