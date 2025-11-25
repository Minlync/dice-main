import React, { useRef, useState } from "react";
import "./PullableRect.css";

export default function PullableRect({ children }) {
  const [pull, setPull] = useState(0);
  const startXRef = useRef(0);
  const draggingRef = useRef(false);

  const MAX_PULL = 70;

  /* -------- desktop: mouse -------- */
  const onMouseDown = (e) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;

    // ⭐ 把事件绑到 window（全局接管拖动）
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopMouse);
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;

    const dx = e.clientX - startXRef.current;
    const clamped = Math.max(0, Math.min(MAX_PULL, dx));
    setPull(clamped);
  };

  const stopMouse = () => {
    draggingRef.current = false;
    setPull(0);

    // ⭐ 把事件解绑
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", stopMouse);
  };

  /* -------- mobile: touch -------- */
  const onTouchStart = (e) => {
    const touch = e.touches[0];
    draggingRef.current = true;
    startXRef.current = touch.clientX;

    // ⭐ 手机也要绑定全局事件
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", stopTouch);
  };

  const onTouchMove = (e) => {
    if (!draggingRef.current) return;
    const touch = e.touches[0];

    const dx = touch.clientX - startXRef.current;
    const clamped = Math.max(0, Math.min(MAX_PULL, dx));
    setPull(clamped);

    e.preventDefault();
  };

  const stopTouch = () => {
    draggingRef.current = false;
    setPull(0);

    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", stopTouch);
  };

  return (
    <div className="pull-rect" style={{ "--pull": `${pull}px` }}>
      <div className="pull-rect-inner">{children}</div>

      <div
        className="pull-handle"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="pull-handle-dot" />
      </div>
    </div>
  );
}
