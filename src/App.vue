<template>
  <div id="app">
    <MultiPlayer />
    <hr />
    <TrimPlayer type="audio" src="/assets/inside_you.mp3" />
    <hr />
    <button @click="changeVideo(0)">Video 1</button>
    <button @click="changeVideo(1)">Video 2</button>
    <TrimPlayer type="video" :src="src" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MultiPlayer from "@/components/MultiPlayer";
import TrimPlayer from "@/components/TrimPlayer";

const src = ref("/assets/sad_person.mp4");
const videoList = ["/assets/sad_person.mp4", "/assets/aria.mp4"];
const changeVideo = (index) => {
  src.value = videoList[index];
};
</script>
