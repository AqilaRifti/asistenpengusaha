<template>
    <div v-if="loading" class="spinner"></div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loading: true, // Set to true to show the spinner initially
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
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1); /* Light grey */
    border-left-color: rgb(225, 29, 72); /* Blue spinner color */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  