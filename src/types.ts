export type BlockProps = {
  position?: [number, number, number];
}

export type BlockBoundProps = {
  position?: [number, number, number];
  length?: number;
}

export type BlockTypes = React.FC<BlockProps>[];

export type LevelProps = {
  count?: number; 
  types?: BlockTypes;
  seed?: number;
}

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

export enum Phase {
  ready = 'ready',
  playing = 'playing',
  ended = 'ended',
}