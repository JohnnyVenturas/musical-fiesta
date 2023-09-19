import InstrumentCanvasRender from "./InstrumentCanvasRenderer.js"
import NotesArray from "./NotesArray.js"
import InstrumentAudio from './Instrument.js'
export default class Grid {
  constructor() {
    this.instrumentAudio = new InstrumentAudio();
    this.instrument = new InstrumentCanvasRender();
    this.notesArray = new NotesArray()
    this.html = document.querySelector('html');
    //   this.songOptions = songOptions;
  }

  draw() {
    this.instrument.clearCanvas();
    this.instrument.draw(this.notesArray, { x: 0, y: 0 }, this.color);
    this.instrument.drawGrid(this.notesArray, { x: 0, y: 0 }, this.color);
  }
  setGridPropreties(objPropreties) {
    //Number of bars, beats per bar, splits beats
    //template
    /*
     {
        lengthInBars: bars;  
        beatsPerPar: beats;
        splitsPerBeat: splits;
     }
     */
    this.instrument.octaves = objPropreties.octaves;
    this.instrument.groupedRows = objPropreties.beatsPerOctave;
    this.instrument.splitsPerBeat = objPropreties.splitsPerBeat;
    this.instrument.beatsPerBar = objPropreties.beatsPerBar;
    this.instrument.groupedCols = objPropreties.lengthInBars;
    this.instrument.resize(...objPropreties.resizeInstrument);
    this.notesArray.resize(this.instrument.octaves * this.instrument.groupedRows, this.instrument.splitsPerBeat * this.instrument.beatsPerBar * this.instrument.groupedCols);
    this.color = objPropreties.color;
  }

  //the next function shall be used only when you need to update the grid but not the array inside of it
  updateGridDimensions(objPropreties) {
    this.instrument.resize(...objPropreties.resizeInstrument);

  }
  addEvents() {
    this.clickEvent();
    this.hoverEvent();
  }
  clickEvent() {
    this.instrument.canvas.addEventListener('click', event => {
      if (this.mousemove === undefined) {
        const [xPos, yPos] = this.getCurrentNoteCordinate(event)
        const note = this.notesArray.getNoteFromPostion(xPos, yPos);
        this.notesArray.update(note);
        this.instrument.draw(this.notesArray, { x: 0, y: 0 }, this.color);
      } else {
        this.mousemove = undefined;
      }
    });

  }
  hoverEvent() {
    this.isPressed = false;
    this.deleteOnHover = true;
    this.instrument.canvas.addEventListener('mousedown', event => {
      const [xPos, yPos] = this.getCurrentNoteCordinate(event);
      this.deleteOnHover = this.notesArray.get(xPos, yPos) === 1 ? true : false;
      this.isPressed = true;
    });
    this.instrument.canvas.addEventListener('mousemove', event => {

      if (this.isPressed) {
        this.mousemove = true;
        const [xPos, yPos] = this.getCurrentNoteCordinate(event);
        const note = this.notesArray.getNoteFromPostion(xPos, yPos);
        if (this.deleteOnHover && this.notesArray.data[note]) {
          this.notesArray.data[note] = 0;
          this.instrument.draw(this.notesArray, { x: 0, y: 0 }, this.color);
        } else if (!this.deleteOnHover && !this.notesArray[note]) {
          this.notesArray.data[note] = 1;
          this.instrument.draw(this.notesArray, { x: 0, y: 0 }, this.color);
        }
      }
    });
    this.instrument.canvas.addEventListener('mouseup', event => {
      this.isPressed = false;

    })
  }
  getCurrentNoteCordinate(event, scroll = { x: this.html.scrollLeft, y: this.html.scrollTop }) {
    console.log(scroll.x, scroll.y);
    return [Math.floor((event.clientX - this.instrument.canvas.offsetLeft + scroll.x) / this.instrument.tileWidth),
      this.notesArray.flipY(Math.floor((event.clientY - this.instrument.canvas.offsetTop + scroll.y) / this.instrument.tileHeight))
    ];
  }

  getGridDetails() {}
}
