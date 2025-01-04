import React, { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/auth.slice";
import { Navigate } from "react-router-dom";

const AntiLoginProtection: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const user = useAppSelector(useCurrentToken);

  if (user) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default AntiLoginProtection;
