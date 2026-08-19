import { useEffect, useRef } from "react";

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      console.log("+++");
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div ref={modalRef}>
      <p> Modal Content </p>
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Modal;
