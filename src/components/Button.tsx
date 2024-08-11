import styles from '../styles/Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
}

export const Button = ({ onClick, children, color = 'primary' }: ButtonProps) => {
  return (
    <button 
      className={`${styles.button} ${color === 'secondary' ? styles.secondary : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
