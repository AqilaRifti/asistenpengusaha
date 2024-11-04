<script setup lang="ts">
const route = useRoute()
const questionJsonFormat = `
  {
    "question": "put the question here",
    "passage": "put a detailed long challenging passage here",
    "options": [{"value":"A","label":"A. put option A here"},{"value":"B","label":"B. put option B here"},{"value":"C","label":"C. put option C here"},{"value":"D","label":"put option D here"}],
    "answer": "put the right option here (there can only be one right options)",
    "answerKey": "For example the answer key is A"
  }

  and put the json object in list please
`
const topics = route.query.topics || "Health,Economics,Education"
const questionCount = route.query.count || "5"
const difficultyLevel = route.query.level || "Medium"
interface Choice {
  label: string;
  value: string;
}
interface Question {
  question: string;
  passage: string;
  options: Choice[];
}
const currentQuestionIndex = ref(0);
const selectedAnswers = ref([]);
const timeLeft = ref(600); 
const isLoading = ref(true);
const questions = ref([]);

// Function to fetch questions from your API
async function fetchQuestions() {
  try {
    //const response = await $fetch('https://api.groq.com/openai/v1/chat/completions', {
    //    method: "POST",
    //    headers: {
    //        authorization: "Bearer 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"
    //    },
    //    body: {
    //        messages: [
    //            {
    //                role: 'system',
    //                content: `You are an Artificial Intelligence model designed to make ${difficultyLevel} TOEFL questions to help people prepare for the test. Your response should be in pure JSON in this format: ${questionJsonFormat}`
    //            },
    //            {
    //                role: 'user',
    //                content: `Make a total of ${questionCount} TOEFL questions about ${topics} with options in JSON format like this ${questionJsonFormat} and please respond in pure JSON, no text outside of the JSON.`
    //            }
    //        ],
    //        stream: false,
    //        model: 'llama3-8b-8192'
    //    }
    //});
    //console.log(response.choices[0].message.content)
    //// Assume the response contains the questions as JSON array
    let modifiedResponse = JSON.parse(`
    [
      {
        "question": "What is the main purpose of a public hearing on a new healthcare policy?",
        "passage": "Public hearings are an essential part of the policy-making process in healthcare, allowing citizens to provide feedback on proposed policies. The government uses this opportunity to gather opinions and concerns from the community, which helps them make informed decisions. A public hearing is typically held in a public forum, and citizens are invited to attend and express their views. This democratic process ensures that the voices of all stakeholders are heard, leading to a more effective healthcare policy.",
        "options": [
          {"value": "A", "label": "A. To gather medical expertise"},
          {"value": "B", "label": "B. To allow citizens to provide feedback"},
          {"value": "C", "label": "C. To allocate resources"},
          {"value": "D", "label": "D. To evaluate the implementation"}
        ],
        "answer": "B",
        "answerKey": "B"
      },
      {
        "question": "What is likely to happen if a new healthcare policy is implemented without consideration for the public's opinions?",
        "passage": "Healthcare policies that are developed without considering the public's opinions can lead to undesired outcomes. For instance, a policy that increases healthcare costs may alienate low-income patients who rely on government subsidies to access healthcare. Similarly, a policy that restricts access to certain treatments may lead to a shortage of healthcare professionals in specific areas. Undemocratic decision-making can also erode trust in the government, causing citizens to question the legitimacy of the policy.",
        "options": [
          {"value": "A", "label": "A. It will lead to improved healthcare outcomes"},
          {"value": "B", "label": "B. It will lead to public distrust and resistance"},
          {"value": "C", "label": "C. It will remain unchanged"},
          {"value": "D", "label": "D. It will have no significant impact"}
        ],
        "answer": "B",
        "answerKey": "B"
      },
      {
        "question": "According to the passage, what is the potential implication of a healthcare policy that restricts access to certain treatments?",
        "passage": "Healthcare policies that are developed without considering the public's opinions can lead to undesired outcomes. For instance, a policy that increases healthcare costs may alienate low-income patients who rely on government subsidies to access healthcare. Similarly, a policy that restricts access to certain treatments may lead to a shortage of healthcare professionals in specific areas. Undemocratic decision-making can also erode trust in the government, causing citizens to question the legitimacy of the policy.",
        "options": [
          {"value": "A", "label": "A. A shortage of healthcare professionals"},
          {"value": "B", "label": "B. Increased healthcare costs"},
          {"value": "C", "label": "C. Improved access to treatments"},
          {"value": "D", "label": "D. Eroded trust in the government"}
        ],
        "answer": "A",
        "answerKey": "A"
      },
      {
        "question": "What is the primary goal of a politician who is lobbying for increased government funding for healthcare research?",
        "passage": "Politicians often lobby for increased government funding for healthcare research to combat chronic diseases, improve healthcare outcomes, and enhance the overall quality of life. By investing in healthcare research, the government can identify innovative treatments, develop new medicines, and establish effective prevention strategies. This can lead to significant cost savings in the long run by reducing healthcare costs related to chronic diseases.",
        "options": [
          {"value": "A", "label": "A. To improve healthcare outcomes"},
          {"value": "B", "label": "B. To increase government funding for private healthcare companies"},
          {"value": "C", "label": "C. To enhance the overall quality of life"},
          {"value": "D", "label": "D. To reduce healthcare costs"}
        ],
        "answer": "A",
        "answerKey": "A"
      },
      {
        "question": "According to the passage, what is one potential benefit of investing in healthcare research?",
        "passage": "Politicians often lobby for increased government funding for healthcare research to combat chronic diseases, improve healthcare outcomes, and enhance the overall quality of life. By investing in healthcare research, the government can identify innovative treatments, develop new medicines, and establish effective prevention strategies. This can lead to significant cost savings in the long run by reducing healthcare costs related to chronic diseases.",
        "options": [
          {"value": "A", "label": "A. Reduced government spending on healthcare"},
          {"value": "B", "label": "B. Improved healthcare outcomes"},
          {"value": "C", "label": "C. Increased private healthcare funding"},
          {"value": "D", "label": "D. All of the above"}
        ],
        "answer": "D",
        "answerKey": "D"
      },
      {
        "question": "What is the primary concern of advocacy groups that are pushing for increased government funding for mental health services?",
        "passage": "Mental health advocacy groups have long been demanding increased government funding for mental health services to address the growing mental health crisis. The primary concern of these groups is the scarcity of resources and lack of support for mental health services, which can lead to delayed diagnoses, inadequate treatment, and poor outcomes for patients. By investing in mental health services, the government can help reduce the stigma associated with mental illness, improve access to care, and promote overall well-being.",
        "options": [
          {"value": "A", "label": "A. To reduce the stigma associated with mental illness"},
          {"value": "B", "label": "B. To improve access to care"},
          {"value": "C", "label": "C. To address the growing mental health crisis"},
          {"value": "D", "label": "D. To promote overall well-being"}
        ],
        "answer": "C",
        "answerKey": "C"
      },
      {
        "question": "According to the passage, what can happen if mental health services are not adequately funded?",
        "passage": "Mental health advocacy groups have long been demanding increased government funding for mental health services to address the growing mental health crisis. The primary concern of these groups is the scarcity of resources and lack of support for mental health services, which can lead to delayed diagnoses, inadequate treatment, and poor outcomes for patients. By investing in mental health services, the government can help reduce the stigma associated with mental illness, improve access to care, and promote overall well-being.",
        "options": [
          {"value": "A", "label": "A. Delayed diagnoses"},
          {"value": "B", "label": "B. Poor outcomes for patients"},
          {"value": "C", "label": "C. Inadequate treatment"},
          {"value": "D", "label": "D. All of the above"}
        ],
        "answer": "D",
        "answerKey": "D"
      },
      {
        "question": "What is the main argument of a study that found a correlation between increased government funding for healthcare and improved healthcare outcomes?",
        "passage": "A recent study found a significant correlation between increased government funding for healthcare and improved healthcare outcomes. The study's authors argued that increased government funding can lead to better access to healthcare services, improved healthcare infrastructure, and increased research and development in the healthcare sector. These factors can contribute to better health outcomes, increased patient satisfaction, and reduced healthcare costs in the long run.",
        "options": [
          {"value": "A", "label": "A. Increased government funding leads to better access to healthcare services"},
          {"value": "B", "label": "B. Increased government funding leads to improved healthcare infrastructure"},
          {"value": "C", "label": "C. Increased government funding leads to increased research and development in the healthcare sector"},
          {"value": "D", "label": "D. Increased government funding has no correlation with improved healthcare outcomes"}
        ],
        "answer": "A",
        "answerKey": "A"
      },
      {
        "question": "According to the passage, what is one potential impact of increased government funding for healthcare?",
        "passage": "A recent study found a significant correlation between increased government funding for healthcare and improved healthcare outcomes. The study's authors argued that increased government funding can lead to better access to healthcare services, improved healthcare infrastructure, and increased research and development in the healthcare sector. These factors can contribute to better health outcomes, increased patient satisfaction, and reduced healthcare costs in the long run.",
        "options": [
          {"value": "A", "label": "A. Increased healthcare costs"},
          {"value": "B", "label": "B. Reduced healthcare costs"},
          {"value": "C", "label": "C. Increased patient satisfaction"},
          {"value": "D", "label": "D. Improved healthcare infrastructure"}
        ],
        "answer": "B",
        "answerKey": "B"
      },
      {
        "question": "What is the primary reason why healthcare professionals are urging the government to invest in telemedicine?",
        "passage": "Telemedicine has the potential to revolutionize the healthcare sector by improving access to healthcare services, especially for rural or underserved communities. Healthcare professionals are urging the government to invest in telemedicine to address these issues. By investing in telemedicine, the government can improve healthcare outcomes, reduce healthcare costs, and enhance the overall quality of life.",
        "options": [
          {"value": "A", "label": "A. To improve healthcare outcomes"},
          {"value": "B", "label": "B. To reduce healthcare costs"},
          {"value": "C", "label": "C. To enhance the overall quality of life"},
          {"value": "D", "label": "D. To improve healthcare infrastructure"}
        ],
        "answer": "A",
        "answerKey": "A"
      }
    ]
    `)
    modifiedResponse.forEach((element: any, index: Number) => {
        element.number = index;
    });
    questions.value = modifiedResponse;
    console.log(questions.value)
    isLoading.value = false
    console.log( isLoading.value)
    selectedAnswers.value = Array(questions.value.length).fill(null); // Prepare the answers array
  } catch (error) {
    console.error('Error fetching questions:', error);
    isLoading.value = false; // Turn off loading even if there's an error
  }
};

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
      // Handle time-up (e.g., submit the test automatically)
    }
  }, 1000);
};

