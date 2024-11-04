<template>
  <Button v-on:click=showMBTI>Submit</Button>
    <Dialog>
        <DialogTrigger v-show="showDialog" as-child>
          <p>
            <Button>Get Result</Button>
          </p>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
                <DialogTitle>{{ llmResponse.MBTI }}</DialogTitle>
              </DialogHeader>
              <div class="grid gap-4 py-4 overflow-y-auto px-6">
                  <div class="flex flex-col justify-between">
                      <img :src="`/mbti/${llmResponse.MBTI.toLowerCase()}.jpeg`" alt="" srcset="">
                  </div>
              </div>
            <DialogFooter class="p-6 pt-0">
                <Button v-on:click="shareMBTI" variant="outline">
                    Share
                    <LucideShare2 class="h-4" />
                </Button>
                <Button v-on:click="insertMBTIData(userID, JSON.stringify(llmResponse))" variant="outline">
                    Put in profile
                    <LucideSave class="h-4" />
                </Button>
                <DialogClose as-child>
                  <Button>
                    Close
                    <LucideX />
                  </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup>
const supabase = useNuxtApp().$supabase;

const MBTIResponseJSONFormat = {
  MBTI: "For example 'INFJ'",
  suggestion: "For example 'Talk more' give long suggestion",
  percentageStats: {
    introvert: 10,
    extrovert: 90,
    judging: 50,
    thinking: 50,
    // u can put other things in here and change the numbers or remove other things based on the given data
  }
}
const MBTIData = ref(`

#### **Questions and Selected Answers**

1. **You enjoy debating different ideas and challenging others' opinions.**
   - **Selected answer:** Strongly Agree  
   - I find debates intellectually stimulating and love challenging people’s ideas. It’s less about winning and more about exploring various perspectives and learning through conversation.

2. **You find it easy to come up with new ideas and solutions in any situation.**
   - **Selected answer:** Strongly Agree  
   - I thrive on brainstorming and generating new, sometimes unconventional ideas. Thinking outside the box is natural for me, and I love solving problems creatively.

3. **You prefer to focus on one project at a time rather than juggling multiple tasks.**
   - **Selected answer:** Strongly Disagree  
   - I’m most comfortable when juggling several projects simultaneously. It keeps me engaged and prevents me from getting bored, as I enjoy the variety and challenge of multitasking.

4. **You tend to rely more on your creativity than following rules and traditions.**
   - **Selected answer:** Strongly Agree  
   - Rules can feel limiting to me. I prefer to come up with innovative approaches, even if it means bending or breaking traditional norms. I value creativity and originality over conformity.

5. **You find it difficult to remain organized and stick to strict schedules.**
   - **Selected answer:** Agree  
   - While I can be organized when necessary, I generally prefer flexibility. Rigid schedules can feel stifling, and I often find myself improvising or adjusting plans as I go.

6. **You enjoy taking risks and trying out new things.**
   - **Selected answer:** Strongly Agree  
   - I’m always up for new experiences, whether it’s trying out a new project or taking a calculated risk. The excitement of the unknown motivates me to keep pushing boundaries.

7. **You value logical reasoning more than emotional considerations when making decisions.**
   - **Selected answer:** Agree  
   - While I understand the importance of emotions, I tend to lean on logic and reason when making decisions. I like to analyze the facts and potential outcomes before committing to a course of action.

8. **You are energized by social interactions and enjoy spending time with others.**
   - **Selected answer:** Strongly Agree  
   - Being around people fuels my energy. I love socializing, meeting new people, and engaging in discussions that spark new ideas and perspectives.

9. **You prefer exploring abstract theories over focusing on practical applications.**
   - **Selected answer:** Agree  
   - I enjoy exploring abstract ideas and theories, as they offer endless possibilities for innovation. While practical applications are important, my real interest lies in how ideas evolve.

10. **You find it easy to adapt to new situations and environments.**
    - **Selected answer:** Strongly Agree  
    - Adaptability is one of my strengths. I thrive in ever-changing environments and enjoy the challenge of navigating new and unpredictable situations.

11. **You often start projects but struggle to finish them.**
    - **Selected answer:** Agree  
    - I’m great at starting projects, especially when they’re exciting and full of potential. However, I sometimes lose interest in the details and execution, leaving things unfinished when my enthusiasm shifts to a new idea.

12. **You prefer improvising over careful planning.**
    - **Selected answer:** Strongly Agree  
    - I feel much more comfortable improvising in the moment rather than sticking to a strict plan. Plans can sometimes feel restrictive, and I love the freedom that comes with being spontaneous.

13. **You enjoy taking the lead in group discussions.**
    - **Selected answer:** Strongly Agree  
    - I naturally step into leadership roles, especially in discussions where ideas are being exchanged. I love engaging with others, moderating debates, and pushing the conversation forward.

14. **You are interested in exploring new concepts and theories, even if they don’t have immediate practical use.**
    - **Selected answer:** Strongly Agree  
    - Learning for the sake of learning excites me. I don’t always need a concept to have an immediate practical use; I enjoy the intellectual stimulation that comes from exploring new ideas.

15. **You struggle with following through on commitments once the initial excitement wears off.**
    - **Selected answer:** Agree  
    - I sometimes have trouble staying focused on long-term commitments once the novelty fades. I tend to move on to new projects that capture my interest, which can make follow-through a challenge.

16. **You enjoy being at the center of attention in social settings.**
    - **Selected answer:** Agree  
    - While I don’t necessarily seek attention, I’m comfortable being in the spotlight and enjoy engaging with others in social settings, especially when there’s a lively exchange of ideas.

17. **You are highly curious and love to learn about a wide range of topics.**
    - **Selected answer:** Strongly Agree  
    - My curiosity knows no bounds. I love diving into new subjects, no matter how unrelated they seem to my current interests, just for the sake of expanding my knowledge.

18. **You are quick to challenge others' ideas if you disagree with them.**
    - **Selected answer:** Strongly Agree  
    - I’m not afraid to speak up if I disagree with someone. I see disagreement as a way to improve understanding, and I enjoy engaging in discussions where ideas can be refined.

19. **You feel more comfortable in chaotic environments than in structured ones.**
    - **Selected answer:** Agree  
    - Chaos doesn’t bother me—in fact, it often inspires my best thinking. I find structured, predictable environments to be limiting, while chaotic ones allow for more freedom and creativity.

20. **You often lose track of time when you’re engaged in an exciting project.**
    - **Selected answer:** Strongly Agree  
    - When I’m fully immersed in something exciting, time seems to disappear. I get so wrapped up in my thoughts and the flow of ideas that hours can go by without me noticing.

---

---

### **Essay: "About Myself"**

I am someone who thrives on ideas, challenges, and conversations that push the boundaries of conventional thinking. As an ENTP, my mind is constantly buzzing with new possibilities, whether it’s a creative project, a novel way of solving a problem, or an innovative approach to an old idea. I love engaging in debates and discussions, not for the sake of being right, but for the sheer enjoyment of exploring different perspectives and sharpening my own understanding.

My approach to life is spontaneous and flexible. While I respect the importance of structure, I often find myself veering away from rigid plans, preferring to improvise as I go. It’s in the unpredictability of life that I find my greatest inspiration. Whether it’s brainstorming with a group, bouncing ideas off others, or diving into a completely new project, I’m always looking for the next big idea or challenge.

Curiosity drives me. I’m fascinated by a wide range of topics, and I can easily jump from one interest to another, often juggling multiple projects at once. While this keeps life exciting, it also means I sometimes struggle with follow-through. The initial excitement of a new idea can wear off, and I find myself moving on to something else before finishing what I started. Still, I see this as part of the creative process—constantly generating new ideas keeps my mind sharp and adaptable.

Socially, I’m energized by engaging with others. I love being around people, particularly in environments where I can share ideas and collaborate. I’m quick to step into leadership roles in group settings, especially when the focus is on creative thinking or problem-solving. While I enjoy being in the spotlight, my primary goal is always to keep the conversation moving forward and to push the boundaries of what’s possible.

While I prioritize logic in decision-making, I am also open to experimentation and risk-taking. I’m not afraid to question the status quo or to challenge assumptions, and I see every failure as an opportunity to learn and improve. For me, life is about constant evolution—refining ideas, embracing change, and never settling for the mundane.

In short, I’m a person who embraces complexity, loves to challenge norms, and is always on the lookout for the next exciting idea or opportunity. My mind is my playground, and I’m constantly seeking new ways to explore, innovate, and grow.

---
`)
const showDialog = ref(false)
const llmResponse = ref('')
// Get user ID from the current session
async function getUserIdFromSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error('Error retrieving session:', error)
    return null
  }

  if (session) {
    const userId = session.user.id // Get the user_id from session
    console.log('User ID:', userId)
    return userId
  } else {
    console.log('No active session found.')
    return null
  }
}
const userID = ref(await getUserIdFromSession())

