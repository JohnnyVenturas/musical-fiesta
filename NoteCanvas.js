export default class NoteCanvas {
  constructor(canvas, ctx, width, height, scaleX, scaleY, color, lineWidth, highlightColor, highlightWidth) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.color = color;
    this.pressed = false;
    this.colorObj = {
      0: 'rgba(245,40,145,1)',
      1: 'rgba(91,34,223,1)',
      2: 'rgba(26, 199, 113, 1)',
      3: 'rgba(26, 188, 0, 1)',
      4: 'rgba(255, 255, 0, 1)',
      5: 'rgba(255, 157, 0, 1)',
      6: 'rgba(255, 0, 50, 1)',
    }
    this.highlightColor = highlightColor;
    this.lineWidth = lineWidth;
    this.highlightWidth = highlightWidth;
    this.hue = 'rgba(0, 0, 0, 0.1)';
    this.dpi = window.devicePixelRatio || 1
  }

  mainGrid() {
    //Creates the main grid
    let [x, y] = [0, 0];
    for (x = 0; x < this.width; x += this.scaleX) {
      for (y = 0; y < this.height; y += this.scaleY) {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.strokeRect(x, y, this.scaleX, this.scaleY);
      }
    }
  }

  drawCanvasHue() {
    //creates a hue around second 8 and last 8 parts of the grid
    let [x, y] = [8 * this.scaleX, 0]
    while (x < this.width) {
      this.ctx.fillStyle = this.hue;
      this.ctx.fillRect(x, y, this.scaleX * 8, this.scaleY * 14);
      x *= 3;
    }
  }

  drawCanvasHighlight() {
    // highlights grid margins
    let [x, y] = [0, 0];
    for (x = 0; x < this.width; x += 2 * this.scaleX) {
      this.ctx.lineWidth = this.highlightWidth;
      this.ctx.strokeStyle = this.highlightColor;
      this.ctx.strokeRect(x, y, 2 * this.scaleX, this.height);
    }
  }

  getRectangle(event) {
    const distanceX = Math.floor((event.clientX - this.canvas.offsetLeft) / this.scaleX);
    const distanceY = Math.floor((event.clientY - this.canvas.offsetTop) / this.scaleY);
    return [distanceX * this.scaleX,
      distanceY * this.scaleY, this.scaleX, this.scaleY
    ]
  }

  getColor(yPos) {
    return this.colorObj[Math.floor(yPos / this.scaleY) % 7];
  }

  adjustCoordinate(rectangle, margins) {
    //margins [left, top, right, bottom]
    return [rectangle[0] + margins[0], rectangle[1] + margins[1],
      rectangle[2] - 2 * margins[2],
      rectangle[3] - 2 * margins[3]
    ]


  }
  adjustRectangle(tmpRectangle) {
    let rectangle;
    if ((tmpRectangle[0] / this.scaleX) % 2 === 0) {
      const margins = [this.highlightWidth * 0.5, this.lineWidth * 0.5, this.lineWidth + this.lineWidth * 0.5, this.lineWidth * 0.5];
      rectangle = this.adjustCoordinate(tmpRectangle, margins);
    } else {
      const margins = [this.lineWidth, this.lineWidth * 1.05, this.highlightWidth / 4, this.lineWidth * 1.05]
      rectangle = this.adjustCoordinate(tmpRectangle, margins);
    }
    return rectangle;
  }
  getDefaultColor(rectangle) {
    const distanceX = Math.floor(rectangle[0] / this.scaleX);
    if ((distanceX > 7 && distanceX < 16) || (distanceX > 23 && distanceX < 32))
      return this.hue;
    return 'rgba(0,0,0,0)'
  }
  getCurrentColor(rectangle) {
    const imageData = this.ctx.getImageData(...rectangle)
    const pixel = imageData.data.slice(imageData.data.length / 2 - 2, imageData.data.length / 2 + 2);
    const rgbaValue = `rgba(${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]})`;
    return rgbaValue;
  }
  toColor(rectangle) {
    if (this.getCurrentColor(rectangle) !== this.getDefaultColor(rectangle))
      return false;
    return true;
  }
  colorNote(event) {
    const toColorRectangle = this.adjustRectangle(this.getRectangle(event));
    this.ctx.fillStyle = this.getColor(toColorRectangle[1]);
    this.ctx.fillRect(...toColorRectangle);

  }
  displayGrid() {
    this.mainGrid();
    this.drawCanvasHighlight();
    this.drawCanvasHue();
  }

}
