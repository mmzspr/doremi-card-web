import './style.scss';
import { parseKey, generateRandomKey } from './utils/keyFunc';
import { UndefinedDomError } from './class/error';

import Score from './class/score';
import Key from './class/key';

let score: Score;

window.onload = () => {
  const lowerKey = new Key(parseKey('c/4'));
  const higherKey = new Key(parseKey('a/5'));

  const randomKey = generateRandomKey(lowerKey, higherKey);
  score = new Score('#output', randomKey.getString());
  console.log(score);
  eventSetting();
};

function eventSetting(): void {
  const refreshButton =
    document.querySelector<HTMLButtonElement>('#refresh-button');
  if (refreshButton == null) {
    throw new UndefinedDomError('refresh button not found');
  }

  refreshButton.addEventListener('click', () => {
    const lowerKey = new Key(parseKey('c/4'));
    const higherKey = new Key(parseKey('a/5'));

    const randomKey = generateRandomKey(lowerKey, higherKey);
    score.redrawNote(randomKey.getString());
  });
}
