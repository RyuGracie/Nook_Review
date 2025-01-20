import { Link } from "react-router";
import { twMerge } from "tailwind-merge";

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
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
}: ButtonProps) {
  return onClick ? (
    <button
      onClick={onClick}
      className={twMerge(
        "rounded-xl px-7 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-slate-800/35",
        className,
      )}
    >
      {children}
    </button>
  ) : (
    <Link
      to={to}
      className={twMerge(
        "rounded-xl px-7 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-slate-800/35",
        className,
      )}
    >
      {children}
    </Link>
  );
}
