<template>
    <div v-if="loading" class="loading-bar"></div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true,
      };
    },
    methods: {
      startLoading() {
        this.loading = true;
      },
      finishLoading() {
        this.loading = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .loading-bar {
    position: relative;
    width: 100%;
    height: 5px;
    background-color: rgb(59, 130, 236);
    animation: loading-animation 2s linear infinite;
    width: 100vw!important;overflow: hidden!important;
  }
  
  @keyframes loading-animation {
    0% {
      left: -100%;
      width: 100%;
    }
    50% {
      left: 0;
      width: 100%;
    }
    100% {
      left: 100%;
      width: 10%;
    }
  }
  </style>
  