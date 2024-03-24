import { defineStore } from 'pinia'

export const useStore = defineStore({

    id: 'app-store',

    state: () => { return {
        
        authenticated: false,
    }},
    
    getters: {
        
    },
    
    actions: {
        
        logout() {
            
          const token = useCookie('token')
          token.value = null
          
          this.authenticated = false
        },
    },
})
