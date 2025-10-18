import type { PropsWithChildren } from "react";

export const Button = ({ children }: PropsWithChildren) => {
  return (
    <button className="bg-purple-dark text-white text-sm rounded-full py-3 px-7 w-full">
      {children}
    </button>
  );
};
