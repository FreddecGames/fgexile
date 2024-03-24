<script setup>

    useHead({ title: 'registerConfirm_pageTitle' })
    
    const confirmError = ref(false)
    const confirmSuccess = ref(false)
    
    const route = useRoute()
    
    await $fetch('http://127.0.0.1:8000/auth/registration/verify-email/', {
        method: 'post',
        body: { 'key':route.params.token },
    })
    .then((response) => {
    
        confirmSuccess.value = true
    })
    .catch((e) => {
    
        console.log(e.data)
        
        confirmError.value = true
    })

    const resendEmail = ref(null)
    
    const resendErrors = ref(null)
    const resendSuccess = ref(false)
    const resendLoading = ref(false)
    
    async function doResend() {
        
        resendErrors.value = null
        resendLoading.value = true
        
        await $fetch('http://127.0.0.1:8000/auth/registration/resend-email/', {
            method: 'post',
            body: { 'email':resendEmail.value },
        })
        .then((response) => {
        
            resendSuccess.value = true
            resendLoading.value = false
        })
        .catch((e) => {
        
            console.log(e.data)
            
            resendErrors.value = e.data
            resendLoading.value = false
        })
    }
    
</script>

<template>
    
    <div class="d-flex align-items-center mx-auto mb-2 px-3 px-sm-0" style="max-width: 28rem;">
        <img src="/favicon.ico" width="24" class="me-2"/>
        <span class="fs-5">{{ $t('site_name') }}</span>
        <span class="align-self-end ms-auto fs-6">{{ $t('registerConfirm_title') }}</span>
    </div>
    
    <div v-if="confirmSuccess" class="p-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
            
            <div class="alert alert-success">
                {{ $t('registerConfirm_success') }}
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
            
            <div v-if="resendErrors" class="alert alert-danger">
                <div v-for="field in resendErrors"><div v-for="error in field">{{ error }}</div></div>
            </div>

            <div v-else-if="resendSuccess" class="alert alert-success mb-0">
                {{ $t('registerResend_success') }}
            </div>
        
            <div v-else-if="confirmError" class="alert alert-danger">
                {{ $t('registerConfirm_error') }}
            </div>
            
            <form v-if="!resendSuccess" @submit.prevent="doResend()">
            
                <div class="mb-3">
                    <label for="resendEmail" class="form-label">{{ $t('registerResend_email') }}</label>
                    <input type="email" v-model="resendEmail" class="form-control" id="resendEmail" :disabled="resendLoading" required autocomplete="email" />
                </div>

                <div class="row gx-2 align-items-center">
                    <div class="ms-auto col-auto">
                        <button type="submit" class="w-100 btn btn-primary" :disabled="resendLoading">
                            <span v-if="resendLoading"><font-awesome-icon icon="fas fa-rotate" class="rotate" /></span>
                            <span v-else>{{ $t('registerResend_button') }}</span>
                        </button>
                    </div>
                </div>

            </form>
            
        </div>
    </div>
    
</template>
