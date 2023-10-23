import { Vex } from 'vexflow';

export function drawScore(key: string): void {
  const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;
  const div = document.querySelector<HTMLDivElement>('#output');
  if (div == null) {
    return;
  }
  const renderer = new Renderer(div, Renderer.Backends.SVG);

  // svg size
  renderer.resize(1000, 1000);

  const context = renderer.getContext();
  context.scale(3, 3);

  const stave = new Stave(0, 0, 1000);

  // Add a clef and time signature.
  stave.addClef('treble');

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();

  const notes = [new StaveNote({ keys: [key], duration: 'w' })];

  // Create a voice in 4/4 and add above notes
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  new Formatter().joinVoices([voice]).format([voice], 400);

  // Render voice
  voice.draw(context, stave);
}
