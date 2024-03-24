<script setup>

    useHead({ title: 'passwordResetConfirm_pageTitle' })
    
    const password1 = ref(null)
    const password2 = ref(null)

    const errors = ref(null)
    const loading = ref(false)
    const success = ref(false)
    const showPassword1 = ref(false)
    const showPassword2 = ref(false)

    function toggleShowPassword1() { showPassword1.value = !showPassword1.value }
    function toggleShowPassword2() { showPassword2.value = !showPassword2.value }
    
    const route = useRoute()
    
    async function doConfirm() {
        
        errors.value = null
        loading.value = true
        
        await $fetch('http://127.0.0.1:8000/auth/password/reset/confirm/', {
            method: 'post',
            body: { 'new_password1':password1.value, 'new_password2':password2.value, 'uid':route.params.uid, 'token':route.params.token },
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
        <span class="align-self-end ms-auto fs-6">{{ $t('passwordResetConfirm_title') }}</span>
    </div>

    <div v-if="success" class="p-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
            
            <div class="alert alert-success">
                {{ $t('passwordResetConfirm_success') }}
            </div>

            <div class="row gx-2 align-items-center">
                <div class="ms-auto col-4 col-lg-3">
                    <NuxtLink class="w-100 btn btn-primary" to="/login"><font-awesome-icon icon="fas fa-right-to-bracket" /> {{ $t('login_title') }}</NuxtLink>
                </div>
            </div>
            
        </div>
    </div>
    
    <div v-else class="p-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">

            <div class="mb-3">
                {{ $t('passwordResetConfirm_text') }}
            </div>
            
            <div v-if="errors" class="alert alert-danger">
                <div v-for="field in errors"><div v-for="error in field">{{ error }}</div></div>
            </div>
            
            <form @submit.prevent="doConfirm()">
            
                <div class="mb-2">
                    <label for="comfirmPassword1" class="form-label">{{ $t('passwordResetConfirm_password1') }}</label>
                    <div class="input-group">
                        <input v-if="showPassword1" type="text" v-model="password1" class="form-control" id="comfirmPassword1" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <input v-else type="password" v-model="password1" class="form-control" id="comfirmPassword1" :disabled="loading" required autocomplete="current-password" />
                        <button type="button" class="btn btn-outline-secondary" style="border-color:#dee2e6;" :disabled="loading" @click="toggleShowPassword1()">
                            <font-awesome-icon v-if="showPassword1" icon="fas fa-eye-slash" fixed-width />
                            <font-awesome-icon v-else icon="fas fa-eye" fixed-width />
                        </button>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="comfirmPassword2" class="form-label">{{ $t('passwordResetConfirm_password2') }}</label>
                    <div class="input-group">
                        <input v-if="showPassword2" type="text" v-model="password2" class="form-control" id="comfirmPassword2" :disabled="loading" required minlength="8" autocomplete="current-password" />
                        <input v-else type="password" v-model="password2" class="form-control" id="comfirmPassword2" :disabled="loading" required autocomplete="current-password" />
                        <button type="button" class="btn btn-outline-secondary" style="border-color:#dee2e6;" :disabled="loading" @click="toggleShowPassword2()">
                            <font-awesome-icon v-if="showPassword2" icon="fas fa-eye-slash" fixed-width />
                            <font-awesome-icon v-else icon="fas fa-eye" fixed-width />
                        </button>
                    </div>
                </div>
                
                <div class="row gx-2 align-items-center">
                    <div class="ms-auto col-auto">
                        <button type="submit" class="w-100 btn btn-primary" :disabled="loading">
                            <span v-if="loading"><font-awesome-icon icon="fas fa-rotate" class="rotate" /></span>
                            <span v-else>{{ $t('login_button') }}</span>
                        </button>
                    </div>
                </div>

            </form>
            
        </div>
    </div>
    
</template>
