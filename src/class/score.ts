import Vex from 'vexflow';
import { UndefinedDomError } from './error';
const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;

export default class Score {
  private _key: string;
  private readonly div: HTMLDivElement;
  private readonly renderer: Vex.Flow.Renderer;
  private readonly context: Vex.IRenderContext;
  private readonly staves: Record<string, Vex.Flow.Stave>;

  constructor(divId: string, key: string) {
    this._key = key;

    const div = document.querySelector<HTMLDivElement>(divId);
    if (div == null) {
      throw new UndefinedDomError('output div not found');
    }

    this.div = div;

    this.renderer = new Renderer(this.div, Renderer.Backends.SVG);
    this.renderer.resize(500, 500);

    this.context = this.renderer.getContext();
    this.context.scale(3, 3);

    this.staves = {};
    this.staves.treble = new Stave(0, 0, 1000).addClef('treble');
    this.staves.treble.setContext(this.context).draw();

    this.staves.bass = new Stave(0, 70, 1000).addClef('bass');
    this.staves.bass.setContext(this.context).draw();

    this.drawNote(key);
  }

  private drawNote(key: string): void {
    const notes = [new StaveNote({ keys: [key], duration: 'w' })];

    // Create a voice in 4/4 and add above notes
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    new Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(this.context, this.staves.treble);
  }

  public redrawNote(key: string): void {
    this._key = key;
    this.removeStaveNotes();
    this.drawNote(key);
  }

  private removeStaveNotes(): void {
    const staveNotes = this.div.querySelectorAll('.vf-stavenote');
    for (const staveNote of staveNotes) {
      staveNote.parentNode?.removeChild(staveNote);
    }
  }

  get key(): string {
    return this._key;
  }
}
