import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as angularCore from '@angular/core';
import { of } from 'rxjs';
import { FavoritesComponent } from './favorites.component';
import { jokesActions } from '../+state/jokes.actions';

describe('FavoritesComponent', () => {
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

    return { component: new FavoritesComponent(), mockStore };
  }

  it('should create', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  describe('onUnfavorite', () => {
    it('should dispatch favoriteJoke action', () => {
      const { component, mockStore } = createComponent();
      const expected = { id: 'joke-1' } as any;
      component.onUnfavorite(expected);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        jokesActions.unfavoriteJoke({ joke: expected })
      );
    });
  });
});
