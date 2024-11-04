<template>
  <main class="flex flex-col justify-center gap-16 md:flex-row items-center">
    <div class="max-w-2xl flex flex-col gap-4">
      <h1 class="text-4xl font-bold" style="font-family: Arial, Helvetica, sans-serif">TOEFL: Ujian, Peluang, Sukses!</h1>
      <p>Taklukkan TOEFL dan buka pintu dunia! Tunjukkan kemampuan bahasa Inggrismu dan raih skor impian. Berlatih sekarang, masa depan cerah menantimu!</p>
      <Button>Free Test Simulation <LucideChevronsRight/> </Button>
    </div>
    <div class="atom-container">
      <div class="nucleus">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9c/TOEFL_Logo.svg" alt="">
      </div>
      <!-- Orbits -->
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="orbit orbit-3"></div>
      <div class="orbit orbit-4"></div>
      <!-- Electrons -->
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="electron"
        :class="'electron-' + (index + 1)"
        @mouseover="showDetails(index)"
        @click="goToFeature(index)"
      >
        <HoverCard>
            <HoverCardTrigger as-child>
                <Button variant="link" v-html="feature.iconSVG" style="color: white;">
                </Button>
            </HoverCardTrigger>
            <HoverCardContent class="w-80">
            <div class="flex justify-between space-x-4">
                <Avatar>
                    <AvatarImage :src="`/${feature.icon}.svg`" style="color: white">
                    </AvatarImage>
                    <AvatarFallback>{{ feature.name  }}</AvatarFallback>
                </Avatar>
                <div class="space-y-1">
                    <h4 class="text-sm font-semibold">
                        @vuejs
                    </h4>
                    <p class="text-sm">
                        {{ feature.details }}
                    </p>
                    <div class="flex items-center pt-2">
                        <CalendarDays class="mr-2 h-4 w-4 opacity-70" />
                        <span class="text-xs text-muted-foreground">
                        Joined January 2014
                        </span>
                    </div>
                </div>
            </div>
            </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        features: [
            { 
                name: "Reading", 
                icon: "book-open-text",
                iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>`,
                details: "Details about Feature 1 Details about Feature 1 Details about Feature 1" ,
                link: "/feature1"
            },
            { 
                name: "Speaking",
                icon: "speech",
                iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-speech"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/><path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/></svg>`,
                details: "Details about Feature 2",
                link: "/feature2" 
            },
            { 
                name: "Writing", 
                icon: "square-pen",
                iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`,
                details: "Details about Feature 3", 
                link: "/feature3" 
            },
            { 
                name: "Listening",
                icon: "audio-lines",
                iconSVG: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg>`,
                details: "Details about Feature 4", 
                link: "/feature4" 
            },
        ],
        a: "<b>bold text here</b>",
        hoveredFeature: null,
      };
    },
    methods: {
      showDetails(index) {
        this.hoveredFeature = index;
      },
      goToFeature(index) {
        this.$router.push(this.features[index].link);
      },
    },
  };
  </script>
  
  <style scoped>
  .atom-container {
    position: relative;
    width: 250px; /* Made the container smaller */
    height: 250px;
    margin: 0 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  
  .nucleus {
    position: absolute;
    width: 90px; /* Smaller nucleus */
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
  }
  
  /* Orbits */
  .orbit {
    position: absolute;
    border: 2px dashed #999;
    border-radius: 50%;
    animation: spin-orbit 10s infinite linear; /* Default spin for normal direction */

  }
  
  .orbit-1 {
    width: 120px; /* Smaller orbit */
    height: 120px;
    animation: spin 100s linear infinite; /* Animation properties */

  }
  
  .orbit-2 {
    width: 160px;
    height: 160px;
    animation: spin 100s reverse linear infinite; /* Animation properties */

  }
  
  .orbit-3 {
    width: 200px;
    height: 200px;
    animation: spin 100s linear infinite; /* Animation properties */

  }
  
  .orbit-4 {
    width: 240px;
    height: 240px;
    animation: spin 100s reverse linear infinite; /* Animation properties */

  }
  
  /* Spinning Electrons */
  .electron {
    position: absolute;
    width: 20px; /* Smaller electrons */
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    animation: spin-orbit 10s infinite linear;
  }
  
  .electron-label {
    color: white;
  }
  
  .electron:hover .feature-details {
    display: block;
  }
  
  .feature-details {
    position: absolute;
    top: 50px;
    left: -30px;
    width: 100px;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    display: none;
  }
  
  .electron-1 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) translateX(90px); /* Increased orbit distance */
  animation: spin-orbit-1 8s infinite linear; /* Normal spin */
}

.electron-2 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) translateX(110px); /* Increased orbit distance */
  animation: spin-orbit-2 10s infinite linear; /* Reverse spin */
}

.electron-3 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) translateX(130px); /* Increased orbit distance */
  animation: spin-orbit-3 12s infinite linear; /* Normal spin */
}

.electron-4 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) translateX(150px); /* Increased orbit distance */
  animation: spin-orbit-4 14s infinite linear; /* Reverse spin */
}
  
  /* Keyframes for each orbiting electron */
  @keyframes spin-orbit-1 {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translateX(60px);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) translateX(60px);
    }
  }
  
  @keyframes spin-orbit-2 {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translateX(80px);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg) translateX(80px); /* Counterclockwise */
    }
  }
  
  @keyframes spin-orbit-3 {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translateX(100px);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) translateX(100px);
    }
  }
  
  @keyframes spin-orbit-4 {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translateX(120px);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg) translateX(120px); /* Counterclockwise */
    }
  }
  @keyframes spin {
    0% {
        transform: rotate(0deg); /* Start position */
    }
    100% {
        transform: rotate(360deg); /* End position */
    }
}
  </style>
  