import React, { ReactNode, useEffect } from "react";
import Modal from "react-modal";

type CustomModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
};

Modal.setAppElement("#root");

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen = false,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className="relative bg-white p-16 rounded-[40px] max-w-[600px] w-full shadow-xl flex flex-col"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="w-full">{children}</div>
    </Modal>
  );
};

export default CustomModal;
