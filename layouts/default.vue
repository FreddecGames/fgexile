<template>

    <div id="application">

        <div class="d-flex align-items-center justify-content-center" style="height: 100vh">
            <div class="w-100">
            
                <slot />
            
            </div>
        </div>
        
    </div>

</template>

<style>

    #application {
        
        position: relative;
        flex: 1 1 auto; max-width: 100%; min-height: 100vh;
        display: flex; flex-direction: column;
    }

</style>