import { grid } from './main.js';

export function createMusicFuntionality() {
  const playButton = document.querySelector('.playButton');
  const instrumentButton = document.querySelector('.instrumentButton');
  const instrumentArray = ['ins1.png', 'ins2.png', 'ins3.png', 'ins4.png'];
  const tempoValue = document.querySelector('#tempoValue');
  const tempo = document.querySelector('#tempoInput');
  const tempoSlider = document.querySelector('.tempoSlider');
  const restartButton = document.querySelector('.restart');

  restartButton.addEventListener('click', () => location.reload());
  let currentIndexInstrument = 0;

  tempoValue.textContent = tempo.value;
  playButton.addEventListener('click', event => playStopEvent(event));
  tempoSlider.addEventListener('change', tempoUpdate);


  instrumentButton.addEventListener('click', event => {
    if (++currentIndexInstrument >= instrumentArray.length) currentIndexInstrument = 0;
    instrumentButton.style.backgroundImage = `url(./PictureData/${instrumentArray[currentIndexInstrument]})`;
    grid.instrumentAudio.removeFromSongEventsArray(currentIndexInstrument + 1, grid.notesArray);
    grid.instrumentAudio.pauseManea();
    playButton.textContent = 'Play';
  });

  function playStopEvent(event) {
    if (event.currentTarget.textContent === 'Play') {
      event.currentTarget.textContent = 'Pause';
      grid.instrumentAudio.addToSongEventsArray(currentIndexInstrument + 1, grid.notesArray);
      grid.instrumentAudio.startManea();

    } else if (event.currentTarget.textContent === 'Pause') {
      event.currentTarget.textContent = 'Play';
      grid.instrumentAudio.removeFromSongEventsArray(currentIndexInstrument + 1, grid.notesArray);
      grid.instrumentAudio.pauseManea();
    }

  }


  function tempoUpdate() {
    let tempoSpeed = Number(tempo.value);
    tempoValue.textContent = String(tempoSpeed);
    grid.instrumentAudio.removeFromSongEventsArray(currentIndexInstrument + 1, grid.notesArray);
    grid.instrumentAudio.pauseManea();
    grid.instrumentAudio.updateTempo(tempoSpeed);
    playButton.textContent = 'Play';
  }
  //to finalise

}
