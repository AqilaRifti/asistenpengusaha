<script setup lang="ts">
const languages = ['🇮🇩  Indonesian','🇬🇧  English']
const questionJsonFormat = `
  {
    "question": "put the question here?",
    "options": [{"value":"A","label":"A. put option A here"},{"value":"B","label":"B. put option B here"},{"value":"C","label":"C. put option C here"},{"value":"D","label":"put option D here"}],
    "answer": "put the right option here (there can only be one right options)",
    "answerKey": "For example the answer key is A"
  }

  and put the json object in list please
`
const topic = ref()
const questionReceived = ref(false)

const questionCounts = ["5", "10", "15", "20", "25", "30", "40"]
const questionCount = ref()
const questions = ref()
const selectedLanguage = ref()
const showed_answer = ref(false)
const show_answers = ref(() => {
    showed_answer.value = !showed_answer.value
    console.log(selectedAnswer)
})

const selectedAnswer = ref([])
async function displayQuestions() {
    selectedAnswer.value = []
    const get_questions = await getQuestions()
    questions.value = get_questions
    questionReceived.value = true
    showed_answer.value = false
}
async function getQuestions() {
    const response: any = await $fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer pfS623hAge5hEPUKymOYIGaWYIO7ruiuLk8EDIlvwGWJGXGp"
        },
        body: JSON.stringify({
            model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
            max_tokens: 16384,
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            temperature: 0.6,
            messages: [{"role": "user", "content": `(Response in ${selectedLanguage} Language) Make ${questionCount.value} questions about ${topic.value} with options in json format like this ${questionJsonFormat} and please response in pure json no text outside of the json`}]
        })
    });
    let modifiedResponse = JSON.parse(response.choices[0].message.content)
    modifiedResponse.forEach((element: any, index: Number) => {
        element.number = index;
    });
    console.log(modifiedResponse)
    return modifiedResponse
}

</script>

<template>
    <main class="py-4 container">
        <article class="input-group">
            {{ selectedLanguage }}
            {{showed_answer}}
            <Input type="text" placeholder="Masukan topik soal yang ingin dibuat!" v-model="topic" />
            <article class="submit-group">
                <Select v-model="selectedLanguage">
                    <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="language in languages" :value="language">
                                {{ language }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select question count" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="questionCount in questionCounts" :value="questionCount">
                                {{ questionCount }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button @click="displayQuestions">Buat Soal</Button>
            </article>
        </article>
        <Card v-for="question of questions">
            <CardHeader>
                <CardTitle>{{ question.question }}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup v-model="selectedAnswer[question.number]">
                    <div class="flex items-center space-x-2"  v-for="option of question.options">
                        <RadioGroupItem :id="option.label" :value="option.value" />
                        <Label :for="option.label">{{ option.label }}</Label>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>
        <Button v-show="questionReceived" @click="show_answers">Cek Jawaban</Button>
        <Card v-for="question of questions" class="mt-1 border-2" v-show=showed_answer>
            <CardHeader>
                <CardTitle>{{ question.question }}</CardTitle>
            </CardHeader>
            <CardContent>
            <RadioGroup :class="['border border-green-500 p-4', {'border-red-500': selectedAnswer[question.number] === question.answerKey[0]}]" :default-value="selectedAnswer[question.number]" :key="selectedAnswer[question.number]" disabled>
                    <div class="flex items-center space-x-2"  v-for="option of question.options">
                        <RadioGroupItem :id="option.value" :value="option.value"/>
                        <Label :for="option.value">{{ option.label }}</Label>
                    </div>
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Accordion type="single" collapsible @click="console.log(`clicked the accord`)">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <p>See Explanation</p>
                        </AccordionTrigger>
                        <AccordionContent>
                            {{ selectedAnswer }}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardFooter>
        </Card>
        <button @click="$forceUpdate()">Force Update</button>
    </main>
</template>
