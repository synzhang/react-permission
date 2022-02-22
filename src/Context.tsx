import { createContext, useContext } from 'react'

const PermissionContext = createContext({})

export const PermissionProvider = ({
  roles,
  policies,
  currentUser,
  children,
}) => (
  <PermissionContext.Provider value={{ roles, policies, currentUser }}>
    {children}
  </PermissionContext.Provider>
)

export const usePermission = () => {
  const context = useContext(PermissionContext)

  if (typeof context === 'undefined') {
    throw new Error('useContext must be used within a Provider')
  }

  return context
}
