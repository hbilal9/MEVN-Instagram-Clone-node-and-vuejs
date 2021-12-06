<template>
    <main>
        <b-modal ref="createPostModal"
            hide-footer hide-title
            no-close-on-backdrop
        >
            <h1>modal</h1>
            <div class="text-right">
                <button class="btn btn-default">Post</button>
            </div>
        </b-modal>
    </main>
</template>

<script>
export default {
    data(){
        return{}
    },
    methods: {
        showCreatePostModal(){
            this.$refs.createPostModal.show();
        },
        hideCreatePostModal(){
            this.$refs.createPostModal.hide();
        }
    },
}
</script>