// tslint:disable:max-line-length
import { Routes } from '@angular/router';
import { getHubSlices } from './get-slice';
import { createFeature, createRoot } from '../creators';
import { connectFeatures } from './connect-features';
import { PRIVATE_NOTES_KEY } from '../constants';

describe('connectDetached', () => {
  it('should contain root and detached feature', () => {
    const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const aboutSlice = createFeature(aboutRoutes);
    createRoot(appRoutes, { detached: { about: aboutSlice } });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        map: {
          id: 1,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      },
      about: {
        about: {
          id: 2,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        [PRIVATE_NOTES_KEY]: 'about'
      }
    };
    expect(getHubSlices()).toEqual(result);
  });

  it('should contain root with attached and detached features', () => {
    const appRoutes: Routes = [{ path: '' }, { path: 'map' }];
    const mapRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const aboutSlice = createFeature(aboutRoutes);
    const mapSlice = createFeature(mapRoutes);
    const APP_NOTES_KEY = Symbol();
    createRoot(appRoutes, {
      key: APP_NOTES_KEY,
      detached: { about: aboutSlice }
    });
    connectFeatures(APP_NOTES_KEY, { map: mapSlice });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        map: {
          id: 1,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: APP_NOTES_KEY
      },
      about: {
        about: {
          id: 2,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        [PRIVATE_NOTES_KEY]: 'about'
      },
      map: {
        root: {
          id: 3,
          parentId: 1,
          state: ['/', 'map'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      }
    };
    expect(getHubSlices()).toEqual(result);
  });

  it('should contain root, detached feature with attached inside', () => {
    const appRoutes: Routes = [{ path: '' }];
    const mapRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }, { path: 'map' }];
    const aboutSlice = createFeature(aboutRoutes);
    const mapSlice = createFeature(mapRoutes);
    connectFeatures('about', { map: mapSlice });
    createRoot(appRoutes, { detached: { about: aboutSlice } });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      },
      about: {
        about: {
          id: 1,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'about'
      },
      map: {
        root: {
          id: 3,
          parentId: 2,
          state: ['/', 'map'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      }
    };
    expect(getHubSlices()).toEqual(result);
  });

  it('should contain root and detached feature in another detached feature', () => {
    const appRoutes: Routes = [{ path: '' }];
    const aboutRoutes: Routes = [{ path: 'about' }];
    const mapRoutes: Routes = [{ path: 'map' }];
    const mapSlice = createFeature(mapRoutes);
    const aboutSlice = createFeature(aboutRoutes, {
      detached: { map: mapSlice }
    });
    createRoot(appRoutes, { detached: { about: aboutSlice } });
    const result = {
      app: {
        root: {
          id: 0,
          parentId: null,
          state: ['/'],
          path: '',
          name: 'root'
        },
        [PRIVATE_NOTES_KEY]: 'app'
      },
      about: {
        about: {
          id: 1,
          parentId: null,
          state: ['/', 'about'],
          path: 'about',
          name: 'about'
        },
        [PRIVATE_NOTES_KEY]: 'about'
      },
      map: {
        map: {
          id: 2,
          parentId: null,
          state: ['/', 'map'],
          path: 'map',
          name: 'map'
        },
        [PRIVATE_NOTES_KEY]: 'map'
      }
    };
    expect(getHubSlices()).toEqual(result);
  });
});