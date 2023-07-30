import { Store } from '@ngrx/store';
import { JokesComponent } from './jokes.component';
import * as angularCore from '@angular/core';
import { of } from 'rxjs';
import { jokesActions } from '../+state/jokes.actions';
import { jokesApiActions } from '../+state/jokes-api.actions';

describe('JokesComponent', () => {
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

    return { component: new JokesComponent(), mockStore };
  }

  it('should create component', () => {
    const { component } = createComponent();
    expect(component).toBeTruthy();
  });

  describe('onFavorite', () => {
    it('should dispatch favoriteJoke action', () => {
      const { component, mockStore } = createComponent();
      const expected = { id: 'joke-1' } as any;
      component.onFavorite(expected);
      expect(mockStore.dispatch).toHaveBeenCalledWith(
        jokesActions.favoriteJoke({ joke: expected })
      );
    });
  });

  describe('loadInitalJokes$$', () => {
    it('should call getRandomJoke 10 times', () => {
      const { component, mockStore } = createComponent();
      component.loadJokes();
      expect(mockStore.dispatch).toBeCalledWith(
        jokesApiActions.getRandomJoke()
      );
      expect(mockStore.dispatch).toBeCalledTimes(10);
    });
  });

  describe('onDestroy', () => {
    it('should call remove all jokes action', () => {
      const { component, mockStore } = createComponent();
      component.ngOnDestroy();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        jokesActions.removeAllJokes()
      );
    });
  });
});
