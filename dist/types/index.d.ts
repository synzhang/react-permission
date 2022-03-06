import { ReactNode } from 'react';
export declare enum ROLES {
    ADMIN = "ADMIN",
    USER = "USER"
}
declare type RoleTypes = keyof typeof ROLES;
declare type PermissionProps = {
    forbiddenFallback?: ReactNode;
    children: ReactNode;
} & ({
    allowedRoles: RoleTypes[];
    policyCheck?: never;
} | {
    allowedRoles?: never;
    policyCheck: boolean;
});
export declare const Permission: ({ policyCheck, allowedRoles, forbiddenFallback, children, }: PermissionProps) => JSX.Element;
export {};
