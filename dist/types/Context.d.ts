import { FC } from "react";
declare type Props = {
  roles: any;
  policies: any;
  currentUser: any;
};
declare type Context = {
  roles: any;
  policies: any;
  currentUser: any;
};
export declare const PermissionProvider: FC<Props>;
export declare const usePermission: () => Context;
export {};
