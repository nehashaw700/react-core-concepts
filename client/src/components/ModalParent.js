import { useState } from "react";
import Modal from "./Modal";

const ModalParent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2>Modal</h2>
      <button onClick={() => setIsOpen(true)}>Click Me</button>

      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ModalParent;
