import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';
import * as angularCore from '@angular/core';
import { jokesActions } from './+state/jokes.actions';

describe('AppComponent', () => {
  function createComponent() {
    const mockStore = {
      dispatch: jest.fn(),
      select: jest.fn(),
    } as Partial<Store>;

    const injectSpy = jest.spyOn(angularCore, 'inject');
    injectSpy.mockImplementation(providerToken => {
      if (providerToken === Store) {
        return mockStore;
      }
      return undefined;
    });

    return { component: new AppComponent(), mockStore };
  }

  it('Should call load favorites action', () => {
    const { mockStore } = createComponent();
    expect(mockStore.dispatch).toBeCalledWith(jokesActions.loadFavorites());
  });
});
