//import NoteCanvas from './NoteCanvas.js'
import * as Settings from './Settings.js';
import Grid from './Grid.js';
import { createMusicFuntionality } from './musicButtons.js'
let color = {

  0: "rgba(69, 0, 234, 0.7)",
  1: "rgba(87, 0, 158, 0.7)",
  2: "rgba(82, 0, 0, 0.7)",
  3: "rgba(116, 0, 0, 0.7)",
  4: "rgba(179, 0, 0, 0.7)",
  5: "rgba(238, 0, 0, 0.7)",
  6: "rgba(255, 99, 0, 0.7)",
  7: "rgba(255, 236, 0, 0.7)",
  8: "rgba(153, 255, 0, 0.7)",
  9: "rgba(0, 255, 232, 0.7)",
  10: "rgba(255, 99, 0, 0.7)",
  11: "rgba(0, 124, 255, 0.7)",
  12: "rgba(5, 0, 255, 0.7)",

}
let width = window.innerWidth;
let height = 0.90 * window.innerHeight;

//Grid 

export const gridPropreties = {
  lengthInBars: 4,
  beatsPerBar: 4,
  splitsPerBeat: 2,
  octaves: 2,
  beatsPerOctave: 12,
  resizeInstrument: [2000, height],
  color
}
export const grid = new Grid();
grid.setGridPropreties(gridPropreties);
grid.draw();
grid.addEvents();
grid.instrument.canvas.style.borderColor = 'grey';
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = 0.90 * window.innerHeight;
  gridPropreties.resizeInstrument = [2000, height];
  grid.updateGridDimensions(gridPropreties);
  grid.draw();
})
//Settings 
Settings.createSettingsMenu();
createMusicFuntionality();
