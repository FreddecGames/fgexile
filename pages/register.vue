<script setup>

    useHead({ title: 'register_pageTitle' })

    const email = ref(null)
    const password1 = ref(null)
    const password2 = ref(null)

    const errors = ref(null)
    const loading = ref(false)
    const success = ref(false)
    const showPassword1 = ref(false)
    const showPassword2 = ref(false)

    function toggleShowPassword1() { showPassword1.value = !showPassword1.value }
    function toggleShowPassword2() { showPassword2.value = !showPassword2.value }
    
    async function doRegister() {
        
        errors.value = null
        loading.value = true
        
        await $fetch('http://127.0.0.1:8000/auth/registration/', {
            method: 'post',
            body: { 'username':email.value, 'email':email.value, 'password1':password1.value, 'password2':password2.value },
        })
        .then((response) => {
        
            success.value = true
            loading.value = false
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
        <span class="align-self-end ms-auto fs-6">{{ $t('register_title') }}</span>
    </div>
    
    <div v-if="success" class="p-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
            
            <div class="alert alert-success">
                {{ $t('register_success') }}
            </div>

            <div class="row gx-2 align-items-center">
                <div class="col"><NuxtLink to="/login"><font-awesome-icon icon="fas fa-arrow-left-long" /> {{ $t('passwordReset_back') }}</NuxtLink></div>
            </div>
            
        </div>
    </div>
    
    <div v-else class="p-3 mb-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
        
            <div class="mb-3">
                {{ $t('register_text') }}
            </div>
            
            <div v-if="errors" class="alert alert-danger">
                <div v-for="field in errors"><div v-for="error in field">{{ error }}</div></div>
            </div>
            
            <form @submit.prevent="doRegister()">
            
                <div class="mb-2">
                    <label for="registerEmail" class="form-label">{{ $t('register_email') }}</label>
                    <input type="email" v-model="email" class="form-control" id="registerEmail" :disabled="loading" required autocomplete="email" />
                </div>
                
                <div class="mb-2">
                    <label for="registerPassword1" class="form-label">{{ $t('register_password1') }}</label>
                    <div class="input-group">
                        <input v-if="showPassword1" type="text" v-model="password1" class="form-control" id="registerPassword1" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <input v-else type="password" v-model="password1" class="form-control" id="registerPassword1" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <button type="button" class="btn btn-outline-secondary" style="border-color:#dee2e6;" :disabled="loading" @click="toggleShowPassword1()">
                            <font-awesome-icon v-if="showPassword1" icon="fas fa-eye-slash" fixed-width />
                            <font-awesome-icon v-else icon="fas fa-eye" fixed-width />
                        </button>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="registerPassword2" class="form-label">{{ $t('register_password2') }}</label>
                    <div class="input-group">
                        <input v-if="showPassword2" type="text" v-model="password2" class="form-control" id="registerPassword2" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <input v-else type="password" v-model="password2" class="form-control" id="registerPassword2" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <button type="button" class="btn btn-outline-secondary" style="border-color:#dee2e6;" :disabled="loading" @click="toggleShowPassword2()">
                            <font-awesome-icon v-if="showPassword2" icon="fas fa-eye-slash" fixed-width />
                            <font-awesome-icon v-else icon="fas fa-eye" fixed-width />
                        </button>
                    </div>
                    <div class="form-text">{{ $t('register_help1') }}</div>
                    <div class="form-text">{{ $t('register_help2') }}</div>
                    <div class="form-text">{{ $t('register_help3') }}</div>
                    <div class="form-text">{{ $t('register_help4') }}</div>
                </div>

                <div class="row gx-2 align-items-center">
                    <div class="col"><NuxtLink to="/"><font-awesome-icon icon="fas fa-arrow-left-long" /> {{ $t('register_back') }}</NuxtLink></div>
                    <div class="col-auto">
                        <button type="submit" class="w-100 btn btn-primary" :disabled="loading">
                            <span v-if="loading"><font-awesome-icon icon="fas fa-rotate" class="rotate" /></span>
                            <span v-else>{{ $t('register_button') }}</span>
                        </button>
                    </div>
                </div>

            </form>
                        
        </div>
    </div>
    
    <div class="mx-auto text-center">
        {{ $t('register_login') }} <NuxtLink to="/login">{{ $t('login_title') }}</NuxtLink>
    </div>
    
</template>
