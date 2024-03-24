import { useStore } from '~/store/store'

export default defineNuxtRouteMiddleware((to) => {
    
    const store = useStore()    
    const token = useCookie('token')
    if (!token.value) store.authenticated = false
    else if (!store.authenticated) store.authenticated = true
    
    if (!store.authenticated && to.name !== 'login') {
        
        abortNavigation()
        
        return navigateTo('/login')
    }
})
