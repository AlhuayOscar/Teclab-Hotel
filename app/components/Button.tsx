"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  payment?: boolean;
  paid?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  paid,
  payment,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    w-full
${
  outline
    ? "bg-white border-black text-black"
    : payment
    ? "bg-gradient-to-br from-[#4682B4] via-[#4682B4] to-[#ADD8E6] text-white"
    : paid
    ? "bg-gradient-to-br from-[#32a852] via-[#32a852] to-[#5fd976] text-white"
    : "bg-gradient-to-br from-[#ad8b33] to-[#FFD700] text-white"
}

    ${
      small
        ? "text-sm py-1 font-light border-[1px]"
        : "text-md py-3 font-semibold border-2"
    }
  `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
        absolute
        left-4
        top-3
      "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
