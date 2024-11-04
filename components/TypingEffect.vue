<template>
    <div>
      <p>{{ displayedText }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      typingSpeed: {
        type: Number,
        default: 50 // Speed in milliseconds between each character
      }
    },
    data() {
      return {
        displayedText: '' // Text that will be progressively shown
      };
    },
    mounted() {
      this.typeText();
    },
    methods: {
      async typeText() {
        for (let i = 0; i <= this.text.length; i++) {
          this.displayedText = this.text.slice(0, i);
          await this.sleep(this.typingSpeed); // Delay between each character
        }
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  };
  /* !NOTE: CODE FOR WORD TYPE:
  async typeText() {
  const words = this.text.split(' ');
  for (let i = 0; i <= words.length; i++) {
    this.displayedText = words.slice(0, i).join(' ');
    await this.sleep(this.typingSpeed);
  }
}
  */
  </script>
  
  <style scoped>
  p {
    font-family: monospace; /* Optional styling */
    white-space: pre-wrap;  /* To handle newlines correctly */
  }

@keyframes blink {
  50% {
    opacity: 0;
  }
}

  </style>
  