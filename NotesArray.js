export default class NotesArray {
  constructor(rows = 0, cols = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Uint8Array(rows * cols);
  }

  set(x, y, value) {
    if (x < 0 || x > this.cols) return
    if (y < 0 || y > this.rows) return
    const index = this.getNoteFromPostion(x, y)
    if (value === undefined) this.data[index] = 0;
    else this.data[index] = value + 1;
  }

  get(x, y) {
    if (x < 0 || x > this.cols) return
    if (y < 0 || y > this.rows) return
    if (!this.data[this.getNoteFromPostion(x, y)]) this.set(x, y);
    return this.data[this.getNoteFromPostion(x, y)]
  }
  flipY(y) {
    return this.rows - y - 1;
  }
  getNoteFromPostion(x, y) {
    if (x < 0 || x > this.cols) return
    if (y < 0 || y > this.rows) return
    const [xPos, yPos] = [x, this.flipY(y)];
    return yPos * (this.cols) + xPos;

  }

  getPositionFromNote(index) {
    const y = Math.floor(index / this.cols);
    const x = index - y * this.cols;
    return [x, y]
  }
  resize(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Uint8Array(rows * cols);
  }
  update(index) {
    if (this.data[index] < 1) this.data[index] = 1
    else this.data[index] = 0;
  }
}
