import Wavesurfer from "wavesurfer.js";

export default class AudioPlayer {
  hidden = false;
  region = null;
  startTrim = 0;
  endTrim = 0;
  singleTrackOption = {
    barWidth: 2.54827,
    barGap: 0.47,
    height: 32,
    waveColor: "#fff",
    progressColor: "#FF7700",
    normalize: true,
    fillParent: true,
  };

  constructor(container, videoElement) {
    this.defaultOptions = { container, ...this.singleTrackOption };
    if (videoElement) {
      this.defaultOptions.media = videoElement;
    }
    this.soundInstance = Wavesurfer.create(this.defaultOptions);
  }

  addTrack(id, mediaSrc) {
    if (id === "audio") {
      this.soundInstance.load(mediaSrc);
    } else {
      this.soundInstance.setOptions(this.defaultOptions); // for video, just needed rerender through setOptions because videoElement has src
    }
  }

  prepareAudio(id, src) {
    let audioUrl = "";
    switch (id) {
      case "audio":
      case "bgm":
      case "video":
        audioUrl = src;
        break;
      default:
        break;
    }
    this.addTrack(id, audioUrl);
    return;
  }

  play() {
    const current = this.soundInstance.getCurrentTime();
    if (current < this.region.start || current > this.region.end) {
      this.region.play();
    } else {
      this.soundInstance.play();
    }
  }

  pause() {
    this.soundInstance.pause();
  }

  stop() {
    this.soundInstance.pause();
    this.soundInstance.setTime(this.region.start);
  }

  isPlaying() {
    return this.soundInstance.isPlaying();
  }

  getDuration() {
    return this.soundInstance.getDuration();
  }

  setRegion(region) {
    this.region = region;
  }

  getInstance() {
    return this.soundInstance;
  }
}