onMounted(() => {
  fetchQuestions();
  countdown()
});

const selectChoice = (index: string) => {
  selectedAnswers.value[currentQuestionIndex.value] = index;
};

// Navigate to the next question
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
};

// Navigate to the previous question
const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

// Computed property for current question
const currentQuestion = computed<Question>(() => questions.value[currentQuestionIndex.value]);
</script>

<template>
    {{ selectedAnswers }}
    <main class="py-4 container">
        <div class="max-w-2xl mx-auto mt-8 p-4">
            <div class="flex justify-between items-center mb-6" v-if="!isLoading">
              <h2 class="text-2xl font-bold">TOEFL Exam</h2>
              <p class="text-lg font-semibold">Time left: {{ formatTime }}</p>
            </div>

            <section v-if="isLoading">
              <p>Loading questions...</p>
              <SpinningBar />
            </section>

            <Card v-if="currentQuestion && !isLoading">
              <CardHeader>
                <CardTitle>
                  {{ currentQuestion.question }}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{{ currentQuestion.passage }}</p>
              </CardContent>
              <CardFooter>
              <ul class="space-y-2 flex-1">
                  <li
                    v-for="choice in currentQuestion.options"
                    :key="choice.value"
                    class="p-2 border rounded cursor-pointer hover:bg-gray-100"
                    :class="{ 'bg-green-100': selectedAnswers[currentQuestionIndex] === choice.value }"
                    @click="selectChoice(choice.value)"
                    >
                    {{ choice.label }}
                  </li>
                </ul>
              </CardFooter>
            </Card>

            <footer class="flex justify-between items-center mt-6" v-if="!isLoading">
              <Button
                  v-if="!(currentQuestionIndex === 0)"
                  @click="prevQuestion"
              >
                  &larr; Previous
              </Button>
              <div
                  v-if="currentQuestionIndex === 0"
              >
            </div>              
              <Button
                  v-if="!(currentQuestionIndex === questions.length - 1)"
                  @click="nextQuestion"
              >
                  Next &rarr;
              </Button>
              <Dialog>
                <DialogTrigger>
                  <Button
                      v-if="currentQuestionIndex === questions.length - 1"
                      @click="nextQuestion"
                      class="bg-green-500"
                  >
                      Submit 
                      <LucideSend class="w-4 ml-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to submit?</DialogTitle>
                    <DialogDescription>
                      Double check your answers! because you will not be able to change them after submitting
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose as-child>
                    <Button type="button" class="bg-green-500">
                      Submit
                      <LucideSend class="w-4 ml-1" />
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </footer>
        </div>
    </main>
</template>
