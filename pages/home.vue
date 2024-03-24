<script setup>
    
    definePageMeta({ layout:'connected', middleware: 'auth', })
    
    const token = useCookie('token')
    
    const user = await $fetch('https://ngexile.freddecgames.com/api/user/', {
        method: 'get',
        headers: { 'Authorization': `Token ${token.value}` },
    })

    import { useStore } from '~/store/store'    
    const store = useStore()
    
    import { useRouter } from 'vue-router'
    const router = useRouter()
    
    function doLogout() {
        
        store.logout()
        router.push('/login')
    }
    
</script>

<template>

    <div class="alert alert-warning">
        {{ $t('label_connectedAs') }} <strong>{{ user.email }}</strong>
    </div>
    
    <button type="button" class="btn btn-primary" @click="doLogout()"><font-awesome-icon icon="fas fa-right-from-bracket" /> {{ $t('logout_button') }}</button>
    
</template>
