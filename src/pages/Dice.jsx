import React, { useRef, useState } from 'react';
import '../style.css';
import Fastfood from '../assets/dice1.png';
import Italian from '../assets/Italianfood.svg';
import Chinese from '../assets/Chinesefood.svg';
import Seafood from '../assets/Seafood.svg';
import Thai from '../assets/thai.svg';
import Mediterranean from '../assets/pinkface.svg';
import WinkFace from "../components/WinkFace";
import PullableRect from "../components/PullableRect";

const foodMap = {
  1: 'Fast',           // front
  2: 'Thai',           // bottom
  3: 'Chinese',        // right
  4: 'Seafood',        // left
  5: 'Mediterranean',  // top
  6: 'Italian',        // back
};

const FACE_CLASSES = ['show-1', 'show-2', 'show-3', 'show-4', 'show-5', 'show-6'];

export default function HomePage() {
  const diceOneRef = useRef(null);
  const [diceOne, setDiceOne] = useState(0); // 0 = cover state
  const [popupMessage, setPopupMessage] = useState('');
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling || !diceOneRef.current) return;

    const el = diceOneRef.current;
    setIsRolling(true);
    setPopupMessage(null);

    // remove previous face classes
    el.classList.remove(...FACE_CLASSES);
    el.classList.add('rolling');

    const onEnd = () => {
      el.removeEventListener('animationend', onEnd);
      el.classList.remove('rolling');

      const finalSide = Math.floor(Math.random() * 6) + 1; // 1–6 only

      // Force reflow
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
      <div className="dice-flow">
        <div className="game">
          <div className="container">
            <div className="ellipse-bg">
            </div>
            
      

          {/* 💬 talking bubble (appears after 2s, disappears on roll) */}
          {!isRolling && diceOne === 0 && (
           <div className="dice-dialog slide-in">
             <div className="dice-dialog-bubble">
             <span>
              Hi, don't know what to eat?
              <br />
                Roll me!
              </span>
               </div>
           </div>
          )}


            <div className="dice-wrapper">
              {/* The actual 3D dice (always rendered so animation works) */}
              <div
                id="dice1"
                ref={diceOneRef}
                className={`dice dice-one show-${diceOne === 0 ? 1 : diceOne}`}
                aria-label={`Showing face ${diceOne}`}
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

              {/* dice 0 = cover overlay, only before first roll */}
              {diceOne === 0 && (
                <div className="dice-cover">
                  <PullableRect>
                    <WinkFace />
                    </PullableRect>
                </div>
              )}
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
    </div>
  );
}