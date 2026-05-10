import useAuthStore from '../store/authStore'

export const useAuth = () => {
    const { user, token, isAuthenticated, setAuth, logout, updateUser } = useAuthStore()

    const hasRole = (role) => user?.role === role
    const isAdmin = () => hasRole('admin')
    const isCenseur = () => hasRole('censeur')
    const isChefProjet = () => hasRole('chef_projet')
    const isMembre = () => hasRole('membre')

    return {
        user,
        token,
        isAuthenticated,
        setAuth,
        logout,
        updateUser,
        hasRole,
        isAdmin,
        isCenseur,
        isChefProjet,
        isMembre,
    }
}