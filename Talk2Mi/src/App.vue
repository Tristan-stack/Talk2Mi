<!-- App.vue -->
<template>
  <div id="app" class="bg-gray-50 w-full h-dvh relative flex justify-center items-center">
    <RandomShapeContainer class="absolute z-0" />
    <Chat class="absolute z-10 w-full h-full flex justify-center items-center" />
  </div>
</template>

<script>
import './assets/main.css';
import Chat from './components/Chat.vue';
import RandomShapeContainer from './components/RandomShape.vue';

export default {
  components: {
    Chat,
    RandomShapeContainer,
  },
};
</script>

<style>
/* Styles globaux (si nécessaire) */
</style>
