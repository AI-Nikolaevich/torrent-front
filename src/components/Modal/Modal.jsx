import "./Modal.css";
import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

export default function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }

    const handleClickOutside = (event) => {
      if (event.target === dialog.current) {
        onClose();
      }
    };

    return () => {
      if (dialog.current) {
        dialog.current.removeEventListener('click', handleClickOutside);
      }
    };
  }, [open, onClose]);

  return createPortal(
    <dialog ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
