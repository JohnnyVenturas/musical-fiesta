import { gridPropreties, grid } from './main.js'

const restoreDom = [];


function createSettingsMenu() {
  const settingsButton = document.querySelector('.settings');
  settingsButton.addEventListener('click', event => {
    createSettingsMenuHelper();
  });

}

function createSettingsMenuHelper() {
  const body = document.querySelector('body');
  while (body.firstChild) {
    if (body.firstChild in restoreDom) continue;
    restoreDom.push(body.firstChild);
    body.removeChild(body.firstChild);
  }
  //settings text 
  const settingsHeader = document.createElement('h1');
  settingsHeader.classList.add('settingsHeader');
  settingsHeader.textContent = 'Settings';
  body.appendChild(settingsHeader);

  //Grid propreties 
  const wrapperDiv = document.createElement('div');
  const barLenghtDiv = document.createElement('div');
  const beatsPerBarDiv = document.createElement('div');
  const splitsPerBeatDiv = document.createElement('div');
  const octavesDiv = document.createElement('div');
  createBarDiv(barLenghtDiv, 'Lenght in bars:', gridPropreties.lengthInBars);
  createBarDiv(beatsPerBarDiv, 'Beats per bar:', gridPropreties.beatsPerBar);
  createBarDiv(splitsPerBeatDiv, 'Splits per beat:', gridPropreties.splitsPerBeat);
  createBarDiv(octavesDiv, 'Octaves:', gridPropreties.octaves);

  const settingsArray = [barLenghtDiv, beatsPerBarDiv, splitsPerBeatDiv, octavesDiv];
  settingsArray.forEach(value => {
    wrapperDiv.appendChild(value);
    value.classList.add('settingOptions');
  });
  body.appendChild(wrapperDiv);
  wrapperDiv.classList.add('settingOptionsWrapper');
  //Return button 
  const finishModificationButton = document.createElement('div');
  body.appendChild(finishModificationButton);

  function createFinishButton(finishButton) {

    finishButton.classList.add('finishButton');
    finishButton.addEventListener('click', event => {
      // update gridPropreties
      console.log(barLenghtDiv.children[1])
      gridPropreties.lengthInBars = Number(barLenghtDiv.children[1].children[0].textContent);
      gridPropreties.beatsPerBar = Number(beatsPerBarDiv.children[1].children[0].textContent);
      gridPropreties.splitsPerBeat = Number(splitsPerBeatDiv.children[1].children[0].textContent);
      gridPropreties.octaves = Number(octavesDiv.children[1].children[0].textContent);
      // redraw grid
      grid.setGridPropreties(gridPropreties);
      grid.draw();
      while (body.firstChild) body.removeChild(body.firstChild);
      for (const element of restoreDom) body.appendChild(element);
    });

  }
  createFinishButton(finishModificationButton);

}


function createBarDiv(divName, divDisplayName, defautValue = 4) {
  const textParagraph = document.createElement('p');

  //textParagraph
  textParagraph.textContent = divDisplayName;
  divName.appendChild(textParagraph);

  //valuePara
  const valuePara = document.createElement('p'); //display the value of the parameter
  valuePara.textContent = String(defautValue);

  //plus button
  const plus = document.createElement('div');
  plus.addEventListener('click', event => {
    let number = Number(valuePara.textContent);
    if (number > 0 && number < 7) {
      if (number < 6) valuePara.textContent = String(number + 1);
      else valuePara.textContent = String(number);
      console.log(number);
    }
  });

  //minus button 
  const minus = document.createElement('div');
  minus.addEventListener('click', event => {
    let number = Number(valuePara.textContent);
    if (number > 0 && number < 7) {
      if (number > 1) valuePara.textContent = String(number - 1)
      else valuePara.textContent = String(number);
    }
  });

  //create Wrapper inside the option div to help displaying
  const wrapperOperationDiv = document.createElement('div');
  wrapperOperationDiv.appendChild(valuePara);
  wrapperOperationDiv.appendChild(minus);
  wrapperOperationDiv.appendChild(plus);
  wrapperOperationDiv.classList.add('operationWrapper');
  plus.classList.add('plusClass');
  minus.classList.add('minusClass');
  divName.appendChild(wrapperOperationDiv);
}

export { createSettingsMenu };
