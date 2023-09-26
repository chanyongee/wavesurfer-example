<template>
  <section class="multitrack-test">
    <h2>Multiple player (timeline)</h2>
    <button @click="togglePlay">Play or Pause</button>
    <button @click="stop">Stop</button>
    <button @click="removeTrack('video')">Remove Second</button>
    <span>Total duration: {{ totalDuration }}sec</span>
    <span>Remaining time: {{ remainingTime }}sec</span>
    <div ref="container"></div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MultiPlayer from "@/util/multiPlayer.js";

let audioPlayer = null;
const container = ref(null);
const totalDuration = ref(0);

const longestTrackIndex = ref(0);
onMounted(() => {
  audioPlayer = new MultiPlayer(container.value, ["audio", "video"]);
  audioPlayer.prepareAudio("video", "/assets/videoUrl.mp3");
  audioPlayer.prepareAudio("audio", "/assets/inside_you.mp3");
  audioPlayer.getInstance().on("canplay", () => {
    remainingTime.value = totalDuration.value = audioPlayer.getDuration();
    longestTrackIndex.value = audioPlayer.getLongestTrackIndex();
    updateRemainingTime();
  });
});

const togglePlay = () => {
  if (audioPlayer.isPlaying()) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
};

const stop = () => {
  audioPlayer.stop();
};

const removeTrack = (id) => {
  audioPlayer.removeTrack(id);
};

const remainingTime = ref(0);
const updateRemainingTime = () => {
  const trackInstance = audioPlayer.getInstance(longestTrackIndex.value);
  trackInstance.on("audioprocess", () => {
    const currentTime = trackInstance.getCurrentTime();
    remainingTime.value = totalDuration.value - currentTime;
  });
};
</script>

<style scoped>
span {
  margin: 0 1rem;
}
</style>
