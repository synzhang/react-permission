import React, { FC, createContext, useContext } from "react";

type Props = {
  roles: any;
  policies: any;
  currentUser: any;
};

type Context = {
  roles: any;
  policies: any;
  currentUser: any;
};

const PermissionContext = createContext<Context>({} as Context);

export const PermissionProvider: FC<Props> = ({
  roles,
  policies,
  currentUser,
  children,
}) => (
  <PermissionContext.Provider value={{ roles, policies, currentUser }}>
    {children}
  </PermissionContext.Provider>
);

export const usePermission = () => {
  const context = useContext(PermissionContext);

  if (typeof context === "undefined") {
    throw new Error("useContext must be used within a Provider");
  }

  return context;
};
