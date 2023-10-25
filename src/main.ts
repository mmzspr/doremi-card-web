import './style.scss';
import { parseKey, toItalianScale, generateRandomKey } from './utils/keyFunc';
import { UndefinedDomError, UndefinedDomAttributeError } from './class/error';
import { type Scale } from './types/key';
import Score from './class/score';
import Key from './class/key';

let score: Score;
let timer: ReturnType<typeof setTimeout> | null;

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
        throw new UndefinedDomAttributeError(
          'button: dataset-scale attribute not found',
        );
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
  if (timer != null) {
    return;
  }
  const scoreScale = parseKey(score.key).scale;

  const judgeDom = document.querySelector<HTMLDivElement>('#judge');
  const judgeResultDom =
    document.querySelector<HTMLDivElement>('#judge-result');
  const incorrectDom =
    document.querySelector<HTMLDivElement>('#incorrect-wrapper');
  const inputScaleDom = document.querySelector<HTMLDivElement>('#input-scale');
  const correctScaleDom =
    document.querySelector<HTMLDivElement>('#correct-scale');
  if (judgeDom == null) {
    throw new UndefinedDomError('judge dom not found');
  }
  if (judgeResultDom == null) {
    throw new UndefinedDomError('judge-result dom not found');
  }
  if (incorrectDom == null) {
    throw new UndefinedDomError('incorrect dom not found');
  }
  if (inputScaleDom == null) {
    throw new UndefinedDomError('input-scale dom not found');
  }
  if (correctScaleDom == null) {
    throw new UndefinedDomError('correct-scale dom not found');
  }

  judgeDom.style.visibility = 'visible';
  inputScaleDom.innerText = toItalianScale(answerScale as Scale);
  correctScaleDom.innerText = toItalianScale(scoreScale as Scale);

  if (answerScale === scoreScale) {
    judgeResultDom.innerText = '正解';
    incorrectDom.style.display = 'none';
  } else {
    judgeResultDom.innerText = '不正解';
    incorrectDom.style.display = 'inline-block';
  }
  timer = setTimeout(() => {
    judgeDom.style.visibility = 'hidden';
    refresh();
    timer = null;
  }, 1000);
}
