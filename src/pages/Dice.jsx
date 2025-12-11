import React, { useRef, useState, useEffect } from 'react';
import '../style.css';
import Fastfood from '../assets/dice1.png';
import Italian from '../assets/Italianfood.svg';
import Chinese from '../assets/Chinesefood.svg';
import Seafood from '../assets/Seafood.svg';
import Thai from '../assets/thai.svg';
import Mediterranean from '../assets/pinkface.svg';
import WinkFace from "../components/WinkFace";

const foodMap = {
  1: 'Fast',
  2: 'Thai',
  3: 'Chinese',
  4: 'Seafood',
  5: 'Mediterranean',
  6: 'Italian',
};

const FACE_CLASSES = ['show-1', 'show-2', 'show-3', 'show-4', 'show-5', 'show-6'];

const DIALOG_LINES = [
  "Hi~ not sure what to eat? 🍽️🤔",

  "Roll me! 🎲😋",
  
  "Do't move your mouse around!",
  
  "Don't touch me!🚫"

];

export default function HomePage() {
  const diceOneRef = useRef(null);
  const [diceOne, setDiceOne] = useState(0);
  const [popupMessage, setPopupMessage] = useState('');
  const [isRolling, setIsRolling] = useState(false);

  const [visibleDialog, setVisibleDialog] = useState([]);

  // 👉 dialog animation
  useEffect(() => {
    if (diceOne !== 0 || isRolling) return;
  
    setVisibleDialog([]); // reset
  
    // show first line immediately
    setVisibleDialog([DIALOG_LINES[0]]);
  
    let index = 1; // start from second line
    const interval = setInterval(() => {
      setVisibleDialog([DIALOG_LINES[index]]); // replace previous sentence
      index++;
  
      if (index >= DIALOG_LINES.length) {
        clearInterval(interval);
      }
    }, 3000);
  
    return () => clearInterval(interval);
  }, [diceOne, isRolling]);

  

  const rollDice = () => {
    if (isRolling || !diceOneRef.current) return;

    const el = diceOneRef.current;
    setIsRolling(true);
    setPopupMessage(null);

    el.classList.remove(...FACE_CLASSES);
    el.classList.add('rolling');

    const onEnd = () => {
      el.removeEventListener('animationend', onEnd);
      el.classList.remove('rolling');

      const finalSide = Math.floor(Math.random() * 6) + 1;

      void el.offsetWidth; // reflow


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
      <div className="dice-flow">
        <div className="game">
          <div className="container">

          {!isRolling && diceOne === 0 && (
  <div className="dice-dialog slide-in">
    <div className="dice-dialog-bubble">
      {visibleDialog.map((line, i) => (
        <div key={i} className="dialog-line fade-in">
          {line}
        </div>
      ))}
    </div>
  </div>
)}

            <div className="dice-wrapper">
              <div
                id="dice1"
                ref={diceOneRef}
                className={`dice dice-one show-${diceOne === 0 ? 1 : diceOne}`}
              >
                <div className="side one">
                  <img src={Fastfood} alt="Fastfood" className="dice-bg" />
                </div>

                <div className="side two">
                  <img src={Italian} alt="Italian" className="dice-bg" />
                </div>

                <div className="side three">
                  <img src={Chinese} alt="Chinese" className="dice-bg" />
                </div>

                <div className="side four">
                  <img src={Seafood} alt="Seafood" className="dice-bg" />
                </div>

                <div className="side five">
                  <img src={Mediterranean} alt="Drink" className="dice-bg" />
                </div>

                <div className="side six">
                  <img src={Thai} alt="Thai" className="dice-bg" />
                </div>
              </div>

              {diceOne === 0 && (
                <div className="dice-cover">
                  <WinkFace />
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          id="roll"
          className="roll-dice-btn"
          onClick={rollDice}
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
    </div>
  );
}
