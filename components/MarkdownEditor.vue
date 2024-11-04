<script setup>
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// Resources for the codemirror editor
import Codemirror from '@/components/codemirror/src/codemirror.js';
// mode
import '@/components/codemirror/mode/markdown/markdown';
import '@/components/codemirror/mode/javascript/javascript';
import '@/components/codemirror/mode/css/css';
import '@/components/codemirror/mode/htmlmixed/htmlmixed';
import '@/components/codemirror/mode/vue/vue';
// edit
import '@/components/codemirror/addon/edit/closebrackets';
import '@/components/codemirror/addon/edit/closetag';
import '@/components/codemirror/addon/edit/matchbrackets';
// placeholder
import '@/components/codemirror/addon/display/placeholder';
// active-line
import '@/components/codemirror/addon/selection/active-line';
// scrollbar
import '@/components/codemirror/addon/scroll/simplescrollbars';
import '@/components/codemirror/addon/scroll/simplescrollbars.css';
// style
import '@/components/codemirror/lib/codemirror.css';

VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme);

</script>

<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>