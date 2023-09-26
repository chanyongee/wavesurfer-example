# wavetest

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run serve
```

### Compiles and minifies for production

```
pnpm run build
```

### Lints and fixes files

```
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 구현 기능

- 단일 트랙
  - 웨이브파형 UI 변경
  - 오디오 플레이어
    - Toggle play
    - Regions 플러그인을 통한 구간 선택. 구간 선택 시작점과 종료점 받아오기 (startTrim, endTrim)
    - 구간 선택한 부분 재생
  - 비디오 플레이어
    - Wavesurfer 객체에 비디오 엘리먼트 부착. 재생 시 비디오도 재생됨
    - 비디오 변경
- 다중트랙
  - 다중 트랙 동시 재생
  - Stop
  - 트랙 내 음원 삭제 (트랙 자체 삭제는 불가함)
  - 총 시간 및 재생 중 남은 시간 계산 (단일 트랙에서도 동일함)

### To do list

- 오디오파형 숨기기
- 타임라인(웨이브파형 하단 눈금자) 숨기기
- 짧은 두 오디오를 다중트랙에서 재생했을 때 가끔 두 번째 트랙이 두 번 재생되는 버그가 있음
- 로컬 파일 말고 외부 파일 fetch해서 동시재생 지원하는지와 캐싱 여부 확인하기
