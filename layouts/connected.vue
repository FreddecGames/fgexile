<template>

    <header id="topbar" class="bg-light border-bottom">
        <div id="topbar-content" class="container">
            <div class="row gx-2 align-items-center">
            
                <div class="col-auto"><img src="/favicon.ico" width="24" /></div>
                <div class="col fs-5">{{ $t('site_name') }}</div>
                
            </div>
        </div>
    </header>
    
    <main id="main">
        <div class="container py-3">
            
            <slot />
            
        </div>
    </main>    
    
</template>

<style>
    
    #topbar {
        position: absolute; top: 0px; left: 0px;
        width: 100%;
        display: flex; flex-direction: column;
    }

    #topbar-content {
        flex: 0 0 auto; height: 48px;
        display: flex; align-items: center;
    }
    
    #main {
        flex: 1 0 auto; max-width: 100%;
        padding-top: 48px;
    }
    
</style>