import { UndefinedDomError } from '../class/error';
import Vex from 'vexflow';
const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;

export function drawCheetsheet(): void {
  const div = document.querySelector<HTMLDivElement>('#cheatsheet-output');
  if (div == null) {
    throw new UndefinedDomError('cheatsheet-output not found');
  }
  const renderer = new Renderer(div, Renderer.Backends.SVG);

  renderer.resize(650, 480);
  const context = renderer.getContext();
  context.scale(3, 3);

  drawStave(
    context,
    0,
    0,
    ['d/4', 'f/4', 'a/4', 'c/5', 'e/5', 'g/5'],
    'treble',
  );
  drawStave(context, 0, 70, ['f/2', 'a/2', 'c/3', 'e/3', 'g/3', 'b/3'], 'bass');

  drawStave(
    context,
    120,
    0,
    ['c/4', 'e/4', 'g/4', 'b/4', 'd/5', 'f/5', 'a/5'],
    'treble',
  );
  drawStave(context, 120, 70, ['g/2', 'b/2', 'd/3', 'f/3', 'a/3'], 'bass');

  removeStavebarline(div);

  drawName(div, 90, 85, ['レ', 'ファ', 'ラ', 'ド', 'ミ', 'ソ']);
  drawName(div, 90, 155, ['ファ', 'ラ', 'ド', 'ミ', 'ソ', 'シ']);
  drawName(div, 210, 90, ['ド', 'ミ', 'ソ', 'シ', 'レ', 'ファ', 'ラ']);
  drawName(div, 210, 150, ['ソ', 'シ', 'レ', 'ファ', 'ラ']);
}

function removeStavebarline(div: HTMLDivElement): void {
  const stavebarlines = div.querySelectorAll('.vf-stavebarline');
  console.log(stavebarlines);
  for (const stavebarline of stavebarlines) {
    console.log(stavebarline);
    if (stavebarline.parentNode !== null) {
      stavebarline.parentNode.removeChild(stavebarline);
    }
  }
}

function drawStave(
  context: Vex.IRenderContext,
  x: number,
  y: number,
  keys: string[],
  clef: string,
): void {
  const stave = new Stave(x, y, 80);
  stave.addClef(clef);
  stave.setContext(context).draw();
  const notes = [new StaveNote({ keys, duration: 'w', clef })];
  const voice = new Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes);
  new Formatter().joinVoices([voice]).format([voice], 350);
  voice.draw(context, stave);
}

function drawName(
  div: HTMLDivElement,
  x: number,
  y: number,
  nameList: string[],
): void {
  const svg = div.querySelector('svg');

  if (svg == null) {
    throw new UndefinedDomError('svg not found');
  }

  nameList.forEach((name, index) => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.innerHTML = name;
    text.setAttribute('x', String(x));
    text.setAttribute('y', String(y - index * 10));
    text.setAttribute('font-size', '7');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'black');
    svg.insertAdjacentElement('afterbegin', text);
  });
}
