<script setup>
const notes = ref([
  {
    "id": 0,
    "type": "folder",
    "name": "Workouts Collection",
    "contents": []
  },
  {
    "id": 1,
    "type": "folder",
    "name": "Stories/Journals",
    "contents": [
      {
        "id": 2,
        "type": "file",
        "name": "Wednesday, 25 September 2024"
      },
      {
        "id": 3,
        "type": "file",
        "name": "Thursday, 26 September 2024"
      },
      {
        "id": 4,
        "type": "folder",
        "name": "No date",
        "contents": [
          {
            "id": 5,
            "type": "file",
            "name": "A bad day"
          },
          {
            "id": 6,
            "type": "file",
            "name": "A good day"
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "type": "file",
    "name": "random note"
  }
])
</script>


<template>
    <div class="note-explorer">
        <div v-for="(item, index) in notes">
            <p v-if="notes.length === 0">No notes available</p>
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
  </template>
  
  <style scoped>
  .note-explorer {
    padding: 20px;
  }
  </style>
  