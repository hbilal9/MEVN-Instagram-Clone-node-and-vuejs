<template>
    <main>
        <Header />
        <header>
            <div class="container">

                <div class="profile">

                    <div class="profile-image">

                        <img :src="user.display_photo" alt="" width="256">

                    </div>

                    <div class="profile-user-settings">

                        <h1 class="profile-user-name">{{user.username}}</h1>

                        
                        <!-- <div class="btn follow-buttons"> -->
                            <button v-if="user._id == loginUser._id"  class="btn profile-edit-btn">Edit Profile</button>
                        <!-- </div> -->
                        <div v-else class="btn follow-buttons">
                            <button class="btn btn-primary profile-edit-btn"
                                @click="followUser(user)"
                                v-if="!user.followers.includes(loginUser._id)"
                            >
                                Follow
                            </button>
                            <button v-else
                                class="btn btn-primary profile-edit-btn"
                                @click="unFollowUser(user)"
                            >
                                Unfollow
                            </button>
                        </div>

                        <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i></button>

                    </div>

                    <div class="profile-stats">

                        <ul>
                            <li><span class="profile-stat-count">{{posts.length}}</span> posts</li>
                            <li><span class="profile-stat-count">{{ user.followers.length }}</span> followers</li>
                            <li><span class="profile-stat-count">{{ user.following.length }}</span> following</li>
                        </ul>

                    </div>

                    <div class="profile-bio">

                        <p>
                            <span class="profile-real-name">{{user.first_name + user.last_name}}</span><br>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️
                        </p>

                    </div>

                </div>
                <!-- End of profile section -->

            </div>
        </header>

        <main>
            <div class="container">
                <div v-if="posts.length < 0" class="loader"></div>
                <div class="gallery">
                    <div class="gallery-item" tabindex="0" v-for="(post, index) in posts" :key="index">
                        <img
                            :src="post.img"
                            class="gallery-image"
                            alt=""
                            v-if="post.img"
                        >
                        <div class="card"
                            v-else
                            :style="{'background-color': post.captionBgColor}"
                        >
                            <p class="card-text ml-2"
                                :style="{'color': post.captionFontColor,
                                    'font-weight': 600,
                                    'min-height': '4rem',
                                    'white-space': 'pre-line'
                                }"
                            >
                                <span :style="post.fontFamily ? {'font-family': post.fontFamily} : {'font-family': 'sans-serif'}">
                                    {{post.caption}} </span>
                            </p>
                        </div>
                        <div class="gallery-item-info">
                            <ul>
                                <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 89</li>
                                <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 5</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <BottomNavigation/>
    </main>
</template>

<script>
import Header from '../../components/Header.vue';
import BottomNavigation from '../../components/BottomNavigation.vue';
import { getProfile} from '../../services/auth_service';
import {
    getProfileByUsername, getPostsByUsername, followUser, unFollowUser
} from '../../services/user_service';
export default {
    components:{
        Header,
        BottomNavigation,
    },
    data() {
        return {
            posts: [],
            loginUser: {},
            user: {}
        }
    },
    mounted() {
        this.fetchUserProfile();
        this.getProfile();
        this.fetchPosts();
    },
    methods: {
        getProfile: async function(){
            try{
                const response = await getProfile();
                this.loginUser = response.data;
            }catch(error){
                console.log(error)
            }
        },
        fetchUserProfile: async function(){
            try{
                const response = await getProfileByUsername(this.$route.params.username);
                this.user = response.data;
            }catch(error){
                console.log(error)
            }
        },

        fetchPosts: async function(){
            try{
                const response = await getPostsByUsername(this.$route.params.username);
                this.posts = response.data;
            }catch(error){
                console.log(error)
            }
        },

        followUser: async function(user){
            try{
                await followUser(user);
                this.fetchUserProfile()
                // this.user = response.data;
            }catch(error){
                console.log(error)
            }
        },

        unFollowUser: async function(user){
            try{
                await unFollowUser(user);
                this.fetchUserProfile();
                // this.user.followers = this.user.followers.filter(obj => {
                //     console.log(obj._id, user._id)
                //     return user._id != obj._id;
                // })
            }catch(error){
                console.log(error)
            }
        }
    },
}
</script>

<style scoped>
.btn-primary {
    background-color: rgb(81, 81, 218) !important;
    color: #ffffff !important;
}
img {
    display: block;
}

.container {
    max-width: 93.5rem;
    margin: 0 auto;
    padding: 0 2rem;
}

.btn {
    display: inline-block;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
}

.btn:focus {
    outline: 0.5rem auto #4d90fe;
}

.visually-hidden {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}

/* Profile Section */

.profile {
    padding: 5rem 0;
}

.profile::after {
    content: "";
    display: block;
    clear: both;
}