async function showMBTI() {
  const chatCompletion = await getGroqChatCompletion();
  llmResponse.value = JSON.parse(chatCompletion.choices[0].message.content);
  showDialog.value = true
}

async function shareMBTI() {
    if (navigator.canShare && navigator.canShare({ files: [] })) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });

            // Share image using the Web Share API
            await navigator.share({
                title: 'Check out this image!',
                files: [file],
            });

            console.log('Image shared successfully');
        } catch (error) {
            console.error('Sharing failed', error);
        }
    } else {
        alert('Sharing not supported on this device');
    }
}
async function insertMBTIData(userId, content) {
  const { data, error } = await supabase
    .from('user_mbti')
    .insert([
      {
        user_id: userId, // UUID reference from auth.users
        content: content, // MBTI content (as TEXT)
      },
    ])

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Data inserted successfully:', data)
  }
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
            content: `You are an MBTI specialist that is gonna help determine mbti and respond in json specificly in this format ${JSON.stringify(MBTIResponseJSONFormat)} and please no text outside the JSON!`,
        },
        {
            role: "user",
            content: `Here is the data given: ${MBTIData.value} (Please respond in this format ${JSON.stringify(MBTIResponseJSONFormat)})`
        },
        ],
        model: "llama-3.1-70b-versatile",
    }
  });
}
</script>