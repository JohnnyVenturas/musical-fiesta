import SongOptions from "./SongOptions.js";

export default class InstumentAudio extends SongOptions {
  constructor() {
    super();
  }
  addToSongEventsArray(currentInstrument, notesArray) {
    for (let note = 0; note < notesArray.data.length; note++) {
      if (notesArray.data[note]) {
        let [xPos, yPos] = notesArray.getPositionFromNote(note);
        yPos = notesArray.flipY(yPos);
        xPos++;
        //console.log(xPos);
        this.addNote(currentInstrument, xPos, yPos);
      }
    }
  }
  removeFromSongEventsArray(currentInstrument, notesArray) {
    for (let note = 0; note < notesArray.data.length; note++) {
      if (notesArray.data[note]) {
        let [xPos, yPos] = notesArray.getPositionFromNote(note);
        xPos++;
        yPos = notesArray.flipY(yPos);
        this.removeNote(currentInstrument, xPos, yPos);
      }
    }
  }

}
