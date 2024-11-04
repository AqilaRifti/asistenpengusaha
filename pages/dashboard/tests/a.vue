<template>
    <Card class="max-w-2xl mx-auto mt-8 p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">TOEFL READING</h2>
        <p class="text-lg font-semibold">Time left: {{ formatTime }}</p>
      </div>
      {{ selectedAnswers }}
      <div v-if="currentQuestion">
        <h3 class="text-xl mb-4">{{ currentQuestion.text }}</h3>
        <ul class="space-y-2">
          <Button
            v-for="(choice, index) in currentQuestion.choices"
            :key="index"
            :class="{ 'bg-green-900': selectedAnswers[currentQuestionIndex] === index }"
            @click="selectChoice(index)"
          >
            {{ choice }}
          </Button>
        </ul>
      </div>
  
      <!-- Navigation Arrows -->
      <div class="flex justify-between items-center mt-6">
        <button
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          :disabled="currentQuestionIndex === 0"
          @click="prevQuestion"
        >
          &larr; Previous
        </button>
  
        <button
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          :disabled="currentQuestionIndex === questions.length - 1"
          @click="nextQuestion"
        >
          Next &rarr;
        </button>
      </div>
    </Card>
  </template>
  
<script setup>
const questions = [
{
    text: 'What is the capital of France?',
    choices: ['Paris', 'London', 'Berlin', 'Madrid'],
},
{
    text: 'What is the capital of Spain?',
    choices: ['Lisbon', 'Madrid', 'Rome', 'Paris'],
},
{
    text: 'What is the capital of Germany?',
    choices: ['Berlin', 'Vienna', 'Amsterdam', 'Warsaw'],
},
];

const currentQuestionIndex = ref(0);
const selectedAnswers = ref(Array(questions.length).fill(null)); // Store selected answers for each question
const timeLeft = ref(600); // 10 minutes in seconds

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

// Timer logic
const formatTime = computed(() => {
const minutes = Math.floor(timeLeft.value / 60);
const seconds = timeLeft.value % 60;
return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const countdown = () => {
const interval = setInterval(() => {
    if (timeLeft.value > 0) {
    timeLeft.value--;
    } else {
    clearInterval(interval);
    }
}, 1000);
};

onMounted(() => {
countdown();
});

// Function to handle selecting a choice for the current question
const selectChoice = (index) => {
selectedAnswers.value[currentQuestionIndex.value] = index; // Store the selected choice for the current question
};

// Navigate to the next question
const nextQuestion = () => {
if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
}
};

// Navigate to the previous question
const prevQuestion = () => {
if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
}
};
</script>
