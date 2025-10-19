import type { ButtonHTMLAttributes } from "react";

export const Btn = (
  btnProps: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">
) => {
  return (
    <button
      {...btnProps}
      className="bg-purple-dark text-white text-sm rounded-full py-3 px-7 w-full"
    >
      {btnProps.children}
    </button>
  );
};
