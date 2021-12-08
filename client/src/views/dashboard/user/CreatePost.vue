<template>
    <main>
        <b-modal ref="createPostModal"
            hide-footer hide-title
            no-close-on-backdrop
        >
            <b-tabs content-class="mt-3" align="center">
                <b-tab title="Upload Photo" active>
                    <div class="form-group">
                        <textarea class="form-control"
                            rows="3" placeholder="Post caption"
                        >
                        </textarea>
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="text" placeholder="Image url">
                    </div>
                    <div class="text-right">
                        <button class="btn btn-default">Post</button>
                    </div>
                </b-tab>
                <b-tab title="Add Status">
                    <form @submit.prevent="createPost">
                        <div class="card" :style="{'background-color': captionBgColor}">
                            <div class="form-group">
                                <textarea class="form-control transparent-input"
                                    rows="3" placeholder="Post caption"
                                    :style="{'color': captionFontColor}"
                                    v-model="createPostData.caption"
                                >
                                </textarea>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="bgColor">Font color</label>
                                    <input class="form-control transparent-input" type="color" v-model="captionFontColor">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="bgColor">Background color</label>
                                    <input class="form-control transparent-input" type="color" v-model="captionBgColor">
                                </div>
                            </div>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" v-model="isUrduFont" @change="updateFont" class="form-check-input" id="checkUrduFonts">
                            <label class="form-check-label" for="checkUrduFonts">Use Urdu Fonts</label>
                        </div>
                    
                        <div class="text-right">
                            <button class="btn btn-default">Post</button>
                        </div>
                    </form>
                </b-tab>
            </b-tabs>
        </b-modal>
    </main>
</template>

<script>
import * as postService from '../../../services/post_service';
export default {
    data(){
        return{
            createPostData: {},
            captionBgColor: '#ffffff',
            captionFontColor: '#000000',
            isUrduFont: false,
            errors: {},
        }
    },
    methods: {
        createPost: async function () {
            try {
                this.createPostData.captionBgColor = this.captionBgColor;
                this.createPostData.captionFontColor = this.captionFontColor;
                const response = await postService.createPost(this.createPostData);
                this.$emit('addNewPost', response.data);
                this.hideCreatePostModal();
                
            } catch (error) {
                console.log(error)
            }
        },
        updateFont(){
            if(this.isUrduFont){
                this.createPostData.captionFontFamily = 'Noto Nastaliq Urdu';
            }else{
                this.createPostData.captionFontFamily = 'sans-serif';
            }
        },
        showCreatePostModal(){
            this.$refs.createPostModal.show();
        },
        hideCreatePostModal(){
            this.$refs.createPostModal.hide();
        }
    },
}
</script>

<style scoped>
    textarea {
        resize: none;
        
    }
    .form-control:focus {
        box-shadow: none;
    }
    .transparent-input{
        font-weight: 500;
        font-size: 1.5rem;
        background-color:rgba(0,0,0,0) !important;
        border:none !important;
    }
</style>