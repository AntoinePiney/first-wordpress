/* eslint-disable @typescript-eslint/no-explicit-any */

// État du défilement
export interface ScrollState {
  ease: number;
  current: number;
  target: number;
  last: number;
}

// État du toucher
export interface TouchState {
  isDown: boolean;
  position: number;
  start: number;
}

// Dimensions du viewport
export interface ViewportSize {
  width: number;
  height: number;
}

export interface ProjectTitle {
  name: string;
  description: string;
}

export interface MediaItem {
  element: HTMLElement;
  wrapper: HTMLElement;
  mesh: any;
  program: any;
  bounds: DOMRect | null;
  extra: number;
  title?: ProjectTitle;
}
// Modules OGL
export interface OGLModules {
  Renderer: any;
  Camera: any;
  Transform: any;
  Plane: any;
  Mesh: any;
  Program: any;
  Texture: any;
}

// Type de direction
export type ScrollDirection = "up" | "down";

// WebGL Context et resources
export interface WebGLResources {
  renderer: any;
  camera: any;
  scene: any;
  gl: WebGLRenderingContext | null;
  geometry: any;
}
