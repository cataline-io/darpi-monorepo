<template>
  <div id="app">
    <mixExample />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import mixExample from './examples/mix.vue'
import selectExample from './examples/select.vue'
import radioExample from './examples/radio.vue'
import checkboxExample from './examples/checkbox.vue'
import checklistExample from './examples/checklist.vue'
import fileExample from './examples/file.vue'

export default defineComponent({
  name: 'ServeDev',
  components: {
    mixExample,
    selectExample,
    radioExample,
    checkboxExample,
    checklistExample,
    fileExample
  }
})
</script>

<style lang="scss">
@import '../src/style';

body {
  min-height: 100vh;
  font-family: 'Inter', Arial, sans-serif;
  color: #8a91b4;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f8ff;
  width: 100%;
}

#app {
  width: 50%;
}
</style>
