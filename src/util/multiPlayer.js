import Multitrack from "wavesurfer-multitrack";
import AudioPlayer from "@/util/audioPlayer";

export default class MultiPlayer extends AudioPlayer {
  constructor(container, ids) {
    super(container);
    const defaultTracks = ids.map((id) => ({ id, startPosition: 0 }));
    this.soundInstance = Multitrack.create(defaultTracks, {
      container,
      trackBackground: "#FFC98F",
    });
  }

  addTrack(id, url) {
    const multiTrackOption = {
      id,
      url,
      startPosition: 0,
    };

    this.soundInstance.addTrack(multiTrackOption);
  }

  removeTrack(id) {
    this.soundInstance.addTrack({ id });
  }

  play() {
    this.soundInstance.play();
  }

  getDuration() {
    const durations = this.soundInstance.wavesurfers.map((track) => track.getDuration());
    return Math.max(...durations);
  }

  getLongestTrackIndex() {
    const durations = this.soundInstance.wavesurfers.map((track) => track.getDuration());
    return durations.indexOf(this.getDuration());
  }

  getInstance(index = null) {
    return index !== null ? this.soundInstance.wavesurfers[index] : this.soundInstance;
  }
}
