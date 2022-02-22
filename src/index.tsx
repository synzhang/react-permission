import { ReactNode, useCallback } from 'react'
import { usePermission } from './Context'

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type RoleTypes = keyof typeof ROLES

export const useAuthorization = () => {
  const { currentUser } = usePermission()

  if (!currentUser) {
    throw Error('User does not exist!')
  }

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles?.length > 0) {
        return allowedRoles.includes(currentUser.role)
      }

      return true
    },
    [currentUser.role]
  )

  return { checkAccess, role: currentUser.role }
}

type AuthorizationProps = {
  forbiddenFallback?: ReactNode
  children: ReactNode
} & (
  | {
      allowedRoles: RoleTypes[]
      policyCheck?: never
    }
  | {
      allowedRoles?: never
      policyCheck: boolean
    }
)

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization()

  let canAccess = false

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles })
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck
  }

  return <>{canAccess ? children : forbiddenFallback}</>
}