.profile-image {
    float: left;
    width: calc(33.333% - 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3rem;
}

.profile-image img {
    border-radius: 50%;
}

.profile-user-settings,
.profile-stats,
.profile-bio {
    float: left;
    width: calc(66.666% - 2rem);
}

.profile-user-settings {
    margin-top: 1.1rem;
}

.profile-user-name {
    display: inline-block;
    font-size: 3.2rem;
    font-weight: 300;
}

.profile-edit-btn {
    font-size: 1.4rem;
    line-height: 1.8;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.3rem;
    padding: 0 2.4rem;
    margin-left: 2rem;
}

.follow-buttons{
    font-size: 1.4rem;
    line-height: 1.8;
    padding: 0 2.4rem;
    margin-left: 2rem;
}

.profile-settings-btn {
    font-size: 2rem;
    margin-left: 1rem;
}

.profile-stats {
    margin-top: 2.3rem;
}

.profile-stats li {
    display: inline-block;
    font-size: 1.6rem;
    line-height: 1.5;
    margin-right: 4rem;
    cursor: pointer;
}

.profile-stats li:last-of-type {
    margin-right: 0;
}

.profile-bio {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 2.3rem;
}

.profile-real-name,
.profile-stat-count,
.profile-edit-btn {
    font-weight: 600;
}

/* Gallery Section */

.gallery {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem -1rem;
    padding-bottom: 3rem;
}

.gallery-item {
    position: relative;
    flex: 1 0 22rem;
    margin: 1rem;
    color: #fff;
    cursor: pointer;
}

.gallery-item:hover .gallery-item-info,
.gallery-item:focus .gallery-item-info {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.gallery-item-info {
    display: none;
}

.gallery-item-info li {
    display: inline-block;
    font-size: 1.7rem;
    font-weight: 600;
}

.gallery-item-likes {
    margin-right: 2.2rem;
}

.gallery-item-type {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
    text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);
}

.fa-clone,
.fa-comment {
    transform: rotateY(180deg);
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Loader */

.loader {
    width: 5rem;
    height: 5rem;
    border: 0.6rem solid #999;
    border-bottom-color: transparent;
    border-radius: 50%;
    margin: 0 auto;
    animation: loader 500ms linear infinite;
}

/* Media Query */

@media screen and (max-width: 40rem) {
    .profile {
        display: flex;
        flex-wrap: wrap;
        padding: 4rem 0;
    }

    .profile::after {
        display: none;
    }

    .profile-image,
    .profile-user-settings,
    .profile-bio,
    .profile-stats {
        float: none;
        width: auto;
    }

    .profile-image img {
        width: 7.7rem;
    }

    .profile-user-settings {
        flex-basis: calc(100% - 10.7rem);
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .profile-user-name {
        font-size: 2.2rem;
    }

    .profile-edit-btn {
        order: 1;
        padding: 0;
        text-align: center;
        margin-top: 1rem;
    }

    .profile-edit-btn {
        margin-left: 0;
    }

    .profile-bio {
        font-size: 1.4rem;
        margin-top: 1.5rem;
    }

    .profile-edit-btn,
    .profile-bio,
    .profile-stats {
        flex-basis: 100%;
    }

    .profile-stats {
        order: 1;
        margin-top: 1.5rem;
    }

    .profile-stats ul {
        display: flex;
        text-align: center;
        padding: 1.2rem 0;
        border-top: 0.1rem solid #dadada;
        border-bottom: 0.1rem solid #dadada;
    }

    .profile-stats li {
        font-size: 1.4rem;
        flex: 1;
        margin: 0;
    }

    .profile-stat-count {
        display: block;
    }
}

/* Spinner Animation */

@keyframes loader {
    to {
        transform: rotate(360deg);
    }
}

/*

The following code will only run if your browser supports CSS grid.

Remove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. 

*/

@supports (display: grid) {
    .profile {
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: repeat(3, auto);
        grid-column-gap: 3rem;
        align-items: center;
    }

    .profile-image {
        grid-row: 1 / -1;
    }

    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        grid-gap: 2rem;
    }

    .profile-image,
    .profile-user-settings,
    .profile-stats,
    .profile-bio,
    .gallery-item,
    .gallery {
        width: auto;
        margin: 0;
    }

    @media (max-width: 991px) {
        .profile {
            grid-template-columns: auto 1fr;
            grid-row-gap: 1.5rem;
        }

        .profile-image {
            grid-row: 1 / 2;
        }

        .profile-user-settings {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 1rem;
        }

        .profile-edit-btn,
        .profile-stats,
        .profile-bio {
            grid-column: 1 / -1;
        }

        .profile-user-settings,
        .profile-edit-btn,
        .profile-settings-btn,
        .profile-bio,
        .profile-stats {
            margin: 0;
        }
    }
}
</style>