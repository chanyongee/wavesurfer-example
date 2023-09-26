<template>
  <div id="app">
    <MultiPlayer />
    <TrimPlayer type="audio" src="/assets/inside_you.mp3" />
    <TrimPlayer type="video" src="/assets/videoplayback.mp4" />
  </div>
</template>

<script setup>
import MultiPlayer from "@/components/MultiPlayer";
import TrimPlayer from "@/components/TrimPlayer";
</script>
