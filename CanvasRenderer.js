import { Context2d } from './Context2d.js'
export default class CanvasRender extends Context2d {
  constructor(...args) {
    super(...args);
    this.groupedCols = 4; //basically lenght in bars
    this.groupedRows = 7; // size of the octave
    this.tileHeight = 5; // just an initial value
    this.tileWidth = 20; // just an initial value
    this.bounds = {
      xMin: 0,
      yMin: 0,
      xMax: this.width,
      yMax: this.height,
    }; // will be usefull later when we will draw the canvas
  }
  drawBars(notesArray, scroll) {
    //let barCells = notesArray.cols / this.cols; //number of cells in a bar
    let barCells = notesArray.cols / this.groupedCols;
    let barWidth = this.tileWidth * barCells * this.dpi;

    for (let i = this.bounds.xMin; i < this.bounds.xMax; i += barCells) {
      if ((i / barCells) % 2 < 1) {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(
          i * this.tileWidth * this.dpi - scroll.x * this.dpi, 0,
          barWidth, this.height * this.dpi)
      }
    }
  }
  draw(notesArray, scroll, noteToColor) {

    this.getTileWidth(notesArray);
    this.updateBounds(notesArray, scroll);
    this.ctx.fillStyle = '#ececec';
    this.ctx.fillRect(0, 0, this.width * this.dpi, this.height * this.dpi);
    this.drawBars(notesArray, scroll);
    this.drawNote(notesArray, scroll, noteToColor);
    this.drawGrid(notesArray, scroll);
  }
  updateBounds(notesArray, scroll) {
    let cellsX = Math.ceil(1 + this.width / this.tileWidth)
    let cellsY = Math.ceil(1 + this.height / this.tileHeight)
    this.bounds.xMin = Math.floor(scroll.x / this.tileWidth)
    this.bounds.yMin = Math.floor(scroll.y / this.tileHeight)
    this.bounds.xMax = Math.min(this.bounds.xMin + cellsX, notesArray.cols)
    this.bounds.yMax = Math.min(this.bounds.yMin + cellsY, notesArray.rows)
  }
  getTileWidth(notesArray) {
    this.tileWidth = this.width / notesArray.cols;
    this.tileHeight = this.height / notesArray.rows;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawNote() {}
  drawGrid() {}
}
