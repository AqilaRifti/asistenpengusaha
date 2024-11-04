<!--
MIT License

Copyright (c) 2023 radix-vue

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
--->
<script setup lang="ts">
import { cn } from '@/lib/utils'

const input = ref('')
const inputLength = computed(() => input.value.trim().length)

const messages = ref([
  { role: 'agent', content: 'Hi, how can I help you today?' },
  { role: 'user', content: 'Hey, I\'m having trouble with my account.' },
  { role: 'agent', content: 'What seems to be the problem?' },
  { role: 'user', content: 'I can\'t log in.' },
])

</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="Image" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div>
          <p class="text-sm font-medium leading-none">
            Sofia Davis
          </p>
          <p class="text-sm text-muted-foreground">
            m@example.com
          </p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="cn(
            'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
            message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted',
          )"
        >
          {{ message.content }}
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <form
        class="flex w-full items-center space-x-2"
        @submit.prevent="() => {
          if (inputLength === 0) return
          messages.push({
            role: 'user',
            content: input,
          })
          input = ``
        }"
      >
        <Input v-model="input" placeholder="Type a message..." class="flex-1" />
        <Button class="p-2.5 flex items-center justify-center" :disabled="inputLength === 0">
          <LucideSend class="w-4 h-4" />
          <span class="sr-only">Send</span>
        </Button>
      </form>
    </CardFooter>
  </Card>
</template>