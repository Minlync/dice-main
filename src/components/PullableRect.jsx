// src/components/PullableRect.jsx
import React, { useState } from "react";
import "./PullableRect.css";

export default function PullableRect({ children }) {
  const [pulled, setPulled] = useState(false);

  const handlePressStart = () => {
    setPulled(true);   // 按下 → 拉出
  };

  const handlePressEnd = () => {
    setPulled(false);  // 松开 → 弹回
  };

  return (
    <div
      className={`pull-rect ${pulled ? "pulled" : ""}`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
    >
      <div className="pull-rect-inner">{children}</div>

      {/* 右侧中点的“按压”区域，只负责触发事件 */}
      <div
        className="pull-hotspot"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd}
      />
    </div>
  );
}
