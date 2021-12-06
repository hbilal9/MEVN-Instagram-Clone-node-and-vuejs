<template>
    <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <span class="display-1 d-block">404</span>
                <div class="mb-4 lead">The page you are looking for was not found.</div>
                <router-link to="/" class="btn btn-link">Back to Home</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
    body {
        background: #dedede;
    }
    .page-wrap {
        min-height: 100vh;
    }
</style>