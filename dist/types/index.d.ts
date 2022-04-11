import { ReactNode } from "react";
import { PermissionProvider } from "./Context";
export declare enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}
declare type RoleTypes = keyof typeof ROLES;
declare type PermissionProps = {
  forbiddenFallback?: ReactNode;
  children: ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);
declare const Permission: ({
  policyCheck,
  allowedRoles,
  forbiddenFallback,
  children,
}: PermissionProps) => JSX.Element;
export { PermissionProvider };
export default Permission;
