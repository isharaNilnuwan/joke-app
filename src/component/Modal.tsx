import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AddButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [type, setType] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (type.trim()) {
      onAdd(type);
      setType('');
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Add New Type</h2>
        <Input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter type"
        />
        <AddButton disabled={type.trim() === ''} onClick={handleAdd}>Add</AddButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
