<script setup>

    useHead({ title: 'welcome_pageTitle' })
    
</script>

<template>
    
    <div class="d-flex align-items-center mx-auto mb-2 px-3 px-sm-0" style="max-width: 28rem;">
        <img src="/favicon.ico" width="24" class="me-2"/>
        <span class="fs-5">{{ $t('site_name') }}</span>
        <span class="align-self-end ms-auto fs-6">{{ $t('welcome_title') }}</span>
    </div>
    
    <div class="p-3 bg-light">
        <div class="mx-auto" style="max-width: 28rem;">
        
            <p class="text-center">{{ $t('welcome_text') }}</p>
            
            <div class="row gx-2 align-items-center justify-content-between">
                <div class="col-5 col-lg-3">
                    <NuxtLink class="w-100 btn btn-primary" to="/register"><font-awesome-icon icon="fas fa-user-plus" /> {{ $t('register_title') }}</NuxtLink>
                </div>
                <div class="col-5 col-lg-3">
                    <NuxtLink class="w-100 btn btn-primary" to="/login"><font-awesome-icon icon="fas fa-right-to-bracket" /> {{ $t('login_title') }}</NuxtLink>
                </div>
            </div>
            
        </div>
    </div>
  
</template>
