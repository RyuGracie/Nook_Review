import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

type ButtonProps = BaseButtonProps &
  (
    | {
        onClick: () => void;
        to?: never;
      }
    | {
        onClick?: never;
        to: string;
      }
  );

export default function Button({
  children,
  onClick,
  to,
  className,
  disabled,
}: ButtonProps) {
  return onClick ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        "rounded-xl px-7 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-slate-800/35",
        className,
      )}
    >
      {children}
    </button>
  ) : (
    <NavLink
      to={to}
      className={twMerge(
        "rounded-xl px-7 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-slate-800/35",
        className,
      )}
    >
      {children}
    </NavLink>
  );
}
