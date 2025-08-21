import React, { useRef, useState } from 'react';
import '../style.css';

const foodMap = {
  1: 'Mexican',
  2: 'Italian',
  3: 'Japanese',
  4: 'Indian',
  5: 'Chinese',
  6: 'Thai',
};

export default function HomePage() {
  const diceOneRef = useRef(null);
  const [diceOne, setDiceOne] = useState(1);
  const [popupMessage, setPopupMessage] = useState('');
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setPopupMessage('');

    // Add "rolling" animation class
    if (diceOneRef.current) {
      diceOneRef.current.classList.add('rolling');
    }

    // Wait 3 seconds, then stop and show result
    setTimeout(() => {
      const finalSide = Math.floor(Math.random() * 6) + 1;
      setDiceOne(finalSide);

      if (diceOneRef.current) {
        // Remove animation and show final face
        diceOneRef.current.classList.remove('rolling');
        diceOneRef.current.className = `dice dice-one show-${finalSide}`;
      }

      setPopupMessage(`🎉 Congrats! You rolled out ${foodMap[finalSide]} food!`);
      setIsRolling(false);
    }, 2000); // 2 second flip animation
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
        style={{ fontSize: '18px' }}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Surprise Me'}
      </button>

      {popupMessage && (
        <div className="result-window">
          {popupMessage}
        </div>
      )}
    </div>
  );
}