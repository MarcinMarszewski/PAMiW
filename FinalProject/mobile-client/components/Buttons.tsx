import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faTimes, faEdit, faPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './Buttons.module.css';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const CompleteButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <Button className={styles.completeButton} onClick={onClick}>
    <FontAwesomeIcon icon={faCheck} /> Complete
  </Button>
);

export const UncompleteButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <Button className={styles.uncompleteButton} onClick={onClick}>
    <FontAwesomeIcon icon={faTimes} /> Uncomplete
  </Button>
);

export const EditButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <Button className={styles.editButton} onClick={onClick}>
    <FontAwesomeIcon icon={faEdit} /> Edit
  </Button>
);

export const AddButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <Button className={styles.addButton} onClick={onClick}>
    <FontAwesomeIcon icon={faPlus} /> Add
  </Button>
);

export const DeleteButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <Button className={styles.deleteButton} onClick={onClick}>
    <FontAwesomeIcon icon={faTrash} /> Delete
  </Button>
);

export const UpdateButton: React.FC<{ onClick: React.MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => (
  <Button className={styles.updateButton} onClick={onClick}>
    <FontAwesomeIcon icon={faCheckCircle} /> Update
  </Button>
);