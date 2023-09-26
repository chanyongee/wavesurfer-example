<template>
  <div class="trim-ui-test">
    <h2>{{ type }} Player</h2>
    <button @click="togglePlay">Play or Pause</button>
    <video v-if="type === 'video'" :src="src" ref="videoElement"></video>
    <span>startTrim: {{ startTrim }}sec</span>
    <span>endTrim: {{ endTrim }}sec</span>
    <div class="trimplayer" ref="trimplayer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import AudioPlayer from "@/util/audioPlayer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

const props = defineProps({
  type: {
    // caution: this 'type' is different kind with the parameter of prepareAudio in AudioPlayer
    type: String,
    default: "audio",
  },
  src: {
    type: String,
    default: "",
  },
});

const videoElement = ref(null);
let audioPlayer = null;
const trimplayer = ref(null);
onMounted(() => {
  audioPlayer = new AudioPlayer(trimplayer.value, videoElement.value);
  audioPlayer.prepareAudio(props.type, props.src);
  audioPlayer.getInstance().on("ready", () => {
    initTrimTime();
    initRegions();
  });
});

const togglePlay = () => {
  if (audioPlayer.isPlaying()) {
    audioPlayer.pause();
  } else {
    audioPlayer.play();
  }
};

const startTrim = ref(0);
const endTrim = ref(0);
const initTrimTime = () => {
  // both should be initialized with the values set before
  startTrim.value = 0;
  endTrim.value = audioPlayer.getDuration();
};

// regions = range selection plugin
const initRegions = () => {
  const ws = audioPlayer.getInstance(0);
  const wsRegions = ws.registerPlugin(RegionsPlugin.create());
  wsRegions.enableDragSelection({
    color: "rgba(255, 0, 0, 0.1)",
  });
  wsRegions.on("region-created", (region) => {
    wsRegions.getRegions().forEach((r) => {
      // allow one region
      if (r.id !== region.id) {
        r.remove();
      }
      startTrim.value = region.start;
      endTrim.value = region.end;
      audioPlayer.setRegion(region);
    });
  });
  wsRegions.addRegion({
    start: startTrim.value,
    end: endTrim.value,
    drag: true,
    resize: true,
  }); // initial region is for the trim times set before
  wsRegions.on("region-updated", (region) => {
    startTrim.value = region.start;
    endTrim.value = region.end;
  });
};
</script>

<style scoped>
span {
  margin: 0 1rem;
}

.trimplayer {
  background: #ffc98f;
}
</style>
