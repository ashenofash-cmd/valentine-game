export interface Position {
  x: number;
  y: number;
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: string;
}

export interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}