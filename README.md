# audio-waveform

![Audio Waveform](https://github.com/patidar-suresh/audio-waveform/blob/master/audiowaveform.PNG "Optional title")

This project demonstrate live waveform generation using HTML5 Audio API and Canvas.

  - Generate waveform for your audio being played on audio player
  - Draw wavefrom using requestAnimationFrame for a smooth drawing
  - Handle audio event (play, pause, ended) to start/stop drawing wavefrom.
  - Optimized to save CPU cycles when audio is not being played (paused/ended).

### Installation and Running

audio-waveform requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd audio-waveform
$ npm install
$ npm start
```

Open the browser and enter following url to run the applicaiton
http://localhost:3001
