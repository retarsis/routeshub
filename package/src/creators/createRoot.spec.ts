import { createRoot } from './createRoot';

describe('createRoot', () => {
  it('should create a simple hub with basic and small configuration', () => {
    const notes = { root: { path: '' } };
    const appSlice: any = createRoot(notes);
    const result = {
      root: {
        id: 0,
        parentId: null,
        state: ['/'],
        stateFn: Function,
        path: '',
        lazy: null,
        routeName: 'root',
        children: null
      }
    };
    expect(JSON.stringify(appSlice)).toEqual(JSON.stringify(result));
  });
});