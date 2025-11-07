import React, { useRef, useState } from 'react';
import '../style.css';
import dice1 from '../assets/dice1.png';
import dice2 from '../assets/dice2.png';


const foodMap = {
  1: 'Mexican',
  2: 'Italian',
  3: 'Japanese',
  4: 'Indian',
  5: 'Chinese',
  6: 'Thai',
};

const FACE_CLASSES = ['show-1','show-2','show-3','show-4','show-5','show-6'];

export default function HomePage() {
  const diceOneRef = useRef(null);
  const [diceOne, setDiceOne] = useState(1);
  const [popupMessage, setPopupMessage] = useState('');
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling || !diceOneRef.current) return;

    const el = diceOneRef.current;
    setIsRolling(true);
    setPopupMessage(null);

    // 1) Clear any final-face transforms before spinning
    el.classList.remove(...FACE_CLASSES);

    // 2) Spin freely (no bounce)
    el.classList.add('rolling');

    // 3) When spin ends, flip to a random face smoothly
    const onEnd = () => {
      el.removeEventListener('animationend', onEnd);
      el.classList.remove('rolling');

      const finalSide = Math.floor(Math.random() * 6) + 1;

      // Force reflow to ensure the transition to final face runs
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;

      el.classList.add(`show-${finalSide}`);
      setDiceOne(finalSide);
      setPopupMessage({
        title: 'Congrats!',
        text: `You rolled out ${foodMap[finalSide]} food!`,
      });
      setIsRolling(false);
    };

    el.addEventListener('animationend', onEnd, { once: true });
  };

  return (
    <div className="homepage">
      <div className="game">
        <div className="container">
          <div
            id="dice1"
            ref={diceOneRef}
            className={`dice dice-one show-${diceOne}`}
            aria-label={`Showing face ${diceOne}`}
          >
            <div className="side one">
              <img src={dice1} alt="Dice Background" className="dice-bg" />
              <div className="dice1"></div>
            </div>

            <div className="side two">
              <img src={dice2} alt="Dice2 Background" className="dice-bg" />
              <div className="dice2"></div>
            </div>

            <div className="side three">
              <div className="dot three-1"></div>
              <div className="dot three-2"></div>
              <div className="dot three-3"></div>
            </div>

            <div className="side four">
              <div className="dot four-1"></div>
              <div className="dot four-2"></div>
              <div className="dot four-3"></div>
              <div className="dot four-4"></div>
            </div>

            <div className="side five">
              <div className="dot five-1"></div>
              <div className="dot five-2"></div>
              <div className="dot five-3"></div>
              <div className="dot five-4"></div>
              <div className="dot five-5"></div>
            </div>

            <div className="side six">
              <div className="dot six-1"></div>
              <div className="dot six-2"></div>
              <div className="dot six-3"></div>
              <div className="dot six-4"></div>
              <div className="dot six-5"></div>
              <div className="dot six-6"></div>
            </div>
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
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {popupMessage.title}
          </div>
          <div style={{ fontSize: '18px', marginTop: '4px' }}>
            {popupMessage.text}
          </div>
        </div>
      )}
    </div>
  );
}
