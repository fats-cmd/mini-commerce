interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}




const Button: React.FC<ButtonProps> = ({label, onClick, disabled, className}) => {
  return (
    <>
        <button
          onClick={onClick}
          disabled={disabled}
          className={className}
        >
          {label}
        </button>
    </>
  )
}

export default Button