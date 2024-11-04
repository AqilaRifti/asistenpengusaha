<template>
    <div class="folder">
      <div @click="toggleOpen" class="folder-header cursor-pointer">
        <div class="flex-1 p-1 border-red-900 border">
            <article class="flex">
                <div v-if="isOpen">
                    <LucideFolderOpen class="mr-2" />
                </div>
                <div v-else>
                    <LucideFolderClosed class="mr-2" />
                </div>
                <span>{{ folder.name }}</span>
            </article>
        </div>
      </div>
      <div v-if="isOpen">
        <div v-if="folder.contents.length" class="folder-contents">
        <div v-for="(item, index) in folder.contents">

          <FolderComponent
            v-if="item.type === 'folder'"
            :folder="item"
          />
          <FileComponent
            v-if="item.type === 'file'"
            :file="item"
          />
        </div>
    </div>

        <div v-else>No contents</div>
      </div>
    </div>
  </template>
  
  <script setup>

  const props = defineProps({
    folder: Object
  })
  
  const isOpen = ref(false)
  
  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }
  </script>
  
  <style scoped>
  .folder-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .folder-contents {
    margin-left: 20px;
  }
  </style>
  