import CanvasRender from "./CanvasRenderer.js";
//nu uita sa dai rename la Module in Render : CanvasRender InstrumentCanvasRender
export default class InstrumentCanvasRender extends CanvasRender {
  constructor(...args) {
    super(...args);
  }
  drawNote(notesArray, scroll, noteToColor) {
    // Draw some notes

    for (let j = this.bounds.yMin; j < this.bounds.yMax; j++) {
      for (let i = this.bounds.xMin; i < this.bounds.xMax; i++) {
        let note = notesArray.getNoteFromPostion(i, notesArray.flipY(j));
        if (notesArray.data[note]) {
          this.ctx.fillStyle = this.getColor(notesArray, note, noteToColor);
          this.ctx.fillRect(
            i * this.tileWidth * this.dpi - scroll.x * this.dpi,
            j * this.tileHeight * this.dpi - scroll.y * this.dpi,
            this.tileWidth * this.dpi,
            this.tileHeight * this.dpi)

        }
      }
    }
  }

  drawGrid(notesArray, scroll) {
    let thickness = 1;
    const barCells = notesArray.cols / this.groupedCols;
    const start = Math.floor(this.bounds.xMin / this.tileWidth);
    for (let i = this.bounds.xMin + 1; i < this.bounds.xMax; i++) {
      if (i % this.splitsPerBeat === 0) thickness = 2
      else thickness = 0.5;
      this.ctx.fillStyle = 'gold';
      this.ctx.fillRect(
        i * this.dpi * this.tileWidth - scroll.x, 0,
        thickness * this.dpi, this.height * this.dpi
      );
    }
    for (let i = this.bounds.yMin + 1; i < this.bounds.yMax; i++) {
      if (i % 12 < 1) {
        thickness = 3;
        this.ctx.fillStyle = 'rgba(255,215,0,1)'
      } else {
        thickness = 0.5;
        this.ctx.fillStyle = 'gold';
      }
      this.ctx.fillRect(
        0, i * this.dpi * this.tileHeight - scroll.y * this.dpi,
        this.width * this.dpi, thickness * this.dpi
      );
    }
  }
  getColor(notesArray, note, noteToColor) {
    let [x, y] = notesArray.getPositionFromNote(note);
    if (notesArray[note]) {
      if (x / this.groupedCols % 2 < 1) return 'white'
      else return '#ececec';
    } else {
      return noteToColor[y % 12];
    }
  }
}
