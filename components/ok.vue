<template>
    <div class="typewriter-container">
      <span>Hadapi Era </span><span class="typewriter">{{ currentText }}</span><span class="cursor">|</span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        words: ["Perubahan!", "Globalisasi!", "Teknologi!", "Modern!"],  // Words to cycle between
        currentText: "",
        wordIndex: 0,
        isDeleting: false,
        typingSpeed: 100,
      };
    },
    mounted() {
      this.startTyping();
    },
    methods: {
      startTyping() {
        let currentWord = this.words[this.wordIndex];
        if (!this.isDeleting) {
          // Typing effect
          this.currentText = currentWord.substring(0, this.currentText.length + 1);
        } else {
          // Deleting effect
          this.currentText = currentWord.substring(0, this.currentText.length - 1);
        }
  
        // Adjust typing speed when switching between typing and deleting
        let typingDelay = this.isDeleting ? this.typingSpeed / 2 : this.typingSpeed;
  
        // If the word is fully typed, switch to deleting
        if (!this.isDeleting && this.currentText === currentWord) {
          typingDelay = 2000;  // Pause for 2 seconds before deleting
          this.isDeleting = true;
        }
        // If the word is fully deleted, switch to typing the next word
        else if (this.isDeleting && this.currentText === "") {
          this.isDeleting = false;
          this.wordIndex = (this.wordIndex + 1) % this.words.length;  // Cycle through words
          typingDelay = 500;  // Short pause before typing the next word
        }
  
        setTimeout(() => this.startTyping(), typingDelay);
      },
    },
  };
  </script>
  
  <style scoped>
  .typewriter-container {
    font-size: 2rem;
    font-family: "Inter", sans-serif;
    white-space: nowrap;
  }
  .typewriter {
    font-weight: 1000;
    text-decoration: underline;
  }
  .cursor {
    display: inline-block;
    margin-left: 2px;
    width: 10px;
    background-color: black;
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  </style>
  