import './style.scss';
import { parseKey, toItalianScale, generateRandomKey } from './utils/keyFunc';
import { UndefinedDomError, UndefinedDomAttributeError } from './class/error';
import { type Scale } from './types/key';
import Score from './class/score';
import Key from './class/key';
import Sound from './class/sound';

let score: Score;
let sound: Sound;
let timer: ReturnType<typeof setTimeout> | null;

window.onload = () => {
  const lowerKey = new Key(parseKey('f/2'));
  const higherKey = new Key(parseKey('a/5'));

  const randomKey = generateRandomKey(lowerKey, higherKey);
  const clef = judgeClef(randomKey);
  score = new Score('#output', randomKey.string, clef);
  sound = new Sound('f/2', 'a/5');
  console.log(score);
  eventSetting();
};

function eventSetting(): void {
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
  const lowerKey = new Key(parseKey('f/2'));
  const higherKey = new Key(parseKey('a/5'));

  const randomKey = generateRandomKey(lowerKey, higherKey);
  const clef = judgeClef(randomKey);
  score.redrawNote(randomKey.string, clef);
}

function answer(answerScale: string): void {
  if (timer != null) {
    return;
  }
  sound.play(score.key);
  const scoreScale = parseKey(score.key).scale;
  const judgeDom = document.querySelector<HTMLDivElement>('#judge');
  const judgeResultDom =
    document.querySelector<HTMLDivElement>('#judge-result');
  const incorrectDom =
    document.querySelector<HTMLDivElement>('#incorrect-wrapper');
  const answerScaleDom =
    document.querySelector<HTMLDivElement>('#answer-scale');
  const scoreScaleDom = document.querySelector<HTMLDivElement>('#score-scale');
  if (judgeDom == null) {
    throw new UndefinedDomError('judge dom not found');
  }
  if (judgeResultDom == null) {
    throw new UndefinedDomError('judge-result dom not found');
  }
  if (incorrectDom == null) {
    throw new UndefinedDomError('incorrect dom not found');
  }
  if (answerScaleDom == null) {
    throw new UndefinedDomError('input-scale dom not found');
  }
  if (scoreScaleDom == null) {
    throw new UndefinedDomError('correct-scale dom not found');
  }

  judgeDom.style.visibility = 'visible';
  answerScaleDom.innerText = toItalianScale(answerScale as Scale);
  scoreScaleDom.innerText = toItalianScale(scoreScale as Scale);

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

function judgeClef(key: Key): string {
  if (key.number >= 40) {
    return 'treble';
  } else {
    return 'bass';
  }
}
