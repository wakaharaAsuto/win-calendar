import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};
