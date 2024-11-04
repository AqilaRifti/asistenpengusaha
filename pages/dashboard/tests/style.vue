<template>
    <h1>Response: {{ llmResponse }}</h1>
</template>

<script setup>
const PersonalityResponseJSONFormat = {
  style: "For example 'AUDITORI/VISUAL/KINESTHETICS'",
  suggestion: "For example 'use a notebook' give long suggestion",
  percentageStats: {
    observant: 10,
    active: 90,
    passive: 10,
    teamwork: 16,
    dynamics: 19,
    hearing: 18,
    stimulation: 100,
    // put other things in here and *change* or *add* the numbers or *remove* other things based on the given data
  }
}
const LearningStyleTestData = `
#### **Questions and Selected Answers**

1. **You prefer diagrams, charts, and visual aids when learning new concepts.**
   - **Selected answer:** Strongly Agree  
   - I understand and remember things best when I can see them visually. Flowcharts, graphs, and diagrams make complex information easier to grasp and retain.

2. **You often visualize information in your mind when trying to recall details.**
   - **Selected answer:** Strongly Agree  
   - When recalling information, I tend to picture it as I saw it—whether in the form of a diagram, a list, or a graph. It’s easier for me to retrieve visual representations than verbal explanations.

3. **You prefer written instructions or visual guides over verbal explanations.**
   - **Selected answer:** Strongly Agree  
   - I often struggle with verbal instructions because I need to see the process or read the steps to fully understand. A visual guide or written set of instructions is much more helpful for me.

4. **You find it easier to remember faces rather than names.**
   - **Selected answer:** Strongly Agree  
   - Faces stick with me much longer than names do. I can easily recognize people based on their appearance, even if I’ve forgotten their name.

5. **When solving problems, you like to sketch out your ideas or create visual models.**
   - **Selected answer:** Strongly Agree  
   - I often sketch out ideas to clarify my thoughts. Whether it’s a diagram, a mind map, or even just doodles, it helps me visualize the solution to a problem.

6. **You enjoy watching videos or demonstrations when learning new skills.**
   - **Selected answer:** Agree  
   - I find it much easier to learn by watching someone else demonstrate a skill. Video tutorials are my go-to because they allow me to follow along visually.

7. **You tend to organize information in color-coded or well-structured formats.**
   - **Selected answer:** Strongly Agree  
   - I’m meticulous about organizing my notes or information in a visually appealing way. Color-coding, highlighting, and structuring data in charts help me absorb and retain knowledge.

8. **You prefer creating lists, flowcharts, or mind maps when brainstorming.**
   - **Selected answer:** Strongly Agree  
   - Brainstorming feels incomplete without a visual representation of my thoughts. Whether it’s a flowchart or a mind map, I need to see the connections between ideas on paper.

9. **You find yourself distracted by visual clutter in your environment.**
   - **Selected answer:** Agree  
   - When there’s too much visual noise around me, it becomes difficult to concentrate. I need a clean, uncluttered space to focus on learning or working.

10. **You find it helpful to picture an object or concept when explaining it to others.**
    - **Selected answer:** Strongly Agree  
    - I rely on mental images when explaining concepts. If I can picture it, I can explain it better, and I often use visuals to help others understand too.

11. **You enjoy reading books with lots of images, infographics, or illustrations.**
    - **Selected answer:** Agree  
    - I prefer books that include visual elements. Illustrations and infographics help break down the text and give me something visual to associate with the information.

12. **You struggle with learning purely through auditory methods (e.g., lectures or podcasts).**
    - **Selected answer:** Strongly Agree  
    - I find it hard to focus and retain information from just listening. Without visual aids or notes to refer back to, I can quickly lose track of the main points.

13. **You prefer hands-on demonstrations when learning new physical tasks.**
    - **Selected answer:** Agree  
    - Watching a task being performed gives me a clear understanding of what needs to be done. I often need to see a demonstration before I feel confident trying something new.

14. **You often find yourself doodling or drawing when you need to think through a problem.**
    - **Selected answer:** Agree  
    - I doodle when I’m brainstorming or problem-solving. It helps me think more clearly and often leads me to creative solutions I wouldn’t have thought of otherwise.

15. **You prefer using maps or visual directions over verbal instructions when navigating.**
    - **Selected answer:** Strongly Agree  
    - I’d much rather follow a map or visual guide than listen to someone’s directions. A map gives me a clear picture of where I need to go, which is easier to follow than verbal instructions.

---

As a visual learner, my world is one of images, patterns, and structure. I understand and process information best when I can see it. Whether it’s reading, problem-solving, or learning new concepts, visuals play a crucial role in how I absorb knowledge. In fact, I often say that if I can’t see it, it’s hard for me to truly understand it.

One of the first things I do when learning something new is look for ways to visualize it. Flowcharts, diagrams, and even color-coded notes help me organize information in a way that makes sense to me. For example, when studying, I might break down a complex idea into parts and represent it visually so that I can easily see the relationships between different concepts. This not only helps me remember the material but also allows me to engage with it on a deeper level.

When it comes to instructions, I’m much more comfortable with written guides or visual aids. I struggle with auditory-only methods of learning, like lectures or podcasts, because I need something tangible to refer to. If someone gives me a set of verbal directions, I often have to write them down or sketch a quick diagram to keep the information straight in my mind. Similarly, watching someone demonstrate a task is far more helpful to me than just hearing an explanation.

My love for visuals extends to every aspect of my life. I tend to organize my surroundings in a visually appealing way, whether it’s color-coding my workspace or arranging objects in a certain order. A cluttered environment can quickly distract me, which is why I prefer clean, minimalist spaces where I can focus. My notes are always full of color and structure because that’s how I make sense of the world around me.

Socially, I’m a bit of an observer. I often rely on facial expressions and body language to understand how people are feeling, and I find it easier to remember someone’s face than their name. In conversations, I visualize what the other person is saying, which helps me process and respond thoughtfully. I’m quick to use analogies or visual explanations when trying to get my point across to others because I believe it’s the easiest way to make abstract ideas concrete.

For me, learning is an immersive experience that comes to life when I can visualize it. From doodling while brainstorming to drawing out plans for a project, I use visuals to shape my thoughts and ideas. This approach has served me well in both academic and professional settings, allowing me to tackle complex problems by breaking them down into simple, visual representations.

In essence, being a visual learner has shaped how I interact with the world. My mind is always searching for images to associate with information, and I take comfort in knowing that if I can see it, I can understand it. It’s this reliance on visuals that makes learning exciting for me—there’s always a new picture waiting to be drawn, a new diagram to create, and a fresh way to see the world around me.

---
`
//const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });
const llmResponse = ref('')
async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  llmResponse.value = chatCompletion.choices[0].message.content;
}

async function getGroqChatCompletion() {
  return await $fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: 'POST',
    headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
    },
    body: {
        messages: [
        {
            role: "system",
            content: `You are an MBTI specialist that is gonna help determine learning style (AUDITORI/VISUAL/KINESTHETICS) and respond in json specificly in this format ${JSON.stringify(PersonalityResponseJSONFormat)} and please no text outside the JSON!`,
        },
        {
            role: "user",
            content: `Here is the data given: ${LearningStyleTestData} (Please respond in this format ${JSON.stringify(PersonalityResponseJSONFormat)})`
        },
        ],
        model: "llama-3.1-70b-versatile",
    }
  });
}
main()
</script>