import './style.scss';
import { parseKey, generateRandomKey } from './utils/keyFunc';
import { UndefinedDomError, UndefinedDomAttributeError } from './class/error';

import Score from './class/score';
import Key from './class/key';

let score: Score;

window.onload = () => {
  const lowerKey = new Key(parseKey('c/4'));
  const higherKey = new Key(parseKey('a/5'));

  const randomKey = generateRandomKey(lowerKey, higherKey);
  score = new Score('#output', randomKey.string);
  console.log(score);
  eventSetting();
};

function eventSetting(): void {
  
  // ===== refresh button =====
  const refreshButton =
    document.querySelector<HTMLButtonElement>('#refresh-button');
  if (refreshButton == null) {
    throw new UndefinedDomError('refresh button not found');
  }

  refreshButton.addEventListener('click', () => {
    refresh();
  });

  // ===== answer button =====
  const answerButtons = document.querySelectorAll<HTMLButtonElement>(
    '.answer-wrapper button',
  );
  // error handling
  if (answerButtons == null) {
    throw new UndefinedDomError('answer buttons not found');
  }
  // add event listener
  for (const button of answerButtons) {
    button.addEventListener('click', () => {
      const answerScale = button.dataset.scale;
      if (answerScale == null) {
        throw new UndefinedDomAttributeError('button: dataset-scale attribute not found');
      }
      answer(answerScale);
    });
  }

}

function refresh(): void {
  const lowerKey = new Key(parseKey('c/4'));
  const higherKey = new Key(parseKey('a/5'));

  const randomKey = generateRandomKey(lowerKey, higherKey);
  score.redrawNote(randomKey.string);
}

function answer(answerScale: string): void {
  const scoreScale = parseKey(score.key).scale; 

  if (answerScale === scoreScale) {
    alert("Correct!");
  } else {
    alert('Wrong!');
  }
  refresh();
}
