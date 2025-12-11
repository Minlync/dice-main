import React, { useRef, useState, useEffect } from "react";
import "../WinkFace.css";
import Mouth from "../assets/mouth.svg";
import Eyeleft from "../assets/eyeleft.svg";
import Afterpressed from "../assets/afterpressed.svg";

export default function WinkFace() {
  const wrapperRef = useRef(null);
  const leftEyeRef = useRef(null);
  const leftEyeballRef = useRef(null);
  const rightEyeRef = useRef(null);
  const rightEyeballRef = useRef(null);

  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = [
        { eye: leftEyeRef.current, eyeball: leftEyeballRef.current },
        { eye: rightEyeRef.current, eyeball: rightEyeballRef.current },
      ];

      eyes.forEach(({ eye, eyeball }) => {
        if (!eye || !eyeball) return;
        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const radius = 12;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        eyeball.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="wink-wrapper"
      ref={wrapperRef}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      {/* .wink container */}
      <div className="wink">
        {/* Left eye */}
        <div className="eye-left">
          <img src={Eyeleft} alt="eyeleft" className="eye-left" />
        </div>

        {/* Right eye */}
        <div className="eye">
          <div className="eye-white" ref={rightEyeRef}>
            <div className="eyeball" ref={rightEyeballRef}></div>
          </div>
        </div>

        {/* Mouth */}
        <div className="mouth">
          <img src={Mouth} alt="winkmouth" className="winkmouth" />
        </div>

        {/* Overlay Afterpressed */}
        {pressed && (
          <img
            src={Afterpressed}
            alt="after pressed"
            className="afterpressed-overlay"
          />
        )}
      </div>
    </div>
  );
}
