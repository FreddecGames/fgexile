<script setup>

    useHead({ title: 'login_pageTitle' })
    
    import { storeToRefs } from 'pinia'
    
    import { useStore } from '~/store/store'    
    const store = useStore()

    import { useRouter } from 'vue-router'
    const router = useRouter()
    
    const email = ref(null)
    const password = ref(null)
    
    const errors = ref(null)
    const loading = ref(false)
    const showPassword = ref(false)

    function toggleShowPassword() { showPassword.value = !showPassword.value }
    
    async function doLogin() {
        
        errors.value = null
        loading.value = true
        
        await $fetch('https://ngexile.freddecgames.com/api/login/', {
            method: 'post',
            body: { 'username':email.value, 'password':password.value },
        })
        .then((response) => {
            
            const token = useCookie('token')
            token.value = response.key
            
            store.authenticated = true
            
            router.push('/home')
        })
        .catch((e) => {
        
            console.log(e.data)
            
            errors.value = e.data
            loading.value = false
        })
    }
    
</script>

<template>

    <div class="d-flex align-items-center mx-auto mb-2 px-3 px-sm-0" style="max-width: 28rem;">
        <img src="/favicon.ico" width="24" class="me-2"/>
        <span class="fs-5">{{ $t('site_name') }}</span>
        <span class="align-self-end ms-auto fs-6">{{ $t('login_title') }}</span>
    </div>
    
    <div class="p-3 mb-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
        
            <div class="mb-3">
                {{ $t('login_text') }}
            </div>
            
            <div v-if="errors" class="alert alert-danger">
                <div v-for="field in errors"><div v-for="error in field">{{ error }}</div></div>
            </div>
            
            <form @submit.prevent="doLogin()">
            
                <div class="mb-2">
                    <label for="loginEmail" class="form-label">{{ $t('login_email') }}</label>
                    <input type="email" v-model="email" class="form-control" id="loginEmail" :disabled="loading" required autocomplete="email" />
                </div>

                <div class="mb-3">
                    <div class="row gx-2 align-items-center">
                        <div class="col"><label for="loginPassword" class="form-label">{{ $t('login_password') }}</label></div>
                        <div class="col-auto small"><NuxtLink to="/password-reset">{{ $t('login_resetPassword') }}</NuxtLink></div>
                    </div>
                    <div class="input-group">
                        <input v-if="showPassword" type="text" v-model="password" class="form-control" id="loginPassword" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <input v-else type="password" v-model="password" class="form-control" id="loginPassword" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <button type="button" class="btn btn-outline-secondary" style="border-color:#dee2e6;" :disabled="loading" @click="toggleShowPassword()">
                            <font-awesome-icon v-if="showPassword" icon="fas fa-eye-slash" fixed-width />
                            <font-awesome-icon v-else icon="fas fa-eye" fixed-width />
                        </button>
                    </div>
                </div>

                <div class="row gx-2 align-items-center">
                    <div class="col"><NuxtLink to="/"><font-awesome-icon icon="fas fa-arrow-left-long" /> {{ $t('login_back') }}</NuxtLink></div>
                    <div class="col-auto">
                        <button type="submit" class="w-100 btn btn-primary" :disabled="loading">
                            <span v-if="loading"><font-awesome-icon icon="fas fa-rotate" class="rotate" /></span>
                            <span v-else>{{ $t('login_button') }}</span>
                        </button>
                    </div>
                </div>

            </form>
            
        </div>
    </div>
    
    <div class="mx-auto text-center">
        {{ $t('login_register') }} <NuxtLink to="/register">{{ $t('register_title') }}</NuxtLink>
    </div>
    
</template>
