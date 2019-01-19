export interface Route<C = {}> {
  path: string;
  id?: number;
  component?: any;
  children?: Routes<C>;
  lazyPath?: string;
  state?: string[];
}

export interface BaseRoute {
  root: Route;
}

export type Routes<T, C = {}> = { [key in keyof T]: Route<C> };
