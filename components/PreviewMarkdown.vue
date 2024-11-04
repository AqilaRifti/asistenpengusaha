<script setup>
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

</script>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
  <v-md-preview :text="text"></v-md-preview>
</template>