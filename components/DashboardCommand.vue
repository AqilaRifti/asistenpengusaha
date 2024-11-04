<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

import { ref, watch } from 'vue'

const open = ref(false)

const keys = useMagicKeys()
const CmdJ = keys['Cmd+K']

function handleOpenChange() {
  open.value = !open.value
}

watch(CmdJ, (v) => {
  if (v)
    handleOpenChange()
})
</script>

<template>
    <section class="ml-auto flex-1 sm:flex-initial">
        <Button variant="outline" class="flex-1 justify-between min-w-[140px]" @click="handleOpenChange">
            <LucideSearch class="h-4 w-4 text-muted-foreground" />
            <p class="text-gray-400 font-light">Explore</p>
            <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span class="text-xs">⌘</span>K
            </kbd>
        </Button>
    </section>
    <CommandDialog :open="open" @update:open="handleOpenChange">
      <CommandInput placeholder="Tulis perintah atau cari ilmu..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Rekomendasi">
          <CommandItem value="Calendar">
            <LucideMessageSquareText class="mr-2 h-4 w-4" />
            <span>Chat AI</span>
          </CommandItem>
          <CommandItem value="Search Emoji">
            <LucideBookCopy class="mr-2 h-4 w-4" />
            <span>Materi</span>
          </CommandItem>
          <CommandItem value="Calculator">
            <LucidePencilLine class="mr-2 h-4 w-4" />
            <span>Latihan Soal</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
</template>