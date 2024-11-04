<script setup>
const route = useRoute();
const id = route.fullPath.split("/").at(-1);
const supabase = useNuxtApp().$supabase;
const product = ref({
  product_id: undefined,
  product_name: undefined,
  product_description: undefined,
  product_stock: undefined,
});
const loaded = ref(false);
async function queryProductById(productId) {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("product_id", productId);

  if (error) {
    console.error("Error querying product by ID:", error);
  } else {
    console.log("Queried product data:", data);
    product.value = data[0];
  }
}
import { cn } from '@/lib/utils'

const input = ref('')
const inputLength = computed(() => input.value.trim().length)

const messages = ref([])
async function fetchAnswer() {
    console.log(product.value)
  try {
    const response = await $fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: "POST",
        headers: {
            authorization: "Bearer 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"
        },
        body: {
            messages: [{ role: 'system', content: `You are a helpful Assistant for answering customer with the product of ${JSON.stringify(product.value)}` }, ...messages.value],
            stream: false,
            model: 'llama3-70b-8192'
        }
    });
    messages.value.push(response.choices[0].message)
  } catch {}
}
onMounted(() => {
  queryProductById(id);
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between">
        <div class="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="Image" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p class="text-sm font-medium leading-none">Ask Product Question</p>
            <p class="text-sm text-muted-foreground">{{ product.product_name }}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="
              cn(
                'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                message.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground'
                  : 'bg-muted'
              )
            "
          >
            {{ message.content }}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <form
          class="flex w-full items-center space-x-2"
          @submit.prevent="
            () => {
              if (inputLength === 0) return;
              messages.push({
                role: 'user',
                content: input,
              });
              input = ``;
              fetchAnswer();
            }
          "
        >
          <Input
            v-model="input"
            placeholder="Type a message..."
            class="flex-1"
          />
          <Button
            class="p-2.5 flex items-center justify-center"
            :disabled="inputLength === 0"
          >
            <LucideSend class="w-4 h-4" />
            <span class="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  </div>
</template>
