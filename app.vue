<script setup>

    const { t } = useI18n()

    useHead({
        titleTemplate: (titleChunk) => {
            return titleChunk ? t(titleChunk) + ' - ' + t('site_name') : t('site_name')
        }
    })

</script>

<template>

    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    
</template>
