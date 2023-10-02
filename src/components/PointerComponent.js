import React, { useEffect, useRef } from "react";

function PointerComponent() {
  const pointerRef = useRef(null);

  useEffect(() => {
    const pointerEl = pointerRef.current;
    const updatePointerPosition = (e) => {
      const pointSize = pointerEl.clientWidth / 2;
      pointerEl.style.top = `${e.pageY - pointSize}px`;
      pointerEl.style.left = `${e.pageX - pointSize}px`;
      pointerEl.style.display = "block";
    };

    document.addEventListener("mousemove", updatePointerPosition);

    return () => {
      document.removeEventListener("mousemove", updatePointerPosition);
    };
  }, []);

  return <div className="pointer" ref={pointerRef}></div>;
}

export default PointerComponent;
