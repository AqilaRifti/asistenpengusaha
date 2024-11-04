<script setup>
const mockData = [
  {
    id: "2f6900ed-bc04-4318-9bc1-a7db0dc17d2e",
    title: "PACKAGE 01",
    description: "A new story about Artificial Intelligence (AI) is in the news almost every day.  And, of course, companies are spending an enormous amount of money to develop new technologies related to AI.  Before next class, I want you to consider the following question: Is AI a dangerous technology that, overall, will be harmful to society, or is it a powerful tool that will improve the lives of people?",
    completed: true
    
  },
  {
    id: "0deced26-be9b-4e5f-9233-0124401af97a",
    title: "PACKAGE 02",
    description: "A new story about Artificial Intelligence (AI) is in the news almost every day.  And, of course, companies are spending an enormous amount of money to develop new technologies related to AI.  Before next class, I want you to consider the following question: Is AI a dangerous technology that, overall, will be harmful to society, or is it a powerful tool that will improve the lives of people?",
    completed: false
  },
  {
    id: "c3b19441-7e18-416c-a081-4f151b5fb636",
    title: "PACKAGE 03",
    description: "A new story about Artificial Intelligence (AI) is in the news almost every day.  And, of course, companies are spending an enormous amount of money to develop new technologies related to AI.  Before next class, I want you to consider the following question: Is AI a dangerous technology that, overall, will be harmful to society, or is it a powerful tool that will improve the lives of people?",
    completed: true
  }
]
const packageCollections = mockData

const topicModelValue = ref(['Health', 'Politics'])
const selectedLevel = ref()
const questionCount = ref(10)
function takeCustomTest() {
  navigateTo(`/dashboard/tests/toefl/custom/reading/this is the id?level=${selectedLevel.value}&count=${questionCount.value}&topics=${topicModelValue.value}`)
}
</script>

<template>
  <article class="md:px-20 sm:px-3 py-3">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline" class="border-red-500 rounded-xl border p-8 w-[100%]">
              <h1 class="flex items-center">
                <LucidePlusCircle class="w-9"/>
                <p>Create custom reading test</p>
              </h1>
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Custom Reading Test</DialogTitle>
            <DialogDescription>
              Customize the reading test according to your preferences. Click 'Take Test' when you are ready.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <TagsInput v-model="topicModelValue">
              <TagsInputItem v-for="item in topicModelValue" :key="item" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>

              <TagsInputInput placeholder="Enter topics here..." />
            </TagsInput>
            <Select v-model="selectedLevel">
              <SelectTrigger>
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Level</SelectLabel>
                  <SelectItem value="Easy">
                    Easy
                  </SelectItem>
                  <SelectItem value="Medium">
                    Medium
                  </SelectItem>
                  <SelectItem value="Hard">
                    Hard
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <NumberField id="questionCount" :min="1" :max="50" v-model="questionCount">
              <Label for="questionCount">Question count</Label>
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </div>
          <DialogFooter>
              <Button v-on:click="takeCustomTest" type="submit">
                <p>Take Test</p>
                <LucideChevronsRight />
              </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
    <main>
      <ul>
        <li class="my-2" v-for="packageCollection in packageCollections">
          <TOEFLReadingTestCard :to="`/dashboard/tests/toefl/providers/reading/${packageCollection.id}`" :title="packageCollection.title" :description="packageCollection.description">
            <Button v-show="packageCollection.completed" variant="outline">Completed</Button>
          </TOEFLReadingTestCard>
        </li>
      </ul>
    </main>
  </article>
</template>