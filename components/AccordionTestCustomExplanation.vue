<script setup>

let stillLoading = ref(true)
let explanation = ref("loading")
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function getExplanation() {
    console.log("func called");
    await sleep(2000)
    stillLoading = false
    explanation.value = "this is the answer"
}

</script>

<script>
export default {
    props: {
        question: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <Accordion type="single" collapsible @click="getExplanation">
        <AccordionItem value="item-1">
            <AccordionTrigger>
                <slot />
            </AccordionTrigger>
            <AccordionContent>
                <div v-show=stillLoading>
                    <LoadingBar />
                </div>
                <h1>{{ explanation }}</h1>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>