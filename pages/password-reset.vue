<script setup>

    useHead({ title: 'passwordReset_pageTitle' })
    
    const email = ref(null)
    
    const errors = ref(null)
    const loading = ref(false)
    const success = ref(false)
    
    async function doReset() {
        
        errors.value = null
        loading.value = true
        
        await $fetch('http://127.0.0.1:8000/auth/password/reset/', {
            method: 'post',
            body: { 'email':email.value },
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
        <span class="align-self-end ms-auto fs-6">{{ $t('passwordReset_title') }}</span>
    </div>
    
    <div v-if="success" class="p-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
            
            <div class="alert alert-success">
                {{ $t('passwordReset_success') }}
            </div>

            <div class="row gx-2 align-items-center">
                <div class="col"><NuxtLink to="/login"><font-awesome-icon icon="fas fa-arrow-left-long" /> {{ $t('passwordReset_back') }}</NuxtLink></div>
            </div>
            
        </div>
    </div>
        
    <div v-else class="p-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
            
            <div class="mb-3">
                {{ $t('passwordReset_text') }}
            </div>
            
            <div v-if="errors" class="alert alert-danger">
                <div v-for="field in errors"><div v-for="error in field">{{ error }}</div></div>
            </div>
            
            <form @submit.prevent="doReset()">
            
                <div class="mb-3">
                    <label for="resetEmail" class="form-label">{{ $t('passwordReset_email') }}</label>
                    <input type="email" v-model="email" class="form-control" id="resetEmail" :disabled="loading" required autocomplete="email" />
                </div>

                <div class="row gx-2 align-items-center">
                    <div class="col"><NuxtLink to="/login"><font-awesome-icon icon="fas fa-arrow-left-long" /> {{ $t('passwordReset_back') }}</NuxtLink></div>
                    <div class="col-auto">
                        <button type="submit" class="w-100 btn btn-primary" :disabled="loading">
                            <span v-if="loading"><font-awesome-icon icon="fas fa-rotate" class="rotate" /></span>
                            <span v-else>{{ $t('passwordReset_button') }}</span>
                        </button>
                    </div>
                </div>

            </form>
            
        </div>
    </div>
    
</template>
