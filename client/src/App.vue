<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');

  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }

  @media screen and (max-width: 991px) {
    .sidebar-contents {
      display: none;
    }

    .navbar{
      text-align: center !important;
      display: block !important;
    }

    .bottom-navigation {
        height: 3rem;
        width: 100%;
        bottom: 0;
        margin-right: 10px;
        background-color: rgb(255, 255, 255);
        margin-top: auto;
    }
  }
  @media screen and (min-width: 992px) {
    .main-bottom-navigation {
      display: none !important;
    }
  }
  .btn:focus {outline:0;}
  .btn:active {
    outline: none;
    border: none;
  }
</style>
